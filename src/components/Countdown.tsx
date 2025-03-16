'use client'

import { useEffect, useState } from 'react'

type TimeLeft = {
    days: number
    hours: number
    minutes: number
}

type Props = {
    endDate: Date
}

export const Countdown = (props: Props) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
        calculateTimeLeft(props.endDate, () => {})
    )

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(
                calculateTimeLeft(props.endDate, () => clearInterval(interval))
            )
        }, 60000)

        return () => clearInterval(interval)
    }, [props.endDate])
    return (
        <>
            <div>
                <p className="text-center italic">Predictions close in...</p>
                <div className="flex gap-2 justify-center">
                    {timeLeft ? (
                        <>
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-bold">
                                    {timeLeft.days}
                                </span>
                                <span className="text-sm">Days</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-bold">
                                    {timeLeft.hours}
                                </span>
                                <span className="text-sm">Hours</span>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-xl font-bold">
                                    {timeLeft.minutes}
                                </span>
                                <span className="text-sm">Minutes</span>
                            </div>
                        </>
                    ) : (
                        <>Predictions Closed</>
                    )}
                </div>
            </div>
        </>
    )
}

const calculateTimeLeft = (endDate: Date, ifDone: () => void): TimeLeft => {
    const now = new Date()
    const diff = endDate.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    if (diff < 0) {
        ifDone()
    }
    return { days, hours, minutes }
}
