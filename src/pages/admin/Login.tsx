import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login, forgotPassword, resetPassword } from "../../api/auth";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";
import nciclogo from "@/assets/nciclogoinwhitec.png";

type View = "login" | "forgot" | "otp";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetDone, setResetDone] = useState(false);

  const loginMutation = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (res) => {
      const { token, user } = res.data;
      localStorage.setItem("ncic_token", token);
      localStorage.setItem("ncic_user", JSON.stringify(user));
      if (user.role === "abc") {
        navigate("/ncic-admin-panel1/abc-dashboard");
      } else {
        navigate("/ncic-admin-panel1/dashboard");
      }
    },
  });

  const forgotMutation = useMutation({
    mutationFn: () => forgotPassword(otpEmail),
    onSuccess: () => setView("otp"),
  });

  const resetMutation = useMutation({
    mutationFn: () => resetPassword(otpEmail, otp, newPassword),
    onSuccess: () => setResetDone(true),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2B1F66] to-[#1a1240] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#2B1F66] rounded-xl p-3">
            <img src={nciclogo} alt="NCIC" className="h-12 w-auto" />
          </div>
        </div>

        {/* Login */}
        {view === "login" && (
          <>
            <h1 className="text-2xl font-bold text-gray-800 text-center mb-1">Admin Login</h1>
            <p className="text-sm text-gray-500 text-center mb-6">Sign in to the NCIC Admin Panel</p>

            <form onSubmit={e => { e.preventDefault(); loginMutation.mutate(); }} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={showPassword ? "text" : "password"} required value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
                  <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginMutation.isError && (
                <p className="text-sm text-red-500 text-center">
                  {(loginMutation.error as any)?.response?.data?.message ?? "Login failed. Please try again."}
                </p>
              )}

              <button type="submit" disabled={loginMutation.isPending}
                className="w-full bg-[#2B1F66] hover:bg-purple-900 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors">
                {loginMutation.isPending ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <button onClick={() => setView("forgot")} className="w-full text-center text-sm text-purple-600 hover:underline mt-4">
              Forgot password?
            </button>
          </>
        )}

        {/* Forgot password */}
        {view === "forgot" && (
          <>
            <button onClick={() => setView("login")} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to login
            </button>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Forgot Password</h1>
            <p className="text-sm text-gray-500 mb-6">Enter your email and we'll send you an OTP.</p>
            <form onSubmit={e => { e.preventDefault(); forgotMutation.mutate(); }} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" required value={otpEmail} onChange={e => setOtpEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
              </div>
              {forgotMutation.isError && <p className="text-sm text-red-500">Failed to send OTP. Try again.</p>}
              <button type="submit" disabled={forgotMutation.isPending}
                className="w-full bg-[#2B1F66] hover:bg-purple-900 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors">
                {forgotMutation.isPending ? "Sending..." : "Send OTP"}
              </button>
            </form>
          </>
        )}

        {/* OTP + new password */}
        {view === "otp" && !resetDone && (
          <>
            <button onClick={() => setView("forgot")} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Reset Password</h1>
            <p className="text-sm text-gray-500 mb-6">Enter the OTP sent to <span className="font-semibold">{otpEmail}</span> and your new password.</p>
            <form onSubmit={e => { e.preventDefault(); resetMutation.mutate(); }} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">OTP Code</label>
                <input type="text" required value={otp} onChange={e => setOtp(e.target.value)}
                  placeholder="6-digit code" maxLength={6}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 tracking-widest text-center text-lg font-bold" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={showPassword ? "text" : "password"} required value={newPassword} onChange={e => setNewPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
                  <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              {resetMutation.isError && (
                <p className="text-sm text-red-500">
                  {(resetMutation.error as any)?.response?.data?.message ?? "Failed. Check your OTP and try again."}
                </p>
              )}
              <button type="submit" disabled={resetMutation.isPending}
                className="w-full bg-[#2B1F66] hover:bg-purple-900 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors">
                {resetMutation.isPending ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </>
        )}

        {view === "otp" && resetDone && (
          <div className="text-center space-y-4 py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Password Reset!</h2>
            <p className="text-sm text-gray-500">Your password has been reset successfully.</p>
            <button onClick={() => { setView("login"); setResetDone(false); }}
              className="w-full bg-[#2B1F66] hover:bg-purple-900 text-white font-semibold py-3 rounded-lg transition-colors">
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
