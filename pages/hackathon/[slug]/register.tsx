/* eslint-disable react/react-in-jsx-scope */
import { useRouter } from "next/router"
import { default as axios } from "util/axios"
import { Div, Row, Col, Text, Button, Input } from "atomize"
import { useAuth } from "../../../context/auth"
import React, { ChangeEvent, useState } from "react"
import { API_URL } from "../../../util/constants"
import Clipboard from "../../../components/Clipboard/Clipboard"
import Head from "next/head"
import { toast, ToastOptions } from "react-toastify"
import { TeamCreateSerializer, TeamSerializer } from "@/types/backend"

export default function Register() {
    const { token } = useAuth()
    const [teamName, editTeamName] = useState<string>("")
    const [code, editCode] = useState<{ code: string; show: boolean }>({
        code: "",
        show: false,
    })
    const [joinCode, editJoinCode] = useState<string>("")
    const router = useRouter()
    const hackathonId = router.query.slug

    const notifHandler = (message: string, type: string) => {
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

    const doRegister = async (name: string) => {
        try {
            axios.defaults.headers.common["Authorization"] = `Token ${token}`
            const response = await axios.post<TeamCreateSerializer>(
                `${API_URL}hackathons/${hackathonId}/teams/`,
                {
                    name: name,
                }
            )
            // const response = await axios.post(
            //     `http://127.0.0.1:8000/hackathons/${Number.parseInt(
            //         hackathonId
            //     )}/teams/`,
            //     { name: name }
            // )
            if (response.status === 201) {
                notifHandler("Team creation successful", "success")
                editCode({ code: response.data.team_id.toString(), show: true })
                setTimeout(() => {
                    // router.push(`http://localhost:3000/hackathon/${hackathonId}/teams/${code.code}`)
                    let team_id = response.data.team_id
                    router.push(`/hackathon/${hackathonId}/teams/${team_id}`)
                }, 1000)
            } else {
                notifHandler("Some unexpected error in client!", "warning")
            }
        } catch (exc) {
            if (exc.response.status === 400) {
                notifHandler(
                    `${exc.response.data.non_field_errors[0]}`,
                    "error"
                ) // same team name or. // already present in some team non-field
            } else if (exc.response.status === 404) {
                notifHandler("Hackathon not found", "error")
            } else if (exc.response.status === 403) {
                notifHandler(`${exc.response.data.detail}`, "error") // incomplete profile!
            } else {
                notifHandler(
                    "Some error occured, try again or contact admin!",
                    "error"
                )
            }
        }
    }

    const handleRegister = () => {
        if (token) {
            if (hackathonId) {
                if (teamName === "") {
                    notifHandler("Invalid team name!", "error")
                } else {
                    doRegister(teamName)
                }
            } else {
                notifHandler("Invalid hackathon id.", "error")
            }
        } else {
            notifHandler("You are not authorised", "error")
        }
    }

    const doJoin = async (joinCode: string) => {
        try {
            axios.defaults.headers.common["Authorization"] = `Token ${token}`
            const response = await axios.patch<{}>(
                `${API_URL}hackathons/${hackathonId}/teams/join/${joinCode}/`,
                {}
            )
            // const response = await axios.patch(
            //     `http://127.0.0.1:8000/hackathons/${hackathonId}/teams/join/${joinCode}/`,
            //     {}
            // )
            if (response.status === 200) {
                notifHandler("Successfully joined the team!", "success")
                setTimeout(() => {
                    // router.push(`http://localhost:3000/hackathon/${hackathonId}/teams/${joinCode}`)
                    router.push(`/hackathon/${hackathonId}/teams/${joinCode}`)
                }, 1000)
            } else {
                notifHandler("Some unexpected error in client!", "warning")
            }
        } catch (exc) {
            if (exc.response.status === 400) {
                notifHandler(exc.response.data[0], "warning")
            } else if (exc.response.status === 404) {
                notifHandler("Either team or hackathon not found!", "info")
            } else if (exc.response.status === 403) {
                notifHandler("Incomplete profile!", "error")
            } else {
                notifHandler(
                    "Some error occured, try again or contact admin!",
                    "error"
                )
            }
        }
    }

    const handleJoin = () => {
        if (token) {
            if (hackathonId) {
                if (joinCode === "") {
                    notifHandler("Invalid team code!", "error")
                } else {
                    doJoin(joinCode)
                }
            } else {
                notifHandler("Invalid hackathon id", "error")
            }
        } else {
            notifHandler("You are not authorised", "error")
        }
    }

    return (
        <Div>
            <Head>
                <title>Register - {hackathonId} | COPS Hackalog</title>
                <meta
                    name="description"
                    content={`Register for hackathon ${hackathonId} at COPS Hackalog`}
                />
            </Head>
            <Row justify="center" m={{ t: "3.5rem", b: "1.5rem", x: "0.5rem" }}>
                <Text
                    tag="h1"
                    textSize="display1"
                    textColor="#003e54"
                    fontFamily="madetommy-regular"
                    textAlign="center"
                >
                    Glad to see that you are interested!
                </Text>
            </Row>
            <Row justify="center" m={{ t: { md: "3rem" } }}>
                <Col size={{ xs: "12", md: "5" }}>
                    <Div
                        bg="white"
                        shadow={{ md: "4" }}
                        rounded="xl"
                        m={{ b: "1rem" }}
                        p={{ x: "1rem", y: "2rem" }}
                    >
                        <Div p="1rem" m={{ b: "1rem" }}>
                            <Text
                                tag="h3"
                                textSize="title"
                                textColor="#003e54"
                                fontFamily="madetommy-regular"
                                m={{ b: "0.5rem" }}
                            >
                                Register a new team
                            </Text>
                            <Input
                                placeholder="Team name"
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ) => {
                                    editTeamName(e.target.value)
                                }}
                                suffix={
                                    <Button
                                        pos="absolute"
                                        onClick={handleRegister}
                                        w="6rem"
                                        top="0"
                                        right="0"
                                        bg="#178a80"
                                        hoverBg="success600"
                                        rounded={{ r: "sm" }}
                                    >
                                        Create
                                    </Button>
                                }
                            ></Input>
                        </Div>
                        {code.show ? (
                            <Div m={{ x: "1.2rem" }}>
                                <Clipboard
                                    code={code.code}
                                    notify={() => {
                                        notifHandler("Code copied!", "success")
                                    }}
                                ></Clipboard>
                            </Div>
                        ) : null}
                        <Row justify="center">
                            <Text
                                tag="h4"
                                textSize="title"
                                textColor="gray800"
                                fontFamily="madetommy-regular"
                            >
                                OR
                            </Text>
                        </Row>
                        <Div p="1rem">
                            <Text
                                tag="h3"
                                textSize="title"
                                textColor="#003e54"
                                fontFamily="madetommy-regular"
                                m={{ b: "0.5rem" }}
                            >
                                Join a Team
                            </Text>
                            <Input
                                placeholder="Team code"
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ) => {
                                    editJoinCode(e.target.value)
                                }}
                                suffix={
                                    <Button
                                        pos="absolute"
                                        onClick={handleJoin}
                                        w="6rem"
                                        top="0"
                                        right="0"
                                        rounded={{ r: "md" }}
                                        bg="#178a80"
                                        hoverBg="success600"
                                    >
                                        Join
                                    </Button>
                                }
                            ></Input>
                        </Div>
                    </Div>
                </Col>
            </Row>
        </Div>
    )
}
