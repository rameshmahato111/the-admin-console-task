"use client";

import Sidebar from "@/components/story2/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Sidebar />
      <div className="ml-64">
        {children}
      </div>
    </div>
  );
}
