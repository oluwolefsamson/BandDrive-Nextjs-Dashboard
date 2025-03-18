import { authOptions } from "@/lib/authOptions"; // Importing from the correct path
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
