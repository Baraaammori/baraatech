import { createClient } from "@/lib/supabase/server";
import { hasPermission } from "@/lib/auth/rbac";
import PermissionDenied from "../../../components/dashboard/permission-denied";
import MessagesManager from "@/components/dashboard/messages-manager";

export default async function DashboardMessagesPage() {
  const allowed = await hasPermission("view.messages");
  if (!allowed) return <PermissionDenied />;

  const supabase = await createClient();
  const { data } = await supabase
    .from("contact_messages")
    .select("id, name, email, subject, is_read, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  return <MessagesManager initialItems={data ?? []} />;
}
