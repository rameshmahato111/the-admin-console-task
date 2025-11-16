import { authenticateUser } from "@/lib/user";

type prevState = {
  success: boolean;
  message: string;
  error: null | string;
};

export const LoginAction = async (
  prevState: prevState,
  formData: FormData
): Promise<prevState> => {
  const email = formData.get("email") || "";
  const password = formData.get("password") || "";

  try {
    // Validate input
    if (!email || !password) {
      throw new Error("Email or password is required");
    }

    // Authenticate user using fake user database
    const user = await authenticateUser(email as string, password as string);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    return {
      success: true,
      message: `Login successful! Welcome, ${user.name} (${user.role})`,
      error: null,
    };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
      error: error instanceof Error ? error.message : String(error),
    };
  }
};