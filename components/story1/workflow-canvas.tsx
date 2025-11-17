"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { WorkflowNode } from "./workflow-node";
import { NodeDetailsPanel } from "./node-details-panel";
import { websocketService } from "./websocket-service";
import type { WorkflowNode as WorkflowNodeType, NodeUpdateEvent, PerformanceMetrics, NodeStatus } from "./types";
import { Wifi, WifiOff } from "lucide-react";

const nodeTypes = {
  workflowNode: WorkflowNode,
};

interface WorkflowCanvasProps {
  initialNodes?: WorkflowNodeType[];
  initialEdges?: Array<{ id: string; source: string; target: string }>;
}

export function WorkflowCanvas({ initialNodes = [], initialEdges = [] }: WorkflowCanvasProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<WorkflowNodeType | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    socketLatency: 0,
    nodeUpdateCount: 0,
    lastUpdateTime: "",
  });

  const renderStartTime = useRef<number>(0);
  const updateCountRef = useRef<number>(0);

  // Convert initial nodes to React Flow format
  useEffect(() => {
    const flowNodes: Node[] = initialNodes.map((node) => ({
      id: node.id,
      type: "workflowNode",
      position: node.position || { x: 0, y: 0 },
      data: {
        label: node.label,
        status: node.status,
        lastUpdated: node.lastUpdated,
      },
    }));

    // Auto-layout: Arrange nodes in a grid
    const cols = Math.ceil(Math.sqrt(flowNodes.length));
    flowNodes.forEach((node, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      node.position = {
        x: col * 220,
        y: row * 120,
      };
    });

    const flowEdges: Edge[] = initialEdges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: "smoothstep",
      animated: true,
    }));

    setNodes(flowNodes);
    setEdges(flowEdges);

    // Initialize WebSocket with mock nodes
    websocketService.initializeMockNodes(initialNodes);
  }, [initialNodes, initialEdges]);

  // WebSocket connection
  useEffect(() => {
    websocketService.connect();

    const unsubscribeConnection = websocketService.onConnectionChange((connected) => {
      setIsConnected(connected);
    });

    const unsubscribeUpdates = websocketService.subscribe((event: NodeUpdateEvent) => {
      const updateStartTime = performance.now();

      setNodes((nds) => {
        return nds.map((node) => {
          if (node.id === event.nodeId) {
            // Update node data
            const updatedNode = {
              ...node,
              data: {
                ...node.data,
                status: event.status,
                lastUpdated: event.timestamp,
              },
            };

            return updatedNode;
          }
          return node;
        });
      });

      // Update the selected node if it's the one being updated
      setSelectedNode((currentSelected) => {
        if (currentSelected?.id === event.nodeId) {
          return {
            ...currentSelected,
            status: event.status,
            lastUpdated: event.timestamp,
            logs: event.log ? [...(currentSelected.logs || []), event.log] : currentSelected.logs,
            metrics: event.metrics || currentSelected.metrics,
          };
        }
        return currentSelected;
      });

      // Update performance metrics
      const latency = performance.now() - updateStartTime;
      updateCountRef.current += 1;
      setPerformanceMetrics((prev) => ({
        ...prev,
        socketLatency: latency,
        nodeUpdateCount: updateCountRef.current,
        lastUpdateTime: new Date().toISOString(),
      }));
    });

    return () => {
      unsubscribeConnection();
      unsubscribeUpdates();
      websocketService.disconnect();
    };
  }, []);

  // Track render performance only when nodes change
  useEffect(() => {
    const startTime = performance.now();
    const frameId = requestAnimationFrame(() => {
      const renderTime = performance.now() - startTime;
      setPerformanceMetrics((prev) => ({
        ...prev,
        renderTime,
      }));
    });
    return () => cancelAnimationFrame(frameId);
  }, [nodes]);

  const onNodesChange = useCallback((changes: NodeChange[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const nodeData = initialNodes.find((n) => n.id === node.id);
      if (nodeData) {
        // Get latest status from React Flow node
        const latestNode: WorkflowNodeType = {
          ...nodeData,
          status: node.data.status as NodeStatus,
          lastUpdated: node.data.lastUpdated as string,
        };
        setSelectedNode(latestNode);
      }
    },
    [initialNodes]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Memoize node updates to prevent unnecessary re-renders
  const memoizedNodes = useMemo(() => nodes, [nodes]);
  const memoizedEdges = useMemo(() => edges, [edges]);

  return (
    <div className="relative w-full h-full">
      <ReactFlow
        nodes={memoizedNodes}
        edges={memoizedEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-zinc-50 dark:bg-zinc-950"
      >
        <Background />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            const status = node.data?.status;
            if (status === "completed") return "#22c55e";
            if (status === "failed") return "#ef4444";
            if (status === "running") return "#3b82f6";
            return "#eab308";
          }}
        />
        <Panel position="top-left" className="bg-white/90 dark:bg-zinc-900/90 p-2 rounded-lg shadow-lg">
          <div className="flex items-center gap-2 text-sm">
            {isConnected ? (
              <>
                <Wifi className="h-4 w-4 text-green-500" />
                <span className="text-zinc-700 dark:text-zinc-300">Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-red-500" />
                <span className="text-zinc-700 dark:text-zinc-300">Disconnected</span>
              </>
            )}
          </div>
        </Panel>
        <Panel position="bottom-left" className="bg-white/90 dark:bg-zinc-900/90 p-3 rounded-lg shadow-lg text-xs">
          <div className="space-y-1 text-zinc-700 dark:text-zinc-300">
            <div>Render: {performanceMetrics.renderTime.toFixed(2)}ms</div>
            <div>Latency: {performanceMetrics.socketLatency.toFixed(2)}ms</div>
            <div>Updates: {performanceMetrics.nodeUpdateCount}</div>
          </div>
        </Panel>
      </ReactFlow>

      {selectedNode && (
        <NodeDetailsPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      )}
    </div>
  );
}

