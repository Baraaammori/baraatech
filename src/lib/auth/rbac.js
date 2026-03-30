import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function getCurrentUserPermissions() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Set();
  }

  const { data, error } = await supabase
    .from("user_permission_view")
    .select("permission_key")
    .eq("user_id", user.id);

  if (error) {
    return new Set();
  }

  return new Set((data ?? []).map((row) => row.permission_key));
}

export async function hasPermission(permissionKey) {
  const permissionSet = await getCurrentUserPermissions();
  return permissionSet.has(permissionKey);
}
