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
        '/contracts/payments',
        '/cars',
        '/cars/contract/:path*',
        '/chat',
        '/accounts',
        '/ratings',
        '/payments'
    ]
}