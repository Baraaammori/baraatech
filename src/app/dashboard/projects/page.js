import { createClient } from "@/lib/supabase/server";
import { hasPermission } from "@/lib/auth/rbac";
import PermissionDenied from "../../../components/dashboard/permission-denied";
import CrudPanel from "../../../components/dashboard/crud-panel";

export default async function DashboardProjectsPage() {
  const allowed = await hasPermission("view.projects");
  if (!allowed) return <PermissionDenied />;

  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("id, title_en, slug, published, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return <CrudPanel title="Projects" endpoint="/api/admin/projects" initialItems={data ?? []} fields={[{ name: "slug", label: "Slug", required: true }, { name: "title_en", label: "Title", required: true }, { name: "short_description_en", label: "Short Description", required: true }, { name: "full_description_en", label: "Full Description", required: true }, { name: "cpu", label: "CPU" }, { name: "gpu", label: "GPU" }, { name: "ram", label: "RAM" }, { name: "storage", label: "Storage" }, { name: "performance_category", label: "Performance Category" }, { name: "resolution_category", label: "Resolution (1080p/1440p/4K)", required: true }]} />;
}
