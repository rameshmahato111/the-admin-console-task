import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

const MetricOverView = () => {
  return (
    <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">System Metrics</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">45%</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Last updated: 2s ago
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Latency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">120ms</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Avg response time
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Jobs Processed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">1,234</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Today
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Active Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">23</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  Running now
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
  )
}

export default MetricOverView