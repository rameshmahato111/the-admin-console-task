"use client";

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { PermissionWrapper } from '@/components/rbac/permission-wrapper'
import { useActionPermission } from '@/lib/hooks/use-permissions'



const AgentSection = () => {
  const canCreate = useActionPermission("agents", "create");
  const canEdit = useActionPermission("agents", "edit");
  const canDelete = useActionPermission("agents", "delete");
  const canView = useActionPermission("agents", "view");

  return (
    <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Agents</h2>
            <PermissionWrapper permission="create:agents">
              <Button>Create Agent</Button>
            </PermissionWrapper>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Agent Management</CardTitle>
              <CardDescription>
                Configure and manage automation agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="font-medium">Validation Agent v2.1</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Type: Data Validator | Status: Active
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
                    <h3 className="font-medium">Image Processor Agent</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Type: Image Processor | Status: Active
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
                    <h3 className="font-medium">ML Training Agent</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Type: ML Trainer | Status: Inactive
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

export default AgentSection