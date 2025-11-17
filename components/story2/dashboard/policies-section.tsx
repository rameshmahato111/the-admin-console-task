"use client";

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { PermissionWrapper } from '@/components/rbac/permission-wrapper'
import { useActionPermission } from '@/lib/hooks/use-permissions'



const Policies = () => {
  const canCreate = useActionPermission("policies", "create");
  const canEdit = useActionPermission("policies", "edit");
  const canDelete = useActionPermission("policies", "delete");
  const canView = useActionPermission("policies", "view");

  return (
       <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Policies</h2>
            <PermissionWrapper permission="create:policies">
              <Button>Create Policy</Button>
            </PermissionWrapper>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Policy Management</CardTitle>
              <CardDescription>
                Define and manage access control policies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h3 className="font-medium">Data Access Policy</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Scope: All workflows | Status: Enforced
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
                    <h3 className="font-medium">Resource Limit Policy</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Scope: ML workflows | Status: Enforced
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
                    <h3 className="font-medium">Security Policy</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Scope: All agents | Status: Enforced
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

export default Policies