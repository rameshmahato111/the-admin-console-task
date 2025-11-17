"use client";

import MetricOverView from "@/components/story2/dashboard/metric-overview";
import WorkFlows from "@/components/story2/dashboard/work-flows";
import Policies from "@/components/story2/dashboard/policies-section";
import AgentSection from "@/components/story2/dashboard/agen-section";
import LogSection from "@/components/story2/dashboard/logs-section";
import UserManagement from "@/components/story2/dashboard/user-management";
import DashboardNavbar from "./dash-nav";

export default function DashboardPage() {
  return (
    <>
      <DashboardNavbar />
      <main className="px-6 py-8">
          {/* Metrics Overview */}
          <section id="metrics">
            <MetricOverView />
          </section>

          {/* Workflows Section */}
          <section id="workflows" className="mt-8">
            <WorkFlows />
          </section>

          {/* Agents Section */}
          <section id="agents" className="mt-8">
            <AgentSection />
          </section>

          {/* Policies Section */}
          <section id="policies" className="mt-8">
            <Policies />
          </section>

          {/* User Management */}
          <section id="users" className="mt-8">
            <UserManagement />
          </section>

          {/* Telemetry/Logs Section */}
          <section id="logs" className="mt-8">
            <LogSection />
          </section>
      </main>
    </>
  );
}

