import { z } from "zod";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requirePermission } from "@/lib/auth/api-guard";

const AssignSchema = z.object({
  userId: z.string().uuid(),
  roleIds: z.array(z.string().uuid()),
});

export async function PUT(request) {
  const denied = await requirePermission("manage.users");
  if (denied) return denied;

  const body = await request.json();
  const parsed = AssignSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { userId, roleIds } = parsed.data;
  const supabase = await createClient();

  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser();

  const { data: superAdminRole } = await supabase
    .from("roles")
    .select("id")
    .eq("name", "Super Admin")
    .maybeSingle();

  if (superAdminRole?.id) {
    const { data: targetCurrentRoles } = await supabase
      .from("user_roles")
      .select("role_id")
      .eq("user_id", userId);

    const hadSuperAdmin = (targetCurrentRoles ?? []).some((row) => row.role_id === superAdminRole.id);
    const willHaveSuperAdmin = roleIds.includes(superAdminRole.id);

    if (hadSuperAdmin && !willHaveSuperAdmin) {
      if (currentUser?.id === userId) {
        return NextResponse.json({ error: "You cannot remove your own Super Admin role" }, { status: 400 });
      }

      const { count } = await supabase
        .from("user_roles")
        .select("user_id", { count: "exact", head: true })
        .eq("role_id", superAdminRole.id);

      if ((count ?? 0) <= 1) {
        return NextResponse.json({ error: "At least one Super Admin must remain assigned" }, { status: 400 });
      }
    }
  }

  const { error: deleteError } = await supabase.from("user_roles").delete().eq("user_id", userId);
  if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 500 });

  if (roleIds.length > 0) {
    const inserts = roleIds.map((roleId) => ({ user_id: userId, role_id: roleId }));
    const { error: insertError } = await supabase.from("user_roles").insert(inserts);
    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
