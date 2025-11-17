"use client";

import { WorkflowStudio } from "@/components/story1/workflow-studio";
import DashboardNavbar from "@/app/dashboard/dash-nav";
import Sidebar from "@/components/story2/dashboard/sidebar";

export default function WorkflowStudioPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Sidebar />
      <div className="ml-64">
        <DashboardNavbar />
        <main className="px-6 py-8">
          <WorkflowStudio />
        </main>
      </div>
    </div>
  );
}

