import { Race } from '@/modules/f1-api/types'

export const getPredictionDeadline = (race: Race): Date =>
    new Date(
        new Date(`${race.date}T${race.time}`).getTime() - 1000 * 60 * 60 * 72
    )
