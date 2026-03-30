import { z } from "zod";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requirePermission } from "@/lib/auth/api-guard";

const CreateSchema = z.object({
  slug: z.string().min(1),
  title_en: z.string().min(2),
  short_description_en: z.string().min(2),
  full_description_en: z.string().min(2),
  cpu: z.string().optional(),
  gpu: z.string().optional(),
  ram: z.string().optional(),
  storage: z.string().optional(),
  performance_category: z.string().optional(),
  resolution_category: z.enum(["1080p", "1440p", "4K"]),
});

const UpdateSchema = z.object({
  id: z.string().uuid(),
  title_en: z.string().min(2).optional(),
  short_description_en: z.string().min(2).optional(),
  full_description_en: z.string().min(2).optional(),
  published: z.boolean().optional(),
});

export async function POST(request) {
  const denied = await requirePermission("create.project");
  if (denied) return denied;

  const body = await request.json();
  const parsed = CreateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const supabase = await createClient();
  const { error } = await supabase.from("projects").insert({ ...parsed.data, published: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function PATCH(request) {
  const denied = await requirePermission("edit.project");
  if (denied) return denied;

  const body = await request.json();
  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const supabase = await createClient();
  const { id, ...updateData } = parsed.data;
  const { error } = await supabase.from("projects").update(updateData).eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request) {
  const denied = await requirePermission("delete.project");
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
