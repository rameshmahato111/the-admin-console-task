import type { NodeUpdateEvent, WorkflowNode } from "./types";

type WebSocketCallback = (event: NodeUpdateEvent) => void;
type ConnectionCallback = (connected: boolean) => void;

class WebSocketService {
  private ws: WebSocket | null = null;
  private callbacks: Set<WebSocketCallback> = new Set();
  private connectionCallbacks: Set<ConnectionCallback> = new Set();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 3000;
  private isSimulated = true; // Simulate WebSocket for demo
  private simulationInterval: NodeJS.Timeout | null = null;
  private mockNodes: WorkflowNode[] = [];

  constructor() {
    // For demo purposes, we'll simulate WebSocket
    // In production, this would connect to a real WebSocket server
  }

  // Initialize with mock nodes for simulation
  initializeMockNodes(nodes: WorkflowNode[]) {
    this.mockNodes = nodes;
  }

  connect(url?: string): void {
    if (this.isSimulated) {
      this.startSimulation();
      this.notifyConnection(true);
      return;
    }

    try {
      this.ws = new WebSocket(url || "ws://localhost:8080/workflow");
      
      this.ws.onopen = () => {
        console.log("WebSocket connected");
        this.reconnectAttempts = 0;
        this.notifyConnection(true);
      };

      this.ws.onmessage = (event) => {
        try {
          const data: NodeUpdateEvent = JSON.parse(event.data);
          this.notifyCallbacks(data);
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      this.ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        this.notifyConnection(false);
      };

      this.ws.onclose = () => {
        console.log("WebSocket disconnected");
        this.notifyConnection(false);
        this.attemptReconnect(url);
      };
    } catch (error) {
      console.error("Failed to create WebSocket:", error);
      this.notifyConnection(false);
    }
  }

  private startSimulation(): void {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
    }

    // Simulate real-time updates every 2-5 seconds
    this.simulationInterval = setInterval(() => {
      if (this.mockNodes.length === 0) return;

      // Randomly select a node to update
      const randomNode = this.mockNodes[Math.floor(Math.random() * this.mockNodes.length)];
      
      // Simulate state transitions
      const statuses: Array<WorkflowNode["status"]> = ["pending", "running", "completed", "failed"];
      const currentIndex = statuses.indexOf(randomNode.status);
      
      // Progress through states: pending -> running -> completed/failed
      let newStatus: WorkflowNode["status"];
      if (currentIndex === 0) {
        newStatus = "running";
      } else if (currentIndex === 1) {
        newStatus = Math.random() > 0.2 ? "completed" : "failed"; // 80% success rate
      } else {
        // If already completed/failed, sometimes restart
        if (Math.random() > 0.7) {
          newStatus = "pending";
        } else {
          return; // Don't update if already in final state
        }
      }

      const updateEvent: NodeUpdateEvent = {
        nodeId: randomNode.id,
        status: newStatus,
        timestamp: new Date().toISOString(),
        log: this.generateMockLog(newStatus),
        metrics: {
          cpu: Math.random() * 100,
          memory: Math.random() * 100,
          duration: Math.random() * 5000,
        },
      };

      // Add some latency simulation (50-200ms)
      setTimeout(() => {
        this.notifyCallbacks(updateEvent);
      }, 50 + Math.random() * 150);
    }, 2000 + Math.random() * 3000); // Update every 2-5 seconds
  }

  private generateMockLog(status: WorkflowNode["status"]): string {
    const logs = {
      pending: "Node queued for execution",
      running: `Processing data... ${Math.floor(Math.random() * 100)}% complete`,
      completed: "Node execution completed successfully",
      failed: `Error: ${["Timeout", "Validation failed", "Resource limit exceeded"][Math.floor(Math.random() * 3)]}`,
    };
    return logs[status];
  }

  private attemptReconnect(url?: string): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      setTimeout(() => {
        this.connect(url);
      }, this.reconnectDelay);
    } else {
      console.error("Max reconnection attempts reached");
    }
  }

  subscribe(callback: WebSocketCallback): () => void {
    this.callbacks.add(callback);
    return () => {
      this.callbacks.delete(callback);
    };
  }

  onConnectionChange(callback: ConnectionCallback): () => void {
    this.connectionCallbacks.add(callback);
    return () => {
      this.connectionCallbacks.delete(callback);
    };
  }

  private notifyCallbacks(event: NodeUpdateEvent): void {
    this.callbacks.forEach((callback) => {
      try {
        callback(event);
      } catch (error) {
        console.error("Error in WebSocket callback:", error);
      }
    });
  }

  private notifyConnection(connected: boolean): void {
    this.connectionCallbacks.forEach((callback) => {
      try {
        callback(connected);
      } catch (error) {
        console.error("Error in connection callback:", error);
      }
    });
  }

  disconnect(): void {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.callbacks.clear();
    this.connectionCallbacks.clear();
    this.notifyConnection(false);
  }

  send(data: unknown): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn("WebSocket is not connected");
    }
  }
}

// Singleton instance
export const websocketService = new WebSocketService();

