import { getRaceResults } from '@/modules/f1-api/getters'
import { prisma } from '@/prisma'
import { evaluatePredictions, thisYear } from '@/utils/utils'
import { User } from '@prisma/client'

const Page = async () => {
    const usersWithPredictions = await prisma.user.findMany({
        include: {
            predictions: true,
        },
    })
    const raceResults = await getRaceResults(thisYear)

    const userPointsMap = new Map<string, number>()
    const userMap = new Map<string, User>()
    for (const user of usersWithPredictions) {
        const points = evaluatePredictions(user.predictions, raceResults)
        userMap.set(user.id, user)
        userPointsMap.set(user.id, points)
    }

    const sortedUsers = Array.from(userPointsMap.entries()).sort(
        ([, a], [, b]) => b - a
    )

    return (
        <div className="mx-auto p-8">
            <h2 className="font-bold text-xl mb-4">Global Leaderboard</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Rank
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            User
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                            Points
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {sortedUsers.map(([userId, points], rank) => {
                        const user = userMap.get(userId)
                        if (!user) {
                            return null
                        }
                        return (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {rank + 1}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {points}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Page
