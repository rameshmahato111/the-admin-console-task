"use client";

import { useState, useEffect } from "react";
import { WorkflowCanvas } from "./workflow-canvas";
import type { WorkflowNode, WorkflowEdge } from "./types";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Play, Pause } from "lucide-react";

// Mock initial workflow data
const createMockWorkflow = (): { nodes: WorkflowNode[]; edges: WorkflowEdge[] } => {
  const nodes: WorkflowNode[] = [
    {
      id: "1",
      label: "Data Ingestion",
      status: "pending",
      lastUpdated: new Date().toISOString(),
      logs: ["Node initialized"],
      metrics: { cpu: 0, memory: 0, duration: 0 },
    },
    {
      id: "2",
      label: "Data Validation",
      status: "pending",
      lastUpdated: new Date().toISOString(),
      logs: ["Node initialized"],
      metrics: { cpu: 0, memory: 0, duration: 0 },
    },
    {
      id: "3",
      label: "Data Transformation",
      status: "pending",
      lastUpdated: new Date().toISOString(),
      logs: ["Node initialized"],
      metrics: { cpu: 0, memory: 0, duration: 0 },
    },
    {
      id: "4",
      label: "ML Model Training",
      status: "pending",
      lastUpdated: new Date().toISOString(),
      logs: ["Node initialized"],
      metrics: { cpu: 0, memory: 0, duration: 0 },
    },
    {
      id: "5",
      label: "Result Export",
      status: "pending",
      lastUpdated: new Date().toISOString(),
      logs: ["Node initialized"],
      metrics: { cpu: 0, memory: 0, duration: 0 },
    },
  ];

  const edges: WorkflowEdge[] = [
    { id: "e1-2", source: "1", target: "2" },
    { id: "e2-3", source: "2", target: "3" },
    { id: "e3-4", source: "3", target: "4" },
    { id: "e4-5", source: "4", target: "5" },
  ];

  return { nodes, edges };
};

export function WorkflowStudio() {
  const [workflowData, setWorkflowData] = useState(createMockWorkflow());
  const [isRunning, setIsRunning] = useState(true);

  const handleReset = () => {
    setWorkflowData(createMockWorkflow());
  };

  return (
    <div className="w-full h-[800px] flex flex-col">
      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Workflow Studio</CardTitle>
              <CardDescription>
                Real-time workflow visualization with live node state updates
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button
                variant={isRunning ? "default" : "outline"}
                size="sm"
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Resume
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            <p>• Click on any node to view detailed information</p>
            <p>• Nodes update in real-time via WebSocket simulation</p>
            <p>• Status colors: Yellow (Pending) → Blue (Running) → Green (Completed) / Red (Failed)</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex-1 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
        <WorkflowCanvas initialNodes={workflowData.nodes} initialEdges={workflowData.edges} />
      </div>
    </div>
  );
}

