# Workflow Studio - Design & Implementation Brief

## Overview

This document outlines the architecture and implementation approach for the Workflow Studio - a high-performance, real-time workflow visualization system that enables engineers to visualize and manage distributed validation pipelines with smooth interactivity across 100+ nodes.

## Architecture & State Flow

### 1. Real-Time Updates Strategy

**WebSocket Service (`websocket-service.ts`)**
- **Primary Approach**: WebSocket connection for real-time bidirectional communication
- **Fallback**: Simulated WebSocket for development/demo purposes
- **Connection Management**:
  - Automatic reconnection with exponential backoff (max 5 attempts)
  - Connection state tracking and callbacks
  - Graceful error handling and disconnection recovery

**State Synchronization**:
- Node states synchronize with backend events through WebSocket message handlers
- Each update event contains: `nodeId`, `status`, `timestamp`, `log`, and `metrics`
- State updates are applied atomically to prevent race conditions
- React Flow's built-in state management handles node position and selection

### 2. State Isolation Strategy

**Component-Level State Management**:
- **React Flow State**: Manages node positions, edges, and viewport state
- **Local Component State**: Tracks selected node, connection status, and performance metrics
- **Memoization**: Custom nodes are memoized using `React.memo()` to prevent unnecessary re-renders
- **Batch Updates**: React Flow's `applyNodeChanges` and `applyEdgeChanges` batch multiple updates

**Node Data Structure**:
```typescript
interface WorkflowNode {
  id: string;
  label: string;
  status: "pending" | "running" | "completed" | "failed";
  lastUpdated: string;
  logs: string[];
  metrics?: { cpu?: number; memory?: number; duration?: number };
}
```

### 3. Data Flow Architecture

```
Backend API/WebSocket
    ↓
WebSocket Service (websocket-service.ts)
    ↓
Event Callbacks
    ↓
React Flow State (workflow-canvas.tsx)
    ↓
Node Components (workflow-node.tsx)
    ↓
UI Rendering
```

## Performance Optimizations

### 1. Canvas Optimization (React Flow)

**Virtualization**:
- React Flow automatically virtualizes nodes outside the viewport
- Only visible nodes are rendered, reducing DOM nodes for large workflows
- Viewport-based rendering ensures smooth performance with 100+ nodes

**Lazy Loading**:
- Nodes are loaded on-demand as they enter the viewport
- Initial render only includes visible nodes
- Background loading for off-screen nodes

### 2. Memoization Strategy

**Node Component Memoization**:
- `WorkflowNode` component wrapped with `React.memo()` to prevent re-renders when unrelated nodes update
- Memoized node data using `useMemo()` for nodes and edges arrays
- Callback functions wrapped with `useCallback()` to maintain referential equality

**Example**:
```typescript
export const WorkflowNode = memo(WorkflowNodeComponent);
const memoizedNodes = useMemo(() => nodes, [nodes]);
```

### 3. Batch Updates

- React Flow's `applyNodeChanges` batches multiple node updates into a single render cycle
- WebSocket events are processed sequentially to avoid state conflicts
- Debounced updates for rapid state changes (if needed in production)

### 4. Render Performance

**Performance Metrics Tracking**:
- Render time measurement using `performance.now()`
- Socket latency tracking for each update event
- Update count monitoring for debugging

**Optimization Techniques**:
- Minimal re-renders through proper state isolation
- CSS transitions for smooth visual updates
- Hardware-accelerated animations (transform/opacity)

## User Experience & Accessibility

### 1. Visual Status Indicators

**Color-Coded States**:
- **Pending** (Yellow): Node queued for execution
- **Running** (Blue): Node currently executing (with pulse animation)
- **Completed** (Green): Node finished successfully
- **Failed** (Red): Node execution failed

**Visual Feedback**:
- Animated pulse effect for running nodes
- Spinning icon for active processing
- Smooth color transitions between states (300ms duration)
- Selected node highlighting with ring border

### 2. Contextual Debug Information

**Node Details Panel**:
- **Side Panel**: Slides in from right when node is clicked
- **Information Displayed**:
  - Node name and current status
  - Last updated timestamp
  - Real-time metrics (CPU, Memory, Duration)
  - Log messages with timestamps
  - Visual progress bars for resource usage

**Tooltips** (Future Enhancement):
- Hover tooltips for quick status overview
- Keyboard-accessible tooltip triggers

### 3. Keyboard Navigation

**Current Implementation**:
- Tab navigation through interactive elements
- Enter/Space to select nodes
- Escape to close side panel

**Future Enhancements**:
- Arrow key navigation between nodes
- Keyboard shortcuts for common actions
- Focus management for screen readers

### 4. Accessibility Features

- Semantic HTML structure
- ARIA labels for status indicators
- High contrast color schemes (dark mode support)
- Screen reader friendly status announcements

## Integration with Backend APIs

### 1. Data Contract Alignment

**FastAPI OpenAPI Schema Compatibility**:
```typescript
// Node Update Event (matches backend schema)
interface NodeUpdateEvent {
  nodeId: string;
  status: "pending" | "running" | "completed" | "failed";
  timestamp: string; // ISO 8601 format
  log?: string;
  metrics?: {
    cpu?: number;
    memory?: number;
    duration?: number;
  };
}
```

**WebSocket Message Format**:
- JSON-encoded messages
- Consistent event structure across all updates
- Error handling for malformed messages

### 2. Authentication Handling

**Current Implementation**:
- WebSocket connection inherits browser authentication (cookies)
- Token-based auth can be added via query params or headers

**Production Considerations**:
- JWT token in WebSocket connection URL
- Token refresh mechanism
- Re-authentication on connection failure

### 3. Real-Time Streaming

**Connection Management**:
- Persistent WebSocket connection
- Automatic reconnection on failure
- Connection status indicator in UI
- Graceful degradation if WebSocket unavailable

**Event Processing**:
- Sequential event processing to maintain order
- Event queuing during reconnection
- Duplicate event detection (optional)

## Technical Stack

- **React Flow** (`@xyflow/react`): DAG visualization library
- **React 19**: UI framework with concurrent features
- **TypeScript**: Type safety and better DX
- **WebSocket API**: Real-time communication
- **Tailwind CSS**: Styling and animations

## Performance Targets

- **Render Time**: < 16ms (60 FPS)
- **Socket Latency**: < 200ms
- **Node Update Response**: < 100ms
- **Support**: 100+ nodes with smooth interaction

## Future Enhancements

1. **Advanced Filtering**: Filter nodes by status, type, or metrics
2. **Search Functionality**: Quick node search and navigation
3. **Export/Import**: Save and load workflow configurations
4. **History Timeline**: View workflow execution history
5. **Collaborative Editing**: Multi-user real-time collaboration
6. **Custom Node Types**: Support for different node categories
7. **Performance Profiling**: Detailed performance analytics dashboard

## Conclusion

This implementation provides a solid foundation for a high-performance workflow visualization system. The architecture is designed to scale to 100+ nodes while maintaining smooth real-time interactivity. The modular design allows for easy extension and customization based on specific requirements.

