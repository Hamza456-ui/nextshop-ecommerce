import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    // User login par ensure kar do ke DB me user ho + role attach
    async signIn({ user }) {
      await connectDB();

      let dbUser = await User.findOne({ email: user.email });
      if (!dbUser) {
        dbUser = await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          role: "user", // default role
        });
      }

      user.role = dbUser.role; // role ko forward karo
      return true;
    },

    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },

    async session({ session, token }) {
      if (session?.user) session.user.role = token.role || "user";
      return session;
    },

    // ✅ Redirect Callback
    async redirect({ url, baseUrl }) {
      // Agar admin panel ke liye login hua hai
      if (url.startsWith("/admin")) return `${baseUrl}/admin`;
      return baseUrl;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// App Router handler export
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
