
import axios from "@/app/utils/axios";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials"

export default NextAuth({
    pages: {
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const payload = {
                    email: credentials?.username,
                    password: credentials?.password,
                };

                const response = await axios.post('/login', {
                    phone_number: payload.email,
                    password: payload.password
                })
                const responseJson = response.data
                if (responseJson.data.user.role === 'admin') {
                    return responseJson.data
                }
                return null
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    id: user.user.id,
                    role: user.user.role,
                    access_token: user.access_token,
                    refresh_token: user.refresh_token,
                    expires: user.access_token_expires_at
                }
            }
            return token
        },
        async session({ session, token }) {
            return { ...session, ...token }
        },
    },

    secret: process.env.NEXTAUTH_SECRET

})