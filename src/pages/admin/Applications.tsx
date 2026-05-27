import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllApplications, updateApplicationStatus, deleteApplication } from "../../api/bibleCollege";
import { Trash2, Search, X, ChevronDown } from "lucide-react";

interface Application {
  _id: string;
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  education_level: string;
  program_interest: string;
  learning_mode: string;
  church_name?: string;
  address: string;
  additional_info?: string;
  status: "pending" | "reviewed" | "accepted" | "rejected";
  submitted_at: string;
}

interface Counts { total: number; pending: number; reviewed: number; accepted: number; rejected: number; }

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  reviewed: "bg-blue-100 text-blue-700",
  accepted: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

function DeleteDialog({ name, onConfirm, onCancel, isPending }: { name: string; onConfirm: () => void; onCancel: () => void; isPending: boolean }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Delete Application</h3>
        <p className="text-sm text-gray-600">Delete the application from <span className="font-semibold">{name}</span>? This cannot be undone.</p>
        <div className="flex gap-3 pt-2">
          <button onClick={onCancel} className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={onConfirm} disabled={isPending} className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-semibold">
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

const AdminApplications: React.FC = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selected, setSelected] = useState<Application | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Application | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-applications", filterStatus],
    queryFn: async () => {
      const r = await getAllApplications(filterStatus === "all" ? undefined : filterStatus);
      return r.data as { applications: Application[]; counts: Counts };
    },
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => updateApplicationStatus(id, status),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["admin-applications"] });
      if (selected && selected._id === vars.id) {
        setSelected(prev => prev ? { ...prev, status: vars.status as Application["status"] } : null);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-applications"] });
      setDeleteTarget(null);
      setSelected(null);
    },
  });

  const applications = data?.applications ?? [];
  const counts = data?.counts;

  const filtered = applications.filter(a =>
    a.full_name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase()) ||
    a.program_interest.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Bible College Applications</h1>
        {counts && (
          <div className="flex gap-4 mt-3 flex-wrap">
            {[
              { label: "Total", value: counts.total, color: "bg-gray-100 text-gray-700" },
              { label: "Pending", value: counts.pending, color: "bg-yellow-100 text-yellow-700" },
              { label: "Reviewed", value: counts.reviewed, color: "bg-blue-100 text-blue-700" },
              { label: "Accepted", value: counts.accepted, color: "bg-green-100 text-green-700" },
              { label: "Rejected", value: counts.rejected, color: "bg-red-100 text-red-700" },
            ].map(s => (
              <span key={s.label} className={`px-3 py-1 rounded-full text-sm font-semibold ${s.color}`}>
                {s.label}: {s.value}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Search + filter */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search by name, email, or program..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "pending", "reviewed", "accepted", "rejected"].map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors capitalize ${filterStatus === s ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {deleteTarget && (
        <DeleteDialog name={deleteTarget.full_name} isPending={deleteMutation.isPending}
          onConfirm={() => deleteMutation.mutate(deleteTarget._id)}
          onCancel={() => setDeleteTarget(null)} />
      )}

      <div className="grid lg:grid-cols-2 gap-4">
        {/* List */}
        <div className="space-y-2">
          {isLoading ? (
            <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" /></div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-12">No applications found.</p>
          ) : filtered.map(app => (
            <div key={app._id} onClick={() => setSelected(app)}
              className={`bg-white rounded-xl shadow p-4 cursor-pointer transition-all border-2 ${selected?._id === app._id ? "border-purple-500" : "border-transparent hover:border-purple-200"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{app.full_name}</p>
                  <p className="text-xs text-gray-400 truncate">{app.email}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{app.program_interest} · {app.learning_mode}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[app.status]}`}>{app.status}</span>
                  <p className="text-xs text-gray-400">{new Date(app.submitted_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        <div className="lg:sticky lg:top-6">
          {selected ? (
            <div className="bg-white rounded-xl shadow p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{selected.full_name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-sm text-purple-600 hover:underline">{selected.email}</a>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Submitted {new Date(selected.submitted_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 p-1"><X className="w-4 h-4" /></button>
              </div>

              <div className="border-t pt-4 grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Phone", selected.phone],
                  ["Date of Birth", selected.date_of_birth],
                  ["Gender", selected.gender],
                  ["Education", selected.education_level],
                  ["Program", selected.program_interest],
                  ["Learning Mode", selected.learning_mode],
                  ["Address", selected.address],
                  ["Church", selected.church_name || "—"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs text-gray-400 font-medium">{label}</p>
                    <p className="text-gray-700 font-medium">{value}</p>
                  </div>
                ))}
                {selected.additional_info && (
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400 font-medium">Additional Info</p>
                    <p className="text-gray-700">{selected.additional_info}</p>
                  </div>
                )}
              </div>

              {/* Status update */}
              <div className="border-t pt-4">
                <p className="text-xs text-gray-500 font-semibold mb-2">Update Status</p>
                <div className="flex gap-2 flex-wrap">
                  {(["pending", "reviewed", "accepted", "rejected"] as const).map(s => (
                    <button key={s} onClick={() => statusMutation.mutate({ id: selected._id, status: s })}
                      disabled={selected.status === s || statusMutation.isPending}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors capitalize disabled:opacity-50 ${selected.status === s ? STATUS_STYLES[s] + " ring-2 ring-offset-1 ring-current" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <a href={`mailto:${selected.email}`}
                  className="flex-1 text-center bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
                  Reply via Email
                </a>
                <button onClick={() => setDeleteTarget(selected)}
                  className="px-4 py-2.5 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-semibold rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-12 text-center text-gray-400">
              <ChevronDown className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select an application to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminApplications;
