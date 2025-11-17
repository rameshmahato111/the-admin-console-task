"use client";

import { X, Clock, FileText, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { WorkflowNode } from "./types";
import { CheckCircle2, XCircle, Loader2, Clock as ClockIcon } from "lucide-react";

interface NodeDetailsPanelProps {
  node: WorkflowNode | null;
  onClose: () => void;
}

const statusConfig: Record<
  WorkflowNode["status"],
  { color: string; bgColor: string; icon: React.ComponentType<{ className?: string }> }
> = {
  pending: {
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    icon: ClockIcon,
  },
  running: {
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    icon: Loader2,
  },
  completed: {
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    icon: CheckCircle2,
  },
  failed: {
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    icon: XCircle,
  },
};

export function NodeDetailsPanel({ node, onClose }: NodeDetailsPanelProps) {
  if (!node) return null;

  const config = statusConfig[node.status];
  const StatusIcon = config.icon;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Node Details</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Node Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <StatusIcon className={cn("h-5 w-5", config.color)} />
              {node.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Status */}
            <div>
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
                Status
              </div>
              <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium capitalize", config.bgColor, config.color)}>
                <StatusIcon className="h-4 w-4" />
                {node.status}
              </div>
            </div>

            {/* Last Updated */}
            <div>
              <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Last Updated
              </div>
              <div className="text-sm text-zinc-900 dark:text-zinc-100">
                {new Date(node.lastUpdated).toLocaleString()}
              </div>
            </div>

            {/* Metrics */}
            {node.metrics && (
              <div>
                <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 flex items-center gap-1">
                  <Activity className="h-3 w-3" />
                  Metrics
                </div>
                <div className="space-y-2">
                  {node.metrics.cpu !== undefined && (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-zinc-600 dark:text-zinc-400">CPU Usage</span>
                        <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                          {node.metrics.cpu.toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 transition-all duration-300"
                          style={{ width: `${node.metrics.cpu}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {node.metrics.memory !== undefined && (
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-zinc-600 dark:text-zinc-400">Memory Usage</span>
                        <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                          {node.metrics.memory.toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 transition-all duration-300"
                          style={{ width: `${node.metrics.memory}%` }}
                        />
                      </div>
                    </div>
                  )}
                  {node.metrics.duration !== undefined && (
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-600 dark:text-zinc-400">Duration</span>
                      <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                        {(node.metrics.duration / 1000).toFixed(2)}s
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Logs */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {node.logs && node.logs.length > 0 ? (
                node.logs.map((log, index) => (
                  <div
                    key={index}
                    className="text-xs font-mono bg-zinc-50 dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800"
                  >
                    <div className="text-zinc-500 dark:text-zinc-400 mb-1">
                      {new Date(node.lastUpdated).toLocaleTimeString()}
                    </div>
                    <div className="text-zinc-900 dark:text-zinc-100">{log}</div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-zinc-500 dark:text-zinc-400 text-center py-4">
                  No logs available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

