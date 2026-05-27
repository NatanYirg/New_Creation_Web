import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { api } from "../../api/axios";
import { getAllSubscribers } from "../../api/newsletter";
import { getAllMessages } from "../../api/contact";
import { getAllApplications } from "../../api/bibleCollege";
import {
  BookOpen, Video, MessageSquare, Users, Mail, GraduationCap,
  FileText, CheckCircle, Clock, TrendingUp, ArrowRight,
} from "lucide-react";

// ── Stat card ──────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, color, href, sub }: {
  label: string; value: number | string; icon: React.ElementType;
  color: string; href: string; sub?: string;
}) {
  return (
    <Link to={href} className="block">
      <div className={`bg-white rounded-xl shadow p-5 flex items-center gap-4 hover:shadow-md transition-shadow border-l-4 ${color}`}>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${color.replace("border-", "bg-").replace("-600", "-100")}`}>
          <Icon className={`w-6 h-6 ${color.replace("border-", "text-")}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          <p className="text-sm text-gray-500 truncate">{label}</p>
          {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
        </div>
        <ArrowRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
      </div>
    </Link>
  );
}

// ── Quick link card ────────────────────────────────────────────────────────
function QuickLink({ label, description, href, icon: Icon }: {
  label: string; description: string; href: string; icon: React.ElementType;
}) {
  return (
    <Link to={href}
      className="bg-white rounded-xl shadow p-5 flex items-start gap-4 hover:shadow-md hover:border-purple-300 border-2 border-transparent transition-all">
      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-purple-600" />
      </div>
      <div>
        <p className="font-semibold text-gray-800 text-sm">{label}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
    </Link>
  );
}

const Dashboard: React.FC = () => {
  const { data: devotionalsData } = useQuery({
    queryKey: ["dashboard-devotionals"],
    queryFn: async () => { const r = await api.get("/devotional"); return r.data; },
  });

  const { data: teachingsData } = useQuery({
    queryKey: ["dashboard-teachings"],
    queryFn: async () => { const r = await api.get("/teaching"); return r.data; },
  });

  const { data: testimoniesData } = useQuery({
    queryKey: ["dashboard-testimonies"],
    queryFn: async () => { const r = await api.get("/testimony/video"); return r.data; },
  });

  const { data: writtenData } = useQuery({
    queryKey: ["dashboard-written-testimonies"],
    queryFn: async () => { const r = await api.get("/testimony/written"); return r.data; },
  });

  const { data: newsletterData } = useQuery({
    queryKey: ["dashboard-newsletter"],
    queryFn: async () => { const r = await getAllSubscribers(); return r.data; },
  });

  const { data: messagesData } = useQuery({
    queryKey: ["dashboard-messages"],
    queryFn: async () => { const r = await getAllMessages(); return r.data; },
  });

  const { data: applicationsData } = useQuery({
    queryKey: ["dashboard-applications"],
    queryFn: async () => { const r = await getAllApplications(); return r.data; },
  });

  const { data: managersData } = useQuery({
    queryKey: ["dashboard-managers"],
    queryFn: async () => { const r = await api.get("/admin/getAllContentManagers"); return r.data; },
  });

  // Derive counts
  const devotionals = devotionalsData?.devotionals ?? [];
  const publishedDevotionals = devotionals.filter((d: any) => d.is_published).length;
  const draftDevotionals = devotionals.length - publishedDevotionals;

  const teachings = teachingsData?.teachings ?? [];
  const publishedTeachings = teachings.filter((t: any) => t.is_published).length;

  const videoTestimonies = testimoniesData?.testimonies ?? [];
  const writtenTestimonies = writtenData?.testimonies ?? [];
  const pendingWritten = writtenTestimonies.filter((t: any) => !t.is_approved).length;

  const subscribers = newsletterData?.total ?? 0;
  const unreadMessages = messagesData?.unread ?? 0;
  const totalMessages = messagesData?.messages?.length ?? 0;

  const appCounts = applicationsData?.counts ?? {};
  const pendingApps = appCounts.pending ?? 0;
  const totalApps = appCounts.total ?? 0;

  const managers = managersData?.data?.length ?? 0;

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">{today}</p>
      </div>

      {/* Alert badges for items needing attention */}
      {(unreadMessages > 0 || pendingApps > 0 || pendingWritten > 0) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex flex-wrap gap-3 items-center">
          <span className="text-sm font-semibold text-amber-800">Needs attention:</span>
          {unreadMessages > 0 && (
            <Link to="/admin/messages" className="flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-amber-200 transition-colors">
              <MessageSquare className="w-3.5 h-3.5" /> {unreadMessages} unread message{unreadMessages !== 1 ? "s" : ""}
            </Link>
          )}
          {pendingApps > 0 && (
            <Link to="/admin/applications" className="flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-amber-200 transition-colors">
              <GraduationCap className="w-3.5 h-3.5" /> {pendingApps} pending application{pendingApps !== 1 ? "s" : ""}
            </Link>
          )}
          {pendingWritten > 0 && (
            <Link to="/admin/testimonies" className="flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-amber-200 transition-colors">
              <FileText className="w-3.5 h-3.5" /> {pendingWritten} testimony{pendingWritten !== 1 ? "ies" : ""} awaiting approval
            </Link>
          )}
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard label="Devotionals" value={devotionals.length} icon={BookOpen} color="border-purple-600"
          href="/admin/devotionals" sub={`${publishedDevotionals} published · ${draftDevotionals} drafts`} />
        <StatCard label="Teachings" value={teachings.length} icon={Video} color="border-blue-600"
          href="/admin/teachings" sub={`${publishedTeachings} published`} />
        <StatCard label="Video Testimonies" value={videoTestimonies.length} icon={Video} color="border-pink-600"
          href="/admin/testimonies" sub={`${videoTestimonies.filter((t: any) => t.is_published).length} published`} />
        <StatCard label="Written Testimonies" value={writtenTestimonies.length} icon={FileText} color="border-indigo-600"
          href="/admin/testimonies" sub={pendingWritten > 0 ? `${pendingWritten} awaiting approval` : "All reviewed"} />
        <StatCard label="Newsletter Subscribers" value={subscribers} icon={Mail} color="border-green-600"
          href="/admin/newsletter" />
        <StatCard label="Messages" value={totalMessages} icon={MessageSquare} color="border-orange-600"
          href="/admin/messages" sub={unreadMessages > 0 ? `${unreadMessages} unread` : "All read"} />
        <StatCard label="Bible College Applications" value={totalApps} icon={GraduationCap} color="border-yellow-600"
          href="/admin/applications" sub={pendingApps > 0 ? `${pendingApps} pending review` : "All reviewed"} />
        <StatCard label="Content Managers" value={managers} icon={Users} color="border-teal-600"
          href="/admin/content-managers" />
      </div>

      {/* Quick actions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <QuickLink label="Add Devotional" description="Create a new daily devotional" href="/admin/devotionals" icon={BookOpen} />
          <QuickLink label="Add Teaching" description="Upload a new sermon or teaching" href="/admin/teachings" icon={Video} />
          <QuickLink label="Review Applications" description="View Bible College applications" href="/admin/applications" icon={GraduationCap} />
          <QuickLink label="Read Messages" description="Check contact form messages" href="/admin/messages" icon={MessageSquare} />
        </div>
      </div>

      {/* Content overview */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Devotional queue status */}
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Devotional Queue</h3>
            <Link to="/admin/devotionals" className="text-xs text-purple-600 hover:underline font-semibold">View all</Link>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">Published</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">{publishedDevotionals}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-700">In queue (drafts)</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">{draftDevotionals}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-700">Total</span>
              </div>
              <span className="text-sm font-semibold text-gray-800">{devotionals.length}</span>
            </div>
            {draftDevotionals === 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mt-2">
                <p className="text-xs text-red-700 font-medium">⚠️ No devotionals in queue. Add more to keep the daily schedule running.</p>
              </div>
            )}
            {draftDevotionals > 0 && draftDevotionals <= 7 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-2">
                <p className="text-xs text-yellow-700 font-medium">⚡ Only {draftDevotionals} devotional{draftDevotionals !== 1 ? "s" : ""} left in queue. Consider adding more.</p>
              </div>
            )}
          </div>
        </div>

        {/* Application status breakdown */}
        <div className="bg-white rounded-xl shadow p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Bible College Applications</h3>
            <Link to="/admin/applications" className="text-xs text-purple-600 hover:underline font-semibold">View all</Link>
          </div>
          {totalApps === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">No applications yet.</p>
          ) : (
            <div className="space-y-3">
              {[
                { label: "Pending", count: appCounts.pending ?? 0, color: "bg-yellow-500" },
                { label: "Reviewed", count: appCounts.reviewed ?? 0, color: "bg-blue-500" },
                { label: "Accepted", count: appCounts.accepted ?? 0, color: "bg-green-500" },
                { label: "Rejected", count: appCounts.rejected ?? 0, color: "bg-red-500" },
              ].map(({ label, count, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${color}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">{label}</span>
                      <span className="text-sm font-semibold text-gray-800">{count}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full ${color}`} style={{ width: totalApps > 0 ? `${(count / totalApps) * 100}%` : "0%" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
