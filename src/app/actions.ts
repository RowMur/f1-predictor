'use server'

import { auth } from '@/auth'
import { getRaces } from '@/modules/f1-api/getters'
import { prisma } from '@/prisma'
import { getPredictionDeadline } from '@/utils/utils'
import { revalidatePath } from 'next/cache'

export const predict = async (driverId: string) => {
    console.log('Predicting', driverId)
    const session = await auth()
    const user = session?.user
    const userId = user?.id
    if (!session || !user || !userId) {
        console.log(session)
        throw new Error('User not authenticated')
    }

    const races = await getRaces(new Date().getFullYear())
    const upcomingRace = races.find((r) => r.date > new Date().toISOString())
    if (!upcomingRace) {
        throw new Error('No upcoming races')
    }

    const predictionDeadline = getPredictionDeadline(upcomingRace)
    if (new Date() > predictionDeadline) {
        throw new Error('Predictions closed')
    }

    await prisma.prediction.create({
        data: {
            driverId,
            userId: userId,
            round: upcomingRace.round,
            season: upcomingRace.season,
        },
    })

    revalidatePath('/')
    return true
}
