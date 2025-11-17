import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card'

const LogSection = () => {
  return (
    <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">System Logs</h2>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Real-time system logs and telemetry data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="rounded border-l-4 border-green-500 bg-zinc-50 p-3 dark:bg-zinc-900">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">
                      <span className="font-medium">[INFO]</span> Workflow
                      "Data Validation Pipeline" completed successfully
                    </p>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">
                      2s ago
                    </span>
                  </div>
                </div>
                <div className="rounded border-l-4 border-yellow-500 bg-zinc-50 p-3 dark:bg-zinc-900">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">
                      <span className="font-medium">[WARN]</span> Agent
                      "ML Training Agent" exceeded memory threshold
                    </p>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">
                      5m ago
                    </span>
                  </div>
                </div>
                <div className="rounded border-l-4 border-red-500 bg-zinc-50 p-3 dark:bg-zinc-900">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">
                      <span className="font-medium">[ERROR]</span> Workflow
                      "ML Model Training" failed at step 3
                    </p>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">
                      1h ago
                    </span>
                  </div>
                </div>
                <div className="rounded border-l-4 border-blue-500 bg-zinc-50 p-3 dark:bg-zinc-900">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">
                      <span className="font-medium">[INFO]</span> New agent
                      "Image Processor Agent" registered
                    </p>
                    <span className="text-xs text-zinc-600 dark:text-zinc-400">
                      2h ago
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
  )
}

export default LogSection