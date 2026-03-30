import { z } from "zod";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requirePermission } from "@/lib/auth/api-guard";

const BodySchema = z.object({
  roleId: z.string().uuid(),
  permissionIds: z.array(z.string().uuid()),
});

export async function PUT(request) {
  const denied = await requirePermission("manage.roles");
  if (denied) return denied;

  const body = await request.json();
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const supabase = await createClient();
  const { roleId, permissionIds } = parsed.data;

  const { data: role } = await supabase.from("roles").select("is_system").eq("id", roleId).single();
  if (role?.is_system) {
    return NextResponse.json({ error: "Cannot modify system role permissions from this endpoint" }, { status: 400 });
  }

  const { error: deleteError } = await supabase.from("role_permissions").delete().eq("role_id", roleId);
  if (deleteError) return NextResponse.json({ error: deleteError.message }, { status: 500 });

  if (permissionIds.length > 0) {
    const inserts = permissionIds.map((permissionId) => ({ role_id: roleId, permission_id: permissionId }));
    const { error: insertError } = await supabase.from("role_permissions").insert(inserts);
    if (insertError) return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
