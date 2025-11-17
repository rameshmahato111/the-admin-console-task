"use server";

import { authenticateUser, type User } from "@/lib/user";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export type LoginUser = Omit<User, "password">;

type prevState = {
  success: boolean;
  message: string;
  error: null | string;
  user: LoginUser | null;
};

export const LoginAction = async (
  prevState: prevState,
  formData: FormData
): Promise<prevState> => {
  const email = formData.get("email") || "";
  const password = formData.get("password") || "";

  try {
    if (!email || !password) {
      throw new Error("Email or password is required");
    }

    const user = await authenticateUser(email as string, password as string);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Remove password
    const { password: _, ...userWithoutPassword } = user;

    // set cookie (Next.js cookies() handles encoding automatically)
    const cookieStore = await cookies();
    const userJson = JSON.stringify(userWithoutPassword);
    cookieStore.set("user", userJson, {
      path: "/",
      maxAge: 86400, // 24h expiry
    });

    redirect("/dashboard");
  } catch (error: unknown) {
    if (error && typeof error === "object" && "digest" in error) {
      throw error;
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
      error: error instanceof Error ? error.message : String(error),
      user: null,
    };
  }
};
