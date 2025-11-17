export type User = {
  name: string;
  email: string;
  role: string;
  password: string;
};

// Fake users database - Story 2: Admin Console roles
export const fakeUsers: User[] = [
  {
    name: "Admin User",
    email: "admin@perceivenow.com",
    role: "Admin",
    password: "admin123",
  },
  {
    name: "Analyst User",
    email: "analyst@perceivenow.com",
    role: "Analyst",
    password: "analyst123",
  },
  {
    name: "Viewer User",
    email: "viewer@perceivenow.com",
    role: "Viewer",
    password: "viewer123",
  },
];


export async function authenticateUser(
  email: string,
  password: string
): Promise<User | null> {
  // making fake api delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Find user by email and password
  const user = fakeUsers.find(
    (u) => u.email === email && u.password === password
  );

  return user || null;
}

