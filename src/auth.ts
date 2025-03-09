import NextAuth from 'next-auth'
import authConfig from './auth.config'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    callbacks: {
        async session({ session, token }) {
            if (token.sub) {
                session.user.id = token.sub
            }
            return session
        },
    },
    ...authConfig,
})
