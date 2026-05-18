import { useEffect, useMemo, useState } from "react";
import {
  fetchAdminNominations,
  updateNominationStatus,
  updateNomination,
  deleteNomination,
} from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { ShieldCheck, Edit2, Trash2, FileText, Search, Eye } from "lucide-react";
import AdminPreviousEditions from "../components/AdminPreviousEditions.jsx";
import { PageHero } from "../components/Motion.jsx";

/* ------------------ Constants ------------------ */
const emeraldGrad = "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)";
const cyanGrad = "linear-gradient(135deg, #06b6d4 0%, #10b981 100%)";

const STATUS_OPTIONS = [
  { value: "nominated", label: "Nomination Received" },
  { value: "evaluation", label: "Under Evaluation" },
  { value: "in_progress", label: "In Progress (Shortlisted)" },
  { value: "selected", label: "Selected (Winner)" },
  { value: "rejected", label: "Rejected" },
];

const STATUS_FILTER_OPTIONS = [
  { value: "all", label: "All Statuses" },
  ...STATUS_OPTIONS,
];

const PARTICIPATION_TYPE_FILTER_OPTIONS = [
  { value: "all", label: "All Participation Types" },
  { value: "nominated as award", label: "Award Nomination" },
  { value: "attend as speaker", label: "Speaker" },
  { value: "attend as exhibitor", label: "Exhibitor" },
  { value: "attend as sponsor", label: "Sponsor" },
];

const LOCATION_FILTER_OPTIONS = [
  { value: "all", label: "All Event Locations" },
  { value: "New Delhi", label: "New Delhi" },
  { value: "Dubai", label: "Dubai" },
  { value: "London", label: "London" },
  { value: "USA", label: "USA" },
];

/* ------------------ Status Badge ------------------ */
function StatusBadge({ status }) {
  const normalized = status || "nominated";
  const label = STATUS_OPTIONS.find((s) => s.value === normalized)?.label || "Nomination Received";

  const colorClasses = {
    nominated: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    evaluation: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    in_progress: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    selected: "bg-emerald-500 text-white border-emerald-400 shadow-lg shadow-emerald-500/20",
    rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  }[normalized] || "bg-white/5 text-white/40 border-white/10";

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest backdrop-blur-md transition-all ${colorClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${normalized === 'selected' ? 'bg-white' : 'bg-current'} ${normalized !== 'rejected' ? 'animate-pulse' : ''}`} />
      {label}
    </span>
  );
}

function DetailItem({ label, val, isLink, color = "text-white/80" }) {
  if (!val) return null;
  return (
    <div>
      <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">{label}</p>
      {isLink ? (
        <a href={val} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-emerald-400 hover:underline break-all">
          {val}
        </a>
      ) : (
        <p className={`text-sm font-bold leading-relaxed ${color}`}>{val}</p>
      )}
    </div>
  );
}

const PAYMENT_STATUS_OPTIONS = [
  { value: "not_paid", label: "Not Paid" },
  { value: "initial_paid", label: "Initial Payment" },
  { value: "paid", label: "Paid (Completed)" },
  { value: "not_interested", label: "Not Interested" },
];

/* ================== MAIN COMPONENT ================== */
export default function AdminDashboard() {
  const { token } = useAuth();

  const [nominations, setNominations] = useState([]);
  const [filteredNominations, setFilteredNominations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");
  const [participationTypeFilter, setParticipationTypeFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // 'newest' or 'oldest'
  const [updatingId, setUpdatingId] = useState(null);

  const [editingNomination, setEditingNomination] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [viewingNomination, setViewingNomination] = useState(null);

  const [activeTab, setActiveTab] = useState("nominations");

  /* ------------------ Load Data ------------------ */
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchAdminNominations(token);
        setNominations(data);
      } catch (err) {
        setError(err.message || "Failed to load nominations");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  /* ------------------ Filter ------------------ */
  useEffect(() => {
    let filtered = [...nominations];

    if (statusFilter !== "all") {
      filtered = filtered.filter((n) => (n.status || "nominated") === statusFilter);
    }

    if (participationTypeFilter !== "all") {
      filtered = filtered.filter((n) => n.participationType === participationTypeFilter);
    }

    if (locationFilter !== "all") {
      filtered = filtered.filter((n) => n.preferredLocation === locationFilter);
    }

    if (searchTerm.trim()) {
      const s = searchTerm.toLowerCase();
      filtered = filtered.filter((n) => {
        const nameMatch = n.nomineeName?.toLowerCase().includes(s);
        const emailMatch = n.email?.toLowerCase().includes(s);
        const mobileMatch = (n.mobileNumber || n.phone)?.toLowerCase().includes(s);
        const orgMatch = n.organization?.toLowerCase().includes(s);
        return nameMatch || emailMatch || mobileMatch || orgMatch;
      });
    }

    // Sort by date
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredNominations(filtered);
  }, [nominations, statusFilter, participationTypeFilter, locationFilter, searchTerm, sortOrder]);

  const paymentSummary = useMemo(() => {
    const summary = {
      total: nominations.length,
      not_paid: 0,
      initial_paid: 0,
      paid: 0,
      not_interested: 0,
    };
    nominations.forEach((n) => {
      const key = n.paymentStatus || "not_paid";
      if (summary[key] != null) summary[key] += 1;
    });
    return summary;
  }, [nominations]);

  const dailySummary = useMemo(() => {
    const groups = {};
    nominations.forEach((n) => {
      const dateKey = n.createdAt
        ? new Date(n.createdAt).toLocaleDateString("en-GB")
        : "Unknown Date";

      if (!groups[dateKey]) {
        groups[dateKey] = {
          date: dateKey,
          total: 0,
          paid: 0,
          pending: 0,
          initial_paid: 0,
        };
      }
      groups[dateKey].total += 1;
      const status = n.paymentStatus || "not_paid";
      if (status === "paid") groups[dateKey].paid += 1;
      else if (status === "initial_paid") groups[dateKey].initial_paid += 1;
      else groups[dateKey].pending += 1;
    });

    // Sort by date descending
    return Object.values(groups).sort((a, b) => {
      if (a.date === "Unknown Date") return 1;
      if (b.date === "Unknown Date") return -1;
      const dateA = new Date(a.date.split("/").reverse().join("-"));
      const dateB = new Date(b.date.split("/").reverse().join("-"));
      return dateB - dateA;
    });
  }, [nominations]);

  /* ------------------ Status Change ------------------ */
  const handleStatusChange = async (id, status) => {
    try {
      setUpdatingId(id);
      const updated = await updateNominationStatus(id, status, token);
      setNominations((prev) =>
        prev.map((n) => (n._id === id ? { ...n, ...updated } : n))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  /* ------------------ Edit ------------------ */
  const handleEdit = (n) => {
    setEditingNomination(n);
    setEditForm({ ...n });
  };

  const handleSaveEdit = async () => {
    try {
      setUpdatingId(editingNomination._id);
      const updated = await updateNomination(
        editingNomination._id,
        editForm,
        token
      );
      setNominations((prev) =>
        prev.map((n) => (n._id === updated._id ? updated : n))
      );
      setEditingNomination(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  /* ------------------ Delete ------------------ */
  const handleDelete = async () => {
    try {
      setUpdatingId(deleteConfirmId);
      await deleteNomination(deleteConfirmId, token);
      setNominations((prev) =>
        prev.filter((n) => n._id !== deleteConfirmId)
      );
      setDeleteConfirmId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all font-bold";

  /* ================== HELPERS ================== */
  const renderNominationsTable = () => (
    <div className="relative group/table">
      <div className="overflow-x-auto max-h-[75vh] medical-scrollbar rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl shadow-2xl overflow-y-auto">
        <table className="min-w-[1600px] w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="sticky top-0 z-40">
              {[
                { label: "Participation", width: "180px" },
                { label: "Category", width: "250px" },
                { label: "Direct Contact", width: "180px" },
                { label: "Nominee Entity", width: "280px" },
                { label: "Workflow Status", width: "200px" },
                { label: "Revenue Status", width: "180px" },
                { label: "Valuation", width: "120px" },
                { label: "Leadership", width: "220px" },
                { label: "Primary Contact", width: "220px" },
                { label: "Business Node", width: "220px" },
                { label: "Geography", width: "180px" },
                { label: "Public Remarks", width: "200px" },
                { label: "Internal Notes", width: "200px" },
                { label: "Source Identity", width: "220px" },
                { label: "Timestamp", width: "180px" }
              ].map((th, i) => (
                <th key={i} className="px-6 py-5 bg-[#020817]/95 backdrop-blur-xl border-b border-white/5 first:rounded-tl-[2rem]" style={{ width: th.width }}>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{th.label}</span>
                </th>
              ))}
              <th className="px-6 py-5 sticky right-0 z-50 bg-[#020817]/95 backdrop-blur-xl border-b border-white/5 rounded-tr-[2rem] text-right">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Control Node</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredNominations.map((n, idx) => (
              <tr key={n._id} className="group/row hover:bg-white/[0.03] transition-colors duration-300">
                <td className="px-6 py-5">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${n.participationType === "nominated as award" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                    n.participationType === "attend as speaker" ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400" :
                      n.participationType === "attend as exhibitor" ? "bg-purple-500/10 border-purple-500/20 text-purple-400" :
                        "bg-pink-500/10 border-pink-500/20 text-pink-400"
                    }`}>
                    <span className="text-sm">{
                      n.participationType === "nominated as award" ? "🏆" :
                        n.participationType === "attend as speaker" ? "🎤" :
                          n.participationType === "attend as exhibitor" ? "🏢" : "💎"
                    }</span>
                    {n.participationType?.split(' ')[0]}
                  </div>
                </td>
                <td className="px-6 py-5">
                  {n.participationType === "nominated as award" ? (
                    <div className="space-y-1">
                      <div className="text-sm font-black text-white leading-tight uppercase tracking-tight">{n.assignedCategory || n.category}</div>
                      <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{n.subCategory}</div>
                    </div>
                  ) : (
                    <span className="text-[10px] font-black text-white/10 uppercase tracking-widest">General Access</span>
                  )}
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col gap-1.5">
                    {[n.mobile, n.contactMobile, n.orgHeadMobile].filter(Boolean).slice(0, 2).map((phone, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] font-mono font-bold text-cyan-400/80">
                        <div className="w-1 h-1 rounded-full bg-cyan-400/40" />
                        {phone}
                      </div>
                    ))}
                    {![n.mobile, n.contactMobile, n.orgHeadMobile].some(Boolean) && <span className="text-white/10">—</span>}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="space-y-1">
                    <div className="text-sm font-black text-white uppercase tracking-tighter">{n.nomineeName}</div>
                    <div className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest truncate max-w-[240px]">
                      {n.organization}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="space-y-3">
                    <StatusBadge status={n.status} />
                    <select
                      value={n.status || "nominated"}
                      onChange={(e) => handleStatusChange(n._id, e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-[10px] font-black uppercase tracking-widest text-white/60 focus:outline-none focus:border-emerald-500/50 transition-all appearance-none cursor-pointer"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value} className="bg-[#0f172a]">{s.label}</option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="space-y-2">
                    <div className={`text-[10px] font-black uppercase tracking-widest ${n.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-white/30'}`}>
                      {PAYMENT_STATUS_OPTIONS.find(s => s.value === (n.paymentStatus || 'not_paid'))?.label}
                    </div>
                    <select
                      value={n.paymentStatus || "not_paid"}
                      onChange={(e) =>
                        setNominations((prev) =>
                          prev.map((row) =>
                            row._id === n._id ? { ...row, paymentStatus: e.target.value } : row
                          )
                        )
                      }
                      onBlur={() => updateNomination(n._id, { paymentStatus: n.paymentStatus }, token)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-[10px] font-black uppercase tracking-widest text-white/40 focus:outline-none focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
                    >
                      {PAYMENT_STATUS_OPTIONS.map((s) => (
                        <option key={s.value} value={s.value} className="bg-[#0f172a]">{s.label}</option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-sm font-black text-white/80">{n.amount || "—"}</div>
                </td>
                <td className="px-6 py-5">
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-white/80">{n.orgHeadName || "—"}</div>
                    <div className="text-[10px] text-white/20 truncate">{n.orgHeadEmail}</div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-white/80">{n.contactName || "—"}</div>
                    <div className="text-[10px] text-white/20 truncate">{n.contactEmail}</div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-white/60 truncate max-w-[200px]">{n.website || "No Website"}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-400/40">TO: {n.turnover || "—"}</div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-[11px] font-bold text-white/60">{n.city}, {n.state}</div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-[10px] text-white/40 line-clamp-2 max-w-[200px] leading-relaxed">{n.remarks || "—"}</div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-[10px] text-cyan-400/60 font-medium line-clamp-2 max-w-[200px] leading-relaxed italic">
                    {n.adminRemark || "No Internal Notes"}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-[11px] font-bold text-emerald-400/80">{n.user?.email}</div>
                </td>
                <td className="px-6 py-5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/20">
                    {new Date(n.createdAt).toLocaleDateString()}
                    <br />
                    {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </td>
                <td className="px-6 py-5 sticky right-0 z-30 bg-[#020817]/95 backdrop-blur-xl border-l border-white/5 rounded-br-[2rem] text-right">
                  <div className="flex items-center justify-end gap-2">
                    {n.pdfUrl && (
                      <a
                        href={n.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all shadow-lg shadow-emerald-500/10"
                        title="Dossier PDF"
                      >
                        <FileText size={14} />
                      </a>
                    )}
                    <button
                      onClick={() => setViewingNomination(n)}
                      className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all shadow-lg shadow-cyan-500/10"
                      title="Insight View"
                    >
                      <Eye size={14} />
                    </button>
                    <button
                      onClick={() => handleEdit(n)}
                      className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all"
                      title="Modify"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(n._id)}
                      className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
                      title="Purge"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="absolute top-0 right-[110px] bottom-0 w-12 bg-gradient-to-l from-[#020817] to-transparent pointer-events-none z-20" />
    </div>
  );

  const renderStatusTab = () => (
    <div className="overflow-x-auto max-h-[75vh] medical-scrollbar rounded-[2rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl shadow-2xl overflow-y-auto">
      <table className="min-w-[1100px] w-full text-left border-separate border-spacing-0">
        <thead>
          <tr className="sticky top-0 z-40">
            {[
              { label: "Nominee Entity", width: "300px" },
              { label: "Communication", width: "200px" },
              { label: "Digital Endpoint", width: "250px" },
              { label: "Workflow Logic", width: "250px" },
              { label: "Revenue Node", width: "200px" },
              { label: "Valuation", width: "150px" },
              { label: "Internal Notes", width: "250px" }
            ].map((th, i) => (
              <th key={i} className="px-8 py-6 bg-[#020817]/95 backdrop-blur-xl border-b border-white/5 first:rounded-tl-[2rem] last:rounded-tr-[2rem]" style={{ width: th.width }}>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{th.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {nominations.map((n, idx) => {
            const userLabel = n.status === "in_progress" ? "Shortlisted" : STATUS_OPTIONS.find((s) => s.value === n.status)?.label || "Nomination Received";
            return (
              <tr key={n._id} className="group hover:bg-white/[0.03] transition-colors duration-300">
                <td className="px-8 py-6">
                  <div className="text-sm font-black text-white uppercase tracking-tighter">{n.nomineeName}</div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-[11px] font-mono font-bold text-cyan-400/80 italic">{n.contactMobile || n.orgHeadMobile || "—"}</div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-[11px] font-bold text-white/40 lowercase truncate">{n.user?.email || n.contactEmail || "—"}</div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{userLabel}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className={`text-[10px] font-black uppercase tracking-widest ${n.paymentStatus === 'paid' ? 'text-emerald-400' : 'text-white/20'}`}>
                    {PAYMENT_STATUS_OPTIONS.find((s) => s.value === (n.paymentStatus || "not_paid"))?.label || "Not Paid"}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-sm font-black text-white/80">{n.amount || "—"}</div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-[11px] text-white/30 italic max-w-[200px] line-clamp-1">{n.adminRemark || "—"}</div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const renderUsersTab = () => {
    const byUser = new Map();
    nominations.forEach((n) => {
      if (!n.user?.email) return;
      const key = n.user.email;
      const existing = byUser.get(key) || {
        email: n.user.email,
        count: 0,
        latestStatus: n.status,
        latestAt: n.createdAt,
      };
      existing.count += 1;
      if (!existing.latestAt || new Date(n.createdAt) > new Date(existing.latestAt)) {
        existing.latestAt = n.createdAt;
        existing.latestStatus = n.status;
      }
      byUser.set(key, existing);
    });
    const rows = Array.from(byUser.values());

    return (
      <div className="overflow-x-auto max-h-[75vh] medical-scrollbar rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-3xl shadow-2xl overflow-y-auto">
        <table className="min-w-[800px] w-full text-left border-separate border-spacing-0">
          <thead>
            <tr className="sticky top-0 z-40">
              {[
                { label: "User Identification", width: "40%" },
                { label: "Nomination Depth", width: "20%" },
                { label: "Operational Status", width: "20%" },
                { label: "Last Sync", width: "20%" }
              ].map((th, i) => (
                <th key={i} className="px-10 py-6 bg-[#020817] backdrop-blur-xl border-b border-white/10 first:rounded-tl-[2rem] last:rounded-tr-[2rem]">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">{th.label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row, idx) => (
              <tr key={row.email} className="group hover:bg-white/[0.05] transition-colors duration-300">
                <td className="px-10 py-6">
                  <div className="text-sm font-black text-white uppercase tracking-widest">{row.email}</div>
                </td>
                <td className="px-10 py-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black">
                    {row.count} Records
                  </div>
                </td>
                <td className="px-10 py-6">
                  <StatusBadge status={row.latestStatus} />
                </td>
                <td className="px-10 py-6">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                    {row.latestAt ? new Date(row.latestAt).toLocaleString() : "—"}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderAdminsTab = () => (
    <div className="border border-emerald-500/20 rounded-[3rem] bg-white/[0.03] p-12 text-md text-white/80 shadow-2xl backdrop-blur-3xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-12 opacity-5">🛡️</div>
      <h2 className="text-3xl font-black mb-6 text-white uppercase tracking-tighter flex items-center gap-3">
        <ShieldCheck className="text-emerald-400" size={32} /> System <span className="text-gradient-emerald">Configuration</span>
      </h2>
      <p className="mb-8 text-white/40 font-bold uppercase tracking-widest text-[10px]">
        Access restricted to administrative entities only.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
          <p className="font-black text-emerald-400 text-[10px] uppercase tracking-[0.2em] mb-2">Access Control</p>
          <p className="text-sm text-white/60">Manage administrative privileges and authentication nodes.</p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
          <p className="font-black text-cyan-400 text-[10px] uppercase tracking-[0.2em] mb-2">Protocol Logs</p>
          <p className="text-sm text-white/60">View real-time system audit logs and registration events.</p>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Pipelines", val: paymentSummary.total, color: "emerald", icon: "💎" },
          { label: "Secured Revenue", val: paymentSummary.paid, color: "cyan", icon: "📈" },
          { label: "Partial Deposits", val: paymentSummary.initial_paid, color: "purple", icon: "⏳" },
          { label: "Pending Liquidity", val: paymentSummary.not_paid, color: "pink", icon: "⚠️" }
        ].map((stat, i) => (
          <div key={i} className="group relative">
            <div className={`absolute inset-0 bg-${stat.color}-500/10 blur-[80px] rounded-[2.5rem] transition-all group-hover:bg-${stat.color}-500/20`} />
            <div className="relative bg-white/[0.04] border border-white/10 rounded-[2.5rem] p-10 flex flex-col items-center text-center transition-all group-hover:-translate-y-2 group-hover:border-white/20 shadow-2xl backdrop-blur-xl">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{stat.icon}</div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">{stat.label}</div>
              <div className={`text-5xl font-black text-${stat.color}-400 tabular-nums tracking-tighter`}>{stat.val}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="absolute -inset-4 bg-emerald-500/5 blur-[100px] rounded-full opacity-50" />
        <div className="relative overflow-x-auto border border-white/5 rounded-[3rem] bg-white/[0.01] backdrop-blur-3xl shadow-2xl">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr>
                {["Registration Node", "Daily Throughput", "Completed", "Partial", "Pending"].map((th, i) => (
                  <th key={i} className="px-10 py-8 bg-[#020817]/40 border-b border-white/5">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{th}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {dailySummary.map((row, idx) => (
                <tr key={row.date} className="group hover:bg-white/[0.03] transition-colors duration-300">
                  <td className="px-10 py-6">
                    <div className="text-sm font-black text-emerald-400 uppercase tracking-widest">{row.date}</div>
                  </td>
                  <td className="px-10 py-6 font-black text-xl text-white/80">{row.total}</td>
                  <td className="px-10 py-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                      {row.paid} Secured
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
                      {row.initial_paid} Partial
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest">
                      {row.pending} Pending
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  /* ================== UI ================== */
  return (

    <>
      <PageHero>
        <section className="min-h-screen text-white flex flex-col">
          {/* Fixed Header Wrapper */}
          <div className="fixed top-8 left-0 right-0 z-[100] bg-[#020817]/80 backdrop-blur-3xl border-b border-white/5">
            {/* Top Emerald Accent Bar */}
            <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-cyan-400 to-emerald-500" />

            {/* Modern Top Navigation for Admin */}
            <div className="py-5">
              <div className="max-w-[1700px] mx-auto px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-[1.5rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-2xl shadow-emerald-500/10 group">
                    <ShieldCheck size={32} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-black uppercase tracking-widest text-white leading-none mb-1">Command <span className="text-gradient-emerald">Center</span></h1>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">Operational Readiness: Optimal</p>
                    </div>
                  </div>
                </div>

                <nav className="flex items-center bg-white/[0.06] p-2 rounded-[2rem] border border-white/10 overflow-x-auto no-scrollbar backdrop-blur-xl max-w-full">
                  {[
                    { id: "nominations", label: "Nominations", icon: "🏆" },
                    { id: "status", label: "Payment", icon: "💸" },
                    { id: "analytics", label: "Analytics", icon: "📊" },
                    { id: "users", label: "Users", icon: "👤" },
                    { id: "previous-editions", label: "Editions", icon: "🕰️" },
                    { id: "admins", label: "Settings", icon: "🛡️" },
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap group
                    ${activeTab === item.id
                          ? "bg-emerald-500 text-[#020817] shadow-[0_0_40px_rgba(16,185,129,0.3)] translate-y-[-2px]"
                          : "text-white/40 hover:text-white hover:bg-white/5"
                        }
                  `}
                    >
                      <span className="text-sm group-hover:scale-125 transition-transform">{item.icon}</span>
                      <span className="hidden md:inline">{item.label}</span>
                    </button>
                  ))}
                </nav>

                <div className="hidden xl:flex items-center gap-6 px-10 py-4 rounded-[2rem] bg-white/[0.06] border border-white/10 backdrop-blur-md">
                  <div className="text-right">
                    <p className="text-[9px] text-white/40 uppercase font-black tracking-widest mb-0.5">Total Database</p>
                    <p className="text-lg font-black text-emerald-400 tabular-nums tracking-tighter">{paymentSummary.total} Entries</p>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="text-right">
                    <p className="text-[9px] text-white/40 uppercase font-black tracking-widest mb-0.5">Paid Database</p>
                    <p className="text-lg font-black text-cyan-400 tabular-nums tracking-tighter">{paymentSummary.paid} Verified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Dashboard Content */}
          <div className="flex-1 max-w-[1700px] mx-auto w-full p-2 lg:p-8 pt-[150px] lg:pt-[120px]">
            <header className="mb-8 relative flex flex-col items-center text-center">
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-400">Command Center</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-emerald-500" />
              </div>
              <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mt-0">
                Admin <span className="text-gradient-emerald">Dashboard</span>
              </h2>
              <p className="text-emerald-100/40 text-[11px] font-black uppercase tracking-[0.6em] max-w-3xl leading-none mt-1">
                Manage nominations and user pipeline
              </p>
            </header>

            {activeTab !== "analytics" && activeTab !== "admins" && activeTab !== "previous-editions" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-14 bg-white/[0.04] p-10 rounded-[3.5rem] border border-white/10 backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] text-emerald-400 font-black uppercase tracking-widest ml-1">Filter Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full bg-[#020817] border border-white/10 rounded-[1.5rem] px-6 py-5 text-[11px] font-black uppercase tracking-widest text-white/80 focus:outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer"
                  >
                    {STATUS_FILTER_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value} className="bg-[#0f172a]">{s.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] text-emerald-400 font-black uppercase tracking-widest ml-1">Participation Type</label>
                  <select
                    value={participationTypeFilter}
                    onChange={(e) => setParticipationTypeFilter(e.target.value)}
                    className="w-full bg-[#020817] border border-white/10 rounded-[1.5rem] px-6 py-5 text-[11px] font-black uppercase tracking-widest text-white/80 focus:outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer"
                  >
                    {PARTICIPATION_TYPE_FILTER_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value} className="bg-[#0f172a]">{s.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] text-emerald-400 font-black uppercase tracking-widest ml-1">Location</label>
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full bg-[#020817] border border-white/10 rounded-[1.5rem] px-6 py-5 text-[11px] font-black uppercase tracking-widest text-white/80 focus:outline-none focus:border-emerald-500 transition-all appearance-none cursor-pointer"
                  >
                    {LOCATION_FILTER_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value} className="bg-[#0f172a]">{s.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-3 lg:col-span-2">
                  <label className="text-[10px] text-cyan-400 font-black uppercase tracking-widest ml-1">Search Database</label>
                  <div className="relative">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-emerald-500/50" size={20} />
                    <input
                      type="text"
                      placeholder="Search entities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#020817] border border-white/10 rounded-[1.5rem] pl-20 pr-8 py-5 text-[11px] font-black uppercase tracking-widest text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
                    />
                  </div>
                </div>

                <div className="lg:col-span-5 flex items-center justify-between pt-8 border-t border-white/10">
                  <div className="flex items-center gap-6">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-10 h-10 rounded-full border-2 border-[#020817] bg-white/10" />
                      ))}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/60 italic">
                      <span className="text-emerald-400">{filteredNominations.length}</span> Active Record Nodes Detected
                    </p>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] text-white/20 font-black uppercase tracking-widest">Sort Protocol:</span>
                      <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="bg-transparent text-[10px] font-black uppercase tracking-widest text-white/60 focus:outline-none cursor-pointer hover:text-white transition-colors"
                      >
                        <option value="newest" className="bg-[#0f172a]">Newest First</option>
                        <option value="oldest" className="bg-[#0f172a]">Oldest First</option>
                      </select>
                    </div>
                    <button
                      onClick={() => {
                        setStatusFilter("all");
                        setParticipationTypeFilter("all");
                        setLocationFilter("all");
                        setSearchTerm("");
                      }}
                      className="text-[10px] font-black uppercase tracking-widest text-red-400/60 hover:text-red-400 transition-colors flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/5 border border-red-500/10"
                    >
                      Reset Matrix
                    </button>
                  </div>
                </div>
              </div>
            )}


            <div className="w-full">
              {activeTab === "nominations" && renderNominationsTable()}
              {activeTab === "status" && renderStatusTab()}
              {activeTab === "analytics" && renderAnalyticsTab()}
              {activeTab === "users" && renderUsersTab()}
              {activeTab === "previous-editions" && <AdminPreviousEditions />}
              {activeTab === "admins" && renderAdminsTab()}
            </div>

            {/* ================== EDIT MODAL ================== */}
            {editingNomination && (
              <div className="fixed inset-0 bg-[#020817]/80 backdrop-blur-xl flex items-center justify-center z-[9999] p-4">
                <div className="bg-[#020817] border border-white/10 shadow-[0_0_100px_rgba(16,185,129,0.1)] p-10 rounded-[3rem] max-w-5xl w-full max-h-[90vh] overflow-y-auto medical-scrollbar relative">
                  <div className="absolute top-0 right-0 p-8">
                    <button onClick={() => setEditingNomination(null)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-red-500 hover:text-white transition-all">✕</button>
                  </div>

                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-1 w-12 bg-emerald-500 rounded-full" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Admin Action</span>
                    </div>
                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Edit <span className="text-gradient-emerald">Nomination</span></h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Participation & Category */}
                    <div className="space-y-6 bg-white/[0.02] p-8 rounded-3xl border border-white/5">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Categorization</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400/40 ml-1 mb-2 block">Participation Type</label>
                          <input className={inputClass} value={editForm.participationType || ""} onChange={(e) => setEditForm({ ...editForm, participationType: e.target.value })} />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400/40 ml-1 mb-2 block">Category (User)</label>
                          <input className={inputClass} value={editForm.category || ""} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400/40 ml-1 mb-2 block">Sub Category</label>
                            <input className={inputClass} value={editForm.subCategory || ""} onChange={(e) => setEditForm({ ...editForm, subCategory: e.target.value })} />
                          </div>
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400/40 ml-1 mb-2 block">Other Sub</label>
                            <input className={inputClass} value={editForm.otherSubCategory || ""} onChange={(e) => setEditForm({ ...editForm, otherSubCategory: e.target.value })} />
                          </div>
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-cyan-400/60 ml-1 mb-2 block">Assigned Category (Admin)</label>
                          <input className={inputClass} value={editForm.assignedCategory || ""} onChange={(e) => setEditForm({ ...editForm, assignedCategory: e.target.value })} placeholder="Final Category Name" />
                        </div>
                      </div>
                    </div>

                    {/* Identity */}
                    <div className="space-y-6 bg-white/[0.02] p-8 rounded-3xl border border-white/5">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Core Identity</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400/40 ml-1 mb-2 block">Nominee Name</label>
                          <input className={inputClass} value={editForm.nomineeName || ""} onChange={(e) => setEditForm({ ...editForm, nomineeName: e.target.value })} />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400/40 ml-1 mb-2 block">Organization</label>
                          <input className={inputClass} value={editForm.organization || ""} onChange={(e) => setEditForm({ ...editForm, organization: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400/40 ml-1 mb-2 block">Designation</label>
                            <input className={inputClass} value={editForm.designation || ""} onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })} />
                          </div>
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400/40 ml-1 mb-2 block">Turnover</label>
                            <input className={inputClass} value={editForm.turnover || ""} onChange={(e) => setEditForm({ ...editForm, turnover: e.target.value })} />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400/40 ml-1 mb-2 block">Direct Mobile</label>
                            <input className={inputClass} value={editForm.mobile || ""} onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })} />
                          </div>
                          <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400/40 ml-1 mb-2 block">Direct Email</label>
                            <input className={inputClass} value={editForm.email || ""} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Leadership & Contact */}
                    <div className="md:col-span-2 grid md:grid-cols-2 gap-8">
                      <div className="space-y-6 bg-white/[0.01] p-8 rounded-3xl border border-white/5">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Leadership (Org Head)</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <input className={inputClass} value={editForm.orgHeadName || ""} onChange={(e) => setEditForm({ ...editForm, orgHeadName: e.target.value })} placeholder="Name" />
                          <input className={inputClass} value={editForm.orgHeadDesignation || ""} onChange={(e) => setEditForm({ ...editForm, orgHeadDesignation: e.target.value })} placeholder="Designation" />
                          <input className={inputClass} value={editForm.orgHeadMobile || ""} onChange={(e) => setEditForm({ ...editForm, orgHeadMobile: e.target.value })} placeholder="Mobile" />
                          <input className={inputClass} value={editForm.orgHeadEmail || ""} onChange={(e) => setEditForm({ ...editForm, orgHeadEmail: e.target.value })} placeholder="Email" />
                        </div>
                      </div>
                      <div className="space-y-6 bg-white/[0.01] p-8 rounded-3xl border border-white/5">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Operational Point (Contact)</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <input className={inputClass} value={editForm.contactName || ""} onChange={(e) => setEditForm({ ...editForm, contactName: e.target.value })} placeholder="Name" />
                          <input className={inputClass} value={editForm.contactDesignation || ""} onChange={(e) => setEditForm({ ...editForm, contactDesignation: e.target.value })} placeholder="Designation" />
                          <input className={inputClass} value={editForm.contactMobile || ""} onChange={(e) => setEditForm({ ...editForm, contactMobile: e.target.value })} placeholder="Mobile" />
                          <input className={inputClass} value={editForm.contactEmail || ""} onChange={(e) => setEditForm({ ...editForm, contactEmail: e.target.value })} placeholder="Email" />
                        </div>
                      </div>
                    </div>

                    {/* Logistics & Remarks */}
                    <div className="md:col-span-2 space-y-6 bg-white/[0.02] p-8 rounded-3xl border border-white/5">
                      <h3 className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-4">Logistics & Assessment</h3>
                      <div className="grid md:grid-cols-4 gap-4">
                        <input className={inputClass} value={editForm.city || ""} onChange={(e) => setEditForm({ ...editForm, city: e.target.value })} placeholder="City" />
                        <input className={inputClass} value={editForm.state || ""} onChange={(e) => setEditForm({ ...editForm, state: e.target.value })} placeholder="State" />
                        <input className={inputClass} value={editForm.zip || ""} onChange={(e) => setEditForm({ ...editForm, zip: e.target.value })} placeholder="ZIP" />
                        <input className={inputClass} value={editForm.amount || ""} onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })} placeholder="Fee / Amount" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-6 mt-6">
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-emerald-400/40 ml-1 mb-2 block">Public Remarks</label>
                          <textarea className={`${inputClass} min-h-[100px] resize-none`} value={editForm.remarks || ""} onChange={(e) => setEditForm({ ...editForm, remarks: e.target.value })} />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-cyan-400/60 ml-1 mb-2 block">Internal Admin Remarks</label>
                          <textarea className={`${inputClass} min-h-[100px] resize-none border-cyan-500/20`} value={editForm.adminRemark || ""} onChange={(e) => setEditForm({ ...editForm, adminRemark: e.target.value })} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-12 pt-10 border-t border-white/5">
                    <button onClick={() => setEditingNomination(null)} className="px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all">Discard Changes</button>
                    <button onClick={handleSaveEdit} className="btn-primary px-10 py-4 text-[10px] shadow-emerald-500/20">Commit Security Update</button>
                  </div>
                </div>
              </div>
            )}

            {/* ================== DELETE MODAL ================== */}
            {deleteConfirmId && (
              <div className="fixed inset-0 bg-[#020817]/90 backdrop-blur-xl flex items-center justify-center z-[9999] p-4">
                <div className="bg-[#020817] border border-red-500/20 shadow-[0_0_100px_rgba(239,68,68,0.1)] p-12 rounded-[3rem] max-w-md w-full text-center relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-red-500" />
                  <div className="w-24 h-24 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-8 border border-red-500/20 group hover:scale-110 transition-transform">
                    <Trash2 size={40} />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase">Confirm <span className="text-red-500">Delete</span></h2>
                  <p className="text-white/40 mb-10 font-medium leading-relaxed italic">"Warning: This record will be permanently wiped from the active database. This protocol is irreversible."</p>
                  <div className="flex flex-col gap-3">
                    <button onClick={handleDelete} className="w-full bg-red-500 hover:bg-red-600 text-white font-black uppercase tracking-widest text-[10px] py-5 rounded-2xl shadow-xl shadow-red-500/20 transition-all active:scale-95">Delete Record</button>
                    <button onClick={() => setDeleteConfirmId(null)} className="w-full bg-white/5 hover:bg-white/10 text-white/40 font-black uppercase tracking-widest text-[10px] py-5 rounded-2xl transition-all">Cancel Request</button>
                  </div>
                </div>
              </div>
            )}

            {/* ================== VIEW MODAL ================== */}
            {viewingNomination && (
              <div className="fixed inset-0 bg-[#020817]/90 backdrop-blur-2xl flex items-center justify-center z-[9999] p-4">
                <div className="bg-[#020817] border border-white/10 shadow-2xl p-10 rounded-[3rem] max-w-6xl w-full max-h-[90vh] overflow-y-auto medical-scrollbar relative">
                  <div className="absolute top-0 right-0 p-8">
                    <button onClick={() => setViewingNomination(null)} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all">✕</button>
                  </div>

                  <div className="mb-12">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-1 w-12 bg-emerald-500 rounded-full" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Nomination Details</span>
                    </div>
                    <h2 className="text-5xl font-black text-white tracking-tighter uppercase leading-tight">{viewingNomination.nomineeName}</h2>
                    <p className="text-xl font-bold text-white/30 uppercase tracking-widest mt-2">{viewingNomination.organization}</p>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-10">
                      {/* Metadata Header */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { label: "Status", val: viewingNomination.status || 'nominated', color: "emerald" },
                          { label: "Participation", val: viewingNomination.participationType, color: "cyan" },
                          { label: "Fee Status", val: viewingNomination.paymentStatus || 'not_paid', color: "purple" },
                          { label: "Valuation", val: viewingNomination.amount || '—', color: "pink" }
                        ].map((item, i) => (
                          <div key={i} className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl">
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">{item.label}</p>
                            <p className={`text-[10px] font-black uppercase tracking-widest text-${item.color}-400`}>{item.val}</p>
                          </div>
                        ))}
                      </div>

                      {/* Timeline */}
                      <div className="bg-white/[0.01] border border-white/5 p-8 rounded-[2rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">📅</div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-6">Timeline</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-2">Submitted At</p>
                            <p className="text-sm font-mono text-white/80">{new Date(viewingNomination.createdAt).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-2">Updated At</p>
                            <p className="text-sm font-mono text-white/80">{new Date(viewingNomination.updatedAt).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      {/* Identity Details */}
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Classification</h3>
                          <div className="space-y-4">
                            <DetailItem label="Category" val={viewingNomination.category} />
                            <DetailItem label="Sub Category" val={viewingNomination.subCategory} />
                            {viewingNomination.otherSubCategory && <DetailItem label="Custom Category" val={viewingNomination.otherSubCategory} />}
                            <DetailItem label="Admin Classification" val={viewingNomination.assignedCategory} color="text-cyan-400" />
                          </div>
                        </div>
                        <div className="space-y-6">
                          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">Communication</h3>
                          <div className="space-y-4">
                            <DetailItem label="Direct Mobile" val={viewingNomination.mobile} />
                            <DetailItem label="Direct Email" val={viewingNomination.email} />
                            <DetailItem label="Designation" val={viewingNomination.designation} />
                            <DetailItem label="Turnover" val={viewingNomination.turnover} />
                          </div>
                        </div>
                      </div>

                      {/* Leadership & Operations */}
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white/[0.01] border border-white/5 p-8 rounded-[2rem]">
                          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 mb-6">Leadership (Org Head)</h3>
                          <div className="space-y-4">
                            <DetailItem label="Head Name" val={viewingNomination.orgHeadName} />
                            <DetailItem label="Designation" val={viewingNomination.orgHeadDesignation} />
                            <DetailItem label="Mobile" val={viewingNomination.orgHeadMobile} />
                            <DetailItem label="Official Email" val={viewingNomination.orgHeadEmail} />
                          </div>
                        </div>
                        <div className="bg-white/[0.01] border border-white/5 p-8 rounded-[2rem]">
                          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-400 mb-6">Operations (Contact)</h3>
                          <div className="space-y-4">
                            <DetailItem label="Contact Person" val={viewingNomination.contactName} />
                            <DetailItem label="Designation" val={viewingNomination.contactDesignation} />
                            <DetailItem label="Mobile" val={viewingNomination.contactMobile} />
                            <DetailItem label="Email Endpoint" val={viewingNomination.contactEmail} />
                          </div>
                        </div>
                      </div>

                      {/* Geography & Presence */}
                      <div className="bg-white/[0.01] border border-white/5 p-8 rounded-[2rem]">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-6">Geographic Presence</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                          <DetailItem label="Physical Address" val={viewingNomination.street} />
                          <DetailItem label="City / State" val={`${viewingNomination.city}, ${viewingNomination.state} ${viewingNomination.zip}`} />
                          <DetailItem label="Event Preference" val={Array.isArray(viewingNomination.preferredLocation) ? viewingNomination.preferredLocation.join(', ') : viewingNomination.preferredLocation} />
                          <DetailItem label="Digital Hub" val={viewingNomination.website} isLink />
                        </div>
                      </div>
                    </div>

                    {/* Sidebar - Dossier Extras */}
                    <div className="space-y-8">
                      {/* Security Info */}
                      <div className="bg-emerald-500/5 border border-emerald-500/20 p-8 rounded-[2rem]">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">🛡️</div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Security Access</span>
                        </div>
                        <DetailItem label="Source Email" val={viewingNomination.user?.email} />
                        <div className="mt-6 pt-6 border-t border-emerald-500/10">
                          <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest mb-2">
                            <span className="text-white/20">Validation Level</span>
                            <span className="text-emerald-400">100%</span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-full" />
                          </div>
                        </div>
                      </div>

                      {/* PDF Dossier */}
                      {viewingNomination.pdfUrl && (
                        <a href={viewingNomination.pdfUrl} target="_blank" rel="noopener noreferrer" className="block group">
                          <div className="bg-[#020817] border border-white/5 p-8 rounded-[2rem] hover:bg-emerald-500 transition-all duration-500">
                            <div className="flex flex-col items-center text-center gap-4">
                              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-emerald-400 group-hover:bg-black/20 group-hover:text-white transition-all">
                                <FileText size={32} />
                              </div>
                              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white/60">Supporting Document</div>
                              <div className="text-lg font-black text-white group-hover:scale-105 transition-transform">Download Profile PDF</div>
                            </div>
                          </div>
                        </a>
                      )}

                      {/* Remarks Area */}
                      <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] space-y-8">
                        <div>
                          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-4">Public Remarks</h3>
                          <p className="text-sm italic text-white/60 leading-relaxed">"{viewingNomination.remarks || 'No public remarks provided.'}"</p>
                        </div>
                        <div className="pt-8 border-t border-white/5">
                          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400/40 mb-4">Internal Admin Remarks</h3>
                          <div className="bg-red-500/5 border border-red-500/10 p-5 rounded-2xl">
                            <p className="text-sm font-bold text-red-400/60 leading-relaxed italic">{viewingNomination.adminRemark || 'System: No internal logs for this entity.'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </PageHero>
    </>
  );
}
