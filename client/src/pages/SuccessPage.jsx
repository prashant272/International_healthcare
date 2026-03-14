import { FiCheckCircle, FiPhoneCall, FiMail } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

export default function SuccessPage() {
    const location = useLocation();
    const autoCreated = location.state?.autoCreated;
    const email = location.state?.email;

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 pt-24 sm:pt-32 overflow-hidden relative selection:bg-blue-500/30">
            {/* Background Orbs */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-blue-600 opacity-[0.1] rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[20%] left-[10%] w-[300px] h-[300px] bg-emerald-500 opacity-[0.05] rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-xl w-full border border-blue-400/30 rounded-2xl sm:rounded-3xl p-6 md:p-12 text-center shadow-[0_20px_50px_rgba(37,99,235,0.15)] backdrop-blur-md relative z-10 transition-all hover:border-blue-400/50"
                style={{ background: "rgba(15, 23, 42, 0.15)" }}>
                <div className="flex justify-center mb-6">
                    <FiCheckCircle className="text-blue-400 w-20 h-20 animate-pulse" />
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-300 mb-4 drop-shadow-lg">
                    Submission Successful!
                </h1>

                <p className="text-gray-200 text-lg mb-8 leading-relaxed">
                    Your nomination has been successfully received. Our team will connect with you
                    after reviewing the profile.
                </p>

                {autoCreated && (
                    <div className="bg-blue-500/5 rounded-xl p-5 mb-8 border border-blue-400/20 text-left backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-2">
                            <FiMail className="text-blue-400 w-6 h-6" />
                            <h3 className="text-blue-100 font-bold">Account Created Automatically</h3>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Since you were not logged in, we have created an account for you using <strong className="text-white">{email}</strong>.
                            Your login credentials have been sent to this email address.
                        </p>
                    </div>
                )}

                <div className="bg-slate-900/20 rounded-xl p-6 mb-8 border border-blue-500/10 backdrop-blur-sm">
                    <h2 className="text-blue-200 font-semibold mb-4 text-xl flex items-center justify-center gap-2">
                        <FiPhoneCall /> Any Queries? Feel free to contact us
                    </h2>

                    <div className="space-y-4 text-left inline-block">
                        <div className="flex items-center gap-3">
                            <span className="text-blue-400 font-bold">📞</span>
                            <div>
                                <p className="text-white font-medium">+91 9810 88 2769</p>
                                <p className="text-xs text-slate-400">Nominations</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-blue-400 font-bold">📞</span>
                            <div>
                                <p className="text-white font-medium">+91 9971 00 2984</p>
                                <p className="text-xs text-slate-400">Sponsorship</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-blue-400 font-bold">📞</span>
                            <div>
                                <p className="text-white font-medium">+91 9810 91 0686</p>
                                <p className="text-xs text-slate-400">Helpline</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Link
                    to="/"
                    className="group relative inline-flex items-center justify-center px-12 py-4 font-black tracking-[0.2em] uppercase transition-all duration-300 bg-gradient-to-r from-blue-500 to-medical-secondary text-white rounded-full overflow-hidden shadow-[0_15px_30px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(37,99,235,0.6)] hover:-translate-y-1 active:scale-95"
                >
                    <span className="relative z-10 text-white">Back to Home</span>
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:animate-shimmer"></div>
                </Link>
            </div>
        </div>
    );
}
