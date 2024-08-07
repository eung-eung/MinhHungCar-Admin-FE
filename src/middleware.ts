import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server'


export async function middleware(request: NextRequest) {
    const secret = process.env.NEXTAUTH_SECRET
    const token = await getToken({ req: request, secret });

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}
export const config = {
    matcher: [
        '/',
        '/contracts',
        '/contracts/:path*',
        '/contracts/payments',
        '/contracts/payments/:path*',
        '/cars/:path*',
        '/cars',
        '/cars/contract/:path*',
        '/chat',
        '/chat/:path*',
        '/accounts',
        '/ratings',
        '/payments',

    ]
}