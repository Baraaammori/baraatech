import { createClient } from "@/lib/supabase/server";
import { hasPermission } from "@/lib/auth/rbac";
import PermissionDenied from "../../../components/dashboard/permission-denied";
import SettingsManager from "@/components/dashboard/settings-manager";

export default async function DashboardSettingsPage() {
  const allowed = await hasPermission("manage.settings");
  if (!allowed) return <PermissionDenied />;

  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("id, setting_key, setting_value, updated_at")
    .order("setting_key", { ascending: true });

  return <SettingsManager initialItems={data ?? []} />;
}
