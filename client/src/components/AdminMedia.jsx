import { useState, useEffect } from "react";
import { fetchAdminMedia, createMedia, deleteMedia, updateBulkMedia } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { Trash2, Plus, Image as ImageIcon, Video, Youtube, Link as LinkIcon, RefreshCw, Play } from "lucide-react";

// Helper function to extract YouTube video ID
const getYouTubeVideoId = (url) => {
  let videoId = "";
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2] && match[2].length === 11) {
    videoId = match[2];
  }
  return videoId;
};

const inputClass =
  "w-full bg-[#0f111a] border border-white/10 rounded-xl px-4 py-3 text-base text-white placeholder:text-white/40 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all";

export default function AdminMedia({ customToken }) {
  const authContext = useAuth();
  const token = customToken || authContext.token;
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeTab, setActiveTab] = useState("photo"); // photo, reel, video

  // Form State
  const [urlInput, setUrlInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [fileInputs, setFileInputs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadMedia();
  }, [token]);

  const loadMedia = async () => {
    try {
      setLoading(true);
      const res = await fetchAdminMedia(token);
      setMediaList(res.media || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "reel" || activeTab === "video") {
      const urls = mediaList
        .filter((m) => m.type === activeTab)
        .map((m) => m.url)
        .join("\n");
      setUrlInput(urls);
    } else {
      setUrlInput("");
    }
  }, [activeTab, mediaList]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFileInputs(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === "photo" && fileInputs.length === 0) {
      alert("Please select at least one file to upload.");
      return;
    }
    if ((activeTab === "reel" || activeTab === "video") && !urlInput.trim()) {
      alert("Please enter valid YouTube URL(s).");
      return;
    }

    try {
      setIsSubmitting(true);
      if (activeTab === "photo") {
        const payload = new FormData();
        payload.append("type", activeTab);
        payload.append("title", titleInput.trim());
        fileInputs.forEach(file => payload.append("files", file));
        await createMedia(payload, token);
      } else {
        // Bulk update for reels/videos
        const payload = {
          type: activeTab,
          urls: urlInput.trim()
        };
        await updateBulkMedia(payload, token);
      }
      
      await loadMedia();
      
      // Reset form
      if (activeTab === "photo") {
        setUrlInput("");
        setTitleInput("");
        setFileInputs([]);
        if (document.getElementById("file-upload")) {
          document.getElementById("file-upload").value = "";
        }
      }
    } catch (err) {
      alert(err.message || "Failed to add media");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this media item?")) return;
    try {
      setDeletingId(id);
      await deleteMedia(id, token);
      await loadMedia();
    } catch (err) {
      alert(err.message || "Failed to delete media");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredMedia = mediaList.filter((m) => m.type === activeTab);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Media Gallery</h2>
          <p className="text-gray-400">Manage photos, reels, and videos for the gallery page.</p>
        </div>
      </div>

      <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 p-6 mb-8">
        <div className="flex gap-4 mb-6 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("photo")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === "photo" ? "bg-emerald-500/20 text-emerald-400" : "text-gray-400 hover:text-white"
            }`}
          >
            <ImageIcon className="w-4 h-4" /> Photos
          </button>
          <button
            onClick={() => setActiveTab("reel")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === "reel" ? "bg-pink-500/20 text-pink-400" : "text-gray-400 hover:text-white"
            }`}
          >
            <Youtube className="w-4 h-4" /> YouTube Reels
          </button>
          <button
            onClick={() => setActiveTab("video")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === "video" ? "bg-blue-500/20 text-blue-400" : "text-gray-400 hover:text-white"
            }`}
          >
            <Video className="w-4 h-4" /> YouTube Videos
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-end bg-[#13151f] p-5 rounded-2xl border border-white/5">
          <div className="flex-1 w-full space-y-3">
            <label className="text-base font-semibold text-white flex items-center gap-2">
              {activeTab === "photo" ? "Upload Photo(s)" : "YouTube URLs (comma or enter separated)"}
            </label>
            {activeTab === "photo" ? (
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className={inputClass}
              />
            ) : (
              <textarea
                placeholder="https://youtu.be/1&#10;https://youtu.be/2"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className={`${inputClass} min-h-[100px] resize-y`}
              />
            )}
          </div>
          
          {activeTab === "photo" && (
            <div className="w-full space-y-2">
              <label className="text-sm font-medium text-gray-300">Optional Title</label>
              <input
                type="text"
                placeholder="Give these photos a title..."
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                className={inputClass}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-emerald-400 hover:text-white transition-all flex items-center justify-center gap-2 h-[50px] disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-black" />
            ) : activeTab === "photo" ? (
              <>
                <Plus className="w-5 h-5" /> Add Photo(s)
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5" /> Update {activeTab === "reel" ? "Reels" : "Videos"}
              </>
            )}
          </button>
        </form>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
          {error}
        </div>
      ) : filteredMedia.length === 0 ? (
        <div className="text-center py-16 bg-[#0a0a0a] rounded-2xl border border-white/5">
          <p className="text-gray-400">No {activeTab}s added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedia.map((media) => (
            <div key={media._id} className="bg-[#0a0a0a] rounded-xl border border-white/5 overflow-hidden group">
              <div className={`relative ${activeTab === 'reel' ? 'aspect-[9/16]' : 'aspect-video'} bg-gray-900`}>
                {activeTab === "photo" ? (
                  <img src={media.url} alt={media.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full relative bg-black group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src={`https://img.youtube.com/vi/${getYouTubeVideoId(media.url)}/hqdefault.jpg`} 
                      alt="YouTube Thumbnail" 
                      className="w-full h-full object-cover opacity-80"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4" style={{ display: 'none' }}>
                      <Youtube className="w-10 h-10 text-red-500 mb-3 opacity-80" />
                      <p className="text-xs text-white/70 text-center font-medium line-clamp-2 break-all bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                        {media.url}
                      </p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm shadow-xl">
                        <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => handleDelete(media._id)}
                    disabled={deletingId === media._id}
                    className="p-4 bg-red-500/90 hover:bg-red-500 text-white hover:scale-110 rounded-full transition-all shadow-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {media.title && (
                <div className="p-3 border-t border-white/5">
                  <p className="text-sm text-gray-300 truncate">{media.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
