"use client";

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { PermissionWrapper } from '@/components/rbac/permission-wrapper'
import { useActionPermission } from '@/lib/hooks/use-permissions'
import React from 'react'


const WorkFlows = () => {
  const canCreate = useActionPermission("workflows", "create");
  const canEdit = useActionPermission("workflows", "edit");
  const canDelete = useActionPermission("workflows", "delete");
  const canView = useActionPermission("workflows", "view");

  return (
     <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Workflows</h2>
            <PermissionWrapper permission="create:workflows">
              <Button>Create Workflow</Button>
            </PermissionWrapper>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Workflow Management</CardTitle>
              <CardDescription>
                Manage and monitor your validation pipelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="font-medium">Data Validation Pipeline</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Status: <span className="text-green-600">Running</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {canView && (
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    )}
                    {canEdit && (
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    )}
                    {canDelete && (
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="font-medium">Image Processing Workflow</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Status: <span className="text-yellow-600">Pending</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {canView && (
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    )}
                    {canEdit && (
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    )}
                    {canDelete && (
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="font-medium">ML Model Training</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Status: <span className="text-red-600">Failed</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {canView && (
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    )}
                    {canEdit && (
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    )}
                    {canDelete && (
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
  )
}

export default WorkFlows