import {
    Alert,
    Modal,
    Spinner,
    Col,
    Row,
    Form,
    Jumbotron,
} from "react-bootstrap"
import { Button, Container, Text } from "atomize"
import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { toast, ToastOptions } from "react-toastify"
import { useAuth } from "../../../../../context/auth"
import axios from "../../../../../util/axios"
import Head from "next/head"
import Link from "next/link"
import EventText from "../../../../../components/Headline/EventText"
import {
    HackathonDetailSerializer,
    SubmissionsSerializer,
} from "@/types/backend"
import { AxiosResponse } from "axios"

export default function Submit() {
    const router = useRouter()
    const { token, profile, loading } = useAuth()

    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [url, setURL] = useState<string>("")
    const [hackathonLoading, setHackathonLoading] = useState<boolean>(true)
    const [hackathon, setHackathon] = useState<HackathonDetailSerializer>(
        {} as HackathonDetailSerializer
    )
    const [err, setError] = useState<number>(0)

    const validateForm = () => {
        return title.length > 0 && description.length > 0 && url.length > 0
    }

    const cleanUp = () => {
        delete axios.defaults.headers.common["Authorization"]
    }

    useEffect(() => {
        if (router.query.slug) {
            setError(0)
            setHackathonLoading(true)
            if (token)
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Token ${token}`
            axios
                .get(`/hackathons/${router.query.slug}/`)
                .then((response: AxiosResponse<HackathonDetailSerializer>) => {
                    let hackathon = response.data
                    if (!hackathon.image)
                        hackathon.image = "/images/home-jumbo.jpg"
                    setHackathon(hackathon)
                })
                .catch((err) => {
                    setError(err.response.status)
                })
                .finally(() => setHackathonLoading(false))
        }
        return cleanUp
    }, [router.query.slug, token])

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

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Token ${token}`
            axios
                .post(`/hackathons/${router.query.slug}/submissions/`, {
                    title: title,
                    description: description,
                    team: router.query.team_id,
                    submission_url: url,
                })
                .then(
                    (res: AxiosResponse<SubmissionsSerializer>) => {
                        notifHandler(
                            "Successfully submitted your project! Redirecting...",
                            "success"
                        )
                        setTimeout(() => {
                            router.push(`/submission/${res.data.id}`)
                        }, 500)
                    },
                    (err) => {
                        if (typeof err.response.data == "string")
                            notifHandler(err.response.data, "error")
                        else notifHandler(err.response.data, "error")
                    }
                )
        } else notifHandler("Login to make a Submission", "warning")
    }

    return (
        <>
            {!loading && !profile ? (
                <MessageModal
                    title="It looks like You've Got Lost!"
                    buttonLink={`/hackathon/${hackathon.slug}`}
                    body="You need to be logged in to submit your project."
                />
            ) : err ? (
                <MessageModal
                    title={`Error ${err} Occurred!`}
                    buttonLink={`/hackathons/`}
                    body={
                        err == 404
                            ? "Hackathon Not Found. Make sure you got the right URL."
                            : "Report to us at https://github.com/COPS-IITBHU/hackalog-frontend."
                    }
                />
            ) : hackathonLoading ? (
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
            ) : hackathon.status !== "Ongoing" ? (
                <MessageModal
                    title="Oops!"
                    body={
                        hackathon.status === "Upcoming"
                            ? "Submission Period has not started yet!"
                            : "Submission Period has ended!"
                    }
                    buttonLink={`/hackathon/${hackathon.slug}`}
                />
            ) : hackathon.userStatus === "Submitted" ? (
                <MessageModal
                    title="You already did it!"
                    body="We have already received your submission. As warned earlier, you cannot edit or delete your submission now."
                    buttonLink={`/hackathon/${hackathon.slug}`}
                />
            ) : (
                <div style={{ background: "#87a3bb17", minHeight: "100vh" }}>
                    <Head>
                        <title>Submission | COPS Hackalog</title>
                        <meta
                            name="description"
                            content={`Submission page for ${router.query.slug} Hackathon`}
                        />
                    </Head>
                    <Jumbotron
                        style={{
                            backgroundImage: `url(${hackathon.image})`,
                            width: "100%",
                            minHeight: "300px",
                            backgroundSize: "cover",
                            boxShadow: "0px 0px 40px 41px #21212135 inset",
                        }}
                    ></Jumbotron>
                    <Container className="text-center">
                        <Text
                            textSize={{ xs: "display1", md: "display2" }}
                            textColor="#003e54"
                            fontFamily="madetommy-bold"
                            textDecor="underline"
                        >
                            {hackathon.title}
                        </Text>
                        <Text
                            textSize={{ xs: "subheader", md: "subheader" }}
                            textColor="#003e54"
                            fontFamily="madetommy-bold"
                        >
                            {hackathon.tagline}
                        </Text>
                    </Container>
                    <Container>
                        <Row
                            className="text-center"
                            style={{
                                color: "white",
                            }}
                        >
                            <EventText
                                text="Ready to Submit?"
                                tag="h1"
                                textSizeXs="title"
                                textSizeMd="display1"
                            />
                        </Row>
                        <Row>
                            <EventText
                                text="Enter Submission details below"
                                tag="h2"
                                textSizeXs="body"
                                textSizeMd="subheader"
                            />
                        </Row>
                    </Container>
                    <Container p={{ y: { xs: "1rem", md: "2rem" }, x: "1rem" }}>
                        <Col>
                            <Alert variant="warning">
                                You cannot edit or delete your submission once
                                submitted.
                            </Alert>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="title">
                                    <Form.Label>Title*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <Form.Group controlId="description">
                                    <Form.Label>Description*</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        type="text"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <Form.Group controlId="url">
                                    <Form.Label>URL*</Form.Label>
                                    <Form.Control
                                        type="url"
                                        value={url}
                                        onChange={(e) => setURL(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check
                                        required
                                        type="checkbox"
                                        label="I agree to comply with the rules of the Hackathon, and I am submitting my original work."
                                    />
                                </Form.Group>
                                <Button
                                    w="100%"
                                    type="submit"
                                    disabled={!validateForm()}
                                >
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Container>
                </div>
            )}
        </>
    )
}

const MessageModal = ({
    title,
    body,
    buttonLink,
}: {
    title: string
    body: string
    buttonLink: string
}) => {
    return (
        <Modal show={true} onHide={() => {}}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Link href={buttonLink} passHref>
                    <Button>
                        <a>Okay</a>
                    </Button>
                </Link>
            </Modal.Footer>
        </Modal>
    )
}
