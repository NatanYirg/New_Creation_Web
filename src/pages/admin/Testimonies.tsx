import React, { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff, Plus, X, Star, MoreVertical, Pencil, Trash2 } from "lucide-react";
import {
  getAllVideoTestimonies, addVideoTestimony, updateVideoTestimony,
  toggleVideoPublish, setVideoFeatured, deleteVideoTestimony,
  getAllWrittenTestimonies, updateWrittenTestimony,
  approveWrittenTestimony, toggleWrittenPublish, deleteWrittenTestimony,
} from "../../api/testimonies";

interface VideoTestimony {
  _id: string; title: string; name: string; youtube_url: string;
  is_featured: boolean; is_published: boolean; created_at: string;
}
interface WrittenTestimony {
  _id: string; name: string; role?: string; phone?: string;
  email?: string; title?: string; story: string;
  is_approved: boolean; is_published: boolean; created_at: string;
}

const emptyVideoForm = () => ({ title: "", name: "", youtube_url: "" });
const emptyWrittenForm = () => ({ name: "", role: "", title: "", story: "" });

function getYoutubeId(u: string) {
  const m = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : u;
}

function DeleteDialog({ title, message, onConfirm, onCancel, isPending }: {
  title: string; message: string; onConfirm: () => void; onCancel: () => void; isPending: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full space-y-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{message}</p>
        <div className="flex gap-3 pt-2">
          <button onClick={onCancel} className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} disabled={isPending} className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-sm font-semibold transition-colors">
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

function ThreeDotMenu({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(p => !p)} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
        <MoreVertical className="w-4 h-4" />
      </button>
      {open && (
        <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20 min-w-[120px]">
          <button onClick={() => { onEdit(); setOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Pencil className="w-3.5 h-3.5" /> Edit
          </button>
          <button onClick={() => { onDelete(); setOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

const AdminTestimonies: React.FC = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"video" | "written">("video");

  // Video state
  const [showVideoForm, setShowVideoForm] = useState(false);
  const [videoForm, setVideoForm] = useState(emptyVideoForm());
  const [editingVideo, setEditingVideo] = useState<VideoTestimony | null>(null);
  const [deleteVideoTarget, setDeleteVideoTarget] = useState<VideoTestimony | null>(null);

  // Written state
  const [editingWritten, setEditingWritten] = useState<WrittenTestimony | null>(null);
  const [writtenForm, setWrittenForm] = useState(emptyWrittenForm());
  const [deleteWrittenTarget, setDeleteWrittenTarget] = useState<WrittenTestimony | null>(null);

  const setV = (f: string) => (e: React.ChangeEvent<HTMLInputElement>) => setVideoForm(p => ({ ...p, [f]: e.target.value }));
  const setW = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setWrittenForm(p => ({ ...p, [f]: e.target.value }));

  const { data: videoData, isLoading: loadingVideo } = useQuery({
    queryKey: ["admin-video-testimonies"],
    queryFn: async () => { const r = await getAllVideoTestimonies(); return r.data.testimonies as VideoTestimony[]; },
  });
  const { data: writtenData, isLoading: loadingWritten } = useQuery({
    queryKey: ["admin-written-testimonies"],
    queryFn: async () => { const r = await getAllWrittenTestimonies(); return r.data.testimonies as WrittenTestimony[]; },
  });

  const addVideoMutation = useMutation({
    mutationFn: (data: any) => addVideoTestimony(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-video-testimonies"] }); setVideoForm(emptyVideoForm()); setShowVideoForm(false); },
  });
  const updateVideoMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateVideoTestimony(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-video-testimonies"] }); setEditingVideo(null); },
  });
  const toggleVideoPublishMutation = useMutation({
    mutationFn: ({ id, is_published }: { id: string; is_published: boolean }) => toggleVideoPublish(id, is_published),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-video-testimonies"] }),
  });
  const setFeaturedMutation = useMutation({
    mutationFn: ({ id, is_featured }: { id: string; is_featured: boolean }) => setVideoFeatured(id, is_featured),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-video-testimonies"] }),
  });
  const deleteVideoMutation = useMutation({
    mutationFn: (id: string) => deleteVideoTestimony(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-video-testimonies"] }); setDeleteVideoTarget(null); },
  });

  const updateWrittenMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateWrittenTestimony(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-written-testimonies"] }); setEditingWritten(null); },
  });
  const approveMutation = useMutation({
    mutationFn: ({ id, is_approved }: { id: string; is_approved: boolean }) => approveWrittenTestimony(id, is_approved),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-written-testimonies"] }),
  });
  const toggleWrittenPublishMutation = useMutation({
    mutationFn: ({ id, is_published }: { id: string; is_published: boolean }) => toggleWrittenPublish(id, is_published),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-written-testimonies"] }),
  });
  const deleteWrittenMutation = useMutation({
    mutationFn: (id: string) => deleteWrittenTestimony(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-written-testimonies"] }); setDeleteWrittenTarget(null); },
  });

  const handleAddVideo = (e: React.FormEvent) => { e.preventDefault(); addVideoMutation.mutate(videoForm); };
  const handleUpdateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVideo) return;
    updateVideoMutation.mutate({ id: editingVideo._id, data: videoForm });
  };
  const handleUpdateWritten = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWritten) return;
    updateWrittenMutation.mutate({ id: editingWritten._id, data: { name: writtenForm.name, role: writtenForm.role || undefined, title: writtenForm.title || undefined, story: writtenForm.story } });
  };

  const openEditVideo = (v: VideoTestimony) => {
    setEditingVideo(v);
    setVideoForm({ title: v.title, name: v.name, youtube_url: v.youtube_url });
    setShowVideoForm(false);
  };
  const openEditWritten = (w: WrittenTestimony) => {
    setEditingWritten(w);
    setWrittenForm({ name: w.name, role: w.role ?? "", title: w.title ?? "", story: w.story });
  };

  const videos = videoData ?? [];
  const written = writtenData ?? [];
  const inputCls = "w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400";
  const labelCls = "text-xs font-semibold text-gray-600 mb-1 block";

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Testimonies</h1>

      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6 w-fit">
        {(["video", "written"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === tab ? "bg-white shadow text-purple-700" : "text-gray-500 hover:text-gray-700"}`}>
            {tab === "video" ? "Video Testimonies" : "Written Testimonies"}
          </button>
        ))}
      </div>

      {/* ── Video Tab ── */}
      {activeTab === "video" && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button onClick={() => { setShowVideoForm(p => !p); setEditingVideo(null); setVideoForm(emptyVideoForm()); }}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              {showVideoForm ? <><X className="w-4 h-4" /> Cancel</> : <><Plus className="w-4 h-4" /> Add Video Testimony</>}
            </button>
          </div>

          {showVideoForm && !editingVideo && (
            <form onSubmit={handleAddVideo} className="bg-white rounded-xl shadow p-6 space-y-4">
              <h2 className="text-base font-semibold text-gray-800 border-b pb-2">New Video Testimony</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className={labelCls}>Title *</label><input type="text" required value={videoForm.title} onChange={setV("title")} placeholder="e.g. God healed me completely" className={inputCls} /></div>
                <div><label className={labelCls}>Person's Name *</label><input type="text" required value={videoForm.name} onChange={setV("name")} placeholder="e.g. ወንድም ናሆም መልካሙ" className={inputCls} /></div>
                <div className="md:col-span-2"><label className={labelCls}>YouTube URL *</label><input type="text" required value={videoForm.youtube_url} onChange={setV("youtube_url")} placeholder="https://www.youtube.com/watch?v=..." className={inputCls} /></div>
              </div>
              {videoForm.youtube_url && <div><p className="text-xs text-gray-500 mb-1">Thumbnail preview:</p><img src={`https://img.youtube.com/vi/${getYoutubeId(videoForm.youtube_url)}/maxresdefault.jpg`} alt="preview" className="h-24 rounded-lg object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} /></div>}
              {addVideoMutation.isError && <p className="text-sm text-red-600">Failed to add. Check the YouTube URL.</p>}
              <button type="submit" disabled={addVideoMutation.isPending} className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors">
                {addVideoMutation.isPending ? "Saving..." : "Add Video Testimony"}
              </button>
            </form>
          )}

          {/* Edit video modal */}
          {editingVideo && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h2 className="text-base font-semibold text-gray-800">Edit Video Testimony</h2>
                  <button onClick={() => setEditingVideo(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleUpdateVideo} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className={labelCls}>Title *</label><input type="text" required value={videoForm.title} onChange={setV("title")} className={inputCls} /></div>
                    <div><label className={labelCls}>Person's Name *</label><input type="text" required value={videoForm.name} onChange={setV("name")} className={inputCls} /></div>
                    <div className="md:col-span-2"><label className={labelCls}>YouTube URL *</label><input type="text" required value={videoForm.youtube_url} onChange={setV("youtube_url")} className={inputCls} /></div>
                  </div>
                  {updateVideoMutation.isError && <p className="text-sm text-red-600">Failed to update. Try again.</p>}
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setEditingVideo(null)} className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                    <button type="submit" disabled={updateVideoMutation.isPending} className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors">
                      {updateVideoMutation.isPending ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {deleteVideoTarget && (
            <DeleteDialog title="Delete Video Testimony" message={`Are you sure you want to delete "${deleteVideoTarget.title}"? This cannot be undone.`}
              isPending={deleteVideoMutation.isPending}
              onConfirm={() => deleteVideoMutation.mutate(deleteVideoTarget._id)}
              onCancel={() => setDeleteVideoTarget(null)} />
          )}

          {loadingVideo ? (
            <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" /></div>
          ) : videos.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No video testimonies yet.</p>
          ) : (
            <div className="space-y-3">
              {videos.map(v => {
                const videoId = getYoutubeId(v.youtube_url);
                return (
                  <div key={v._id} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
                    <img src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} alt={v.title} className="w-20 h-14 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-800 truncate">{v.title}</p>
                        {v.is_featured && <span className="flex-shrink-0 flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-0.5 rounded-full"><Star className="w-3 h-3" /> Featured</span>}
                      </div>
                      <p className="text-sm text-gray-500">{v.name}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => toggleVideoPublishMutation.mutate({ id: v._id, is_published: !v.is_published })}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${v.is_published ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                        {v.is_published ? <><Eye className="w-3.5 h-3.5" /> Published</> : <><EyeOff className="w-3.5 h-3.5" /> Draft</>}
                      </button>
                      <button onClick={() => setFeaturedMutation.mutate({ id: v._id, is_featured: !v.is_featured })}
                        title={v.is_featured ? "Remove featured" : "Set as featured"}
                        className={`p-1.5 rounded-full transition-colors ${v.is_featured ? "text-yellow-500 hover:text-yellow-600" : "text-gray-400 hover:text-yellow-500"}`}>
                        <Star className="w-4 h-4" />
                      </button>
                      <ThreeDotMenu onEdit={() => openEditVideo(v)} onDelete={() => setDeleteVideoTarget(v)} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Written Tab ── */}
      {activeTab === "written" && (
        <div className="space-y-4">
          {/* Edit written modal */}
          {editingWritten && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg space-y-4 my-8">
                <div className="flex items-center justify-between border-b pb-2">
                  <h2 className="text-base font-semibold text-gray-800">Edit Written Testimony</h2>
                  <button onClick={() => setEditingWritten(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleUpdateWritten} className="space-y-4">
                  <div><label className={labelCls}>Name *</label><input type="text" required value={writtenForm.name} onChange={setW("name")} className={inputCls} /></div>
                  <div><label className={labelCls}>Role <span className="text-gray-400">(optional)</span></label><input type="text" value={writtenForm.role} onChange={setW("role")} placeholder="e.g. Member" className={inputCls} /></div>
                  <div><label className={labelCls}>Title <span className="text-gray-400">(optional)</span></label><input type="text" value={writtenForm.title} onChange={setW("title")} className={inputCls} /></div>
                  <div><label className={labelCls}>Story *</label><textarea required rows={6} value={writtenForm.story} onChange={setW("story")} className={`${inputCls} resize-y`} /></div>
                  {updateWrittenMutation.isError && <p className="text-sm text-red-600">Failed to update. Try again.</p>}
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setEditingWritten(null)} className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                    <button type="submit" disabled={updateWrittenMutation.isPending} className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors">
                      {updateWrittenMutation.isPending ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {deleteWrittenTarget && (
            <DeleteDialog title="Delete Written Testimony" message={`Are you sure you want to delete the testimony from "${deleteWrittenTarget.name}"? This cannot be undone.`}
              isPending={deleteWrittenMutation.isPending}
              onConfirm={() => deleteWrittenMutation.mutate(deleteWrittenTarget._id)}
              onCancel={() => setDeleteWrittenTarget(null)} />
          )}

          {loadingWritten ? (
            <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" /></div>
          ) : written.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No written testimonies submitted yet.</p>
          ) : (
            <div className="space-y-3">
              {written.map(w => {
                const statusBadge = w.is_published ? { label: "Published", cls: "bg-green-100 text-green-700" } : w.is_approved ? { label: "Approved", cls: "bg-blue-100 text-blue-700" } : { label: "Pending", cls: "bg-yellow-100 text-yellow-700" };
                return (
                  <div key={w._id} className="bg-white rounded-xl shadow p-4 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-gray-800">{w.name}</p>
                          {w.role && <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{w.role}</span>}
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusBadge.cls}`}>{statusBadge.label}</span>
                        </div>
                        {w.title && <p className="text-sm font-medium text-gray-700 mt-0.5">{w.title}</p>}
                        <p className="text-xs text-gray-400 mt-0.5">{new Date(w.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => approveMutation.mutate({ id: w._id, is_approved: !w.is_approved })}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${w.is_approved ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                          {w.is_approved ? "Approved" : "Approve"}
                        </button>
                        <button onClick={() => { if (!w.is_approved) return; toggleWrittenPublishMutation.mutate({ id: w._id, is_published: !w.is_published }); }}
                          disabled={!w.is_approved}
                          title={!w.is_approved ? "Approve first" : undefined}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${w.is_published ? "bg-green-100 text-green-700 hover:bg-green-200" : w.is_approved ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-gray-50 text-gray-300 cursor-not-allowed"}`}>
                          {w.is_published ? <><Eye className="w-3.5 h-3.5" /> Published</> : <><EyeOff className="w-3.5 h-3.5" /> Publish</>}
                        </button>
                        <ThreeDotMenu onEdit={() => openEditWritten(w)} onDelete={() => setDeleteWrittenTarget(w)} />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{w.story.length > 100 ? `${w.story.slice(0, 100)}…` : w.story}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminTestimonies;
