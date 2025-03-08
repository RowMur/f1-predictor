import { getRaces } from '@/modules/f1-api/getters'

export default async function Home() {
    const currentYear = new Date().getFullYear()
    const races = await getRaces(currentYear)
    const upcomingRace = races.find((r) => r.date > new Date().toISOString())
    return (
        <div className="flex justify-center">
            <div className="bg-light-gray max-w-96 mx-6 my-16 p-6 rounded-lg">
                {upcomingRace ? (
                    <>
                        <h2 className="font-bold mb-1">
                            Upcoming Race - {upcomingRace.raceName}
                        </h2>
                        <div className="text-gray flex flex-wrap">
                            <span className="mr-2">
                                Round {upcomingRace.round}
                            </span>
                            <span className="mr-2">
                                {upcomingRace.Circuit.circuitName}
                            </span>
                        </div>
                    </>
                ) : (
                    <h2 className="font-bold">No upcoming races</h2>
                )}
            </div>
        </div>
    )
}
