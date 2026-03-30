import { z } from "zod";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requirePermission } from "@/lib/auth/api-guard";

const CreateSchema = z.object({
  slug: z.string().min(1),
  title_en: z.string().min(2),
  content_en: z.string().min(5),
});

const UpdateSchema = z.object({
  id: z.string().uuid(),
  title_en: z.string().min(2).optional(),
  content_en: z.string().min(5).optional(),
  published: z.boolean().optional(),
});

export async function POST(request) {
  const denied = await requirePermission("create.news");
  if (denied) return denied;

  const body = await request.json();
  const parsed = CreateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const supabase = await createClient();
  const { error } = await supabase.from("news").insert({ ...parsed.data, published: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function PATCH(request) {
  const body = await request.json();
  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  if (parsed.data.published !== undefined) {
    const denied = await requirePermission("publish.news");
    if (denied) return denied;
  } else {
    const denied = await requirePermission("edit.news");
    if (denied) return denied;
  }

  const supabase = await createClient();
  const { id, ...updateData } = parsed.data;
  const { error } = await supabase.from("news").update(updateData).eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request) {
  const denied = await requirePermission("delete.news");
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const supabase = await createClient();
  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
