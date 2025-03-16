import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { auth, signIn, signOut } from '@/auth'
import { FaUser } from 'react-icons/fa'
import { getSeasonPoints } from '@/utils/utils'
import Link from 'next/link'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: 'F1 Predictor',
    description: 'Predict upcoming F1 races',
}

export const revalidate = 3600

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await auth()
    const seasonPoints = await getSeasonPoints()
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <nav className="min-h-16 bg-red text-white justify-between flex items-center p-4 flex-wrap">
                    <h1 className="font-bold text-3xl grow">
                        <Link href={'/'}>F1 Predictor</Link>
                    </h1>
                    <div className="flex justify-between gap-3 items-center">
                        <Link href="/leaderboard" className="hover:underline">
                            Leaderboard
                        </Link>
                        {session ? (
                            <>
                                <div className="text-nowrap">
                                    Season Points: {seasonPoints}
                                </div>
                                <button
                                    className="bg-dark rounded py-2 px-4 hover:cursor-pointer hover:bg-black flex gap-2 items-center"
                                    onClick={async () => {
                                        'use server'
                                        await signOut()
                                    }}
                                >
                                    <FaUser />
                                    <span className="text-nowrap">
                                        Sign out
                                    </span>
                                </button>
                            </>
                        ) : (
                            <button
                                className="bg-dark rounded py-2 px-4 hover:cursor-pointer hover:bg-black flex gap-2 items-center"
                                onClick={async () => {
                                    'use server'
                                    await signIn('google')
                                }}
                            >
                                <FaUser />
                                <span className="text-nowrap">Sign in</span>
                            </button>
                        )}
                    </div>
                </nav>
                <main className="mt-8">{children}</main>
            </body>
        </html>
    )
}
