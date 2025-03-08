type Season = {
    season: string
    url: string
}

type SeasonTable = {
    Seasons: Season[]
}

export type SeasonsResponseData = ResponseData<{
    SeasonTable: SeasonTable
}>

type Location = {
    lat: string
    long: string
    locality: string
    country: string
}

type Circuit = {
    circuitId: string
    url: string
    circuitName: string
    Location: Location
}

type CircuitTable = {
    Circuits: Circuit[]
}

export type CircuitsResponseData = ResponseData<{
    CircuitTable: CircuitTable
}>

type CommonMRData = {
    xmlns: string
    series: string
    url: string
    limit: string
    offset: string
    total: string
}

type ResponseData<T extends object> = {
    MRData: CommonMRData & T
}

type Race = {
    season: string
    round: string
    url?: string
    raceName: string
    Circuit: Circuit
    FirstPractice?: Session
    SecondPractice?: Session
    ThirdPractice?: Session
    Qualifying?: Session
    Sprint?: Session
    SprintQualifying?: Session
    SprintShootout?: Session
} & Session

type Session = {
    date: string
    time?: string
}

type RaceTable = {
    season: string
    Races: Race[]
}

export type RaceResponseData = ResponseData<{
    RaceTable: RaceTable
}>

type Constructor = {
    constructorId?: string
    url?: string
    name: string
    nationality?: string
}

type ConstructorTable = {
    season: string
    Constructors: Constructor[]
}

export type ConstructorsResponseData = ResponseData<{
    ConstructorTable: ConstructorTable
}>

type Driver = {
    driverId: string
    permanentNumber?: string
    code?: string
    url?: string
    givenName: string
    familyName: string
    dateOfBirth?: string
    nationality?: string
}

type DriverTable = {
    season: string
    Drivers: Driver[]
}

export type DriversResponseData = ResponseData<{
    DriverTable: DriverTable
}>

type Result = {
    number: string
    position: string
    positionText: string
    points: string
    Driver: Driver
    Constructor?: Constructor
    grid?: string
    laps?: string
    status?: string
    Time: {
        millis: string
        time: string
    }
    FastestLap?: {
        rank: string
        lap: string
        Time: {
            time: string
        }
        AverageSpeed: {
            units: string
            speed: string
        }
    }
}

type RaceResult = {
    season: string
    round: string
    url: string
    raceName: string
    Circuit: Circuit
    date: string
    time: string
    Results: Result[]
}

type RaceResultTable = {
    season: string
    Races: RaceResult[]
}

export type ResultsResponseData = ResponseData<{
    RaceTable: RaceResultTable
}>

type SprintRaceResult = {
    season: string
    round: string
    url: string
    raceName: string
    Circuit: Circuit
    date: string
    time: string
    SprintResults: Result[]
}

type SprintRaceResultTable = {
    season: string
    Races: SprintRaceResult[]
}

export type SprintResultsResponseData = ResponseData<{
    RaceTable: SprintRaceResultTable
}>

type QualifyingResult = {
    number: string
    position?: string
    Driver: Driver
    Constructor: Constructor
    Q1?: string
    Q2?: string
    Q3?: string
}

type QualifyingRaceResult = {
    season: string
    round: string
    url: string
    raceName: string
    Circuit: Circuit
    date: string
    time: string
    QualifyingResults: QualifyingResult[]
}

type QualifyingRaceResultTable = {
    season: string
    RaceTable: QualifyingRaceResult[]
}

export type QualifyingResultsResponseData = ResponseData<{
    RaceTable: QualifyingRaceResultTable
}>

type PitStop = {
    driverId: string
    stop?: string
    lap?: string
    time?: string
    duration?: string
}

type PitStopRaceResult = {
    season: string
    round: string
    url: string
    raceName: string
    Circuit: Circuit
    date: string
    time: string
    PitStops: PitStop[]
}

type PitStopRaceResultTable = {
    season: string
    round: string
    Races: PitStopRaceResult[]
}

export type PitStopResultsResponseData = ResponseData<{
    RaceTable: PitStopRaceResultTable
}>

type LapTime = {
    driverId: string
    position: string
    time: string
}

type Lap = {
    number: string
    Timings: LapTime[]
}

type LapRaceResult = {
    season: string
    round: string
    url: string
    raceName: string
    Circuit: Circuit
    date: string
    time: string
    Laps: Lap[]
}

type LapRaceResultTable = {
    season: string
    round: string
    Races: LapRaceResult[]
}

export type LapResultsResponseData = ResponseData<{
    RaceTable: LapRaceResultTable
}>

type DriverStanding = {
    position?: string
    positionText: string
    points: string
    wins: string
    Driver: Driver
    Constructors: Constructor[]
}

type StandingsList = {
    season: string
    round: string
    DriverStandings: DriverStanding[]
}

type StadingsTable = {
    season: string
    round: string
    StandingsLists: StandingsList[]
}

export type DriverStandingsResponseData = ResponseData<{
    StandingsTable: StadingsTable
}>

type ConstructorStanding = {
    position?: string
    positionText: string
    points: string
    wins: string
    Constructor: Constructor
}

type ConstructorStandingsList = {
    season: string
    round: string
    ConstructorStandings: ConstructorStanding[]
}

type ConstructorStadingsTable = {
    season: string
    round: string
    StandingsLists: ConstructorStandingsList[]
}

export type ConstructorStandingsResponseData = ResponseData<{
    StandingsTable: ConstructorStadingsTable
}>

type Status = {
    statusId: string
    count: string
    status: string
}

type StatusTable = {
    Status: Status[]
}

export type StatusResponseData = ResponseData<{
    StatusTable: StatusTable
}>
