import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "developer@luminacode.ai" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Mock user for the hackathon demo
        if (credentials?.email === "developer@luminacode.ai" && credentials.password === "password") {
          return { id: "1", name: "Lead Developer", email: "developer@luminacode.ai" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "lumina-code-hackathon-secret",
});

export { handler as GET, handler as POST };
