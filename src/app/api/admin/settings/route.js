import { z } from "zod";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requirePermission } from "@/lib/auth/api-guard";

const UpsertSchema = z.object({
  setting_key: z.string().min(2).max(100),
  setting_value: z.any(),
});

export async function POST(request) {
  const denied = await requirePermission("manage.settings");
  if (denied) return denied;

  const body = await request.json();
  const parsed = UpsertSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 });

  const supabase = await createClient();
  const { error } = await supabase.from("site_settings").upsert(
    {
      setting_key: parsed.data.setting_key,
      setting_value: parsed.data.setting_value,
    },
    { onConflict: "setting_key" },
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
