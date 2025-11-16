export type User = {
  name: string;
  email: string;
  role: string;
  password: string;
};

// Fake users database
export const fakeUsers: User[] = [
  {
    name: "Ramesh Kumar",
    email: "ramesh@example.com",
    role: "admin",
    password: "password123",
  },
  {
    name: "Sita Devi",
    email: "sita@example.com",
    role: "user",
    password: "sita123",
  },
  {
    name: "Hari Shrestha",
    email: "hari@example.com",
    role: "moderator",
    password: "hari456",
  },
];

/**
 * Fake login function - simulates user authentication
 * @param email - User email
 * @param password - User password
 * @returns User object if credentials match, null otherwise
 */
export async function authenticateUser(
  email: string,
  password: string
): Promise<User | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Find user by email and password
  const user = fakeUsers.find(
    (u) => u.email === email && u.password === password
  );

  return user || null;
}

