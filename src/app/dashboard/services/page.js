import { createClient } from "@/lib/supabase/server";
import { hasPermission } from "@/lib/auth/rbac";
import PermissionDenied from "../../../components/dashboard/permission-denied";
import CrudPanel from "../../../components/dashboard/crud-panel";

export default async function DashboardServicesPage() {
  const allowed = await hasPermission("manage.services");
  if (!allowed) return <PermissionDenied />;

  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("id, title_en, slug, published, sort_order")
    .order("sort_order", { ascending: true })
    .limit(100);

  return <CrudPanel title="Services" endpoint="/api/admin/services" initialItems={data ?? []} fields={[{ name: "slug", label: "Slug", required: true }, { name: "title_en", label: "Title", required: true }, { name: "short_description_en", label: "Short Description" }]} />;
}
