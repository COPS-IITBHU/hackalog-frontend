import { useState } from "react"
import { Form, Spinner, Col, Modal, Container } from "react-bootstrap"
import { Button, Text } from "atomize"
import CreatableSelect from "react-select/creatable"
import axios from "../../util/axios"
import { options } from "./SkillOptions"
import { useAuth } from "../../context/auth"

type ModalPropTypes = {
    handle: string
    bio: string
    interest: string
    name: string
    url: string
    username: string
    handleClose: () => void
    show: boolean
    closable: boolean
}

const EditProfile = ({
    handle,
    bio,
    interest,
    name,
    username,
    handleClose,
    show,
    closable,
}: ModalPropTypes) => {
    const { firebaseUser } = useAuth()
    const [err, seterr] = useState("")
    const [wait, setwait] = useState(false)
    const handleChange = (newValue) => setSelectedSkills(newValue)
    const [selectedSkills, setSelectedSkills] = useState(
        interest.length
            ? interest.split(",").map((s) => {
                  return { label: s.trim(), value: s.trim() }
              })
            : []
    )
    const handleSubmit = () => {
        const name: string = (
            document.getElementById("name") as HTMLInputElement
        ).value.trim()
        const handle: string = (
            document.getElementById("handle") as HTMLInputElement
        ).value
            .split(" ")
            .join("")
        ;(document.getElementById("handle") as HTMLInputElement).value = handle
        const bio: string = (
            document.getElementById("bio") as HTMLInputElement
        ).value.trim()
        const interests = selectedSkills
            ? String(selectedSkills.map((s) => s.label))
            : ""
        const username: string = (
            document.getElementById("username") as HTMLInputElement
        ).value
            .split(" ")
            .join("")
            .toLowerCase()
        ;(document.getElementById("username") as HTMLInputElement).value =
            username
        var check: boolean = [name, handle, username, interests, bio].every(
            (elm: string) => {
                return elm !== ""
            }
        )
        if (check) {
            setwait(true)
            const data = {
                name: name ?? "",
                college: "IIT (BHU) VARANASI",
                bio: bio ?? "",
                interests: interests ?? "",
                username: username,
                github_handle: handle,
                photoURL: firebaseUser.photoURL,
            }
            axios
                .patch(`profile/`, data)
                .catch(() => setwait(false))
                .then(
                    () => {
                        setwait(false)
                        location.replace(`/profile/${username}`)
                    },
                    (err) => {
                        err.response.data.username
                            ? seterr(String(err.response.data.username))
                            : seterr(
                                  "Some Error Occurred Communicating with the Server"
                              )
                    }
                )
        } else seterr("All Required Fields must be Filled")
    }
    return (
        <Container className="text-center align-middle">
            <Modal
                show={show}
                onHide={handleClose}
                backdrop={closable ? true : "static"}
                keyboard={false}
                centered={true}
                size="lg"
            >
                <Modal.Body>
                    <div className="text-center mb-3">
                        <Text
                            tag="h3"
                            textSize="title"
                            textColor="#003e54"
                            fontFamily="madetommy-bold"
                        >
                            Edit Profile
                        </Text>
                    </div>
                    <Form style={{ maxWidth: "400px" }} className="mx-auto">
                        {/* <Form.Text className="text-right">
                            *Required Fields
						</Form.Text> */}
                        <Form.Group controlId="name">
                            <Form.Label>Name* </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                defaultValue={name}
                            />
                        </Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="handle">
                                    <Form.Label>Github Handle</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="GitHub Handle"
                                        defaultValue={handle}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="username">
                                    <Form.Label>Username*</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Username"
                                        defaultValue={username}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Group controlId="bio">
                            <Form.Label>Bio*</Form.Label>
                            <Form.Control
                                type="textarea"
                                placeholder="Bio"
                                defaultValue={bio}
                            />
                        </Form.Group>
                        <Form.Group controlId="interest">
                            <Form.Label>Interests*</Form.Label>
                            <CreatableSelect
                                isMulti
                                value={selectedSkills}
                                onChange={handleChange}
                                options={options}
                            />
                        </Form.Group>
                    </Form>

                    <p className="text-danger ">{err}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        shadow="3"
                        hoverShadow="4"
                        p="1rem"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        shadow="3"
                        hoverShadow="4"
                        p="1rem"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                    {wait && (
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Submitting...</span>
                        </Spinner>
                    )}
                </Modal.Footer>
            </Modal>
        </Container>
    )
}

export default EditProfile
