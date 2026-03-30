import { createClient } from "@/lib/supabase/server";
import { hasPermission } from "@/lib/auth/rbac";
import PermissionDenied from "../../../components/dashboard/permission-denied";
import CrudPanel from "../../../components/dashboard/crud-panel";

export default async function DashboardPagesContentPage() {
  const allowed = await hasPermission("manage.website_content");
  if (!allowed) return <PermissionDenied />;

  const supabase = await createClient();
  const { data } = await supabase
    .from("pages_content")
    .select("id, page_key, title_en, published, updated_at")
    .order("page_key", { ascending: true });

  const normalizedItems = (data ?? []).map((item) => ({
    ...item,
    slug: item.page_key,
    created_at: item.updated_at,
  }));

  return <CrudPanel title="Pages Content" endpoint="/api/admin/pages-content" initialItems={normalizedItems} editable={false} fields={[{ name: "page_key", label: "Page Key (home/about/services)", required: true }, { name: "title_en", label: "Title" }, { name: "intro_en", label: "Intro" }]} />;
}
