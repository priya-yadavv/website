import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import crypto from 'crypto';
import clientPromise from '@/lib/mongodb';

function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const client = await clientPromise;
          const db = client.db('luminacode');
          const users = db.collection('users');

          const user = await users.findOne({ email: credentials.email });
          if (!user) return null;

          const inputHash = hashPassword(credentials.password);
          if (inputHash !== user.passwordHash) return null;

          return {
            id: user._id.toString(),
            name: user.email,
            email: user.email,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
