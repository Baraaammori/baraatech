import { z } from "zod";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requirePermission } from "@/lib/auth/api-guard";

const CreateRoleSchema = z.object({
  name: z.string().min(2).max(80),
  description: z.string().max(300).optional(),
});

const DeleteRoleSchema = z.object({
  id: z.string().uuid(),
});

export async function POST(request) {
  const denied = await requirePermission("manage.roles");
  if (denied) return denied;

  const body = await request.json();
  const parsed = CreateRoleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("roles")
    .insert({ name: parsed.data.name, description: parsed.data.description ?? null, is_system: false })
    .select("id, name, description, is_system")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, role: data });
}

export async function DELETE(request) {
  const denied = await requirePermission("manage.roles");
  if (denied) return denied;

  const body = await request.json();
  const parsed = DeleteRoleSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: role } = await supabase.from("roles").select("is_system").eq("id", parsed.data.id).single();

  if (role?.is_system) {
    return NextResponse.json({ error: "System roles cannot be deleted" }, { status: 400 });
  }

  const { error } = await supabase.from("roles").delete().eq("id", parsed.data.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
