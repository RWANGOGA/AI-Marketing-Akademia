"use client";

import type { Metadata } from "next";
import "./admin.css";
import AdminSidebar from "./_components/Sidebar";
import { AuthProvider, useAuth } from "./_components/auth-context";
import RequireAuth from "./_components/RequireAuth";

export const metadata: Metadata = {
  title: "Admin | AI Marketer",
};

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-body">
      <AdminSidebar />
      <div className="main">
        <div className="topbar">
          <div className="crumb">
            <b>Admin</b>
          </div>
          <div className="topbar-right">
            <div className="avatar">AM</div>
          </div>
        </div>
        <RequireAuth>
          <div id="workspace">{children}</div>
        </RequireAuth>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AuthProvider>
  );
}
