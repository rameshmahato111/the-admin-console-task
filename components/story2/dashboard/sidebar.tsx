"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useFeatureAccess } from "@/lib/hooks/use-permissions";
import {
  LayoutDashboard,
  Bot,
  FileText,
  BarChart3,
  Shield,
  Users,
  Workflow,
} from "lucide-react";

const navigation = [
  {
    name: "Metric Overview",
    href: "/dashboard#metrics",
    icon: BarChart3,
    top: true,
    feature: "metrics",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    feature: "metrics", // Dashboard is accessible to all logged-in users
  },
  {
    name: "Workflows",
    href: "/dashboard#workflows",
    icon: Workflow,
    feature: "workflows",
  },
  {
    name: "Agents",
    href: "/dashboard#agents",
    icon: Bot,
    feature: "agents",
  },
  {
    name: "Policies",
    href: "/dashboard#policies",
    icon: Shield,
    feature: "policies",
  },
  {
    name: "User Management",
    href: "/dashboard#users",
    icon: Users,
    feature: "users",
  },
  {
    name: "Logs",
    href: "/dashboard#logs",
    icon: FileText,
    feature: "logs",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  
  // Filter navigation items based on user permissions
  const canAccessMetrics = useFeatureAccess("metrics");
  const canAccessWorkflows = useFeatureAccess("workflows");
  const canAccessAgents = useFeatureAccess("agents");
  const canAccessPolicies = useFeatureAccess("policies");
  const canAccessUsers = useFeatureAccess("users");
  const canAccessLogs = useFeatureAccess("logs");

  const filteredNavigation = navigation.filter((item) => {
    if (item.feature === "metrics") return canAccessMetrics;
    if (item.feature === "workflows") return canAccessWorkflows;
    if (item.feature === "agents") return canAccessAgents;
    if (item.feature === "policies") return canAccessPolicies;
    if (item.feature === "users") return canAccessUsers;
    if (item.feature === "logs") return canAccessLogs;
    return true; // Dashboard always visible
  });

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white dark:bg-zinc-950">
      <div className="flex h-full flex-col">
        {/* Logo/Brand */}
        <div className="flex h-16 items-center border-b px-6">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-zinc-100 dark:to-zinc-300 bg-clip-text text-transparent">
            Admin Console
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {filteredNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  item.top
                    ? "mb-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200 dark:border-purple-800"
                    : "",
                  isActive
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 flex-shrink-0",
                    isActive
                      ? "text-zinc-900 dark:text-zinc-50"
                      : "text-zinc-500 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-50",
                    item.top && "text-purple-600 dark:text-purple-400"
                  )}
                />
                <span className={cn(item.top && "font-semibold")}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

