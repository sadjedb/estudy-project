import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authUser } from "@/lib/server/services/authUser";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password, userType } = credentials;

                const user = await authUser(email, password, userType);
                if (user) return user;
                return null;
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.roles = user.roles;
                token.permissions = user.permissions;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.roles = token.roles;
            session.user.permissions = token.permissions;
            return session;
        },
    },
});

export { handler as GET, handler as POST };
