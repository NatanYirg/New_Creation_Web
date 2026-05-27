import React, { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, EyeOff, Plus, X, MoreVertical, Pencil, Trash2, Star } from "lucide-react";
import {
  getAllTeachings, addTeaching, updateTeaching, toggleTeachingPublish,
  toggleTeachingFeatured, deleteTeaching,
  getAllSeries, addSeries, updateSeries, toggleSeriesPublish, deleteSeries,
} from "../../api/teachings";

interface Teaching {
  _id: string; title: string; speaker: string; date: string;
  youtube_url: string; category: string; thumbnail_url?: string;
  is_published: boolean; is_featured: boolean;
}
interface Series {
  _id: string; title: string; description?: string;
  playlist_url: string; video_count?: number; is_published: boolean;
}

const CATEGORIES = ["General", "Faith", "Prayer", "Healing", "Identity in Christ", "Spiritual Growth"];
const emptyTeaching = () => ({ title: "", speaker: "", youtube_url: "", category: "General", thumbnail_url: "" });
const emptySeries = () => ({ title: "", description: "", playlist_url: "", video_count: "" });

function getYoutubeId(u: string) {
  const m = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : u;
}
function getPlaylistId(u: string) {
  const m = u.match(/[?&]list=([\w-]+)/);
  return m ? m[1] : u;
}

// ── Shared UI components ───────────────────────────────────────────────────
function DeleteDialog({ name, onConfirm, onCancel, isPending }: {
  name: string; onConfirm: () => void; onCancel: () => void; isPending: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Delete Teaching</h3>
        <p className="text-sm text-gray-600">Are you sure you want to delete <span className="font-semibold">"{name}"</span>? This cannot be undone.</p>
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

function SeriesDeleteDialog({ name, onConfirm, onCancel, isPending }: {
  name: string; onConfirm: () => void; onCancel: () => void; isPending: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Delete Series</h3>
        <p className="text-sm text-gray-600">Are you sure you want to delete <span className="font-semibold">"{name}"</span>? This cannot be undone.</p>
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
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
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

const AdminTeachings: React.FC = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"teachings" | "series">("teachings");

  // Teaching form/edit state
  const [showTeachingForm, setShowTeachingForm] = useState(false);
  const [teachingForm, setTeachingForm] = useState(emptyTeaching());
  const [editingTeaching, setEditingTeaching] = useState<Teaching | null>(null);
  const [deleteTeachingTarget, setDeleteTeachingTarget] = useState<Teaching | null>(null);

  // Series form/edit state
  const [showSeriesForm, setShowSeriesForm] = useState(false);
  const [seriesForm, setSeriesForm] = useState(emptySeries());
  const [editingSeries, setEditingSeries] = useState<Series | null>(null);
  const [deleteSeriesTarget, setDeleteSeriesTarget] = useState<Series | null>(null);

  const setT = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setTeachingForm(p => ({ ...p, [f]: e.target.value }));
  const setS = (f: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setSeriesForm(p => ({ ...p, [f]: e.target.value }));

  const { data: teachingsData, isLoading: loadingTeachings } = useQuery({
    queryKey: ["admin-teachings"],
    queryFn: async () => { const r = await getAllTeachings(); return r.data.teachings as Teaching[]; },
  });
  const { data: seriesData, isLoading: loadingSeries } = useQuery({
    queryKey: ["admin-series"],
    queryFn: async () => { const r = await getAllSeries(); return r.data.series as Series[]; },
  });

  const addTeachingMutation = useMutation({
    mutationFn: (data: any) => addTeaching(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-teachings"] }); setTeachingForm(emptyTeaching()); setShowTeachingForm(false); },
  });
  const updateTeachingMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateTeaching(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-teachings"] }); setEditingTeaching(null); },
  });
  const toggleTeachingMutation = useMutation({
    mutationFn: ({ id, is_published }: { id: string; is_published: boolean }) => toggleTeachingPublish(id, is_published),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-teachings"] }),
  });
  const featureTeachingMutation = useMutation({
    mutationFn: ({ id, is_featured }: { id: string; is_featured: boolean }) => toggleTeachingFeatured(id, is_featured),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-teachings"] }),
    onError: (e: any) => alert(e?.response?.data?.message ?? "Failed to feature teaching."),
  });
  const deleteTeachingMutation = useMutation({
    mutationFn: (id: string) => deleteTeaching(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-teachings"] }); setDeleteTeachingTarget(null); },
  });

  const addSeriesMutation = useMutation({
    mutationFn: (data: any) => addSeries(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-series"] }); setSeriesForm(emptySeries()); setShowSeriesForm(false); },
  });
  const updateSeriesMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateSeries(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-series"] }); setEditingSeries(null); },
  });
  const toggleSeriesMutation = useMutation({
    mutationFn: ({ id, is_published }: { id: string; is_published: boolean }) => toggleSeriesPublish(id, is_published),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-series"] }),
  });
  const deleteSeriesMutation = useMutation({
    mutationFn: (id: string) => deleteSeries(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-series"] }); setDeleteSeriesTarget(null); },
  });

  const handleAddTeaching = (e: React.FormEvent) => {
    e.preventDefault();
    addTeachingMutation.mutate({ ...teachingForm, date: new Date().toISOString(), thumbnail_url: teachingForm.thumbnail_url || undefined });
  };
  const handleUpdateTeaching = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeaching) return;
    updateTeachingMutation.mutate({ id: editingTeaching._id, data: { ...teachingForm, thumbnail_url: teachingForm.thumbnail_url || undefined } });
  };
  const handleAddSeries = (e: React.FormEvent) => {
    e.preventDefault();
    addSeriesMutation.mutate({ title: seriesForm.title, description: seriesForm.description || undefined, playlist_url: seriesForm.playlist_url, video_count: seriesForm.video_count ? Number(seriesForm.video_count) : undefined });
  };
  const handleUpdateSeries = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSeries) return;
    updateSeriesMutation.mutate({ id: editingSeries._id, data: { title: seriesForm.title, description: seriesForm.description || undefined, playlist_url: seriesForm.playlist_url, video_count: seriesForm.video_count ? Number(seriesForm.video_count) : undefined } });
  };

  const openEditTeaching = (t: Teaching) => {
    setEditingTeaching(t);
    setTeachingForm({ title: t.title, speaker: t.speaker, youtube_url: t.youtube_url, category: t.category, thumbnail_url: t.thumbnail_url ?? "" });
    setShowTeachingForm(false);
  };
  const openEditSeries = (s: Series) => {
    setEditingSeries(s);
    setSeriesForm({ title: s.title, description: s.description ?? "", playlist_url: s.playlist_url, video_count: s.video_count?.toString() ?? "" });
    setShowSeriesForm(false);
  };

  const teachings = teachingsData ?? [];
  const series = seriesData ?? [];
  const featuredCount = teachings.filter(t => t.is_featured).length;

  const inputCls = "w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400";
  const labelCls = "text-xs font-semibold text-gray-600 mb-1 block";

  const TeachingFormFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div><label className={labelCls}>Title *</label><input type="text" required value={teachingForm.title} onChange={setT("title")} placeholder="e.g. Take the shield of faith" className={inputCls} /></div>
      <div><label className={labelCls}>Speaker *</label><input type="text" required value={teachingForm.speaker} onChange={setT("speaker")} placeholder="e.g. Apostle Bisrat Bezuayene" className={inputCls} /></div>
      <div><label className={labelCls}>YouTube URL *</label><input type="text" required value={teachingForm.youtube_url} onChange={setT("youtube_url")} placeholder="https://www.youtube.com/watch?v=..." className={inputCls} /></div>
      <div><label className={labelCls}>Category *</label><select required value={teachingForm.category} onChange={setT("category")} className={inputCls}>{CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></div>
      <div className="md:col-span-2"><label className={labelCls}>Thumbnail URL <span className="text-gray-400">(optional)</span></label><input type="text" value={teachingForm.thumbnail_url} onChange={setT("thumbnail_url")} placeholder="Leave blank to use YouTube thumbnail" className={inputCls} /></div>
      {teachingForm.youtube_url && (
        <div className="md:col-span-2">
          <p className="text-xs text-gray-500 mb-1">Thumbnail preview:</p>
          <img src={`https://img.youtube.com/vi/${getYoutubeId(teachingForm.youtube_url)}/maxresdefault.jpg`} alt="preview" className="h-24 rounded-lg object-cover" onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
        </div>
      )}
    </div>
  );

  const SeriesFormFields = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="md:col-span-2"><label className={labelCls}>Series Title *</label><input type="text" required value={seriesForm.title} onChange={setS("title")} placeholder="e.g. Spirit of faith / የእምነት መንፈስ" className={inputCls} /></div>
      <div className="md:col-span-2"><label className={labelCls}>YouTube Playlist URL *</label><input type="text" required value={seriesForm.playlist_url} onChange={setS("playlist_url")} placeholder="https://www.youtube.com/playlist?list=PL..." className={inputCls} /><p className="text-xs text-gray-400 mt-1">Paste the full YouTube playlist URL</p></div>
      <div><label className={labelCls}>Number of Videos <span className="text-gray-400">(optional)</span></label><input type="number" min="0" value={seriesForm.video_count} onChange={setS("video_count")} placeholder="e.g. 12" className={inputCls} /></div>
      <div><label className={labelCls}>Description <span className="text-gray-400">(optional)</span></label><textarea rows={2} value={seriesForm.description} onChange={setS("description")} placeholder="Brief description" className={`${inputCls} resize-none`} /></div>
      {seriesForm.playlist_url && getPlaylistId(seriesForm.playlist_url).length > 10 && (
        <div className="md:col-span-2"><p className="text-xs text-gray-500 mb-1">Playlist preview:</p><div className="aspect-video w-full max-w-sm rounded-lg overflow-hidden"><iframe width="100%" height="100%" src={`https://www.youtube.com/embed/videoseries?list=${getPlaylistId(seriesForm.playlist_url)}`} title="preview" allowFullScreen className="w-full h-full" /></div></div>
      )}
    </div>
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Teachings</h1>

      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6 w-fit">
        {(["teachings", "series"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors ${activeTab === tab ? "bg-white shadow text-purple-700" : "text-gray-500 hover:text-gray-700"}`}>
            {tab === "teachings" ? "Individual Teachings" : "Teaching Series"}
          </button>
        ))}
      </div>

      {/* ── Individual Teachings ── */}
      {activeTab === "teachings" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Featured: <span className={`font-semibold ${featuredCount >= 3 ? "text-orange-600" : "text-gray-700"}`}>{featuredCount}/3</span></p>
            <button onClick={() => { setShowTeachingForm(p => !p); setEditingTeaching(null); setTeachingForm(emptyTeaching()); }}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              {showTeachingForm ? <><X className="w-4 h-4" /> Cancel</> : <><Plus className="w-4 h-4" /> Add Teaching</>}
            </button>
          </div>

          {/* Add form */}
          {showTeachingForm && !editingTeaching && (
            <form onSubmit={handleAddTeaching} className="bg-white rounded-xl shadow p-6 space-y-4">
              <h2 className="text-base font-semibold text-gray-800 border-b pb-2">New Teaching</h2>
              <TeachingFormFields />
              {addTeachingMutation.isError && <p className="text-sm text-red-600">Failed to add teaching. Check the YouTube URL.</p>}
              <button type="submit" disabled={addTeachingMutation.isPending} className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors">
                {addTeachingMutation.isPending ? "Saving..." : "Add Teaching"}
              </button>
            </form>
          )}

          {/* Edit modal */}
          {editingTeaching && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl space-y-4 my-8">
                <div className="flex items-center justify-between border-b pb-2">
                  <h2 className="text-base font-semibold text-gray-800">Edit Teaching</h2>
                  <button onClick={() => setEditingTeaching(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleUpdateTeaching} className="space-y-4">
                  <TeachingFormFields />
                  {updateTeachingMutation.isError && <p className="text-sm text-red-600">Failed to update. Try again.</p>}
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setEditingTeaching(null)} className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                    <button type="submit" disabled={updateTeachingMutation.isPending} className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors">
                      {updateTeachingMutation.isPending ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Delete dialog */}
          {deleteTeachingTarget && (
            <DeleteDialog name={deleteTeachingTarget.title} isPending={deleteTeachingMutation.isPending}
              onConfirm={() => deleteTeachingMutation.mutate(deleteTeachingTarget._id)}
              onCancel={() => setDeleteTeachingTarget(null)} />
          )}

          {loadingTeachings ? (
            <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" /></div>
          ) : teachings.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No teachings yet.</p>
          ) : (
            <div className="space-y-3">
              {teachings.map(t => {
                const videoId = getYoutubeId(t.youtube_url);
                return (
                  <div key={t._id} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
                    <img src={t.thumbnail_url || `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} alt={t.title} className="w-20 h-14 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-800 truncate">{t.title}</p>
                        {t.is_featured && <span className="flex-shrink-0 flex items-center gap-1 bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-0.5 rounded-full"><Star className="w-3 h-3" /> Featured</span>}
                      </div>
                      <p className="text-sm text-gray-500">{t.speaker} · {t.category}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => toggleTeachingMutation.mutate({ id: t._id, is_published: !t.is_published })}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${t.is_published ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                        {t.is_published ? <><Eye className="w-3.5 h-3.5" /> Published</> : <><EyeOff className="w-3.5 h-3.5" /> Draft</>}
                      </button>
                      <button onClick={() => featureTeachingMutation.mutate({ id: t._id, is_featured: !t.is_featured })}
                        title={t.is_featured ? "Remove from featured" : featuredCount >= 3 ? "Max 3 featured" : "Set as featured"}
                        className={`p-1.5 rounded-full transition-colors ${t.is_featured ? "text-yellow-500 hover:text-yellow-600" : featuredCount >= 3 ? "text-gray-200 cursor-not-allowed" : "text-gray-400 hover:text-yellow-500"}`}>
                        <Star className="w-4 h-4" />
                      </button>
                      <ThreeDotMenu onEdit={() => openEditTeaching(t)} onDelete={() => setDeleteTeachingTarget(t)} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Teaching Series ── */}
      {activeTab === "series" && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button onClick={() => { setShowSeriesForm(p => !p); setEditingSeries(null); setSeriesForm(emptySeries()); }}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              {showSeriesForm ? <><X className="w-4 h-4" /> Cancel</> : <><Plus className="w-4 h-4" /> Add Series</>}
            </button>
          </div>

          {showSeriesForm && !editingSeries && (
            <form onSubmit={handleAddSeries} className="bg-white rounded-xl shadow p-6 space-y-4">
              <h2 className="text-base font-semibold text-gray-800 border-b pb-2">New Teaching Series</h2>
              <SeriesFormFields />
              {addSeriesMutation.isError && <p className="text-sm text-red-600">Failed to add series. Check the playlist URL.</p>}
              <button type="submit" disabled={addSeriesMutation.isPending} className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors">
                {addSeriesMutation.isPending ? "Saving..." : "Add Series"}
              </button>
            </form>
          )}

          {editingSeries && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl space-y-4 my-8">
                <div className="flex items-center justify-between border-b pb-2">
                  <h2 className="text-base font-semibold text-gray-800">Edit Series</h2>
                  <button onClick={() => setEditingSeries(null)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                </div>
                <form onSubmit={handleUpdateSeries} className="space-y-4">
                  <SeriesFormFields />
                  {updateSeriesMutation.isError && <p className="text-sm text-red-600">Failed to update. Try again.</p>}
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setEditingSeries(null)} className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2.5 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                    <button type="submit" disabled={updateSeriesMutation.isPending} className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors">
                      {updateSeriesMutation.isPending ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {deleteSeriesTarget && (
            <SeriesDeleteDialog name={deleteSeriesTarget.title} isPending={deleteSeriesMutation.isPending}
              onConfirm={() => deleteSeriesMutation.mutate(deleteSeriesTarget._id)}
              onCancel={() => setDeleteSeriesTarget(null)} />
          )}

          {loadingSeries ? (
            <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" /></div>
          ) : series.length === 0 ? (
            <p className="text-center text-gray-400 py-8">No teaching series yet.</p>
          ) : (
            <div className="space-y-3">
              {series.map(s => {
                const playlistId = getPlaylistId(s.playlist_url);
                return (
                  <div key={s._id} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
                    <div className="w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`} title={s.title} className="w-full h-full pointer-events-none" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">{s.title}</p>
                      {s.description && <p className="text-sm text-gray-500 truncate">{s.description}</p>}
                      {s.video_count ? <p className="text-xs text-gray-400">{s.video_count} videos</p> : null}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button onClick={() => toggleSeriesMutation.mutate({ id: s._id, is_published: !s.is_published })}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${s.is_published ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
                        {s.is_published ? <><Eye className="w-3.5 h-3.5" /> Published</> : <><EyeOff className="w-3.5 h-3.5" /> Draft</>}
                      </button>
                      <ThreeDotMenu onEdit={() => openEditSeries(s)} onDelete={() => setDeleteSeriesTarget(s)} />
                    </div>
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

export default AdminTeachings;
