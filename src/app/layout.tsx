import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { auth, signIn, signOut } from '@/auth'
import { FaUser } from 'react-icons/fa'

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

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const session = await auth()
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <nav className="min-h-16 bg-red text-white justify-between flex items-center p-4">
                    <h1 className="font-bold text-3xl">F1 Predictor</h1>
                    <div className="flex gap-3">
                        {session ? (
                            <button
                                className="bg-dark rounded py-2 px-4 hover:cursor-pointer hover:bg-black flex gap-2 items-center"
                                onClick={async () => {
                                    'use server'
                                    await signOut()
                                }}
                            >
                                <FaUser />
                                <span>Sign out</span>
                            </button>
                        ) : (
                            <button
                                className="bg-dark rounded py-2 px-4 hover:cursor-pointer hover:bg-black flex gap-2 items-center"
                                onClick={async () => {
                                    'use server'
                                    await signIn('google')
                                }}
                            >
                                <FaUser />
                                <span>Sign in</span>
                            </button>
                        )}
                    </div>
                </nav>
                <main className="mt-8">{children}</main>
            </body>
        </html>
    )
}
