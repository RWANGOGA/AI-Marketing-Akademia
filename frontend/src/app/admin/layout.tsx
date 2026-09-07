import type { Metadata } from "next";
import "./admin.css";
import { Sidebar } from "./_components/Sidebar";

export const metadata: Metadata = {
  title: "Admin | AI Marketer",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
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
    </div>
  );
}
