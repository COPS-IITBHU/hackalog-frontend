import React, { useState } from "react";
import Interests from "../components/Profile/Interests";
import Footer from "../components/Footer/Footer";
import ProfileTabs from "../components/Profile/ProfileTabs";
import { Form, Spinner, Jumbotron, Row, Col, Modal, Button, Container, Image } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";
import { useAuth } from "../context/auth";
import axios from "../util/axios";
import CreatableSelect from "react-select/creatable";
import options from "../components/Profile/SkillOptions";

function Profile() {
    const [show, setShow] = useState(false);
    const [closable, setclosable] = useState(true);
    const handleClose = () => setShow(false);
    const [check, setcheck] = useState(false);
    const [userRequest, setUserRequest] = useState({
        loading: true,
        user: null,
    });
    const val = useAuth();
    if (!val.firebaseUser) {
        return (
            <Container className="text-center">
                Please Login to View this Page
            </Container>
        );
    }
    var url = val.firebaseUser !== null ? val.firebaseUser.photoURL : "";
    const editProfile = () => {
        setclosable(true);
        setShow(true);
    };
    if (userRequest.loading && val.token != null) {
        axios.defaults.headers.common["Authorization"] = `Token ${val.token}`;
        axios
            .get(`profile/`)
            .then((res) => {
                setUserRequest({
                    loading: false,
                    user: res.data,
                });
                const arr = [
                    res.data.name,
                    res.data.username,
                    res.data.interests,
                    res.data.bio,
                    res.data.github_handle,
                ];
                // Check for null fields
                if (!arr.every((elm) => elm !== "" && elm !== null)) {
                    setcheck(true);
                    setclosable(false);
                    setShow(true);
                }
            })
            .catch((err) => {
                console.log("Error during request", err.message);
            });
    }
    if (userRequest.loading) {
        return (
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
        );
    } else
        return (
            <div>
                {(check || show) && (
                    <EditProfile
                        handleClose={handleClose}
                        show={show}
                        closable={closable}
                        username={userRequest.user.username}
                        name={userRequest.user.name}
                        handle={userRequest.user.github_handle}
                        bio={userRequest.user.bio}
                        interest={userRequest.user.interests}
                    />
                )}

                <Jumbotron
                    style={{
                        background: 'url("images/profile_cover.jpg") no-repeat',
                        backgroundSize: "cover",
                    }}
                    className="text-white"
                >
                    <Container>
                        <Row>
                            <Col md={4} className="text-center pt-sm-3">
                                <Image
                                    src={url}
                                    fluid
                                    style={{
                                        boxShadow: "1px 1px 40px 1px black",
                                        border: "2px solid white",
                                        "border radius": 50,
                                        width: 200,
                                        height: 200,
                                    }}
                                    roundedCircle
                                />
                                <p className="h4 p-sm-3">
                                    {userRequest.user.username}
                                </p>
                            </Col>
                            <Col md={8}>
                                <div
                                    style={{ height: 20 }}
                                    className="d-sm-block d-none"
                                />
                                <h2 style={{ color: "white" }}>
                                    {userRequest.user.name}
                                </h2>
                                <Row>
                                    <div className="col-6">
                                        {"IIT (BHU) Varanasi"}
                                    </div>
                                    {userRequest.user.github_handle && (
                                        <a
                                            href={`https://github.com/${userRequest.user.github_handle}`}
                                            className="col-6 text-white text-right"
                                        >
                                            <FaGithub />{" "}
                                            {userRequest.user.github_handle}
                                        </a>
                                    )}
                                </Row>
                                <br />
                                <h5 className="text-white">About Me</h5>
                                <hr style={{ borderColor: "white" }} />
                                <p className="text-break">
                                    {userRequest.user.bio}
                                </p>
                                <Button variant="light" onClick={editProfile}>
                                    Edit Profile
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
                <div className="container">
                    <Interests interests={userRequest.user.interests} />
                    <ProfileTabs />
                </div>
                <Footer />
            </div>
        );
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
}) => {
    const [err, seterr] = useState("");
    const [wait, setwait] = useState(false);
    const handleChange = (newValue) => setSelectedSkills(newValue);
    const [selectedSkills, setSelectedSkills] = useState(
        interest.split(",").map((s) => {
            return { label: s.trim(), value: s.trim() };
        })
    );
    const handleFind = () => {
        const name = document.getElementById("name").value.trim();
        const handle = document.getElementById("handle").value.trim();
        const bio = document.getElementById("bio").value.trim();
        const interests = selectedSkills
            ? String(selectedSkills.map((s) => s.label))
            : "";
        const username = document.getElementById("username").value.trim();
        var check = [name, handle, username, interests, bio].every((elm) => {
            return elm !== "";
        });
        if (check) {
            setwait(true);
            const data = {
                name: name ?? "",
                college: "IIT (BHU) VARANASI",
                bio: bio ?? "",
                interests: interests ?? "",
                username: username,
                github_handle: handle,
            };

            axios
                .patch(`profile/`, data)
                .then(setwait(false))
                .then((res) => {
                    handleClose();
                    location.reload();
                })
                .catch((err) => {
                    if (err.response.data.username)
                        seterr(String(err.response.data.username));
                    else
                        seterr(
                            "Some Error Occurred Communicating with the Server"
                        );
                });
        } else seterr("All Required Fields must be Filled");
    };
    return (
        <Container className="text-center align-middle">
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                {closable ? (
                    <Modal.Header closeButton>
                        <Modal.Title>Complete Your Profile</Modal.Title>
                    </Modal.Header>
                ) : (
                    <Modal.Header>
                        <Modal.Title>Complete Your Profile</Modal.Title>
                    </Modal.Header>
                )}
                <Modal.Body>
                    <Form>
                        <Form.Text className="text-right">
                            *Required Fields
                        </Form.Text>
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
                                    <Form.Label>Handle</Form.Label>
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
                                type="text"
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
                    <Button variant="primary" onClick={handleFind}>
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
    );
};

export default Profile;
