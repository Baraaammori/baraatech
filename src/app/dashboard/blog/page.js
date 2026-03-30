import { createClient } from "@/lib/supabase/server";
import { hasPermission } from "@/lib/auth/rbac";
import PermissionDenied from "../../../components/dashboard/permission-denied";
import CrudPanel from "../../../components/dashboard/crud-panel";

export default async function DashboardBlogPage() {
  const allowed = await hasPermission("view.blogs");
  if (!allowed) return <PermissionDenied />;

  const supabase = await createClient();
  const { data } = await supabase
    .from("blogs")
    .select("id, title_en, slug, published, updated_at")
    .order("updated_at", { ascending: false })
    .limit(50);

  return <CrudPanel title="Blog" endpoint="/api/admin/blogs" initialItems={data ?? []} fields={[{ name: "slug", label: "Slug", required: true }, { name: "title_en", label: "Title", required: true }, { name: "content_en", label: "Content", required: true }]} />;
}
