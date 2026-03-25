import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fs from "fs";
import path from "path";
import crypto from "crypto";

// Path to our simple JSON user database (same file the signup route writes to)
const USERS_FILE = path.join(process.cwd(), "src", "data", "users.json");

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function readUsers(): { id: string; email: string; passwordHash: string }[] {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const users = readUsers();
        const user = users.find((u) => u.email === credentials.email);

        if (!user) return null;

        // Compare hashed passwords
        const inputHash = hashPassword(credentials.password);
        if (inputHash !== user.passwordHash) return null;

        return { id: user.id, name: user.email, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "lumina-code-hackathon-secret",
});

export { handler as GET, handler as POST };

