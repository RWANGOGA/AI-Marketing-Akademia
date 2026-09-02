import type { Metadata } from "next";
<<<<<<< HEAD

export const metadata: Metadata = {
  title: "Admin | Akademia",
=======
import "./admin.css";
import { Sidebar } from "./_components/Sidebar";

export const metadata: Metadata = {
  title: "Admin | AI Marketer",
>>>>>>> frontend-setup
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
<<<<<<< HEAD
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 bg-slate-900 text-slate-100 p-4">
        {/* TODO: port sidebar nav from AI_Marker_Admin_side.html */}
        <div className="font-semibold mb-6">Akademia — Admin</div>
        <nav className="flex flex-col gap-1 text-sm">
          <a href="/admin/dashboard">Dashboard</a>
          <a href="/admin/leads">Leads</a>
          <a href="/admin/campaigns">Campaigns</a>
          <a href="/admin/products">Products</a>
        </nav>
      </aside>
      <main className="flex-1 bg-slate-50 p-8">{children}</main>
=======
    <div className="admin-body">
      <div id="app">
        <Sidebar />
        <div className="main">
          <div className="topbar">
            <div className="crumb">
              <b>Admin</b>
            </div>
            <div className="topbar-right">
              <div className="avatar">JN</div>
            </div>
          </div>
          <div id="workspace">{children}</div>
        </div>
      </div>
>>>>>>> frontend-setup
    </div>
  );
}
