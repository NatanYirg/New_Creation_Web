import React, { useRef, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as XLSX from "xlsx";
import { api } from "../../api/axios";
import { addDevotional, addMultipleDevotionals, updateDevotional, deleteDevotional } from "../../api/devotionals";
import { Upload, Download, X, CheckCircle, AlertCircle, Eye, Pencil, Trash2, ChevronLeft, Calendar } from "lucide-react";

interface Devotional {
  _id: string;
  title_am: string; title_en?: string;
  verse_reference_am: string; verse_reference_en?: string;
  verse_text_am: string; verse_text_en?: string;
  devotional_note_am: string; devotional_note_en?: string;
  confession_am: string; confession_en?: string;
  is_published: boolean; publish_date?: string | null;
}
type DevotionalInput = Omit<Devotional, "_id" | "is_published" | "publish_date">;
type Lang = "am" | "en";

const REQUIRED_COLS = ["title_am", "verse_reference_am", "verse_text_am", "devotional_note_am", "confession_am"] as const;
const TEMPLATE_COLS = ["title_am","title_en","verse_reference_am","verse_reference_en","verse_text_am","verse_text_en","devotional_note_am","devotional_note_en","confession_am","confession_en"];

const emptyForm = (): Partial<Devotional> => ({
  title_am: "", title_en: "", verse_reference_am: "", verse_reference_en: "",
  verse_text_am: "", verse_text_en: "", devotional_note_am: "", devotional_note_en: "",
  confession_am: "", confession_en: "",
});

const fetchDevotionals = async (): Promise<Devotional[]> => {
  const res = await api.get("/devotional");
  return (res.data?.devotionals ?? res.data) as Devotional[];
};

function downloadTemplate() {
  const ws = XLSX.utils.aoa_to_sheet([TEMPLATE_COLS, ["ዛሬ ርዕስ (አማርኛ)","Today's Title (English)","ዮሐ 3:16","John 3:16","እግዚአብሔር ዓለሙን...","For God so loved...","ዛሬ ቃሉ...\nሁለተኛ አንቀጽ...","Today the Word...\nSecond paragraph...","አዋጅ (አማርኛ)","Confession (English)"]]);
  ws["!cols"] = TEMPLATE_COLS.map(() => ({ wch: 40 }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Devotionals");
  XLSX.writeFile(wb, "devotionals_template.xlsx");
}

function parseSheet(file: File): Promise<{ rows: DevotionalInput[]; errors: string[] }> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const raw: Record<string, string>[] = XLSX.utils.sheet_to_json(ws, { defval: "" });
        const errors: string[] = [];
        const rows: DevotionalInput[] = [];
        raw.forEach((row, i) => {
          const missing = REQUIRED_COLS.filter(col => !String(row[col] ?? "").trim());
          if (missing.length > 0) { errors.push(`Row ${i + 2}: missing: ${missing.join(", ")}`); return; }
          rows.push({
            title_am: String(row.title_am).trim(), title_en: String(row.title_en ?? "").trim() || undefined,
            verse_reference_am: String(row.verse_reference_am).trim(), verse_reference_en: String(row.verse_reference_en ?? "").trim() || undefined,
            verse_text_am: String(row.verse_text_am).trim(), verse_text_en: String(row.verse_text_en ?? "").trim() || undefined,
            devotional_note_am: String(row.devotional_note_am).trim(), devotional_note_en: String(row.devotional_note_en ?? "").trim() || undefined,
            confession_am: String(row.confession_am).trim(), confession_en: String(row.confession_en ?? "").trim() || undefined,
          });
        });
        resolve({ rows, errors });
      } catch { resolve({ rows: [], errors: ["Could not read file."] }); }
    };
    reader.readAsArrayBuffer(file);
  });
}

// ── Form with ONE language toggle at the top ───────────────────────────────
function DevotionalForm({ form, setForm, lang, setLang, onSubmit, isPending, isError, submitLabel, hint }: {
  form: Partial<Devotional>;
  setForm: React.Dispatch<React.SetStateAction<Partial<Devotional>>>;
  lang: Lang; setLang: (l: Lang) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean; isError: boolean;
  submitLabel: string; hint?: string;
}) {
  const isAm = lang === "am";
  const set = (amField: keyof Devotional, enField: keyof Devotional) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [isAm ? amField : enField]: e.target.value }));

  const inputCls = "w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400";
  const labelCls = "text-sm font-semibold text-gray-700 block mb-1";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Single language toggle */}
      <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
        <span className="text-sm font-semibold text-gray-600">Editing in:</span>
        <div className="inline-flex rounded-md border border-gray-300 overflow-hidden text-sm font-semibold">
          <button type="button" onClick={() => setLang("am")}
            className={`px-5 py-1.5 transition-colors ${isAm ? "bg-purple-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
            አማርኛ
          </button>
          <button type="button" onClick={() => setLang("en")}
            className={`px-5 py-1.5 transition-colors ${!isAm ? "bg-purple-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
            English
          </button>
        </div>
      </div>

      <div>
        <label className={labelCls}>Title {isAm && <span className="text-red-500">*</span>}</label>
        <input type="text" required={isAm} className={inputCls}
          placeholder={isAm ? "ርዕስ (አማርኛ)" : "Title (English)"}
          value={isAm ? (form.title_am ?? "") : (form.title_en ?? "")}
          onChange={set("title_am", "title_en")} />
      </div>

      <div>
        <label className={labelCls}>Verse Reference {isAm && <span className="text-red-500">*</span>}</label>
        <input type="text" required={isAm} className={inputCls}
          placeholder={isAm ? "ለምሳሌ፡ ዮሐ 3:16" : "e.g. John 3:16"}
          value={isAm ? (form.verse_reference_am ?? "") : (form.verse_reference_en ?? "")}
          onChange={set("verse_reference_am", "verse_reference_en")} />
      </div>

      <div>
        <label className={labelCls}>Verse Text (quote) {isAm && <span className="text-red-500">*</span>}</label>
        <textarea rows={4} required={isAm} className={`${inputCls} resize-y`}
          placeholder={isAm ? "የቁጥሩ ጽሑፍ..." : "The verse text..."}
          value={isAm ? (form.verse_text_am ?? "") : (form.verse_text_en ?? "")}
          onChange={set("verse_text_am", "verse_text_en")} />
      </div>

      <div>
        <label className={labelCls}>Devotional {isAm && <span className="text-red-500">*</span>}</label>
        <textarea rows={8} required={isAm} className={`${inputCls} resize-y`}
          placeholder={isAm ? "የዕለቱ ቃል..." : "Today's devotional message..."}
          value={isAm ? (form.devotional_note_am ?? "") : (form.devotional_note_en ?? "")}
          onChange={set("devotional_note_am", "devotional_note_en")} />
        <p className="text-xs text-gray-400 mt-1">Press Enter between paragraphs to separate them into new lines.</p>
      </div>

      <div>
        <label className={labelCls}>አዋጅ / Confession {isAm && <span className="text-red-500">*</span>}</label>
        <textarea rows={4} required={isAm} className={`${inputCls} resize-y`}
          placeholder={isAm ? "አዋጅ..." : "Confession..."}
          value={isAm ? (form.confession_am ?? "") : (form.confession_en ?? "")}
          onChange={set("confession_am", "confession_en")} />
      </div>

      {isError && <p className="text-sm text-red-600">Failed. Please try again.</p>}
      <button type="submit" disabled={isPending}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors">
        {isPending ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}

function DeleteDialog({ name, onConfirm, onCancel, isPending }: { name: string; onConfirm: () => void; onCancel: () => void; isPending: boolean }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Delete Devotional</h3>
        <p className="text-sm text-gray-600">Are you sure you want to delete <span className="font-semibold">"{name}"</span>? This cannot be undone.</p>
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

// ── Devotional preview styled like the public page ─────────────────────────
function DevotionalPreview({ d, lang, onEdit, onDelete }: {
  d: Devotional; lang: Lang; onEdit: () => void; onDelete: () => void;
}) {
  const isAm = lang === "am";
  const title = isAm ? d.title_am : (d.title_en || d.title_am);
  const verseRef = isAm ? d.verse_reference_am : (d.verse_reference_en || d.verse_reference_am);
  const verseText = isAm ? d.verse_text_am : (d.verse_text_en || d.verse_text_am);
  const note = isAm ? (d.devotional_note_am ?? "") : (d.devotional_note_en || (d.devotional_note_am ?? ""));
  const confession = isAm ? (d.confession_am ?? "") : (d.confession_en || (d.confession_am ?? ""));
  const today = d.publish_date
    ? new Date(d.publish_date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
    : new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="font-outfit font-bold text-3xl text-[#242054] mb-2">Today's Devotional</h2>
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
          <Calendar className="w-4 h-4" />
          <span>{today}</span>
          <span className={`ml-3 px-2 py-0.5 rounded-full text-xs font-semibold ${d.is_published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
            {d.is_published ? "Published" : "Draft"}
          </span>
        </div>
      </div>

      {/* Card */}
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Purple header bar */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-5 flex items-center justify-between gap-4">
          <h3 className="font-bold text-xl text-white flex-1 text-center">{title}</h3>
          <div className="flex gap-2 flex-shrink-0">
            <button onClick={onEdit} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-lg text-xs font-semibold transition-colors">
              <Pencil className="w-3.5 h-3.5" /> Edit
            </button>
            <button onClick={onDelete} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-lg text-xs font-semibold transition-colors">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Scripture box */}
          <div className="bg-gradient-to-br from-purple-100 to-purple-50 border-l-4 border-purple-600 rounded-r-lg p-6">
            <p className="text-xs font-semibold text-purple-800 uppercase tracking-wide mb-2">
              {isAm ? "የመጽሐፍ ቅዱስ ማጣቀሻ" : "Scripture Reference"}
            </p>
            <p className="font-bold text-xl text-purple-900 mb-3">{verseRef}</p>
            <blockquote className="text-base text-gray-800 leading-relaxed italic border-l-2 border-purple-400 pl-4">
              "{verseText}"
            </blockquote>
          </div>

          {/* Devotional note */}
          <div className="space-y-4 text-gray-700 leading-relaxed text-base">
            {(note || "").split(/\r?\n/).filter(Boolean).map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Confession */}
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
            <h4 className="font-bold text-xl text-purple-900 mb-3 flex items-center gap-2">
              <span className="w-1 h-7 bg-purple-600 rounded" />
              {isAm ? "አዋጅ" : "Confession"}
            </h4>
            <p className="text-gray-800 leading-relaxed italic">{confession}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
const Devotionals: React.FC = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [view, setView] = useState<"list" | "add" | "bulk" | "view" | "edit">("list");
  const [selectedDevotional, setSelectedDevotional] = useState<Devotional | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Devotional | null>(null);
  const [lang, setLang] = useState<Lang>("am");

  const [form, setForm] = useState<Partial<Devotional>>(emptyForm());

  const [preview, setPreview] = useState<DevotionalInput[]>([]);
  const [parseErrors, setParseErrors] = useState<string[]>([]);
  const [fileName, setFileName] = useState("");
  const [bulkSuccess, setBulkSuccess] = useState<number | null>(null);

  const { data: devotionals, isLoading } = useQuery<Devotional[], Error>({
    queryKey: ["devotionals"],
    queryFn: fetchDevotionals,
  });

  const addMutation = useMutation<Devotional, Error, Partial<Devotional>>({
    mutationFn: async payload => { const { data } = await addDevotional(payload); return (data?.devotional ?? data) as Devotional; },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["devotionals"] }); setForm(emptyForm()); setView("list"); },
  });

  const updateMutation = useMutation<any, Error, { id: string; data: Partial<Devotional> }>({
    mutationFn: ({ id, data }) => updateDevotional(id, data),
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["devotionals"] });
      // Refresh the selected devotional with updated data
      const updated = { ...selectedDevotional, ...vars.data } as Devotional;
      setSelectedDevotional(updated);
      setView("view");
    },
  });

  const deleteMutation = useMutation<any, Error, string>({
    mutationFn: id => deleteDevotional(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["devotionals"] }); setDeleteTarget(null); setView("list"); setSelectedDevotional(null); },
  });

  const bulkMutation = useMutation<any, Error, DevotionalInput[]>({
    mutationFn: rows => addMultipleDevotionals(rows),
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ["devotionals"] });
      setBulkSuccess(data?.data?.devotionals?.length ?? preview.length);
      setPreview([]); setParseErrors([]); setFileName("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
  });

  const togglePublish = useMutation<any, Error, Devotional>({
    mutationFn: async d => (await api.put(`/devotional/${d._id}/publish`, { is_published: !d.is_published })).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["devotionals"] }),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setBulkSuccess(null); setFileName(file.name);
    const { rows, errors } = await parseSheet(file);
    setPreview(rows); setParseErrors(errors);
  };
  const clearFile = () => { setPreview([]); setParseErrors([]); setFileName(""); setBulkSuccess(null); if (fileInputRef.current) fileInputRef.current.value = ""; };

  const openView = (d: Devotional) => { setSelectedDevotional(d); setView("view"); };
  const openEdit = (d: Devotional) => {
    setSelectedDevotional(d);
    setForm({ title_am: d.title_am, title_en: d.title_en ?? "", verse_reference_am: d.verse_reference_am, verse_reference_en: d.verse_reference_en ?? "", verse_text_am: d.verse_text_am, verse_text_en: d.verse_text_en ?? "", devotional_note_am: d.devotional_note_am, devotional_note_en: d.devotional_note_en ?? "", confession_am: d.confession_am, confession_en: d.confession_en ?? "" });
    setView("edit");
  };

  const list = devotionals ?? [];

  // ── Filter logic ──
  const [filter, setFilter] = useState<"all" | "published" | "unpublished" | "today">("all");

  const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(); todayEnd.setHours(23, 59, 59, 999);

  const filteredList = list.filter(d => {
    if (filter === "published") return d.is_published;
    if (filter === "unpublished") return !d.is_published;
    if (filter === "today") {
      if (!d.publish_date) return false;
      const pd = new Date(d.publish_date);
      return pd >= todayStart && pd <= todayEnd;
    }
    return true;
  });

  // ── View ──
  if (view === "view" && selectedDevotional) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6 max-w-3xl mx-auto">
          <button onClick={() => setView("list")} className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 font-semibold">
            <ChevronLeft className="w-4 h-4" /> Back to list
          </button>
          {/* Language toggle for preview */}
          <div className="inline-flex rounded-md border border-gray-300 overflow-hidden text-sm font-semibold">
            <button type="button" onClick={() => setLang("am")} className={`px-4 py-1.5 transition-colors ${lang === "am" ? "bg-purple-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>አማርኛ</button>
            <button type="button" onClick={() => setLang("en")} className={`px-4 py-1.5 transition-colors ${lang === "en" ? "bg-purple-600 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>English</button>
          </div>
        </div>
        <DevotionalPreview
          d={selectedDevotional}
          lang={lang}
          onEdit={() => openEdit(selectedDevotional)}
          onDelete={() => setDeleteTarget(selectedDevotional)}
        />
        {deleteTarget && (
          <DeleteDialog name={deleteTarget.title_am} isPending={deleteMutation.isPending}
            onConfirm={() => deleteMutation.mutate(deleteTarget._id)}
            onCancel={() => setDeleteTarget(null)} />
        )}
      </div>
    );
  }

  // ── Edit ──
  if (view === "edit" && selectedDevotional) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <button onClick={() => setView("view")} className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 mb-6 font-semibold">
          <ChevronLeft className="w-4 h-4" /> Back to view
        </button>
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-6">Edit Devotional</h2>
          <DevotionalForm
            form={form} setForm={setForm} lang={lang} setLang={setLang}
            onSubmit={e => { e.preventDefault(); updateMutation.mutate({ id: selectedDevotional._id, data: form }); }}
            isPending={updateMutation.isPending} isError={updateMutation.isError}
            submitLabel="Save Changes"
          />
          <button type="button" onClick={() => setView("view")} className="w-full mt-3 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // ── List ──
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Devotionals</h1>

      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6 w-fit">
        {(["single", "bulk"] as const).map(tab => (
          <button key={tab} onClick={() => setView(tab === "single" ? "add" : "bulk")}
            className={`px-5 py-2 rounded-md text-sm font-semibold transition-colors ${(view === "add" && tab === "single") || (view === "bulk" && tab === "bulk") ? "bg-white shadow text-purple-700" : "text-gray-500 hover:text-gray-700"}`}>
            {tab === "single" ? "Add Single" : "Bulk Upload"}
          </button>
        ))}
        {(view === "add" || view === "bulk") && (
          <button onClick={() => setView("list")} className="px-3 py-2 rounded-md text-sm font-semibold text-gray-500 hover:text-gray-700">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Add single */}
      {view === "add" && (
        <div className="bg-white rounded-xl shadow p-6 mb-10">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-6">Add New Devotional</h2>
          <DevotionalForm
            form={form} setForm={setForm} lang={lang} setLang={setLang}
            onSubmit={e => { e.preventDefault(); addMutation.mutate(form); }}
            isPending={addMutation.isPending} isError={addMutation.isError}
            submitLabel="Add Devotional"
          />
        </div>
      )}

      {/* Bulk upload */}
      {view === "bulk" && (
        <div className="bg-white rounded-xl shadow p-6 mb-10 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Bulk Upload via Excel / CSV</h2>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-start gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-purple-800 mb-1">Step 1 — Download the template</p>
              <p className="text-xs text-purple-600">Fill in the spreadsheet — each row is one devotional. Press <span className="font-semibold">Alt + Enter</span> inside a cell to add paragraph breaks.</p>
            </div>
            <button onClick={downloadTemplate} className="flex-shrink-0 flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              <Download className="w-4 h-4" /> Template
            </button>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">Step 2 — Upload your filled spreadsheet</p>
            <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 hover:border-purple-400 rounded-lg p-8 text-center cursor-pointer transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              {fileName ? (
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-medium text-gray-700">{fileName}</span>
                  <button type="button" onClick={e => { e.stopPropagation(); clearFile(); }} className="text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                </div>
              ) : <p className="text-sm text-gray-500">Click to select a <span className="font-semibold">.xlsx</span> or <span className="font-semibold">.csv</span> file</p>}
            </div>
            <input ref={fileInputRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFileChange} />
          </div>
          {parseErrors.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-1">
              <div className="flex items-center gap-2 text-red-700 font-semibold text-sm mb-2"><AlertCircle className="w-4 h-4" />{parseErrors.length} row(s) have errors:</div>
              {parseErrors.map((err, i) => <p key={i} className="text-xs text-red-600 pl-6">{err}</p>)}
            </div>
          )}
          {bulkSuccess !== null && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 text-green-700">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-semibold">{bulkSuccess} devotional(s) uploaded successfully.</p>
            </div>
          )}
          {preview.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Preview — {preview.length} devotional(s) ready</p>
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 text-gray-600 uppercase tracking-wide">
                    <tr><th className="px-3 py-2 text-left">#</th><th className="px-3 py-2 text-left">Title (አማ)</th><th className="px-3 py-2 text-left">Title (EN)</th><th className="px-3 py-2 text-left">Verse Ref</th><th className="px-3 py-2 text-left">Devotional (preview)</th></tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {preview.map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-3 py-2 text-gray-400">{i + 1}</td>
                        <td className="px-3 py-2 font-medium text-gray-800 max-w-[160px] truncate">{row.title_am}</td>
                        <td className="px-3 py-2 text-gray-500 max-w-[160px] truncate">{row.title_en ?? "—"}</td>
                        <td className="px-3 py-2 text-gray-600">{row.verse_reference_am}</td>
                        <td className="px-3 py-2 text-gray-500 max-w-[200px] truncate">{row.devotional_note_am.slice(0, 80)}{row.devotional_note_am.length > 80 ? "…" : ""}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {bulkMutation.isError && <p className="text-sm text-red-600 mt-2">Upload failed. Please try again.</p>}
              <button onClick={() => bulkMutation.mutate(preview)} disabled={bulkMutation.isPending}
                className="mt-4 w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Upload className="w-4 h-4" />
                {bulkMutation.isPending ? "Uploading..." : `Upload ${preview.length} Devotional(s)`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* List */}
      <div className="flex items-center justify-between mb-3 mt-2">
        <h2 className="text-lg font-semibold text-gray-800">All Devotionals</h2>
        <span className="text-xs text-gray-400">{filteredList.length} of {list.length}</span>
      </div>

      {/* Filter bar */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {([
          { key: "all", label: "All" },
          { key: "published", label: "Published" },
          { key: "unpublished", label: "Unpublished" },
          { key: "today", label: "Today's" },
        ] as const).map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${filter === f.key ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>
            {f.label}
          </button>
        ))}
      </div>

      {isLoading && <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" /></div>}

      {deleteTarget && (
        <DeleteDialog name={deleteTarget.title_am} isPending={deleteMutation.isPending}
          onConfirm={() => deleteMutation.mutate(deleteTarget._id)}
          onCancel={() => setDeleteTarget(null)} />
      )}

      <div className="space-y-3">
        {filteredList.map(d => (
          <div key={d._id} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => openView(d)}>
              <p className="font-semibold text-gray-800 truncate hover:text-purple-700 transition-colors">{d.title_am}</p>
              {d.title_en && <p className="text-sm text-gray-500 truncate">{d.title_en}</p>}
              <p className="text-xs text-gray-400 mt-1">{d.is_published ? `Published${d.publish_date ? " · " + new Date(d.publish_date).toLocaleDateString() : ""}` : "Draft"}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => openView(d)} title="View" className="p-1.5 text-gray-400 hover:text-purple-600 transition-colors"><Eye className="w-4 h-4" /></button>
              <button onClick={() => openEdit(d)} title="Edit" className="p-1.5 text-gray-400 hover:text-purple-600 transition-colors"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => setDeleteTarget(d)} title="Delete" className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              <button onClick={() => togglePublish.mutate(d)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${d.is_published ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}>
                {d.is_published ? "Unpublish" : "Publish"}
              </button>
            </div>
          </div>
        ))}
        {!isLoading && filteredList.length === 0 && (
          <p className="text-center text-gray-400 py-8">
            {filter === "today" ? "No devotional published today." : filter === "published" ? "No published devotionals." : filter === "unpublished" ? "No unpublished devotionals." : "No devotionals yet."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Devotionals;
