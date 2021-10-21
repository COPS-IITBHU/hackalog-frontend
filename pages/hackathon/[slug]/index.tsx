import Link from "next/link"
import { useRouter } from "next/router"
import { PropsWithChildren, useEffect, useState } from "react"
import axios from "../../../util/axios"
import { useAuth } from "../../../context/auth"
import {
    Nav,
    Table,
    Tab,
    Container,
    Spinner,
    Image,
    Badge,
    Button,
} from "react-bootstrap"
import { Text } from "atomize"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import highlight from "remark-highlight.js"
import codeformatter from "remark-code-frontmatter"
import Head from "next/head"
import {
    HackathonDetailSerializer,
    SubmissionsSerializer,
    TeamDetailSerializer,
    TeamSerializer,
} from "@/types/backend"

export default function Hackathon() {
    const router = useRouter()
    const slug = router.query.slug

    const { token, profile, loading } = useAuth()
    const [localLoading, setLocalLoading] = useState<boolean>(true)
    const [hackathon, setHackathon] = useState<HackathonDetailSerializer>(
        {} as HackathonDetailSerializer
    )
    const [error, setError] = useState<number>(0)

    useEffect(() => {
        if (slug) {
            setLocalLoading(true)
            if (token)
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Token ${token}`
            axios
                .get<HackathonDetailSerializer>(`/hackathons/${slug}/`)
                .then((response) => {
                    let hackathon = response.data
                    if (!hackathon.image)
                        hackathon.image = "/images/home-jumbo.jpg"
                    setHackathon(hackathon)
                    setLocalLoading(false)
                })
                .catch((err) => {
                    setError(err.response.status)
                })
                .finally(() => setLocalLoading(false))
        }
        return () => {
            delete axios.defaults.headers.common["Authorization"]
        }
    }, [slug, token])

    const [submissions, setSubmisssions] = useState<SubmissionsSerializer[]>([])
    const [leaderboardLoading, setLeaderboardLoading] = useState<boolean>(true)

    useEffect(() => {
        if (slug && hackathon) {
            setLeaderboardLoading(true)
            if (token)
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Token ${token}`
            axios
                .get<SubmissionsSerializer[]>(
                    `/hackathons/${slug}/submissions/`
                )
                .then((response) => {
                    setSubmisssions(response.data)
                })
                .catch(() => {
                    //Notify to user by the error
                })
            setLeaderboardLoading(false)
        }
    }, [token, slug, hackathon])

    if (error != 0) {
        return (
            <>
                {error == 404 ? (
                    <div className="text-center pt-3 mb-2">
                        <Image
                            src={"/images/404.svg"}
                            className="mb-3 mt-3"
                            style={{ maxHeight: "30vh" }}
                            alt="Error 404"
                        />
                        <Text textSize="title">
                            Error 404: Hackathon Not Found
                        </Text>
                    </div>
                ) : (
                    <div className="col-12 text-center py-3">
                        <Text textSize="display3">
                            <span role="img" aria-label="sad face">
                                😔
                            </span>
                        </Text>
                        <Text textSize="heading">Error {error} Occured</Text>
                        <Text textSize="caption">
                            We are trying hard to fix this. Report this
                            problem&nbsp;
                            <a href="https://github.com/COPS-IITBHU/hackalog-frontend/issues/new">
                                here
                            </a>
                        </Text>
                    </div>
                )}
            </>
        )
    }

    var myTeam: { team_id: string } = { team_id: "#" }
    if (profile) {
        var myTeamDetail: TeamSerializer[] = profile.teams.filter(
            (team) => team.hackathon.slug == hackathon.slug
        )
        if (myTeamDetail.length)
            myTeam.team_id = myTeamDetail[0].team_id.toString()
    }
    return (
        <>
            <Head>
                {hackathon.title ? (
                    <title>{hackathon.title} | COPS Hackalog</title>
                ) : (
                    <title>Hackathon - COPS Hackalog</title>
                )}
                <meta
                    name="description"
                    content="Register for Hackathons and Dev-Sprints at COPS Hackalog"
                />
            </Head>
            {loading || localLoading ? (
                <Container className="text-center">
                    <Spinner
                        style={{
                            position: "absolute",
                            top: "50%",
                        }}
                        className="mt-auto mb-auto"
                        animation="border"
                        role="status"
                    >
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </Container>
            ) : (
                <div style={{ background: "#87a3bb17", minHeight: "100vh" }}>
                    <div
                        className="banner-section"
                        style={{ backgroundImage: `url(${hackathon.image})` }}
                    ></div>
                    <div className="hackathon-nav">
                        <Tab.Container defaultActiveKey="overview">
                            <div className="text-center">
                                <Nav>
                                    <Nav.Item>
                                        <Nav.Link eventKey="overview">
                                            Overview
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="participants">
                                            Participants
                                        </Nav.Link>
                                    </Nav.Item>
                                    {/*
                                        Not Implemented on Backend Yet
                                        <Nav.Item>
                                            <Nav.Link eventKey="updates">Updates</Nav.Link>
                                        </Nav.Item>
                                        */}
                                    <Nav.Item>
                                        <Nav.Link eventKey="leaderboard">
                                            Leaderboard
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                            <div className="row no-gutters container-xs container mx-auto align-items-start">
                                <div className="col-lg-9">
                                    <Tab.Content>
                                        <Tab.Pane
                                            eventKey="overview"
                                            title="Overview"
                                        >
                                            <Overview hackathon={hackathon} />
                                        </Tab.Pane>
                                        <Tab.Pane
                                            eventKey="participants"
                                            title="Participants"
                                        >
                                            <Participants
                                                slug={hackathon.slug}
                                            />
                                        </Tab.Pane>
                                        <Tab.Pane
                                            eventKey="updates"
                                            title="Updates"
                                        >
                                            <Overview hackathon={hackathon} />
                                        </Tab.Pane>
                                        <Tab.Pane
                                            eventKey="leaderboard"
                                            title="Leaderboard"
                                        >
                                            <Leaderboard
                                                submissions={submissions}
                                                loading={leaderboardLoading}
                                                status={hackathon.status}
                                            />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </div>
                                <div className="col-lg-3 p-3">
                                    {hackathon.status == "Ongoing" ? (
                                        <div className="pb-5 pb-lg-0">
                                            <div className="bg-grey p-3 p-md-4 rounded">
                                                {hackathon.userStatus ==
                                                    "registered" && token ? (
                                                    <>
                                                        <div className="pb-3">
                                                            You have already
                                                            registered for the
                                                            hackathon. Submit
                                                            your project below!
                                                        </div>
                                                        <div>
                                                            <Link
                                                                href={`/hackathon/${slug}/teams/${myTeam.team_id}`}
                                                                passHref
                                                            >
                                                                <a href="/#">
                                                                    <Button
                                                                        variant="success"
                                                                        className="w-100"
                                                                    >
                                                                        Your
                                                                        Team
                                                                    </Button>
                                                                </a>
                                                            </Link>

                                                            <div
                                                                style={{
                                                                    height: "1rem",
                                                                }}
                                                            ></div>
                                                            <Link
                                                                href={`/hackathon/${slug}/teams/${myTeam.team_id}/submit`}
                                                                passHref
                                                            >
                                                                <a href="/#">
                                                                    <Button
                                                                        variant="success"
                                                                        className="w-100"
                                                                    >
                                                                        Submit
                                                                        Your
                                                                        Project
                                                                    </Button>
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    </>
                                                ) : hackathon.userStatus ==
                                                      "submitted" && token ? (
                                                    <>
                                                        <div className="pb-3">
                                                            We have already
                                                            received your
                                                            submission for this
                                                            hackathon.
                                                            <p>
                                                                You can still
                                                                login to see
                                                                your team.
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <Link
                                                                href={`/hackathon/${slug}/teams/${myTeam.team_id}`}
                                                                passHref
                                                            >
                                                                <a href="/#">
                                                                    <Button
                                                                        variant="success"
                                                                        className="w-100"
                                                                    >
                                                                        Your
                                                                        Team
                                                                    </Button>
                                                                </a>
                                                            </Link>
                                                            <div
                                                                style={{
                                                                    height: "1rem",
                                                                }}
                                                            ></div>
                                                            {submissions.length ? (
                                                                <Link
                                                                    href={`/submission/${submissions[0].id}`}
                                                                    passHref
                                                                >
                                                                    <a href="/#">
                                                                        <Button
                                                                            variant="success"
                                                                            className="w-100 pt-3"
                                                                        >
                                                                            Your
                                                                            Submission
                                                                        </Button>
                                                                    </a>
                                                                </Link>
                                                            ) : (
                                                                <Link
                                                                    href="#"
                                                                    passHref
                                                                >
                                                                    <a href="/#">
                                                                        <Button
                                                                            variant="success"
                                                                            className="w-100 pt-3"
                                                                        >
                                                                            <Spinner
                                                                                animation="border"
                                                                                role="status"
                                                                            >
                                                                                <span className="sr-only">
                                                                                    Loading
                                                                                    Submission
                                                                                    Link...
                                                                                </span>
                                                                            </Spinner>
                                                                        </Button>
                                                                    </a>
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </>
                                                ) : token ? (
                                                    <>
                                                        <div className="pb-3">
                                                            Join to receive
                                                            hackathon updates,
                                                            find teammates, and
                                                            submit a project.
                                                        </div>
                                                        <div>
                                                            <Link
                                                                href={`/hackathon/${slug}/register`}
                                                                passHref
                                                            >
                                                                <a href="/#">
                                                                    <Button
                                                                        variant="success"
                                                                        className="w-100"
                                                                    >
                                                                        Join
                                                                        Hackathon
                                                                    </Button>
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div className="pb-3">
                                                            Join to receive
                                                            hackathon updates,
                                                            find teammates, and
                                                            submit a project.
                                                        </div>
                                                        <div>
                                                            <Link
                                                                href={`/hackathon/${slug}/register`}
                                                                passHref
                                                            >
                                                                <a href="/#">
                                                                    <Button
                                                                        className="w-100"
                                                                        variant="success"
                                                                        disabled
                                                                    >
                                                                        Login to
                                                                        Join
                                                                    </Button>
                                                                </a>
                                                            </Link>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ) : hackathon.status == "Completed" ? (
                                        <div className="pb-5 pb-lg-0 mt-3">
                                            <div className="bg-grey p-3 p-md-4 rounded">
                                                <div className="">
                                                    The hackathon has concluded.
                                                    Hope you had a nice
                                                    experience!
                                                    <p>
                                                        The results&nbsp;
                                                        {hackathon.results_declared
                                                            ? "have been declared. You can view it under the leaderboard section."
                                                            : "will be declared shortly."}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="pb-5 pb-lg-0 mt-3">
                                            <div className="bg-grey p-3 p-md-4 rounded">
                                                <div className="pb-3">
                                                    The hackathon has not
                                                    started yet.&nbsp;
                                                    {hackathon.userStatus ==
                                                    false
                                                        ? "Login to register for the hackathon and make a team!"
                                                        : hackathon.userStatus ==
                                                          "not registered"
                                                        ? "Click the button below to join the hackathon and make a team!"
                                                        : "You have already registered for the hackathon. Wait for the hackathon to begin!"}
                                                </div>
                                                <div>
                                                    {hackathon.userStatus ===
                                                    false ? (
                                                        <Button
                                                            variant="success"
                                                            disabled
                                                        >
                                                            Login First
                                                        </Button>
                                                    ) : hackathon.userStatus ==
                                                      "not registered" ? (
                                                        <Link
                                                            href={`/hackathon/${slug}/register`}
                                                            passHref
                                                        >
                                                            <a href="/#">
                                                                <Button variant="success">
                                                                    Register
                                                                </Button>
                                                            </a>
                                                        </Link>
                                                    ) : hackathon.userStatus ==
                                                          "registered" &&
                                                      token ? (
                                                        <Link
                                                            href={`/hackathon/${slug}/teams/${myTeam.team_id}`}
                                                            passHref
                                                        >
                                                            <a href="/#">
                                                                <Button variant="success">
                                                                    Your Team
                                                                </Button>
                                                            </a>
                                                        </Link>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Tab.Container>
                    </div>
                    <style jsx>{`
                        .banner-section {
                            min-height: 350px;
                            width: 100%;
                            background: linear-gradient(
                                to top left,
                                #2986a5,
                                #0d6697,
                                #00879a,
                                #00776b
                            );
                            background-size: cover;
                            box-shadow: 0px 0px 40px 41px #21212135 inset;
                        }
                        .bg-grey {
                            background-color: rgba(0, 0, 0, 0.04);
                        }
                    `}</style>
                </div>
            )}
        </>
    )
}

type OverviewPropTypes = PropsWithChildren<{
    hackathon: HackathonDetailSerializer
}>
function Overview({ hackathon }: OverviewPropTypes) {
    return (
        <div className="overview_body">
            <div className="p-3">
                <Text
                    tag="h1"
                    textSize="display1"
                    m={{ b: "1rem" }}
                    fontFamily="madetommy-bold"
                >
                    {hackathon.title}
                </Text>

                <ReactMarkdown
                    plugins={[gfm, codeformatter, highlight]}
                    className="pb-3 markabcs"
                >
                    {hackathon.description}
                </ReactMarkdown>
                <div className="pb-3">
                    <Text
                        tag="h6"
                        textSize="subheader"
                        fontFamily="madetommy-bold"
                    >
                        START DATE:
                    </Text>
                    {new Date(hackathon.start).toString()}
                </div>
                <div className="pb-3">
                    <Text
                        tag="h6"
                        textSize="subheader"
                        fontFamily="madetommy-bold"
                    >
                        END DATE:
                    </Text>
                    {new Date(hackathon.end).toString()}
                </div>
                {/* <div className="pb-3">
                    <Text
                        tag="h6"
                        textSize="subheader"
                        fontFamily="madetommy-bold"
                    >
                        STATUS:
                    </Text>
                    {hackathon.status}
                </div> */}
                <div className="pb-3">
                    <Text
                        tag="h6"
                        textSize="subheader"
                        fontFamily="madetommy-bold"
                    >
                        MAX TEAM SIZE:
                    </Text>
                    {hackathon.max_team_size}
                </div>
                <div className="pb-3">
                    <Text
                        tag="h6"
                        textSize="subheader"
                        fontFamily="madetommy-bold"
                    >
                        RESULTS DECLARED:
                    </Text>
                    {hackathon.results_declared ? "Yes" : "No"}
                </div>
            </div>
            <style jsx>{`
                .p3 {
                    margin-left: 50px;
                }
                .overview_body {
                    margin-left: 50px;
                }
                .title {
                    font-size: 30px;
                    padding-bottom: 30px;
                    padding-top: 30px;
                }
            `}</style>
        </div>
    )
}

type ParticipantsPropTypes = PropsWithChildren<{ slug: string }>
function Participants({ slug }: ParticipantsPropTypes) {
    const [teams, setTeams] = useState<TeamDetailSerializer[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)
        if (slug) {
            axios
                .get<TeamDetailSerializer[]>(`/hackathons/${slug}/teams/`)
                .then((response) => {
                    setTeams(response.data)
                })
                .catch(() => {})
                .finally(() => setLoading(false))
        }
    }, [slug])

    return (
        <div>
            {loading ? (
                <div className="text-center">
                    <Table
                        responsive
                        style={{
                            borderCollapse: "separate",
                            borderSpacing: "0px 5px",
                        }}
                    >
                        <thead
                            style={{
                                backgroundColor: "rgba(0.9,0,0,0.04)",
                            }}
                        >
                            <tr>
                                <th>Name</th>
                                <th>Team Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                    </Table>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div>
                    <Table
                        responsive
                        style={{
                            borderCollapse: "separate",
                            borderSpacing: "0px 5px",
                        }}
                    >
                        <thead
                            style={{
                                backgroundColor: "rgba(0.9,0,0,0.04)",
                            }}
                        >
                            <tr>
                                <th>Name</th>
                                <th>Team Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team) => {
                                var members = []
                                members.push(
                                    <tr
                                        key={team.name + "_" + team.leader.name}
                                        className="bg-grey rounded"
                                    >
                                        <td>
                                            {team.leader.name}{" "}
                                            <Badge variant="info">Leader</Badge>
                                        </td>
                                        <td>{team.name}</td>
                                        <td>
                                            <Link
                                                href={`/profile/${team.leader.username}`}
                                                passHref
                                            >
                                                <a href="/#">
                                                    {team.leader.username}
                                                </a>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                                for (var i = 0; i < team.members.length; i++) {
                                    if (
                                        team.members[i].username !=
                                        team.leader.username
                                    ) {
                                        members.push(
                                            <tr
                                                key={
                                                    team.name +
                                                    "_" +
                                                    team.members[i].username
                                                }
                                                className="bg-grey rounded"
                                            >
                                                <td>{team.members[i].name}</td>
                                                <td>{team.name}</td>
                                                <td>
                                                    <Link
                                                        href={`/profile/${team.members[i].username}`}
                                                        passHref
                                                    >
                                                        <a href="/#">
                                                            {
                                                                team.members[i]
                                                                    .username
                                                            }
                                                        </a>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    }
                                }
                                return members
                            })}
                        </tbody>
                    </Table>
                    {!teams.length ? (
                        <div className="bg-grey text-center py-3 rounded">
                            No Participants Found
                        </div>
                    ) : null}
                    <style jsx>{`
                        .bg-grey {
                            margin-top: 2px;
                            background-color: rgba(0.9, 0, 0, 0.04);
                            height: 7vh;
                            margin-bottom: 4px;
                        }
                    `}</style>
                </div>
            )}
        </div>
    )
}

type LeaderboardPropTypes = PropsWithChildren<{
    status: string
    submissions: SubmissionsSerializer[]
    loading: boolean
}>
function Leaderboard({ status, submissions, loading }: LeaderboardPropTypes) {
    const submissionList = submissions
        .sort((a, b) => b.score - a.score)
        .map((submission, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{submission.teamName} </td>
                <td> {submission.score}</td>
                <td>
                    <Link href={`/submission/${submission.id}`} passHref>
                        <a href="/#">{submission.title}</a>
                    </Link>
                </td>
            </tr>
        ))
    return (
        <div>
            <Table responsive>
                <thead
                    style={{
                        backgroundColor: "rgba(0.9,0,0,0.04)",
                    }}
                >
                    <tr>
                        <th>Rank</th>
                        <th>Team Name</th>
                        <th>Score</th>
                        <th>Submission Link</th>
                    </tr>
                </thead>
                <tbody>
                    {status == "Upcoming" ? (
                        <tr>
                            <td colSpan={4} className="px-3">
                                <div
                                    className="row rounded-bottom"
                                    style={{
                                        backgroundColor: "rgba(0.9,0,0,0.04)",
                                    }}
                                >
                                    <div className="col-12 text-center py-3">
                                        <Image
                                            src="/images/rocket.svg"
                                            style={{ height: "80px" }}
                                            alt="Rocket Icon"
                                        />
                                        <p>Let the Hackathon Begin</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ) : status == "Ongoing" ? (
                        <tr>
                            <td colSpan={4} className="px-3">
                                <div
                                    className="row rounded-bottom"
                                    style={{
                                        backgroundColor: "rgba(0.9,0,0,0.04)",
                                    }}
                                >
                                    <div className="col-12 text-center py-3">
                                        <Image
                                            src="/images/rocket.svg"
                                            style={{ height: "80px" }}
                                            alt="Rocket Icon"
                                        />
                                        <p>
                                            Submissions can only be viewed once
                                            the hackathon has ended!
                                        </p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <>
                            {loading ? (
                                <tr>
                                    <td colSpan={4}>
                                        <Spinner
                                            style={{
                                                position: "absolute",
                                                left: "50%",
                                            }}
                                            animation="border"
                                            role="status"
                                        >
                                            <span className="sr-only">
                                                Loading...
                                            </span>
                                        </Spinner>
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {submissionList.length ? (
                                        <>{submissionList}</>
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-3">
                                                <div
                                                    className="row rounded-bottom"
                                                    style={{
                                                        backgroundColor:
                                                            "rgba(0.9,0,0,0.04)",
                                                    }}
                                                >
                                                    <div className="col-12 text-center py-3">
                                                        <Text textSize="display1">
                                                            <span
                                                                role="img"
                                                                aria-label="sad face"
                                                            >
                                                                😔
                                                            </span>
                                                        </Text>
                                                        <Text>
                                                            No Submissions Found
                                                        </Text>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </tbody>
            </Table>
            <style jsx>{`
                .bg-grey {
                    background-color: rgba(0.9, 0, 0, 0.04);
                    display: flex;
                    height: 7vh;
                    margin-bottom: 4px;
                    color: rgba(0.9, 0, 0, 0.8);
                    padding: 10px;
                }
                .heading {
                    color: black;
                }
            `}</style>
        </div>
    )
}
