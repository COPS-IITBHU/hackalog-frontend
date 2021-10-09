/* eslint-disable react/react-in-jsx-scope */
import { Div, Text, Icon, Row, Col, Button, Input, Tag } from "atomize"
import axios, { AxiosError, AxiosResponse } from "axios"
import { useRouter } from "next/router"
import { Container, Spinner } from "react-bootstrap"
import { useEffect, useState, ChangeEvent } from "react"
import { toast, ToastOptions } from "react-toastify"
import { useAuth } from "@/context/auth"
import { API_URL } from "../../../../../util/constants"
import Clipboard from "@/components/Clipboard/Clipboard"
import Head from "next/head"
import { ProfileSerializer, TeamDetailSerializer } from "@/types/backend"

// team management
export default function ManageTeam() {
    const { token, loading }: { token: string; loading: boolean } = useAuth()
    const [teamData, setTeamData] = useState<TeamDetailSerializer>(
        {} as TeamDetailSerializer
    )
    const router = useRouter()
    const [localLoading, setLocalLoading] = useState<boolean>(true) //During initial fetch on page loading.
    const [showSpinner, setSpinner] = useState<boolean>(true) // while data is loading
    const [nameEdit, setNameEdit] = useState<boolean>(false) // if name editing is in progress
    const [bufferTeamName, setBufferTeamName] = useState<string>("") // buffer team name to handle editing of team name.
    const [members, editMembers] = useState<Array<ProfileSerializer>>([]) // for team members
    const [clientUser, editClientUser] = useState<ProfileSerializer>(
        {} as ProfileSerializer
    ) // user who is logged in.

    useEffect((): void => {
        async function getData() {
            try {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Token ${token}`
                const [responseTeam, responseUser]: [
                    AxiosResponse<TeamDetailSerializer>,
                    AxiosResponse<ProfileSerializer>
                ] = await Promise.all([
                    axios.get(`${API_URL}teams/${router.query.team_id}/`),
                    axios.get(`${API_URL}profile/`),
                ])
                if (
                    responseTeam.status === 200 &&
                    responseUser.status === 200
                ) {
                    setTeamData(responseTeam.data)
                    editMembers(responseTeam.data.members)
                    editClientUser(responseUser.data)
                    setLocalLoading(false)
                }
            } catch (exc) {
                //setSpinner(false)
                if (exc.response && exc.response.status === 404) {
                    router.push("/404")
                }
            }
        }
        if (token === null && !loading) {
            // router.push(/hackathon/${router.query.slug}`)
            router.push(`/hackathon/${router.query.slug}`)
        }
        if (token && !loading) {
            setLocalLoading(true)
            getData()
        }
    }, [token, router.query.team_id, loading, router])

    const notifHandler = (message: string, type: string): void => {
        const config: ToastOptions = {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
        }
        switch (type) {
            case "info":
                toast.info(message, config)
                break
            case "error":
                toast.error(message, config)
                break
            case "warning":
                toast.warn(message, config)
                break
            case "success":
                toast.success(message, config)
                break
            default:
                toast.info(message, config)
        }
    }

    const checkToken = (): boolean => {
        if (token) {
            return true
        } else {
            notifHandler("You are not authenticated!", "error")
            return false
        }
    }

    const deleteTeam = async () => {
        if (!checkToken()) {
            return
        }
        checkToken()
        if (clientUser.username === teamData.leader.username) {
            try {
                const response: AxiosResponse<TeamDetailSerializer> =
                    await axios.delete(
                        `${API_URL}teams/${router.query.team_id}/`
                    )
                if (response.status === 204) {
                    notifHandler("Deleted Successfully!", "success")
                    setTimeout(() => {
                        // router.push(
                        //     `http://localhost:3000/hackathon/${teamData.hackathon.slug}`
                        // )
                        router.push(`/hackathon/${teamData.hackathon.slug}`)
                    }, 1000)
                } else {
                    notifHandler("Some unexpected error in client!", "error")
                }
            } catch (exc) {
                if (exc.response.status === 404) {
                    notifHandler("Team not found!", "error")
                } else {
                    notifHandler("Facing server error!", "error")
                }
            }
        } else {
            notifHandler(
                "You are not allowed to perform this action",
                "warning"
            )
        }
    }

    const memberExit = async (name: string, isLeader: boolean) => {
        if (!checkToken()) {
            return
        }
        try {
            axios.defaults.headers.common["Authorization"] = `Token ${token}`
            const response: AxiosResponse<TeamDetailSerializer> =
                await axios.patch(
                    `${API_URL}teams/${router.query.team_id}/member-exit/${name}`
                )
            if (response.status === 200) {
                if (isLeader) {
                    notifHandler("Removed Successfully!", "success")
                    setTimeout(() => {
                        router.reload()
                    }, 1000)
                } else {
                    notifHandler("Left Successfully!", "success")
                    setTimeout(() => {
                        // router.push(
                        //     `/hackathon/${teamData.hackathon.slug}`
                        // )
                        router.push(`/hackathon/${teamData.hackathon.slug}`)
                    }, 1000)
                }
            } else {
                notifHandler("Some unexpected error in client!", "error")
            }
        } catch (exc) {
            switch (exc.response.status) {
                case 400:
                    notifHandler(`${exc.response.data[0]}`, "error")
                    return
                case 401:
                    notifHandler(`You are not authenticated`, "error")
                    return
                case 404:
                    notifHandler(`Hackathon not found`, "error")
                    return
                default:
                    notifHandler(`Unexpected error from server`, "info")
                    return
            }
        }
    }

    const leaderTag = (
        <Tag
            bg="white"
            border="1px solid"
            borderColor="gray700"
            textColor="#003e54c9"
            p={{ x: "0.75rem", y: "0" }}
            m={{ r: "0.5rem" }}
        >
            Leader
        </Tag>
    )
    const handleMemberExitUI = (name: string): JSX.Element => {
        // return remove for every name except leader if client
        // is leader else return remove only for client
        if (
            teamData.leader.username === clientUser.username &&
            name !== clientUser.username
        ) {
            return (
                <Button
                    bg={`warning700`}
                    hoverBg="warning800"
                    textColor="white"
                    textSize={{ xs: "tiny", md: "body" }}
                    p={{ x: "0.75rem", y: "0.25rem" }}
                    m={{ r: "0.5rem", b: "0.5rem" }}
                    onClick={() => {
                        memberExit(name, true)
                    }}
                >
                    Remove
                </Button>
            )
        } else if (
            clientUser.username === name &&
            teamData.leader.username !== clientUser.username
        ) {
            return (
                <Button
                    bg={`warning700`}
                    hoverBg="warning800"
                    textColor="white"
                    textSize={{ xs: "tiny", md: "body" }}
                    p={{ x: "0.75rem", y: "0.25rem" }}
                    m={{ r: "0.5rem", b: "0.5rem" }}
                    onClick={() => {
                        memberExit(name, false)
                    }}
                >
                    Leave Team
                </Button>
            )
        } else {
            return null
        }
    }

    const membersUI = members.map((el: ProfileSerializer, index: number) => {
        return (
            <Row key={el.username} justify="space-between" align="center">
                <div className="d-flex align-items-center py-3">
                    <Text
                        tag="h6"
                        textSize="subheader"
                        textColor="#003e54"
                        fontFamily="madetommy-light"
                        m={{ r: "1rem" }}
                    >
                        {index + 1}. {el.username}
                    </Text>
                    <div>
                        {el.username === teamData.leader.username
                            ? leaderTag
                            : null}
                    </div>
                </div>
                {el.username === teamData.leader.username &&
                clientUser.username === teamData.leader.username ? (
                    <Button
                        bg={`danger700`}
                        hoverBg="danger800"
                        shadow="3"
                        textColor="white"
                        textSize={{ xs: "tiny", md: "body" }}
                        p={{ x: "0.75rem", y: "0.25rem" }}
                        m={{ r: "0.5rem" }}
                        onClick={() => {
                            deleteTeam()
                        }}
                    >
                        Delete Team
                    </Button>
                ) : null}
                {handleMemberExitUI(el.username)}
            </Row>
        )
    })

    const changeName = async () => {
        const normalizeState = () => {
            setSpinner(false)
            setNameEdit(false)
            setBufferTeamName("")
        }
        if (!checkToken()) {
            normalizeState()
            return
        }
        if (bufferTeamName === "") {
            normalizeState()
            return
        }
        try {
            const response: AxiosResponse<TeamDetailSerializer> =
                await axios.patch(`${API_URL}teams/${router.query.team_id}/`, {
                    name: bufferTeamName,
                })
            if (response.status === 200) {
                normalizeState()
                notifHandler("Update successfull!", "success")
                setTeamData(response.data)
            } else {
                normalizeState()
                notifHandler("Unexpected error in client!", "warning")
            }
        } catch (exc) {
            normalizeState()
            if (exc.response.status === 404) {
                notifHandler("Team not found!", "warning")
            } else if (exc.response.status === 403) {
                notifHandler(`${exc.response.data.detail}`, "warning")
            } else {
                notifHandler("Unexpected error from server!", "error")
            }
        }
    }

    return (
        <>
            <Head>
                <title>Team {teamData.name} | COPS Hackalog</title>
                <meta name="description" content="Team's page for hackathon" />
            </Head>
            {localLoading ? (
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
                <>
                    <Row
                        justify="center"
                        m={{ t: "3.5rem", b: "2.5rem", x: "0.5rem" }}
                    >
                        <Text
                            tag="h2"
                            textSize={{ xs: "title", md: "display2" }}
                            textColor="#003e54"
                            fontFamily="madetommy-regular"
                            textDecor="underline"
                            textAlign="center"
                        >
                            Team: {teamData.name}
                        </Text>
                    </Row>
                    <Row justify="center">
                        <Col size={{ xs: "12", md: "10" }}>
                            <Div
                                bg="white"
                                shadow={{ md: "3" }}
                                rounded="xl"
                                p={{ xs: "1rem", md: "2rem" }}
                                m={{ b: "1rem" }}
                            >
                                <div className="d-flex justify-content-center align-items-center flex-wrap">
                                    <div className="px-2">
                                        <Clipboard
                                            code={teamData.team_id}
                                            notify={(): void => {
                                                notifHandler(
                                                    "Code copied!",
                                                    "success"
                                                )
                                            }}
                                        ></Clipboard>
                                    </div>
                                    {!nameEdit ? (
                                        <div className="px-2">
                                            <Row>
                                                <Text
                                                    tag="h4"
                                                    textSize="subheader"
                                                    textColor="#003e54"
                                                    fontFamily="madetommy-regular"
                                                    m={{ r: "1rem" }}
                                                >
                                                    Team Name:
                                                </Text>
                                                <Text
                                                    tag="h6"
                                                    textSize="subheader"
                                                    textColor="gray800"
                                                    fontFamily="madetommy-regular"
                                                    m={{ r: "1rem" }}
                                                >
                                                    {teamData.name}
                                                </Text>
                                                <Button
                                                    h="2rem"
                                                    w="2rem"
                                                    rounded="circle"
                                                    m={{ r: "1rem" }}
                                                    onClick={(): void => {
                                                        setNameEdit(true)
                                                    }}
                                                    bg="#178a80"
                                                    hoverShadow="3"
                                                    title="Edit"
                                                >
                                                    <Icon
                                                        name="Edit"
                                                        size="16px"
                                                        color="white"
                                                    />
                                                </Button>
                                            </Row>
                                        </div>
                                    ) : (
                                        <div className="px-2">
                                            <Row>
                                                <Text
                                                    tag="h4"
                                                    textSize="subheader"
                                                    textColor="#003e54"
                                                    fontFamily="madetommy-regular"
                                                    m={{ r: "1rem" }}
                                                >
                                                    Team Name:
                                                </Text>
                                                <Input
                                                    placeholder={teamData.name}
                                                    onChange={(
                                                        e: ChangeEvent<HTMLFormElement>
                                                    ): void => {
                                                        setBufferTeamName(
                                                            e.target.value
                                                        )
                                                    }}
                                                ></Input>
                                                <Button
                                                    onClick={(): void => {
                                                        setSpinner(true)
                                                        changeName()
                                                    }}
                                                    w="3rem"
                                                    bg="#178a80"
                                                    m={{ x: "0.5rem" }}
                                                >
                                                    {showSpinner ? (
                                                        <Icon
                                                            name="Loading2"
                                                            size="16px"
                                                            color="white"
                                                        />
                                                    ) : (
                                                        "Done"
                                                    )}
                                                </Button>
                                                <Button
                                                    disabled={showSpinner}
                                                    onClick={(): void => {
                                                        setNameEdit(false)
                                                        setBufferTeamName("")
                                                    }}
                                                    w="3rem"
                                                    bg="#178a80"
                                                    hoverBg="success600"
                                                >
                                                    Back
                                                </Button>
                                            </Row>
                                        </div>
                                    )}
                                </div>
                                <div className="container pt-5">
                                    <Text
                                        tag="h4"
                                        textSize="subheader"
                                        textColor="#003e54"
                                        fontFamily="madetommy-regular"
                                        m={{ r: "1rem" }}
                                    >
                                        Members:
                                    </Text>
                                    <Div
                                        m={{
                                            t: "0.5rem",
                                            b: "1.5rem",
                                            x: "1rem",
                                        }}
                                    >
                                        {membersUI}
                                    </Div>
                                </div>
                            </Div>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}
