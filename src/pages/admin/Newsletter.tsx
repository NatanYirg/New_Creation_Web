import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllSubscribers, unsubscribeEmail } from "../../api/newsletter";
import { UserX, Search, Download } from "lucide-react";

interface Subscriber {
  _id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

function DeleteDialog({ email, onConfirm, onCancel, isPending }: {
  email: string; onConfirm: () => void; onCancel: () => void; isPending: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Remove Subscriber</h3>
        <p className="text-sm text-gray-600">
          Are you sure you want to unsubscribe <span className="font-semibold">{email}</span>?
          They will no longer receive newsletter emails.
        </p>
        <div className="flex gap-3 pt-2">
          <button onClick={onCancel} className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50">Cancel</button>
          <button onClick={onConfirm} disabled={isPending} className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-semibold">
            {isPending ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
}

const AdminNewsletter: React.FC = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [removeTarget, setRemoveTarget] = useState<Subscriber | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-newsletter-subscribers"],
    queryFn: async () => {
      const r = await getAllSubscribers();
      return r.data as { subscribers: Subscriber[]; total: number };
    },
  });

  const unsubscribeMutation = useMutation({
    mutationFn: (email: string) => unsubscribeEmail(email),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-newsletter-subscribers"] });
      setRemoveTarget(null);
    },
  });

  const subscribers = data?.subscribers ?? [];

  const filtered = subscribers.filter(s =>
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const rows = [["Email", "Subscribed Date"], ...subscribers.map(s => [s.email, new Date(s.subscribed_at).toLocaleDateString()])];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter_subscribers_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Newsletter Subscribers</h1>
          {!isLoading && (
            <p className="text-sm text-gray-500 mt-0.5">{subscribers.length} active subscriber{subscribers.length !== 1 ? "s" : ""}</p>
          )}
        </div>
        <button onClick={exportCSV} disabled={subscribers.length === 0}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Delete dialog */}
      {removeTarget && (
        <DeleteDialog
          email={removeTarget.email}
          isPending={unsubscribeMutation.isPending}
          onConfirm={() => unsubscribeMutation.mutate(removeTarget.email)}
          onCancel={() => setRemoveTarget(null)}
        />
      )}

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          {search ? "No subscribers match your search." : "No subscribers yet."}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">#</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Email</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Subscribed</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((s, i) => (
                <tr key={s._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-400 text-xs">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{s.email}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(s.subscribed_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setRemoveTarget(s)}
                      title="Remove subscriber"
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                    >
                      <UserX className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {search && filtered.length !== subscribers.length && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
              Showing {filtered.length} of {subscribers.length} subscribers
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminNewsletter;
