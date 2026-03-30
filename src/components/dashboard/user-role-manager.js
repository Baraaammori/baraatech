"use client";

import { useMemo, useState } from "react";
import PaginationControls from "@/components/dashboard/pagination-controls";

const PAGE_SIZE = 16;

export default function UserRoleManager({ users, roles, userRoleMap }) {
  const [selectedUserId, setSelectedUserId] = useState(users[0]?.id ?? "");
  const [draftRoleMap, setDraftRoleMap] = useState(() => ({ ...userRoleMap }));
  const [saving, setSaving] = useState(false);
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(users.length / PAGE_SIZE));
  const paginatedUsers = useMemo(() => {
    const from = (page - 1) * PAGE_SIZE;
    return users.slice(from, from + PAGE_SIZE);
  }, [users, page]);

  const selectedRoleIds = useMemo(
    () => draftRoleMap[selectedUserId] ?? userRoleMap[selectedUserId] ?? [],
    [draftRoleMap, selectedUserId, userRoleMap]
  );

  const selectedUser = users.find((u) => u.id === selectedUserId);

  const assignedRoleNames = useMemo(() => {
    const selectedSet = new Set(selectedRoleIds);
    return roles.filter((role) => selectedSet.has(role.id)).map((role) => role.name);
  }, [roles, selectedRoleIds]);

  function toggleRole(roleId, checked) {
    setDraftRoleMap((old) => {
      const current = old[selectedUserId] ?? userRoleMap[selectedUserId] ?? [];
      if (checked) {
        return {
          ...old,
          [selectedUserId]: current.includes(roleId) ? current : [...current, roleId],
        };
      }
      return {
        ...old,
        [selectedUserId]: current.filter((id) => id !== roleId),
      };
    });
  }

  async function saveUserRoles(event) {
    event.preventDefault();
    if (!selectedUserId) return;

    setSaving(true);
    const response = await fetch("/api/admin/rbac/user-roles", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: selectedUserId, roleIds: selectedRoleIds }),
    });
    setSaving(false);

    if (!response.ok) return;
    window.location.reload();
  }

  return (
    <section>
      
      <div className="mb-8">
        <p className="mono-xs mb-2">USER MANAGEMENT</p>
        <h1 className="font-[var(--font-display)] text-3xl font-bold text-white">Users</h1>
        <p className="text-[var(--gray-400)] mt-2">
          Manage user accounts and assign roles.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
        
        <div className="dash-card">
          <div className="dash-card-header">
            <h2 className="dash-card-title">All Users</h2>
            <span className="dash-badge dash-badge-cyan">{users.length}</span>
          </div>
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {paginatedUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUserId(user.id)}
                className={`p-3 rounded-xl cursor-pointer transition-all ${
                  selectedUserId === user.id
                    ? "bg-[var(--cyan)]/10 border border-[var(--cyan)]/30"
                    : "bg-white/[0.02] border border-transparent hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                      selectedUserId === user.id
                        ? "bg-[var(--cyan)]/20 text-[var(--cyan)]"
                        : "bg-white/5 text-[var(--gray-400)]"
                    }`}
                  >
                    {(user.email || user.full_name || "U").charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-medium truncate ${
                        selectedUserId === user.id ? "text-[var(--cyan)]" : "text-white"
                      }`}
                    >
                      {user.email || user.full_name || "No email"}
                    </p>
                    <p className="text-xs text-[var(--gray-400)]">
                      {user.is_active !== false ? (
                        <span className="text-[var(--lime)]">Active</span>
                      ) : (
                        <span className="text-[var(--magenta)]">Inactive</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <PaginationControls
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            totalItems={users.length}
            pageSize={PAGE_SIZE}
            itemLabel="users"
          />
        </div>

        
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">
                Roles for{" "}
                <span className="text-[var(--cyan)]">
                  {selectedUser?.email || selectedUser?.full_name || "User"}
                </span>
              </h2>
              {assignedRoleNames.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {assignedRoleNames.map((name) => (
                    <span key={name} className="dash-badge dash-badge-lime">
                      {name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-[var(--gray-400)] mt-1">No roles assigned</p>
              )}
            </div>
          </div>

          <form onSubmit={saveUserRoles}>
            <div className="grid gap-3 md:grid-cols-2">
              {roles.map((role) => (
                <label
                  key={role.id}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    selectedRoleIds.includes(role.id)
                      ? "bg-[var(--lime)]/10 border border-[var(--lime)]/30"
                      : "bg-white/[0.02] border border-white/5 hover:border-white/10"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="role_id"
                    value={role.id}
                    checked={selectedRoleIds.includes(role.id)}
                    onChange={(event) => toggleRole(role.id, event.target.checked)}
                    className="w-4 h-4 rounded accent-[var(--lime)]"
                  />
                  <div className="flex-1">
                    <span
                      className={`font-medium ${
                        selectedRoleIds.includes(role.id)
                          ? "text-[var(--lime)]"
                          : "text-white"
                      }`}
                    >
                      {role.name}
                    </span>
                    {role.is_system && (
                      <span className="dash-badge dash-badge-purple text-[8px] ml-2">
                        System
                      </span>
                    )}
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-end mt-6 pt-6 border-t border-white/5">
              <button className="dash-btn dash-btn-primary" disabled={saving}>
                {saving ? "Saving..." : "Save User Roles"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
