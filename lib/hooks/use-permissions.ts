"use client";

import { useAuth } from "@/lib/auth-context";
import {
  type Permission,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  canAccessFeature,
  canPerformAction,
  getUserPermissions,
} from "@/lib/rbac";

/**
 * Hook to check if current user has a specific permission
 */
export function usePermission(permission: Permission): boolean {
  const { user } = useAuth();
  return hasPermission(user, permission);
}

/**
 * Hook to check if current user has any of the specified permissions
 */
export function useAnyPermission(permissions: Permission[]): boolean {
  const { user } = useAuth();
  return hasAnyPermission(user, permissions);
}

/**
 * Hook to check if current user has all of the specified permissions
 */
export function useAllPermissions(permissions: Permission[]): boolean {
  const { user } = useAuth();
  return hasAllPermissions(user, permissions);
}

/**
 * Hook to check if current user can access a feature
 */
export function useFeatureAccess(feature: string): boolean {
  const { user } = useAuth();
  return canAccessFeature(user, feature);
}

/**
 * Hook to check if current user can perform an action on a resource
 */
export function useActionPermission(
  resource: "workflows" | "agents" | "policies" | "users",
  action: "view" | "create" | "edit" | "delete"
): boolean {
  const { user } = useAuth();
  return canPerformAction(user, resource, action);
}

/**
 * Hook to get all permissions for current user
 */
export function usePermissions(): Permission[] {
  const { user } = useAuth();
  return getUserPermissions(user);
}

