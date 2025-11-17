// Workflow Node Types
export type NodeStatus = "pending" | "running" | "completed" | "failed";

export interface WorkflowNode {
  id: string;
  label: string;
  status: NodeStatus;
  lastUpdated: string;
  logs: string[];
  metrics?: {
    cpu?: number;
    memory?: number;
    duration?: number;
  };
  position?: { x: number; y: number };
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

export interface WorkflowData {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export interface NodeUpdateEvent {
  nodeId: string;
  status: NodeStatus;
  timestamp: string;
  log?: string;
  metrics?: {
    cpu?: number;
    memory?: number;
    duration?: number;
  };
}

export interface PerformanceMetrics {
  renderTime: number;
  socketLatency: number;
  nodeUpdateCount: number;
  lastUpdateTime: string;
}

