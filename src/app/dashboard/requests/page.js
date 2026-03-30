import { createClient } from "@/lib/supabase/server";
import { hasPermission } from "@/lib/auth/rbac";
import PermissionDenied from "../../../components/dashboard/permission-denied";
import RequestsManager from "@/components/dashboard/requests-manager";

export default async function DashboardRequestsPage() {
  const allowed = await hasPermission("view.project_requests");
  if (!allowed) return <PermissionDenied />;

  const supabase = await createClient();
  const { data } = await supabase
    .from("project_requests")
    .select("id, project_slug, name, email, status, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  return <RequestsManager initialItems={data ?? []} />;
}
