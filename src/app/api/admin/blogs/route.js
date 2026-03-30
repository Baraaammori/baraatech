import { z } from "zod";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requirePermission } from "@/lib/auth/api-guard";

const CreateSchema = z.object({
  slug: z.string().min(1),
  title_en: z.string().min(2),
  content_en: z.string().min(5),
  tags: z.array(z.string()).optional(),
});

const UpdateSchema = z.object({
  id: z.string().uuid(),
  title_en: z.string().min(2).optional(),
  content_en: z.string().min(5).optional(),
  published: z.boolean().optional(),
});

export async function POST(request) {
  const denied = await requirePermission("create.blog");
  if (denied) return denied;

  const body = await request.json();
  const parsed = CreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("blogs").insert({
    slug: parsed.data.slug,
    title_en: parsed.data.title_en,
    content_en: parsed.data.content_en,
    tags: parsed.data.tags ?? [],
    published: false,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function PATCH(request) {
  const body = await request.json();
  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (parsed.data.published !== undefined) {
    const denied = await requirePermission("publish.blog");
    if (denied) return denied;
  } else {
    const denied = await requirePermission("edit.blog");
    if (denied) return denied;
  }

  const supabase = await createClient();
  const { id, ...updateData } = parsed.data;
  const { error } = await supabase.from("blogs").update(updateData).eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request) {
  const denied = await requirePermission("delete.blog");
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("blogs").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
