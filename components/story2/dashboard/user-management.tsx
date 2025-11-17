import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Separator } from '@radix-ui/react-separator'


const UserManagement = () => {
  return (
     <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Access Control</h2>
            <Button>Manage Users</Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>RBAC Management</CardTitle>
              <CardDescription>
                Manage user roles and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-medium">Role Permissions</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Admin</p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          Full access to all features
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit Permissions
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Analyst</p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          View and edit workflows, agents, policies
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit Permissions
                      </Button>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Viewer</p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          Read-only access to dashboard
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit Permissions
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
  )
}

export default UserManagement