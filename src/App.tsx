import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Layouts & Guards
import PublicLayout from "./components/PublicLayout";
import AdminLayout from "./components/admin/AdminLayout";
import RoleGuard from "./components/admin/RoleGuard";

// Public Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Ministry from "./pages/Ministry";
import MinistryDetail from "./pages/MinistryDetail";
import ServicesPage from "./pages/ServicesPage";
import TeachingsPage from "./pages/TeachingsPage";
import TestimoniesPage from "./pages/TestimoniesPage";
import BibleCollege from "./pages/BibleCollege";
import DiscoverPage from "./pages/DiscoverPage";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import AbcDashboard from "./pages/admin/AbcDashboard";
import AdminUsers from "./pages/admin/Users";
import Devotionals from "./pages/admin/Devotionals";
import AdminTeachings from "./pages/admin/Teachings";
import AdminTestimonies from "./pages/admin/Testimonies";
import AdminNewsletter from "./pages/admin/Newsletter";
import AdminMessages from "./pages/admin/Messages";
import AdminApplications from "./pages/admin/Applications";
import ChangePassword from "./pages/admin/ChangePassword";

const BASE = "/ncic-admin-panel1";

const queryClient = new QueryClient();

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public Website */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/ministry" element={<Navigate to="/" replace />} />
            <Route path="/ministry/:id" element={<Navigate to="/" replace />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/teachings" element={<TeachingsPage />} />
            <Route path="/testimonies" element={<TestimoniesPage />} />
            <Route path="/bible-college" element={<BibleCollege />} />
          </Route>

          {/* /ncic-admin-panel1 → redirect to login */}
          <Route path={BASE} element={<Navigate to={`${BASE}/login`} replace />} />

          {/* Login — no layout */}
          <Route path={`${BASE}/login`} element={<AdminLogin />} />

          {/* Admin Panel — requires auth */}
          <Route element={<AdminLayout />}>
            {/* superAdmin + admin */}
            <Route path={`${BASE}/dashboard`} element={
              <RoleGuard allowedRoles={["superAdmin", "admin"]}>
                <Dashboard />
              </RoleGuard>
            } />
            <Route path={`${BASE}/devotionals`} element={
              <RoleGuard allowedRoles={["superAdmin", "admin"]}>
                <Devotionals />
              </RoleGuard>
            } />
            <Route path={`${BASE}/teachings`} element={
              <RoleGuard allowedRoles={["superAdmin", "admin"]}>
                <AdminTeachings />
              </RoleGuard>
            } />
            <Route path={`${BASE}/testimonies`} element={
              <RoleGuard allowedRoles={["superAdmin", "admin"]}>
                <AdminTestimonies />
              </RoleGuard>
            } />
            <Route path={`${BASE}/messages`} element={
              <RoleGuard allowedRoles={["superAdmin", "admin"]}>
                <AdminMessages />
              </RoleGuard>
            } />
            <Route path={`${BASE}/newsletter`} element={
              <RoleGuard allowedRoles={["superAdmin", "admin"]}>
                <AdminNewsletter />
              </RoleGuard>
            } />

            {/* All roles */}
            <Route path={`${BASE}/applications`} element={
              <RoleGuard allowedRoles={["superAdmin", "admin", "abc"]}>
                <AdminApplications />
              </RoleGuard>
            } />
            <Route path={`${BASE}/change-password`} element={
              <RoleGuard allowedRoles={["superAdmin", "admin", "abc"]}>
                <ChangePassword />
              </RoleGuard>
            } />

            {/* abc only */}
            <Route path={`${BASE}/abc-dashboard`} element={
              <RoleGuard allowedRoles={["abc"]}>
                <AbcDashboard />
              </RoleGuard>
            } />

            {/* superAdmin only */}
            <Route path={`${BASE}/users`} element={
              <RoleGuard allowedRoles={["superAdmin"]}>
                <AdminUsers />
              </RoleGuard>
            } />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
