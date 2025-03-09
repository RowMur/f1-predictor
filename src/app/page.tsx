import { auth } from '@/auth'
import { DriverPredict } from '@/components/DriverPredict'
import { getDrivers, getRaces } from '@/modules/f1-api/getters'
import { prisma } from '@/prisma'
import Image from 'next/image'

export default async function Home() {
    const session = await auth()
    const currentYear = new Date().getFullYear()
    const races = await getRaces(currentYear)
    const upcomingRace = races.find((r) => r.date > new Date().toISOString())
    const drivers = await getDrivers(currentYear)

    const userPrediction = await prisma.prediction.findFirst({
        where: {
            userId: session?.user?.id || '',
            round: upcomingRace?.round,
            season: currentYear.toString(),
        },
    })

    const predictedDriver = drivers.find(
        (d) => d.driverId === userPrediction?.driverId
    )

    return (
        <div className="mx-auto w-fit bg-light-gray p-8 rounded-2xl">
            <h2 className="font-bold text-xl">
                Next Race - {upcomingRace?.raceName}
            </h2>
            <p className="flex gap-2 text-dark">
                <span>Round {upcomingRace?.round},</span>
                <span>{upcomingRace?.Circuit.circuitName}</span>
            </p>
            {userPrediction && predictedDriver ? (
                <>
                    <h3 className="text-lg font-semibold mt-8">
                        Your prediction
                    </h3>
                    <div className="flex gap-2 items-center mt-4">
                        <Image
                            src={`/drivers/${userPrediction.driverId}.avif`}
                            alt={userPrediction.driverId}
                            className="rounded-full object-cover h-full"
                            width={75}
                            height={75}
                        />
                        <span>{predictedDriver.familyName}</span>
                    </div>
                </>
            ) : (
                <>
                    <h3 className="text-lg font-semibold mt-8">
                        Select your winner
                    </h3>
                    <DriverPredict drivers={drivers} />
                </>
            )}
        </div>
    )
}
