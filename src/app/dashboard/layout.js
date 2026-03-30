import { redirect } from "next/navigation";
import DashboardNav from "../../components/dashboard/nav";
import SidebarWrapper from "../../components/dashboard/sidebar-wrapper";
import { getCurrentUser, getCurrentUserPermissions } from "@/lib/auth/rbac";

export default async function DashboardLayout({ children }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const permissions = await getCurrentUserPermissions();
  const userInitial = user.email?.charAt(0).toUpperCase() || "U";

  const sidebarContent = (
    <>
      
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--cyan)] to-[var(--magenta)]">
          <span className="font-[var(--font-display)] text-lg font-black text-black">B</span>
        </div>
        <div>
          <span className="font-[var(--font-display)] text-lg font-bold text-white">BARAA</span>
          <span className="font-[var(--font-code)] text-[10px] text-[var(--gray-600)] ml-1">.ADMIN</span>
        </div>
      </div>

      
      <div className="dash-user mt-8">
        <div className="dash-user-avatar">{userInitial}</div>
        <div className="dash-user-info">
          <p className="dash-user-name">{user.email}</p>
          <p className="dash-user-role">Administrator</p>
        </div>
      </div>

      
      <DashboardNav permissions={Array.from(permissions)} />

      
      <div className="mt-auto pt-6 border-t border-white/5">
        <a href="/api/auth/logout" className="dash-nav-item text-[var(--magenta)] hover:bg-[var(--magenta)]/10">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
          </svg>
          Logout
        </a>
      </div>
    </>
  );

  return (
    <div className="dash-layout">
      <SidebarWrapper sidebarContent={sidebarContent}>
        {children}
      </SidebarWrapper>
    </div>
  );
}
