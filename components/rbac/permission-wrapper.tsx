"use client";

import { useAuth } from "@/lib/auth-context";
import {
  type Permission,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  canAccessFeature,
} from "@/lib/rbac";
import type { ReactNode } from "react";

type PermissionWrapperProps = {
  children: ReactNode;
  permission?: Permission;
  anyPermission?: Permission[];
  allPermissions?: Permission[];
  feature?: string;
  fallback?: ReactNode;
  showIfNoPermission?: boolean;
};

export function PermissionWrapper({
  children,
  permission,
  anyPermission,
  allPermissions,
  feature,
  fallback = null,
  showIfNoPermission = false,
}: PermissionWrapperProps) {
  const { user } = useAuth();

  let hasAccess = false;

  if (permission) {
    hasAccess = hasPermission(user, permission);
  } else if (anyPermission && anyPermission.length > 0) {
    hasAccess = hasAnyPermission(user, anyPermission);
  } else if (allPermissions && allPermissions.length > 0) {
    hasAccess = hasAllPermissions(user, allPermissions);
  } else if (feature) {
    hasAccess = canAccessFeature(user, feature);
  }

  if (showIfNoPermission) {
    hasAccess = !hasAccess;
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}

