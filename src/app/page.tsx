import { getDrivers, getRaces } from '@/modules/f1-api/getters'
import Image from 'next/image'

export default async function Home() {
    const currentYear = new Date().getFullYear()
    const races = await getRaces(currentYear)
    const upcomingRace = races.find((r) => r.date > new Date().toISOString())
    const drivers = await getDrivers(currentYear)
    console.log(drivers)
    return (
        <div className="flex items-center flex-col">
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
            <div>
                <h2 className="font-bold">Drivers</h2>
                <ul className="flex flex-wrap max-w-96">
                    {drivers.map((driver) => (
                        <li key={driver.driverId}>
                            {driver.givenName} {driver.familyName}
                            <Image
                                src={`/drivers/${driver.driverId}.avif`}
                                alt={`${driver.givenName}'s picture`}
                                width={100}
                                height={100}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
