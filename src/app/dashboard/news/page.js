import { createClient } from "@/lib/supabase/server";
import { hasPermission } from "@/lib/auth/rbac";
import PermissionDenied from "../../../components/dashboard/permission-denied";
import CrudPanel from "../../../components/dashboard/crud-panel";

export default async function DashboardNewsPage() {
  const allowed = await hasPermission("view.news");
  if (!allowed) return <PermissionDenied />;

  const supabase = await createClient();
  const { data } = await supabase
    .from("news")
    .select("id, title_en, slug, published, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return <CrudPanel title="News" endpoint="/api/admin/news" initialItems={data ?? []} fields={[{ name: "slug", label: "Slug", required: true }, { name: "title_en", label: "Title", required: true }, { name: "content_en", label: "Content", required: true }]} />;
}
