import Interests from '../components/Profile/Interests';
import Footer from '../components/Footer/Footer';
import { Form, Spinner, Jumbotron, Row, Col, Modal, Button, Container, Image } from 'react-bootstrap';
import ProfileTabs from '../components/Profile/ProfileTabs'
import { useAuth } from "../context/auth";
import axios from '../util/axios'
import React, { useState } from 'react'
import { FaGithub } from 'react-icons/fa';


function Profile() {
    const [check, setcheck] = useState(false);
    const [userRequest, setUserRequest] = useState({
        loading: true,
        user: null
    });
    const val = useAuth();
    var url = val.firebaseUser !== null ? val.firebaseUser.photoURL : "";
    const editProfile = () => setcheck(true);
    if (userRequest.loading && val.token != null) {
        axios.defaults.headers.common['Authorization'] = `Token ${val.token}`;
        axios.get(
            `profile/`,
        )
            .then(res => {
                console.log('SHI hai', res.data);

                const user = {
                    name: res.data.name,
                    handle: res.data.github_handle,
                    bio: res.data.bio,
                    interest: res.data.interests,
                    college: res.data.college
                }
                setUserRequest({
                    loading: false,
                    user: user
                })
                const arr = [res.data.name, res.data.github_handle, res.data.interests, res.data.bio];
                if (arr.every((elm) => elm === "")) setcheck(true);

            }).catch(err => {
                console.log("Error during request", err.message)
            });
    }
    if (userRequest.loading) {
        return (
            <Container className="text-center" >
                <Spinner style={{
                    "position": "absolute",
                    "top": "50%",
                }} className="mt-auto mb-auto" animation="border" role="status" >
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Container>);
    }
    else return (
        <div>
            {check && <EditProfile name={userRequest.user.name} handle={userRequest.user.handle} bio={userRequest.user.bio} interest={userRequest.user.interest} />}

            <Jumbotron style={{
                background: 'url("images/profile_cover.jpg") no-repeat',
                backgroundSize: "cover"
            }} className="text-white">
                <Container>
                    <Row>
                        <Col md={4} className="text-center">
                            <div style={{
                                height: 30
                            }} className="d-none d-sm-block"></div>
                            <Image
                                src={url}
                                fluid style={{
                                    boxShadow: "1px 1px 40px 1px black",
                                    border: "2px solid white",
                                    "border radius": 50,
                                    width: 200,
                                    height: 200
                                }} roundedCircle />
                            <div style={{
                                height: 30
                            }} className="d-block d-sm-none"></div>
                        </Col>
                        <Col md={8}>
                            <div style={{ height: 20 }} className="d-sm-block d-none" />
                            <h2 style={{ color: "white" }}>{userRequest.user.name}</h2>
                            <Row>
                                <div className="col-6">{"IIT (BHU) Varanasi"}</div>
                                <a href={`https://github.com/${userRequest.user.handle}`} className="col-6 text-white text-right">
                                    <FaGithub /> {userRequest.user.handle}
                                </a>
                            </Row>
                            <br />
                            <h5 className="text-white">About Me</h5>
                            <hr style={{ borderColor: "white" }} />
                            <p className="text-break">{userRequest.user.bio}</p>
                            <Button variant="light" onClick={editProfile}>Edit Profile</Button>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>


            <div className="container">
                <Interests interests={userRequest.user.interest} />
                <ProfileTabs />
            </div>
            <Footer />
        </div>
    );
}
//<ProfileJumbotron pic={url} name={userRequest.user.name} handle={userRequest.user.handle} college='IIT (BHU) Varanasi' bio={userRequest.user.bio} />

const EditProfile = ({ handle, bio, interest, name }) => {
    const handleClose = () => setShow(false);
    const [err, seterr] = useState("");
    const [wait, setwait] = useState(false);
    const [show, setShow] = useState(true);

    const handleFind = () => {
        const name = document.getElementById('name').value.trim();
        const handle = document.getElementById('handle').value.trim();
        const bio = document.getElementById('bio').value.trim();
        const interests = document.getElementById('interest').value.trim();

        var check = [name, handle, interests, bio].every((elm) => { return (elm !== ""); });

        if (check) {
            console.log('YES', name, handle, interests, bio);
            setwait(true)
            axios.patch(
                `profile/`,
                {
                    "name": name ?? "",
                    "github_handle": handle ?? "",
                    "college": "IIT (BHU) VARANASI",
                    "bio": bio ?? "",
                    "interests": interests ?? ""
                }
            )
                .then(setwait(false))
                .then(res => {
                    handleClose();
                    window.location.reload(false);
                }).catch(err => {
                    seterr('Some Error Occurred Communicating with the Server')
                });
        }
        else seterr('All Fields must be Filled')
    };
    return (
        <Container className="text-center align-middle">
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
                <Modal.Header>
                    <Modal.Title>Complete Your Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter name" defaultValue={name} />
                        </Form.Group>
                        <Form.Group controlId="handle">
                            <Form.Label>Handle</Form.Label>
                            <Form.Control type="text" placeholder="GitHub Handle" defaultValue={handle} />
                        </Form.Group>
                        <Form.Group controlId="bio">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control type="text" placeholder="Bio" defaultValue={bio} />
                        </Form.Group>
                        <Form.Group controlId="interest">
                            <Form.Label>Interests</Form.Label>
                            <Form.Control type="text" placeholder="Enter " defaultValue={interest} />
                            <Form.Text className="text-muted">Enter Your Interests Separated by Comma. E.g. React, Vue</Form.Text>
                        </Form.Group>
                    </Form>
                    <p className="text-danger text-small">{err}</p>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleFind}>Submit</Button>
                    {wait && <Spinner animation="border" role="status" >
                        <span className="sr-only">Loading...</span>
                    </Spinner>}
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
export default Profile;
