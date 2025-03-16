import {
    DriversResponseData,
    RaceResponseData,
    ResultsResponseData,
} from './types'
import { endpoint } from './constants'

export const getRaces = async (year: number) => {
    const res = await fetch(`${endpoint}/${year}/races/`, {
        cache: 'force-cache',
    })
    const body: RaceResponseData = await res.json()
    return body.MRData.RaceTable.Races
}

export const getDrivers = async (year: number) => {
    const res = await fetch(`${endpoint}/${year}/drivers/`, {
        cache: 'force-cache',
    })
    const body: DriversResponseData = await res.json()
    return body.MRData.DriverTable.Drivers
}

export const getRaceResults = async (year: number) => {
    const res = await fetch(`${endpoint}/${year}/results/`, {
        cache: 'force-cache',
        next: {
            revalidate: 3600,
        },
    })
    const body: ResultsResponseData = await res.json()
    return body.MRData.RaceTable.Races
}
