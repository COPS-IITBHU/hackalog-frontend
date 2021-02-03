import {
    Image,
    Col,
    Row,
    Form,
    Jumbotron,
} from "react-bootstrap"
import { Button, Container, Text } from 'atomize'
import { useState } from "react"
import { useRouter } from "next/router"
import { toast} from "react-toastify"
import { useAuth } from "../../../../../context/auth"
import axios from "../../../../../util/axios"
import Head from "next/head"

export default function Submit() {
    const router = useRouter()
    const { token } = useAuth()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [url, setURL] = useState("")

    const validateForm = () => {
        return title.length > 0 && description.length > 0 && url.length > 0
    }

    const notifHandler = (message, type) => {
        const config = {
            position:"top-center",
            autoClose:5000,
            hideProgressBar:false,
            newestOnTop:false,
            closeOnClick: true,
            rtl:false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true
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

    const handleSubmit = (event) => {
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
                    (res) => {
                        notifHandler("Successfully submitted your project! Redirecting...", "success")
                        setTimeout(() => {
                            router.push(`/submission/${res.data.id}`)
                        }, 1000)
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
        <div>
            <Head>
                <title>Submission | COPS Hackalog</title>
                <meta
                    name="description"
                    content={`Submission page for ${router.query.slug} Hackathon`}
                />
            </Head>
            <Jumbotron>
                <Container>
                    <Row>
                        <Col md={8} xs={12} className="align-self-center">
                            <Text
                                tag="h1"
                                textSize={{ xs: "title", md: "display3" }}
                                textColor="#003e54"
                                fontFamily="madetommy-bold"
                            >
                                Ready to Submit?
                            </Text>
                            <Text
                                tag="h2"
                                textSize={{ xs: "body", md: "subheader" }}
                                textColor="#003e54"
                                fontFamily="madetommy-regular"
                            >
                                Enter Submission details below
                            </Text>
                        </Col>
                        <Col md={4} xs={12} className="pt-3 text-center d-none d-md-block">
                            <Image
                                style={{ maxHeight: "130px" }}
                                src="/images/submit.svg"
                                alt="My image"
                            />
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Container p={{ y: { xs: "1rem", md: "4rem" }, x: "1rem" }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="sm" controlId="title">
                        <Form.Label>Title*</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="description">
                        <Form.Label>Description*</Form.Label>
                        <Form.Control
                            autoFocus
                            as="textarea"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="url">
                        <Form.Label>URL*</Form.Label>
                        <Form.Control
                            autoFocus
                            type="url"
                            value={url}
                            onChange={(e) => setURL(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                            required
                            type="checkbox"
                            label="I agree to comply with the rules of the Hackathon and I am submitting my original work."
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
            </Container>
        </div>
    )
}
