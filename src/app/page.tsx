import { auth } from '@/auth'
import { Countdown } from '@/components/Countdown'
import { DriverPredict } from '@/components/DriverPredict'
import { NoUpcomingRace } from '@/components/NoUpcomingRace'
import { getDrivers, getRaces } from '@/modules/f1-api/getters'
import { prisma } from '@/prisma'
import { getPredictionDeadline } from '@/utils/utils'
import { revalidatePath } from 'next/cache'
import Image from 'next/image'

export const revalidate = 3600

export default async function Home() {
    const session = await auth()
    const currentYear = new Date().getFullYear()
    const races = await getRaces(currentYear)
    const upcomingRace = races.find((r) => r.date > new Date().toISOString())

    if (!upcomingRace) {
        return <NoUpcomingRace />
    }

    const predictionDeadline = getPredictionDeadline(upcomingRace)

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
            <div className="flex flex-wrap  gap-x-16 justify-between">
                <div>
                    <h2 className="font-bold text-xl">
                        {upcomingRace.raceName}
                    </h2>
                    <p className="flex gap-2 text-dark">
                        <span>Round {upcomingRace.round}</span>
                        <span>{upcomingRace.Circuit.circuitName}</span>
                    </p>
                </div>
                <div className="text-center">
                    <Countdown endDate={predictionDeadline} />
                </div>
            </div>
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
                    <button
                        className="bg-dark disabled:cursor-not-allowed disabled:bg-gray mx-auto text-white rounded py-2 px-4 hover:cursor-pointer hover:bg-black flex gap-2 items-center"
                        onClick={async () => {
                            'use server'
                            await prisma.prediction.delete({
                                where: {
                                    userId_season_round: {
                                        round: userPrediction.round,
                                        season: userPrediction.season,
                                        userId: userPrediction.userId,
                                    },
                                },
                            })
                            revalidatePath('/')
                        }}
                    >
                        Clear prediction
                    </button>
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
