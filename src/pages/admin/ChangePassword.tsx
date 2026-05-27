import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../../api/auth";
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react";

const ChangePassword: React.FC = () => {
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: () => changePassword(form.current, form.next),
    onSuccess: () => {
      setSuccess(true);
      setForm({ current: "", next: "", confirm: "" });
    },
  });

  const mismatch = !!form.confirm && form.next !== form.confirm;
  const inputCls = "w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400";

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h1>

      <div className="bg-white rounded-xl shadow p-6">
        {success ? (
          <div className="flex flex-col items-center text-center py-8 space-y-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <h2 className="text-xl font-bold text-gray-800">Password Changed!</h2>
            <p className="text-gray-500 text-sm">Your password has been updated successfully.</p>
            <button onClick={() => setSuccess(false)}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors">
              Change Again
            </button>
          </div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); if (!mismatch) mutation.mutate(); }} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type={showCurrent ? "text" : "password"} required value={form.current}
                  onChange={e => setForm(p => ({ ...p, current: e.target.value }))}
                  className={`${inputCls} pl-10 pr-10`} placeholder="Enter current password" />
                <button type="button" onClick={() => setShowCurrent(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type={showNew ? "text" : "password"} required minLength={6} value={form.next}
                  onChange={e => setForm(p => ({ ...p, next: e.target.value }))}
                  className={`${inputCls} pl-10 pr-10`} placeholder="Min 6 characters" />
                <button type="button" onClick={() => setShowNew(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">Confirm New Password</label>
              <input type="password" required value={form.confirm}
                onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))}
                className={`${inputCls} ${mismatch ? "border-red-400 focus:ring-red-400" : ""}`}
                placeholder="Repeat new password" />
              {mismatch && <p className="text-xs text-red-500 mt-1">Passwords do not match.</p>}
            </div>

            {mutation.isError && (
              <p className="text-sm text-red-500">
                {(mutation.error as any)?.response?.data?.message ?? "Failed to change password."}
              </p>
            )}

            <button type="submit" disabled={mutation.isPending || mismatch}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors">
              {mutation.isPending ? "Saving..." : "Change Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
