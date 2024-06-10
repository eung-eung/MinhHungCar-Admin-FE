
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
                    email: payload.email,
                    password: payload.password
                })
                if (response.data.user.role === 'admin') {
                    return response.data
                }
                return null
            },
        })
    ],
    // secret: process.env.JWT_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            console.log('loggg: ', process.env.NEXTAUTH_SECRET);

            if (user) {
                return {
                    ...token,
                    id: user.user.id,
                    role: user.user.role,
                    accessToken: user.access_token,
                    refreshToken: user.refresh_token
                }
            }
            return token

        },
        async session({ session, token }) {
            return { ...session, ...token }
        },
        // async redirect({ url, baseUrl }) {
        //     return url.startsWith(baseUrl)
        //         ? Promise.resolve(url)
        //         : Promise.resolve(baseUrl);
        // },
    },
    // session: {
    //     strategy: "jwt"
    // },
    secret: process.env.NEXTAUTH_SECRET
    // sta
})