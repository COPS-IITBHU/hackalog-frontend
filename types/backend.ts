export type LoginSerializer = {
    id_token: string
}

export type TeamCreateSerializer = {
    name: string
}

export type SubmissionsSerializer = {
    teamName: string
    team: number // id
    hackathon: number //id
    time: string // DateTime string
    score: number // 0 to 100
    title: string
    submission_url: string //URL
    review: string
    description: string
}

export type HackathonSerializer = {
    id: number
    title: string
    tagline: string
    description: string
    start: string // DateTime string
    end: string // DateTime string
    image: string // URL
    thumbnail: string // URL
    results_declared: boolean
    max_team_size: number
    slug: string
    status: string // "Completed" or "Ongoing" or "Upcoming",
}

export interface HackathonDetailSerializer extends HackathonSerializer {
    userStatus: string //'not registered', 'registered, 'submitted'
}

export type TeamSerializer = {
    id: number
    name: string
    hackathon: HackathonSerializer
    team_id: number
}

export type ProfileSerializer = {
    id: number
    name: string
    username: string
    college: string
    github_handle: string
    bio: string
    interests: string[]
    photoURL: string // URL
    teams: TeamSerializer
    email: string
}

export type TeamDetailSerializer = {
    id: number
    name: number
    hackathon: number
    team_id: number
    members: ProfileSerializer[]
    leader: ProfileSerializer
}

export type SubmissionRUDSerializer = {
    title: string
    team: TeamDetailSerializer
    review: string
    hackathon: HackathonSerializer
    submission_url: string // URL
    score: number // 0 to 100
}
