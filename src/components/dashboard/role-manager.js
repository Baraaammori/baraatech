"use client";

import { useMemo, useState } from "react";

export default function RoleManager({ roles, permissions, rolePermissionsMap }) {
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState(roles[0]?.id ?? "");
  const [draftPermissionsByRole, setDraftPermissionsByRole] = useState({});
  const [saving, setSaving] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const selectedRole = roles.find((r) => r.id === selectedRoleId);
  const checkedPermissionIds = useMemo(() => {
    const ids = draftPermissionsByRole[selectedRoleId] ?? rolePermissionsMap[selectedRoleId] ?? [];
    return new Set(ids);
  }, [draftPermissionsByRole, rolePermissionsMap, selectedRoleId]);

  async function createRole(event) {
    event.preventDefault();
    setSaving(true);

    const response = await fetch("/api/admin/rbac/roles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: roleName, description: roleDescription }),
    });

    setSaving(false);
    if (!response.ok) return;
    window.location.reload();
  }

  async function saveRolePermissions(event) {
    event.preventDefault();
    if (!selectedRoleId) return;

    const permissionIds = Array.from(checkedPermissionIds);

    setSaving(true);
    const response = await fetch("/api/admin/rbac/role-permissions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roleId: selectedRoleId, permissionIds }),
    });
    setSaving(false);

    if (!response.ok) return;
    window.location.reload();
  }

  function togglePermission(permissionId, isChecked) {
    setDraftPermissionsByRole((prev) => {
      const next = new Set(prev[selectedRoleId] ?? rolePermissionsMap[selectedRoleId] ?? []);
      if (isChecked) {
        next.add(permissionId);
      } else {
        next.delete(permissionId);
      }

      return {
        ...prev,
        [selectedRoleId]: Array.from(next),
      };
    });
  }

  async function deleteRole(roleId) {
    if (!confirm("Are you sure you want to delete this role?")) return;

    const response = await fetch("/api/admin/rbac/roles", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: roleId }),
    });

    if (!response.ok) return;
    window.location.reload();
  }

  return (
    <section>
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="mono-xs mb-2">{"// ACCESS CONTROL"}</p>
          <h1 className="font-[var(--font-display)] text-3xl font-bold text-white">
            Roles & Permissions
          </h1>
        </div>
        <button
          type="button"
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="dash-btn dash-btn-primary"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {showCreateForm ? "Cancel" : "Create Role"}
        </button>
      </div>

      
      {showCreateForm && (
        <div className="dash-card mb-8">
          <div className="dash-card-header">
            <h2 className="dash-card-title">Create New Role</h2>
          </div>
          <form onSubmit={createRole} className="dash-form">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mono-xs block mb-2">ROLE NAME</label>
                <input
                  placeholder="e.g., Editor"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="dash-input"
                  required
                />
              </div>
              <div>
                <label className="mono-xs block mb-2">DESCRIPTION</label>
                <input
                  placeholder="Role description"
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                  className="dash-input"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="dash-btn dash-btn-ghost"
              >
                Cancel
              </button>
              <button className="dash-btn dash-btn-primary" disabled={saving}>
                {saving ? "Creating..." : "Create Role"}
              </button>
            </div>
          </form>
        </div>
      )}

      
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        
        <div className="dash-card">
          <div className="dash-card-header">
            <h2 className="dash-card-title">Roles</h2>
            <span className="dash-badge dash-badge-cyan">{roles.length}</span>
          </div>
          <div className="space-y-2">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRoleId(role.id)}
                className={`p-3 rounded-xl cursor-pointer transition-all ${
                  selectedRoleId === role.id
                    ? "bg-[var(--cyan)]/10 border border-[var(--cyan)]/30"
                    : "bg-white/[0.02] border border-transparent hover:border-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-medium ${
                      selectedRoleId === role.id ? "text-[var(--cyan)]" : "text-white"
                    }`}
                  >
                    {role.name}
                  </span>
                  {role.is_system && (
                    <span className="dash-badge dash-badge-purple text-[8px]">System</span>
                  )}
                </div>
                <p className="text-xs text-[var(--gray-400)] mt-1 truncate">
                  {role.description || "No description"}
                </p>
              </div>
            ))}
          </div>
        </div>

        
        <div className="dash-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">
                Permissions for{" "}
                <span className="text-[var(--cyan)]">{selectedRole?.name}</span>
              </h2>
              <p className="text-sm text-[var(--gray-400)] mt-1">
                {selectedRole?.is_system
                  ? "System roles cannot be deleted"
                  : "Select which permissions this role should have"}
              </p>
            </div>
            {selectedRole && !selectedRole.is_system && (
              <button
                type="button"
                onClick={() => deleteRole(selectedRoleId)}
                className="dash-btn dash-btn-danger"
              >
                Delete Role
              </button>
            )}
          </div>

          <form onSubmit={saveRolePermissions}>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {permissions.map((permission) => (
                <label
                  key={permission.id}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    checkedPermissionIds.has(permission.id)
                      ? "bg-[var(--lime)]/10 border border-[var(--lime)]/30"
                      : "bg-white/[0.02] border border-white/5 hover:border-white/10"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="permission_id"
                    value={permission.id}
                    checked={checkedPermissionIds.has(permission.id)}
                    onChange={(event) => togglePermission(permission.id, event.target.checked)}
                    className="w-4 h-4 rounded accent-[var(--lime)]"
                  />
                  <span
                    className={`font-[var(--font-code)] text-xs ${
                      checkedPermissionIds.has(permission.id)
                        ? "text-[var(--lime)]"
                        : "text-[var(--gray-100)]"
                    }`}
                  >
                    {permission.permission_key}
                  </span>
                </label>
              ))}
            </div>

            <div className="flex justify-end mt-6 pt-6 border-t border-white/5">
              <button className="dash-btn dash-btn-primary" disabled={saving}>
                {saving ? "Saving..." : "Save Permissions"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
