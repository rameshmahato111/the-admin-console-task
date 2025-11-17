import { authenticateUser, type User } from "@/lib/user";

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

  
    const { password: _, ...userWithoutPassword } = user;

    return {
      success: true,
      message: `Login successful! Welcome, ${user.name} (${user.role})`,
      error: null,
      user: userWithoutPassword,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
      error: error instanceof Error ? error.message : String(error),
      user: null,
    };
  }
};