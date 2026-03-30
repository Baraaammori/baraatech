import { createClient } from "@/lib/supabase/server";
import { hasPermission } from "@/lib/auth/rbac";
import PermissionDenied from "../../../components/dashboard/permission-denied";
import RoleManager from "@/components/dashboard/role-manager";

export default async function DashboardRolesPage() {
  const allowed = await hasPermission("manage.roles");
  if (!allowed) return <PermissionDenied />;

  const supabase = await createClient();
  const { data: roles } = await supabase
    .from("roles")
    .select("id, name, description, is_system, created_at")
    .order("name", { ascending: true });

  const { data: permissions } = await supabase
    .from("permissions")
    .select("id, permission_key, module_key")
    .order("module_key", { ascending: true })
    .order("permission_key", { ascending: true });

  const { data: rolePermissions } = await supabase
    .from("role_permissions")
    .select("role_id, permission_id");

  const rolePermissionsMap = {};
  (rolePermissions ?? []).forEach((rp) => {
    if (!rolePermissionsMap[rp.role_id]) {
      rolePermissionsMap[rp.role_id] = [];
    }
    rolePermissionsMap[rp.role_id].push(rp.permission_id);
  });

  return (
    <RoleManager
      roles={roles ?? []}
      permissions={permissions ?? []}
      rolePermissionsMap={rolePermissionsMap}
    />
  );
}
