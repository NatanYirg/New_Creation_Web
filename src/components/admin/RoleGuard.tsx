import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  allowedRoles: string[];
  children: React.ReactNode;
}

export default function RoleGuard({ allowedRoles, children }: Props) {
  const user = JSON.parse(localStorage.getItem("ncic_user") ?? "{}");
  const role = user.role ?? "";

  if (!allowedRoles.includes(role)) {
    // Redirect abc users to their dashboard, others to main dashboard
    return <Navigate to={role === "abc" ? "/ncic-admin-panel1/abc-dashboard" : "/ncic-admin-panel1/dashboard"} replace />;
  }

  return <>{children}</>;
}
