"use client";

import MetricOverView from "@/components/story2/dashboard/metric-overview";
import WorkFlows from "@/components/story2/dashboard/work-flows";
import Policies from "@/components/story2/dashboard/policies-section";
import AgentSection from "@/components/story2/dashboard/agen-section";
import LogSection from "@/components/story2/dashboard/logs-section";
import UserManagement from "@/components/story2/dashboard/user-management";
import DashboardNavbar from "./dash-nav";
import { PermissionWrapper } from "@/components/rbac/permission-wrapper";

export default function DashboardPage() {
  return (
    <>
      <DashboardNavbar />
      <main className="px-6 py-8">
          {/* Metrics Overview */}
          <PermissionWrapper feature="metrics">
            <section id="metrics">
              <MetricOverView />
            </section>
          </PermissionWrapper>

          {/* Workflows Section */}
          <PermissionWrapper feature="workflows">
            <section id="workflows" className="mt-8">
              <WorkFlows />
            </section>
          </PermissionWrapper>

          {/* Agents Section */}
          <PermissionWrapper feature="agents">
            <section id="agents" className="mt-8">
              <AgentSection />
            </section>
          </PermissionWrapper>

          {/* Policies Section */}
          <PermissionWrapper feature="policies">
            <section id="policies" className="mt-8">
              <Policies />
            </section>
          </PermissionWrapper>

          {/* User Management */}
          <PermissionWrapper feature="users">
            <section id="users" className="mt-8">
              <UserManagement />
            </section>
          </PermissionWrapper>

          {/* Telemetry/Logs Section */}
          <PermissionWrapper feature="logs">
            <section id="logs" className="mt-8">
              <LogSection />
            </section>
          </PermissionWrapper>
      </main>
    </>
  );
}

