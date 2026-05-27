import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUsers, createUser, updateUserStatus, deleteUser, changePassword } from "../../api/auth";
import { Plus, X, Copy, Check, Trash2, Eye, EyeOff, UserX, UserCheck } from "lucide-react";

interface User { _id: string; first_name: string; middle_name?: string; email: string; role: string; status: string; created_date: string; }

function DeleteDialog({ name, onConfirm, onCancel, isPending }: { name: string; onConfirm: () => void; onCancel: () => void; isPending: boolean }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Delete User</h3>
        <p className="text-sm text-gray-600">Delete <span className="font-semibold">{name}</span>? This cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={onConfirm} disabled={isPending} className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-semibold">
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

const ROLE_STYLES: Record<string, string> = {
  admin: "bg-purple-100 text-purple-700",
  abc: "bg-blue-100 text-blue-700",
  superAdmin: "bg-yellow-100 text-yellow-700",
};

const AdminUsers: React.FC = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ first_name: "", middle_name: "", email: "", role: "admin" });
  const [createdPassword, setCreatedPassword] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [showChangePw, setShowChangePw] = useState(false);
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => { const r = await getAllUsers(); return r.data.users as User[]; },
  });

  const createMutation = useMutation({
    mutationFn: () => createUser({ first_name: form.first_name, middle_name: form.middle_name || undefined, email: form.email, role: form.role }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setCreatedPassword(res.data.plain_password);
      setForm({ first_name: "", middle_name: "", email: "", role: "admin" });
      setShowForm(false);
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateUserStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-users"] }); setDeleteTarget(null); },
  });

  const changePwMutation = useMutation({
    mutationFn: () => changePassword(pwForm.current, pwForm.next),
    onSuccess: () => { setPwSuccess(true); setPwForm({ current: "", next: "", confirm: "" }); },
  });

  const copyPassword = () => {
    if (createdPassword) {
      navigator.clipboard.writeText(createdPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const users = data ?? [];
  const inputCls = "w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400";

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
        <div className="flex gap-2">
          <button onClick={() => setShowChangePw(true)}
            className="flex items-center gap-2 border border-purple-300 text-purple-700 hover:bg-purple-50 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            Change My Password
          </button>
          <button onClick={() => setShowForm(p => !p)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            {showForm ? <><X className="w-4 h-4" /> Cancel</> : <><Plus className="w-4 h-4" /> Add User</>}
          </button>
        </div>
      </div>

      {/* Add user form */}
      {showForm && (
        <form onSubmit={e => { e.preventDefault(); createMutation.mutate(); }} className="bg-white rounded-xl shadow p-6 space-y-4 mb-6">
          <h2 className="text-base font-semibold text-gray-800 border-b pb-2">New User</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold text-gray-600 mb-1 block">First Name *</label><input type="text" required value={form.first_name} onChange={e => setForm(p => ({ ...p, first_name: e.target.value }))} className={inputCls} placeholder="e.g. Abebe" /></div>
            <div><label className="text-xs font-semibold text-gray-600 mb-1 block">Middle Name</label><input type="text" value={form.middle_name} onChange={e => setForm(p => ({ ...p, middle_name: e.target.value }))} className={inputCls} placeholder="Optional" /></div>
            <div><label className="text-xs font-semibold text-gray-600 mb-1 block">Email *</label><input type="email" required value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className={inputCls} placeholder="user@example.com" /></div>
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">Role *</label>
              <select required value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} className={inputCls}>
                <option value="admin">Admin — full CMS access</option>
                <option value="abc">ABC — Bible College applications only</option>
              </select>
            </div>
          </div>
          {createMutation.isError && <p className="text-sm text-red-600">{(createMutation.error as any)?.response?.data?.message ?? "Failed to create user."}</p>}
          <button type="submit" disabled={createMutation.isPending} className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors">
            {createMutation.isPending ? "Creating..." : "Create User & Send Invitation"}
          </button>
        </form>
      )}

      {/* Password dialog after user creation */}
      {createdPassword && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full space-y-4">
            <h3 className="text-lg font-bold text-gray-800">User Created!</h3>
            <p className="text-sm text-gray-600">An invitation email has been sent. Copy the password below in case the email doesn't arrive.</p>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between gap-3">
              <span className="font-mono text-lg font-bold text-gray-800 tracking-widest">{createdPassword}</span>
              <button onClick={copyPassword} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${copied ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
                {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
              </button>
            </div>
            <p className="text-xs text-gray-400">This password will not be shown again.</p>
            <button onClick={() => setCreatedPassword(null)} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg transition-colors">
              Done
            </button>
          </div>
        </div>
      )}

      {/* Change password modal */}
      {showChangePw && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">Change Password</h3>
              <button onClick={() => { setShowChangePw(false); setPwSuccess(false); }} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            {pwSuccess ? (
              <div className="text-center py-4 space-y-3">
                <Check className="w-12 h-12 text-green-500 mx-auto" />
                <p className="font-semibold text-gray-800">Password changed successfully!</p>
                <button onClick={() => { setShowChangePw(false); setPwSuccess(false); }} className="w-full bg-purple-600 text-white font-semibold py-2.5 rounded-lg">Close</button>
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); if (pwForm.next !== pwForm.confirm) return; changePwMutation.mutate(); }} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Current Password</label>
                  <div className="relative">
                    <input type={showPw ? "text" : "password"} required value={pwForm.current} onChange={e => setPwForm(p => ({ ...p, current: e.target.value }))} className={`${inputCls} pr-10`} />
                    <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                  </div>
                </div>
                <div><label className="text-xs font-semibold text-gray-600 mb-1 block">New Password</label><input type="password" required minLength={6} value={pwForm.next} onChange={e => setPwForm(p => ({ ...p, next: e.target.value }))} className={inputCls} /></div>
                <div><label className="text-xs font-semibold text-gray-600 mb-1 block">Confirm New Password</label><input type="password" required value={pwForm.confirm} onChange={e => setPwForm(p => ({ ...p, confirm: e.target.value }))} className={inputCls} /></div>
                {pwForm.next && pwForm.confirm && pwForm.next !== pwForm.confirm && <p className="text-xs text-red-500">Passwords do not match.</p>}
                {changePwMutation.isError && <p className="text-xs text-red-500">{(changePwMutation.error as any)?.response?.data?.message ?? "Failed."}</p>}
                <button type="submit" disabled={changePwMutation.isPending || (!!pwForm.confirm && pwForm.next !== pwForm.confirm)} className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors">
                  {changePwMutation.isPending ? "Saving..." : "Change Password"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {deleteTarget && (
        <DeleteDialog name={`${deleteTarget.first_name} (${deleteTarget.email})`} isPending={deleteMutation.isPending}
          onConfirm={() => deleteMutation.mutate(deleteTarget._id)}
          onCancel={() => setDeleteTarget(null)} />
      )}

      {/* User list */}
      {isLoading ? (
        <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" /></div>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-400 py-12">No users yet. Add one above.</p>
      ) : (
        <div className="space-y-3">
          {users.map(u => (
            <div key={u._id} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 text-purple-700 font-bold text-sm">
                {u.first_name[0]}{u.middle_name?.[0] ?? ""}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-gray-800">{u.first_name} {u.middle_name ?? ""}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${ROLE_STYLES[u.role] ?? "bg-gray-100 text-gray-600"}`}>{u.role}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${u.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{u.status}</span>
                </div>
                <p className="text-sm text-gray-500">{u.email}</p>
                <p className="text-xs text-gray-400">Added {new Date(u.created_date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => statusMutation.mutate({ id: u._id, status: u.status === "active" ? "inactive" : "active" })}
                  title={u.status === "active" ? "Deactivate" : "Activate"}
                  className={`p-1.5 rounded-lg transition-colors ${u.status === "active" ? "text-gray-400 hover:text-orange-500 hover:bg-orange-50" : "text-gray-400 hover:text-green-500 hover:bg-green-50"}`}>
                  {u.status === "active" ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                </button>
                <button onClick={() => setDeleteTarget(u)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
