import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = {
          id: "1",
          name: "Admin User",
          email: "admin@email.com",
          password: "password123",
        };

        if (credentials.email === user.email && credentials.password === user.password) {
          return { id: user.id, name: user.name, email: user.email }; // ✅ Removed password from the returned object
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // ✅ Ensure this is set in `.env.local`
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string, // ✅ Now TypeScript recognizes `id`
          name: token.name as string,
          email: token.email as string,
          image: token.image as string | null,
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // ✅ Ensure `id` is stored in the JWT token
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
  },

  session: {
    strategy: "jwt",
  },
};

// ✅ Correct export syntax for Next.js App Router
const handler = NextAuth(authOptions);
export const { GET, POST } = handler; // ✅ Use this format for App Router
