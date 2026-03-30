import { createClient } from "@/lib/supabase/server";

export default async function DashboardHomePage() {
  const supabase = await createClient();  const [projectsRes, blogsRes, messagesRes, usersRes] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
    supabase.from("contact_messages").select("id", { count: "exact", head: true }).eq("read", false),
    supabase.from("profiles").select("id", { count: "exact", head: true }),
  ]);

  const stats = [
    {
      label: "Total Projects",
      value: projectsRes.count ?? 0,
      color: "cyan",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      label: "Blog Posts",
      value: blogsRes.count ?? 0,
      color: "magenta",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
      ),
    },
    {
      label: "Unread Messages",
      value: messagesRes.count ?? 0,
      color: "lime",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      label: "Total Users",
      value: usersRes.count ?? 0,
      color: "purple",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
        </svg>
      ),
    },
  ];

  return (
    <section>
      
      <div className="mb-8">
        <p className="mono-xs mb-2">OVERVIEW</p>
        <h1 className="font-[var(--font-display)] text-3xl font-bold text-white">
          Dashboard
        </h1>
        <p className="text-[var(--gray-400)] mt-2">
          Welcome back. Here&apos;s what&apos;s happening with your platform.
        </p>
      </div>

      
      <div className="dash-stats">
        {stats.map((stat, i) => (
          <div key={i} className={`dash-stat ${stat.color}`}>
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: `rgba(var(--${stat.color === "cyan" ? "0, 229, 255" : stat.color === "magenta" ? "255, 0, 128" : stat.color === "lime" ? "0, 255, 106" : "128, 0, 255"}), 0.1)`,
                  color: `var(--${stat.color})`,
                }}
              >
                <span className="w-6 h-6">{stat.icon}</span>
              </div>
            </div>
            <p className="dash-stat-value">{stat.value}</p>
            <p className="dash-stat-label">{stat.label}</p>
          </div>
        ))}
      </div>

      
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="dash-card">
          <div className="dash-card-header">
            <h2 className="dash-card-title">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <a href="/dashboard/projects" className="dash-btn dash-btn-secondary">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Project
            </a>
            <a href="/dashboard/blog" className="dash-btn dash-btn-secondary">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              New Blog Post
            </a>
            <a href="/dashboard/messages" className="dash-btn dash-btn-ghost">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              View Messages
            </a>
            <a href="/dashboard/settings" className="dash-btn dash-btn-ghost">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              Settings
            </a>
          </div>
        </div>

        <div className="dash-card">
          <div className="dash-card-header">
            <h2 className="dash-card-title">System Status</h2>
            <span className="dash-badge dash-badge-lime">Operational</span>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[var(--gray-400)] text-sm">Database</span>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--lime)] animate-pulse" />
                <span className="text-[var(--lime)] text-sm font-medium">Connected</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--gray-400)] text-sm">API</span>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--lime)] animate-pulse" />
                <span className="text-[var(--lime)] text-sm font-medium">Running</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--gray-400)] text-sm">Storage</span>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--lime)] animate-pulse" />
                <span className="text-[var(--lime)] text-sm font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
