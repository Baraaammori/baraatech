import { z } from "zod";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requirePermission } from "@/lib/auth/api-guard";

const UpdateSchema = z.object({
  id: z.string().uuid(),
  is_read: z.boolean(),
});

export async function PATCH(request) {
  const denied = await requirePermission("view.messages");
  if (denied) return denied;

  const body = await request.json();
  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const supabase = await createClient();
  const { error } = await supabase
    .from("contact_messages")
    .update({ is_read: parsed.data.is_read })
    .eq("id", parsed.data.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
