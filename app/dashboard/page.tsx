"use client";

import MetricOverView from "@/components/dashboard/metric-overview";
import WorkFlows from "@/components/dashboard/work-flows";
import Policies from "@/components/dashboard/policies-section";
import AgentSection from "@/components/dashboard/agen-section";
import LogSection from "@/components/dashboard/logs-section";
import UserManagement from "@/components/dashboard/user-management";
import DashboardNavbar from "./dash-nav";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <DashboardNavbar />

      <main className="container mx-auto px-6 py-8">
        {/* Metrics Overview */}
        <MetricOverView/>

        {/* Workflows Section */}
       <WorkFlows/>

        {/* Agents Section */}
       <AgentSection/>

        {/* Policies Section */}
       <Policies/>

       {/* user management */}
        <UserManagement/>

        {/* Telemetry/Logs Section */}
       <LogSection/>
      </main>
    </div>
  );
}

