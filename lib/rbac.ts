import type { LoginUser } from "@/app/login/login-action";

// Permission types
export type Permission = 
  | "view:workflows"
  | "create:workflows"
  | "edit:workflows"
  | "delete:workflows"
  | "view:agents"
  | "create:agents"
  | "edit:agents"
  | "delete:agents"
  | "view:policies"
  | "create:policies"
  | "edit:policies"
  | "delete:policies"
  | "view:users"
  | "create:users"
  | "edit:users"
  | "delete:users"
  | "view:logs"
  | "view:metrics"
  | "view:settings"
  | "edit:settings";

// Role-based permissions mapping
export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  Admin: [
    // Full access to all features
    "view:workflows",
    "create:workflows",
    "edit:workflows",
    "delete:workflows",
    "view:agents",
    "create:agents",
    "edit:agents",
    "delete:agents",
    "view:policies",
    "create:policies",
    "edit:policies",
    "delete:policies",
    "view:users",
    "create:users",
    "edit:users",
    "delete:users",
    "view:logs",
    "view:metrics",
    "view:settings",
    "edit:settings",
  ],
  Analyst: [
    // View and edit workflows, agents, policies (no delete, no user management)
    "view:workflows",
    "create:workflows",
    "edit:workflows",
    "view:agents",
    "create:agents",
    "edit:agents",
    "view:policies",
    "create:policies",
    "edit:policies",
    "view:logs",
    "view:metrics",
  ],
  Viewer: [
    // Read-only access
    "view:workflows",
    "view:agents",
    "view:policies",
    "view:logs",
    "view:metrics",
  ],
};

// Feature access mapping (for UI visibility)
export const ROLE_FEATURES: Record<string, string[]> = {
  Admin: [
    "metrics",
    "workflows",
    "agents",
    "policies",
    "users",
    "logs",
    "settings",
  ],
  Analyst: [
    "metrics",
    "workflows",
    "agents",
    "policies",
    "logs",
  ],
  Viewer: [
    "metrics",
    "workflows",
    "agents",
    "policies",
    "logs",
  ],
};


export function hasPermission(
  user: LoginUser | null,
  permission: Permission
): boolean {
  if (!user) return false;
  const permissions = ROLE_PERMISSIONS[user.role] || [];
  return permissions.includes(permission);
}


export function hasAnyPermission(
  user: LoginUser | null,
  permissions: Permission[]
): boolean {
  if (!user) return false;
  const userPermissions = ROLE_PERMISSIONS[user.role] || [];
  return permissions.some((perm) => userPermissions.includes(perm));
}


export function hasAllPermissions(
  user: LoginUser | null,
  permissions: Permission[]
): boolean {
  if (!user) return false;
  const userPermissions = ROLE_PERMISSIONS[user.role] || [];
  return permissions.every((perm) => userPermissions.includes(perm));
}


export function canAccessFeature(
  user: LoginUser | null,
  feature: string
): boolean {
  if (!user) return false;
  const features = ROLE_FEATURES[user.role] || [];
  return features.includes(feature);
}

export function getUserPermissions(user: LoginUser | null): Permission[] {
  if (!user) return [];
  return ROLE_PERMISSIONS[user.role] || [];
}

export function canPerformAction(
  user: LoginUser | null,
  resource: "workflows" | "agents" | "policies" | "users",
  action: "view" | "create" | "edit" | "delete"
): boolean {
  if (!user) return false;
  const permission = `${action}:${resource}` as Permission;
  return hasPermission(user, permission);
}

