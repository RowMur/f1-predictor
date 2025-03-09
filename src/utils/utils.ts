import { auth } from '@/auth'
import { getRaceResults } from '@/modules/f1-api/getters'
import { Race } from '@/modules/f1-api/types'
import { prisma } from '@/prisma'

export const getPredictionDeadline = (race: Race): Date =>
    new Date(
        new Date(`${race.date}T${race.time}`).getTime() - 1000 * 60 * 60 * 72
    )

export const getSeasonPoints = async () => {
    const session = await auth()
    if (!session) {
        return 0
    }

    const userId = session.user?.id
    if (!userId) {
        return 0
    }

    const thisYear = new Date().getFullYear()

    const predictions = await prisma.prediction.findMany({
        where: {
            season: thisYear.toString(),
            userId: userId,
        },
    })

    const raceResults = await getRaceResults(thisYear)

    let points = 0
    for (const raceResult of raceResults) {
        const prediction = predictions.find((p) => p.round === raceResult.round)
        if (!prediction) {
            continue
        }

        const didWin =
            prediction.driverId === raceResult.Results[0].Driver.driverId
        if (didWin) {
            points += 1
        }
    }

    return points
}
