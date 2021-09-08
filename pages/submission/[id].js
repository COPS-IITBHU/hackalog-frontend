import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Spinner, Row, Container, Table , Jumbotron } from "react-bootstrap"
import { Text, Button, Div, Image } from "atomize"
import axios from "../../util/axios"
import { useAuth } from "../../context/auth"
import Head from "next/head"
import { BiCodeAlt } from "react-icons/bi"
import { HiOutlineEmojiSad } from "react-icons/hi"
import Link from "next/link"

export default function SubmissionDetail() {
    /*
          Initially status = 190 => loading
          if status = 200, show page
          else some error occurred
      */

    const router = useRouter()
    const { id } = router.query
    const { token, loading } = useAuth()
    const [submission, setSubmission] = useState({})
    const [team, setteam] = useState()
    const [status, setStatus] = useState(190)
    const [teamStat, setTeamStat] = useState(190)

    useEffect(() => {
        if (id) {
            if (token)
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Token ${token}`
            axios
                .get(`/submissions/${id}/`)
                .then((response) => {
                    let sub = response.data
                    if (!sub.hackathon.image)
                        sub.hackathon.image = "/images/home-jumbo.jpg"
                    setSubmission(sub)
                    setStatus(200)
                })
                .catch((err) => {
                    console.error(err)
                    setStatus(err.response.status)
                })
        }
    }, [id, token])

    useEffect(() => {
        if (JSON.stringify(submission) !== "{}") {
            axios
                .get(`/teams/${submission.team.team_id}/`)
                .then((response) => {
                    setteam(response.data)
                })
                .catch((err) => {
                    setTeamStat(err.response.status)
                    console.error(err)
                })
        }
    }, [submission])

    if (!Number(id) || status == 404)
        return (
            <div className="text-center pt-3 mb-2">
                <Image
                    src="/images/404.svg"
                    className="mb-3"
                    maxH={{ xs: "40vw", sm: "25vh" }}
                    alt="Error 404"
                />
                <Text textSize="title">Error 404: Submission Not Found</Text>
            </div>
        )

    if (status == 190 || (status == 403 && loading == true))
        return (
            <Container className="text-center">
                <Head>
                    <title>Submission Details</title>
                </Head>
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
        )
    if (status == 200)
        return (
            <div style={{ background: "#87a3bb17", minHeight: "100vh" }}>
                <Head>
                    {team ? (
                        <title>Team {team.name}&apos;s Submission</title>
                    ) : (
                        <title>Submission Details</title>
                    )}
                </Head>
                <Jumbotron
                    fluid
                    style={{
                        backgroundImage: `url(${submission.hackathon.image})`,
                        minHeight: "20em",
                    }}
                />
                <Text className="text-center mb-3" tag="h1" textSize="display1">
                    {submission.hackathon.title} Submissions
                </Text>
                <Container>
                    <Text textSize="title">{submission.title}&nbsp;</Text>
                    <Text textSize="subheader" className="pl-3">
                        - by Team {submission.team.name}
                    </Text>
                    <hr />
                    <Text textSize="subheader">
                        <u>Description</u>
                    </Text>
                    <Text textSize="paragraph">{submission.description}</Text>
                    {submission.hackathon.results_declared &&
                    submission.review.length ? (
                        <>
                            <Text textSize="subheader">
                                <u>Judge&apos;s Review</u>
                            </Text>
                            <Text textSize="paragraph">
                                {submission.review}
                            </Text>
                        </>
                    ) : null}
                    <Text textSize="subheader">
                        <BiCodeAlt /> Source Code:{" "}
                        {submission.submission_url == "EMPTY" ? (
                            "No Link Provided"
                        ) : (
                            <a
                                href={`${submission.submission_url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Link
                            </a>
                        )}
                    </Text>
                    <Row className="justify-content-around mt-3">
                        <Div
                            shadow="4"
                            className="col-md-5"
                            rounded="md"
                            m={{ b: "1rem" }}
                        >
                            <Container>
                                <Text
                                    textWeight="600"
                                    className="text-center mb-2"
                                    textSize="subheader"
                                    textDecor="underline"
                                >
                                    Team Members
                                </Text>
                                {teamStat !== 190 ? (
                                    <div className="text-center pt-3 mb-2">
                                        <Text textSize="display1">
                                            <HiOutlineEmojiSad />
                                        </Text>
                                        <Text textWeight="600" textColor="red">
                                            Unable to Fetch Team Details
                                        </Text>
                                    </div>
                                ) : team ? (
                                    <>
                                        <Table
                                            hover
                                            size="sm"
                                            className="mb-3 pb-3"
                                            responsive
                                        >
                                            <tbody>
                                                <tr>
                                                    <td>{team.leader.name}</td>
                                                    <td>
                                                        <Link
                                                            href={`/profile/${team.leader.username}`}
                                                        >
                                                            <a>
                                                                @
                                                                {
                                                                    team.leader
                                                                        .username
                                                                }
                                                            </a>
                                                        </Link>
                                                    </td>
                                                    <td>Leader</td>
                                                </tr>
                                                {team.members.map((elm) => {
                                                    if (team.leader !== elm)
                                                        <tr key={elm.username}>
                                                            <td>{elm.name}</td>
                                                            <td>
                                                                <Link
                                                                    href={`/profile/${elm.username}`}
                                                                >
                                                                    <a>
                                                                        @
                                                                        {
                                                                            elm.username
                                                                        }
                                                                    </a>
                                                                </Link>
                                                            </td>
                                                            <td>Member</td>
                                                        </tr>
                                                })}
                                            </tbody>
                                        </Table>
                                        {submission.hackathon
                                            .results_declared ? (
                                            <Text
                                                textSize="title"
                                                className="text-center pb-2"
                                                textColor="success900"
                                            >
                                                Scored: {submission.score}/100
                                            </Text>
                                        ) : (
                                            <Text
                                                textSize="title"
                                                className="text-center pb-2"
                                                textColor="blue"
                                            >
                                                Scores Awaited
                                            </Text>
                                        )}
                                    </>
                                ) : (
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
                                            <span className="sr-only">
                                                Loading...
                                            </span>
                                        </Spinner>
                                    </Container>
                                )}
                            </Container>
                        </Div>

                        <Div
                            shadow="4"
                            className="col-md-6"
                            rounded="md"
                            m={{ b: "1rem" }}
                        >
                            <Container className="text-center">
                                <Text
                                    textWeight="600"
                                    className="text-center mb-2"
                                    textSize="subheader"
                                    textDecor="underline"
                                >
                                    Hackathon Details
                                </Text>
                                <Table
                                    hover
                                    size="sm"
                                    className="mb-3 pb-3"
                                    responsive
                                >
                                    <tbody>
                                        <tr>
                                            <td>Title</td>
                                            <td>
                                                {submission.hackathon.title}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Tagline</td>
                                            <td>
                                                {submission.hackathon.tagline}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Start Date</td>
                                            <td>
                                                {new Date(
                                                    submission.hackathon.start
                                                ).toString()}{" "}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>End Date</td>
                                            <td>
                                                {new Date(
                                                    submission.hackathon.end
                                                ).toString()}{" "}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Status</td>
                                            <td
                                                className={
                                                    submission.hackathon
                                                        .status == "Completed"
                                                        ? "text-success"
                                                        : "text-warning"
                                                }
                                            >
                                                {submission.hackathon.status}
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Container>
                        </Div>
                    </Row>
                    <Link href={`/hackathon/${submission.hackathon.slug}`}>
                        <a>
                            <Button className="mb-3" bg="purple">
                                View Other Submissions
                            </Button>
                        </a>
                    </Link>
                </Container>
            </div>
        )
    else if (status == 403)
        return (
            <Container className="text-center">
                <Head>
                    <title>Submission Details</title>
                </Head>
                {token ? (
                    <Text>You are not authorised to view this submission.</Text>
                ) : (
                    <Text>
                        Only the team members can view their submissions in an
                        Ongoing Hackathon
                    </Text>
                )}
            </Container>
        )
    else
        return (
            <>
                <Head>
                    <title>Submission Details</title>
                </Head>
                <div>Error {status}</div>
            </>
        )
}
