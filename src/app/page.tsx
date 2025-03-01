import { auth, signIn } from '@/auth'

export default async function Home() {
    const session = await auth()
    console.log(session)
    return (
        <div className="min-h-screen bg-gray-100 grid place-items-center">
            <form
                action={async () => {
                    'use server'
                    await signIn('google')
                }}
            >
                <button type="submit" className="bg-red-400">
                    Signin with Google
                </button>
            </form>
        </div>
    )
}
