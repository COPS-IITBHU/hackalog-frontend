import {
    Image,
    Col,
    Row,
    Form,
    Button,
    Container,
    Jumbotron,
} from "react-bootstrap"
import { Notification } from "atomize"
import { TiTick } from "react-icons/ti"
import { useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "../../../../../context/auth"
import axios from "../../../../../util/axios"
import Head from "next/head"

export default function Submit() {
    const router = useRouter()
    const { token } = useAuth()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [url, setURL] = useState("")
    const [showSuccess, setSuccess] = useState(false)

    const validateForm = () => {
        return title.length > 0 && description.length > 0 && url.length > 0
    }

    const [notif, editNotif] = useState({ message: "", show: false })
    const ErrorNotification = (message, show) => editNotif({ message, show })

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
                    (res) => setSuccess(true),
                    (err) => {
                        if (typeof err.response.data == "string")
                            ErrorNotification(err.response.data, true)
                        else ErrorNotification(err.response.data.detail, true)
                    }
                )
        } else ErrorNotification("Login to Make a Submission", true)
    }

    return (
        <div>
            <Head>
                <title>Submission</title>
                <meta
                    name="description"
                    content={`Submission page for ${router.query.slug} Hackathon`}
                />
            </Head>
            <Notification
                bg="danger700"
                isOpen={notif.show}
                onClose={() =>
                    editNotif({ message: "", show: false, bg: "danger900" })
                }
            >
                {notif.message}
            </Notification>
            <Notification
                isOpen={showSuccess}
                bg="success700"
                prefix={<TiTick className="mr-3" />}
                onClose={() => setSuccess(false)}
            >
                Successfully submitted your project! Redirecting...
            </Notification>

            <Jumbotron>
                <Container>
                    <Row>
                        <Col md={8} xs={12} className="align-self-center">
                            <h1 className="display-4">Ready to Submit?</h1>
                            <p className="lead mb-3">
                                Enter Submission details below
                            </p>
                        </Col>
                        <Col md={4} xs={12} className="pt-3 text-center">
                            <Image
                                style={{ maxHeight: "200px" }}
                                src="/images/submit.svg"
                                alt="My image"
                            />
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="sm" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            autoFocus
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            autoFocus
                            as="textarea"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="url">
                        <Form.Label>URL</Form.Label>
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
                        block
                        size="lg"
                        type="submit"
                        disabled={!validateForm()}
                    >
                        Login
                    </Button>
                </Form>
            </Container>
        </div>
    )
}
