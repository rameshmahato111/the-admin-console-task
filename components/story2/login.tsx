"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useActionState, useEffect } from "react"
import { LoginAction } from "@/app/login/login-action"
import { saveUserToStorage } from "@/lib/auth"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"


export function LoginForm({
  className,

}: React.ComponentProps<"div">) {

  const [state, formAction, isPending]= useActionState(LoginAction, {
    success: false,
    message: "",
    error: null,
    user: null
  })

  const { refreshUser } = useAuth();
  const router = useRouter();

  // Save user to localStorage when login is successful
  useEffect(() => {
    if (state.success && state.user) {
      saveUserToStorage(state.user);
      // Also set cookie for server-side access
      document.cookie = `userRole=${state.user.role}; path=/; max-age=86400`; // 24 hours
      document.cookie = `userEmail=${state.user.email}; path=/; max-age=86400`;
      // Refresh auth context
      refreshUser();
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    }
  }, [state.success, state.user, refreshUser, router])

  return (
    <section className="max-w-lg mx-auto py-20">
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="flex flex-col gap-4" >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center justify-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" name="password" type="password" required />
              </Field>
              {state.error && (
                <Field>
                  <div className="p-3 rounded-md text-sm bg-red-50 text-red-800 border border-red-200">
                    <strong>Error:</strong> {state.error}
                  </div>
                </Field>
              )}
              {state.message && state.success && (
                <Field>
                  <div className="p-3 rounded-md text-sm bg-green-50 text-green-800 border border-green-200">
                    {state.message}
                  </div>
                </Field>
              )}
              <Field className="flex flex-col gap-2">
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Logging in..." : "Login"}
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
    </section>
  )
}
