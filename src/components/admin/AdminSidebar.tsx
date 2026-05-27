import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Video, MessageSquare, Users, Mail, GraduationCap, LayoutDashboard, LogOut, FileText, Lock } from "lucide-react";
import nciclogo from "@/assets/nciclogoinwhitec.png";

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("ncic_user") ?? "{}");
  const role = user.role ?? "admin";

  const handleLogout = () => {
    localStorage.removeItem("ncic_token");
    localStorage.removeItem("ncic_user");
    navigate("/ncic-admin-panel1/login");
  };

  const active = (path: string) =>
    location.pathname === path
      ? "bg-white/20 text-white font-semibold"
      : "text-white/70 hover:bg-white/10 hover:text-white";

  const NavLink = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => (
    <Link to={to} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${active(to)}`}>
      <Icon className="w-4 h-4 flex-shrink-0" />
      {label}
    </Link>
  );

  const BASE = "/ncic-admin-panel1";

  return (
    <div className="w-60 bg-[#2B1F66] h-screen flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-white/10">
        <img src={nciclogo} alt="NCIC" className="h-10 w-auto" />
        <p className="text-white/50 text-xs mt-1 capitalize">{role === "abc" ? "ABC User" : role}</p>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {role === "abc" ? (
          <>
            <NavLink to={`${BASE}/abc-dashboard`} icon={LayoutDashboard} label="Dashboard" />
            <NavLink to={`${BASE}/applications`} icon={GraduationCap} label="Applications" />
            <NavLink to={`${BASE}/change-password`} icon={Lock} label="Change Password" />
          </>
        ) : (
          <>
            <NavLink to={`${BASE}/dashboard`} icon={LayoutDashboard} label="Dashboard" />
            <div className="pt-2 pb-1 px-3 text-xs text-white/40 uppercase tracking-wider">Content</div>
            <NavLink to={`${BASE}/devotionals`} icon={BookOpen} label="Devotionals" />
            <NavLink to={`${BASE}/teachings`} icon={Video} label="Teachings" />
            <NavLink to={`${BASE}/testimonies`} icon={FileText} label="Testimonies" />
            <div className="pt-2 pb-1 px-3 text-xs text-white/40 uppercase tracking-wider">Engagement</div>
            <NavLink to={`${BASE}/messages`} icon={MessageSquare} label="Messages" />
            <NavLink to={`${BASE}/newsletter`} icon={Mail} label="Newsletter" />
            <NavLink to={`${BASE}/applications`} icon={GraduationCap} label="Applications" />
            <div className="pt-2 pb-1 px-3 text-xs text-white/40 uppercase tracking-wider">Account</div>
            <NavLink to={`${BASE}/change-password`} icon={Lock} label="Change Password" />
            {role === "superAdmin" && (
              <>
                <div className="pt-2 pb-1 px-3 text-xs text-white/40 uppercase tracking-wider">System</div>
                <NavLink to={`${BASE}/users`} icon={Users} label="Users" />
              </>
            )}
          </>
        )}
      </nav>

      {/* User info + logout */}
      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-3 px-3 py-2 mb-1">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {user.first_name?.[0] ?? "?"}
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">{user.first_name ?? "User"}</p>
            <p className="text-white/50 text-xs truncate">{user.email ?? ""}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors text-sm">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  );
}
