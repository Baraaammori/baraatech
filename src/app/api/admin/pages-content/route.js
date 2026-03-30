import { z } from "zod";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requirePermission } from "@/lib/auth/api-guard";

const UpsertSchema = z.object({
  page_key: z.string().min(1),
  title_en: z.string().optional(),
  intro_en: z.string().optional(),
  published: z.boolean().optional(),
});

const UpdateSchema = z.object({
  id: z.string().min(1),
  published: z.boolean().optional(),
});

export async function POST(request) {
  const denied = await requirePermission("manage.website_content");
  if (denied) return denied;

  const body = await request.json();
  const parsed = UpsertSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const payload = {
    page_key: parsed.data.page_key,
    title_en: parsed.data.title_en ?? null,
    content_en: { intro: parsed.data.intro_en ?? "" },
    published: parsed.data.published ?? true,
  };

  const supabase = await createClient();
  const { error } = await supabase.from("pages_content").upsert(payload, { onConflict: "page_key" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function PATCH(request) {
  const denied = await requirePermission("manage.website_content");
  if (denied) return denied;

  const body = await request.json();
  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const { id, ...updateData } = parsed.data;
  const supabase = await createClient();
  const { error } = await supabase.from("pages_content").update(updateData).eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request) {
  const denied = await requirePermission("manage.website_content");
  if (denied) return denied;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const supabase = await createClient();
  const { error } = await supabase.from("pages_content").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
