import { NextResponse } from "next/server";
import { getCurrentUserPermissions } from "@/lib/auth/rbac";

export async function requirePermission(permission) {
  const permissions = await getCurrentUserPermissions();
  if (!permissions.has(permission)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}
