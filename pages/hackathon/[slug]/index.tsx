import Head from "next/head"
import Link from "next/link"
import { Text } from "atomize"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Nav, Tab, Container, Spinner, Image, Button } from "react-bootstrap"
import {
    HackathonDetailSerializer,
    SubmissionsSerializer,
    TeamSerializer,
} from "@/types/backend"
import { useAuth } from "../../../context/auth"
import axios from "../../../util/axios"
import {
    Leaderboard,
    Overview,
    Participants,
} from "../../../components/HackathonDetailPage"

export default function Hackathon() {
    const router = useRouter()
    const slug = router.query.slug

    const { token, profile, loading } = useAuth()
    const [localLoading, setLocalLoading] = useState<boolean>(true)
    const [error, setError] = useState<number>(0)
    const [hackathon, setHackathon] = useState<HackathonDetailSerializer>(
        {} as HackathonDetailSerializer
    )

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
                    content={`Register for ${hackathon.title} at COPS Hackalog`}
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
                                                                <a>
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
                                                                <a>
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
                                                                <a>
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
                                                                    <a>
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
                                                                    <a>
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
                                                                <a>
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
                                                                <a>
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
                                                            <a>
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
                                                            <a>
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
