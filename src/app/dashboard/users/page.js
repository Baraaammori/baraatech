import { createClient } from "@/lib/supabase/server";
import { hasPermission } from "@/lib/auth/rbac";
import PermissionDenied from "../../../components/dashboard/permission-denied";
import UserRoleManager from "@/components/dashboard/user-role-manager";

export default async function DashboardUsersPage() {
  const allowed = await hasPermission("manage.users");
  if (!allowed) return <PermissionDenied />;

  const supabase = await createClient();
  const { data: users } = await supabase
    .from("profiles")
    .select("id, email, full_name, is_active, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  const { data: roles } = await supabase
    .from("roles")
    .select("id, name, is_system")
    .order("name", { ascending: true });

  const { data: userRoles } = await supabase
    .from("user_roles")
    .select("user_id, role_id");

  const userRoleMap = {};
  (userRoles ?? []).forEach((ur) => {
    if (!userRoleMap[ur.user_id]) {
      userRoleMap[ur.user_id] = [];
    }
    userRoleMap[ur.user_id].push(ur.role_id);
  });

  return <UserRoleManager users={users ?? []} roles={roles ?? []} userRoleMap={userRoleMap} />;
}
