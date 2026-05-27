import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllMessages, markMessageRead, deleteMessage } from "../../api/contact";
import { Trash2, Mail, MailOpen, Search, X } from "lucide-react";

interface Message {
  _id: string;
  full_name: string;
  email: string;
  message: string;
  is_read: boolean;
  sent_at: string;
}

function DeleteDialog({ name, onConfirm, onCancel, isPending }: {
  name: string; onConfirm: () => void; onCancel: () => void; isPending: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Delete Message</h3>
        <p className="text-sm text-gray-600">Delete the message from <span className="font-semibold">{name}</span>? This cannot be undone.</p>
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

const AdminMessages: React.FC = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [selected, setSelected] = useState<Message | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Message | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const r = await getAllMessages();
      return r.data as { messages: Message[]; unread: number };
    },
  });

  const readMutation = useMutation({
    mutationFn: (id: string) => markMessageRead(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-messages"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      setDeleteTarget(null);
      if (selected && deleteTarget && selected._id === deleteTarget._id) setSelected(null);
    },
  });

  const openMessage = (msg: Message) => {
    setSelected(msg);
    if (!msg.is_read) readMutation.mutate(msg._id);
  };

  const messages = data?.messages ?? [];
  const unread = data?.unread ?? 0;

  const filtered = messages.filter(m => {
    const matchesSearch = m.full_name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || (filter === "unread" ? !m.is_read : m.is_read);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Messages</h1>
          {!isLoading && unread > 0 && (
            <p className="text-sm text-purple-600 font-semibold mt-0.5">{unread} unread message{unread !== 1 ? "s" : ""}</p>
          )}
        </div>
      </div>

      {/* Search + filter */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search messages..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400" />
        </div>
        <div className="flex gap-2">
          {(["all", "unread", "read"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors capitalize ${filter === f ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
              {f}
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
        {/* Message list */}
        <div className="space-y-2">
          {isLoading ? (
            <div className="flex justify-center py-12"><div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" /></div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-gray-400 py-12">{search ? "No messages match your search." : "No messages yet."}</p>
          ) : filtered.map(msg => (
            <div key={msg._id}
              onClick={() => openMessage(msg)}
              className={`bg-white rounded-xl shadow p-4 cursor-pointer transition-all border-2 ${selected?._id === msg._id ? "border-purple-500" : "border-transparent hover:border-purple-200"}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className={`mt-0.5 flex-shrink-0 ${msg.is_read ? "text-gray-300" : "text-purple-600"}`}>
                    {msg.is_read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm truncate ${msg.is_read ? "text-gray-600" : "font-semibold text-gray-800"}`}>{msg.full_name}</p>
                    <p className="text-xs text-gray-400 truncate">{msg.email}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{msg.message}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <p className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(msg.sent_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                  <button onClick={e => { e.stopPropagation(); setDeleteTarget(msg); }}
                    className="p-1 text-gray-300 hover:text-red-500 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message detail */}
        <div className="lg:sticky lg:top-6">
          {selected ? (
            <div className="bg-white rounded-xl shadow p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">{selected.full_name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-sm text-purple-600 hover:underline">{selected.email}</a>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(selected.sent_at).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    {" · "}
                    {new Date(selected.sent_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="border-t pt-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
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
              <Mail className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Select a message to read it</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessages;
