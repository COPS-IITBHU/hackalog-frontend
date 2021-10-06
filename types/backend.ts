export type LoginSerializer = {
    id_token: string
}

export type TeamCreateSerializer = {
    team_id: string
}

export type SubmissionsSerializer = {
    id: number
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
    userStatus: string | boolean //'not registered', 'registered, 'submitted'
    // userStatus is boolean (false) in case user is not logged in
}

export type TeamSerializer = {
    id: number
    name: string
    hackathon: HackathonSerializer
    team_id: string
}

export type ProfileSerializer = {
    id: number
    name: string
    username: string
    college: string
    github_handle: string
    bio: string
    interests: string
    photoURL: string // URL
    teams: TeamSerializer[]
    email: string
}

export type TeamDetailSerializer = {
    id: number
    name: number
    hackathon: HackathonSerializer
    team_id: string
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
    description: string
}
