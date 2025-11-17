"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export default function DashboardNavbar() {
  const { user, logout, isLoading } = useAuth();

  return (
    <header className="border-b bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Admin Console</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Perceive Now - Workflow & Agent Management
            </p>
          </div>
          <div className="flex items-center gap-4">
            {!isLoading && user && (
              <div className="text-right">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  {user.role}
                </p>
              </div>
            )}
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}