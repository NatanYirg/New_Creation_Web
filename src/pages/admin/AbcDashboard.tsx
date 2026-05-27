import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAllApplications } from "../../api/bibleCollege";
import { GraduationCap, Clock, CheckCircle, XCircle, Eye, ArrowRight } from "lucide-react";

const AbcDashboard: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("ncic_user") ?? "{}");

  const { data, isLoading } = useQuery({
    queryKey: ["abc-dashboard-applications"],
    queryFn: async () => { const r = await getAllApplications(); return r.data; },
  });

  const counts = data?.counts ?? {};
  const recent = (data?.applications ?? []).slice(0, 5);

  const STATUS_STYLES: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    reviewed: "bg-blue-100 text-blue-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.first_name} 👋</h1>
        <p className="text-sm text-gray-500 mt-1">Applied Bible College — Applications Dashboard</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total", value: counts.total ?? 0, icon: GraduationCap, color: "border-purple-600 bg-purple-50 text-purple-600" },
          { label: "Pending", value: counts.pending ?? 0, icon: Clock, color: "border-yellow-500 bg-yellow-50 text-yellow-600" },
          { label: "Accepted", value: counts.accepted ?? 0, icon: CheckCircle, color: "border-green-500 bg-green-50 text-green-600" },
          { label: "Rejected", value: counts.rejected ?? 0, icon: XCircle, color: "border-red-500 bg-red-50 text-red-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className={`bg-white rounded-xl shadow p-5 border-l-4 ${color.split(" ")[0]}`}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${color.split(" ").slice(1).join(" ")}`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{isLoading ? "—" : value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Pending alert */}
      {(counts.pending ?? 0) > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <p className="text-sm font-semibold text-amber-800">
              {counts.pending} application{counts.pending !== 1 ? "s" : ""} waiting for review
            </p>
          </div>
          <Link to="/admin/applications" className="flex items-center gap-1 text-sm text-amber-700 font-semibold hover:underline">
            Review <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Recent applications */}
      <div className="bg-white rounded-xl shadow p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">Recent Applications</h2>
          <Link to="/admin/applications" className="text-xs text-purple-600 hover:underline font-semibold flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        {isLoading ? (
          <div className="flex justify-center py-8"><div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" /></div>
        ) : recent.length === 0 ? (
          <p className="text-center text-gray-400 py-8">No applications yet.</p>
        ) : (
          <div className="space-y-3">
            {recent.map((app: any) => (
              <div key={app._id} className="flex items-center justify-between gap-4 py-2 border-b border-gray-50 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 text-sm truncate">{app.full_name}</p>
                  <p className="text-xs text-gray-500">{app.program_interest} · {app.learning_mode}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[app.status]}`}>{app.status}</span>
                  <p className="text-xs text-gray-400">{new Date(app.submitted_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AbcDashboard;
