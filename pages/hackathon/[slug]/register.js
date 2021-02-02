/* eslint-disable react/react-in-jsx-scope */
import { useRouter } from "next/router"
import axios from "axios"
import { Div, Row, Col, Text, Button, Input, Icon, Notification } from "atomize"
import { useAuth } from "../../../context/auth"
import { useState } from "react"
import { API_URL } from "../../../util/constants"
import Clipboard from "../../../components/Clipboard/Clipboard"
import Head from "next/head"

export default function Register() {
    const { token } = useAuth()
    const [teamName, editTeamName] = useState("")
    const [notif, editNotif] = useState({
        message: "",
        show: false,
        bg: "info700",
    })
    const [code, editCode] = useState({ code: "", show: false })
    const [joinCode, editJoinCode] = useState("")
    const router = useRouter()
    const hackathonId = router.query.slug

    const notifHandler = (message, show, bg) => {
        editNotif({ message, show, bg })
    }

    const doRegister = async (name) => {
        try {
            axios.defaults.headers.common["Authorization"] = `Token ${token}`
            const response = await axios.post(
                `${API_URL}hackathons/${hackathonId}/teams/`,
                { name: name }
            )
            // const response = await axios.post(
            //     `http://127.0.0.1:8000/hackathons/${Number.parseInt(
            //         hackathonId
            //     )}/teams/`,
            //     { name: name }
            // )
            if (response.status === 201) {
                notifHandler("Team creation successful", true, "success700")
                editCode({ code: response.data.team_id, show: true })
                setTimeout(() => {
                    // router.push(`http://localhost:3000/hackathon/${hackathonId}/teams/${code}`)
                    router.push(
                        `https://cops-hackalog.netlify.app/hackathon/${hackathonId}/teams/${code}`
                    )
                }, 1000)
                console.log("code updated successfully!")
            } else {
                notifHandler(
                    "Some unexpected error in client!",
                    true,
                    "warning700"
                )
            }
        } catch (exc) {
            if (exc.response.status === 400) {
                notifHandler(
                    `${exc.response.data.non_field_errors[0]}`,
                    true,
                    "info600"
                ) // same team name or. // already present in some team non-field
            } else if (exc.response.status === 404) {
                notifHandler("Hackathon not found", true, "info600")
            } else if (exc.response.status === 403) {
                notifHandler(`${exc.response.data.detail}`, true, "info600") // incomplete profile!
            } else {
                notifHandler(
                    "Some error occured, try again or contact admin!",
                    true,
                    "info600"
                )
            }
        }
    }

    const handleRegister = () => {
        if (token) {
            if (hackathonId) {
                if (teamName === "") {
                    notifHandler("Invalid team name!", true, "danger700")
                } else {
                    doRegister(teamName)
                }
            } else {
                notifHandler("Invalid hackathon id.", true, "danger700")
            }
        } else {
            notifHandler("You are not authorised", true, "danger700")
        }
    }

    const doJoin = async (code) => {
        try {
            axios.defaults.headers.common["Authorization"] = `Token ${token}`
            const response = await axios.patch(
                `${API_URL}hackathons/${hackathonId}/teams/join/${code}/`,
                {}
            )
            // const response = await axios.patch(
            //     `http://127.0.0.1:8000/hackathons/${hackathonId}/teams/join/${code}/`,
            //     {}
            // )
            if (response.status === 200) {
                notifHandler(
                    "Successfully joined the team!",
                    true,
                    "success700"
                )
                setTimeout(() => {
                    // router.push(`http://localhost:3000/hackathon/${hackathonId}/teams/${code}`)
                    router.push(
                        `https://cops-hackalog.netlify.app/hackathon/${hackathonId}/teams/${code}`
                    )
                }, 1000)
            } else {
                notifHandler(
                    "Some unexpected error in client!",
                    true,
                    "warning700"
                )
            }
        } catch (exc) {
            if (exc.response.status === 400) {
                // console.log('exc.response =', exc.response)
                notifHandler(exc.response.data[0], true, "warning700")
            } else if (exc.response.status === 404) {
                notifHandler(
                    "Either team or hackathon not found!",
                    true,
                    "info600"
                )
            } else if (exc.response.status === 403) {
                notifHandler("Incomplete profile!", true, "danger700")
            } else {
                notifHandler(
                    "Some error occured, try again or contact admin!",
                    true,
                    "info600"
                )
            }
        }
    }

    const handleJoin = () => {
        if (token) {
            if (hackathonId) {
                if (joinCode === "") {
                    notifHandler("Invalid team code!", true, "danger700")
                } else {
                    doJoin(joinCode)
                }
            } else {
                notifHandler("Invalid hackathon id", true, "info700")
            }
        } else {
            notifHandler("You are not authorised", true, "danger700")
        }
    }

    return (
        <Div>
            <Head>
                <title>Register - {hackathonId}</title>
                <meta
                    name="description"
                    content={`Register for hackathon ${hackathonId} at COPS Hackalog`}
                />
            </Head>
            <Notification
                bg={notif.bg}
                isOpen={notif.show}
                onClose={() => {
                    editNotif({ message: "", show: false, bg: "info700" })
                }}
                prefix={
                    <Icon
                        name="Success"
                        color="white"
                        size="18px"
                        m={{ r: "0.5rem" }}
                    />
                }
                suffix={
                    <Icon
                        name="Cross"
                        pos="absolute"
                        top="1rem"
                        right="0.5rem"
                        color="white"
                        size="18px"
                        cursor="pointer"
                        m={{ r: "0.5rem" }}
                        onClick={() => {
                            editNotif({
                                message: "",
                                show: false,
                                bg: "info700",
                            })
                        }}
                    />
                }
            >
                {notif.message}
            </Notification>
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
                                onChange={(e) => {
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
                                        notifHandler(
                                            "Code copied!",
                                            true,
                                            "success700"
                                        )
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
                                onChange={(e) => {
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
