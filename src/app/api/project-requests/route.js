import { z } from "zod";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ProjectRequestSchema = z.object({
  projectId: z.string().uuid(),
  projectSlug: z.string().min(1).max(180),
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal("")),
  notes: z.string().max(2000).optional().or(z.literal("")),
});

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const parsed = ProjectRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const payload = {
    project_id: parsed.data.projectId,
    project_slug: parsed.data.projectSlug,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    notes: parsed.data.notes || null,
  };

  const supabase = await createClient();
  const { error } = await supabase.from("project_requests").insert(payload);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
