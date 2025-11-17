"use client";

import Sidebar from "@/components/story2/dashboard/sidebar";
import { Activity, useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [isShowingSidebar, setIsShowingSidebar] = useState(true);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Activity mode={isShowingSidebar? 'visible': "hidden"}>
      <Sidebar />
      </Activity>
      <div className="ml-64">
        {children}
      </div>
    </div>
  );
}
