'use client'

import { predict } from '@/app/actions'
import type { Driver } from '@/modules/f1-api/types'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
    drivers: Driver[]
}

export const DriverPredict = (props: Props) => {
    const [selectedDriver, setSelectedDriver] = useState<string | null>(null)

    return (
        <div className="flex flex-wrap max-w-[960px]">
            {props.drivers.map((driver) => (
                <div
                    key={driver.driverId}
                    className={clsx(
                        'p-4 m-2 flex rounded-lg items-center gap-2 hover:cursor-pointer hover:bg-red-400 hover:text-black',
                        selectedDriver === driver.driverId &&
                            'bg-red text-white'
                    )}
                    onClick={() =>
                        setSelectedDriver((prev) =>
                            prev === driver.driverId ? null : driver.driverId
                        )
                    }
                >
                    <Image
                        src={`/drivers/${driver.driverId}.avif`}
                        alt={driver.familyName}
                        className="rounded-full object-cover h-full"
                        width={75}
                        height={75}
                    />
                    <span>{driver.familyName}</span>
                </div>
            ))}
            <button
                className="bg-dark disabled:cursor-not-allowed disabled:bg-gray mx-auto text-white rounded py-2 px-4 hover:cursor-pointer hover:bg-black flex gap-2 items-center"
                disabled={!selectedDriver}
                onClick={
                    selectedDriver ? () => predict(selectedDriver) : undefined
                }
            >
                Predict
            </button>
        </div>
    )
}
