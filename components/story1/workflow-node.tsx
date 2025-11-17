"use client";

import { memo } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { Node } from "@xyflow/react";
import { cn } from "@/lib/utils";
import type { NodeStatus } from "./types";
import { CheckCircle2, XCircle, Loader2, Clock } from "lucide-react";

interface CustomNodeData extends Record<string, unknown> {
  label: string;
  status: NodeStatus;
  lastUpdated: string;
}

const statusConfig: Record<
  NodeStatus,
  { color: string; bgColor: string; icon: React.ComponentType<{ className?: string }>; pulse: boolean }
> = {
  pending: {
    color: "text-yellow-600 dark:text-yellow-400",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800",
    icon: Clock,
    pulse: false,
  },
  running: {
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
    icon: Loader2,
    pulse: true,
  },
  completed: {
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
    icon: CheckCircle2,
    pulse: false,
  },
  failed: {
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
    icon: XCircle,
    pulse: false,
  },
};

function WorkflowNodeComponent(props: NodeProps) {
  const { data, selected } = props;
  
  if (!data || typeof data !== 'object') return null;
  
  const nodeData = data as CustomNodeData;
  const status: NodeStatus = (nodeData.status && statusConfig[nodeData.status as NodeStatus]) 
    ? (nodeData.status as NodeStatus) 
    : "pending";
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "px-4 py-3 rounded-lg border-2 shadow-sm transition-all duration-300 min-w-[180px]",
        config.bgColor as string,
        selected && "ring-2 ring-offset-2 ring-blue-500 dark:ring-blue-400",
        config.pulse && "animate-pulse"
      )}
    >
      <Handle type="target" position={Position.Top} className="!bg-zinc-400" />
      
      <div className="flex items-center gap-2 mb-2">
        <Icon
          className={cn(
            "h-5 w-5 flex-shrink-0 transition-all duration-300",
            config.color,
            config.pulse && "animate-spin"
          )}
        />
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate">
            {nodeData.label}
          </div>
          <div className={cn("text-xs font-medium capitalize", config.color)}>
            {nodeData.status}
          </div>
        </div>
      </div>

      <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
        {new Date(nodeData.lastUpdated).toLocaleTimeString()}
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-zinc-400" />
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export const WorkflowNode = memo(WorkflowNodeComponent);

