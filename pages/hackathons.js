import HackathonCard from "../components/HackathonCard/HackathonCard";
import axiosInstance from "../util/axios";
import { Tab, Col, Row, Nav, Container } from "react-bootstrap";
import { Text } from "atomize";
import { useEffect, useState } from "react";

export default function hackathons() {
    const [ongoing, setOngoing] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [error, setError] = useState([false, false, false]);

    useEffect(() => {
        axiosInstance
            .get("hackathons?query=ongoing")
            .then((response) => setOngoing(response.data))
            .catch((err) => {
                console.log(err);
                let arr = error;
                arr[0] = true;
                setError(arr);
            });
    }, []);

    useEffect(() => {
        axiosInstance
            .get("hackathons?query=upcoming")
            .then((response) => setUpcoming(response.data))
            .catch((err) => {
                console.log(err);
                let arr = error;
                arr[1] = true;
                setError(arr);
            });
        axiosInstance
            .get("hackathons?query=completed")
            .then((response) => setCompleted(response.data))
            .catch((err) => {
                console.log(err);
                let arr = error;
                arr[2] = true;
                setError(arr);
            });
    }, []);

    return (
        <div style={{ background: "#87a3bb17", minHeight: "100vh" }}>
            <div
                style={{
                    background: "url(/images/home-jumbo.jpg) no-repeat",
                    backgroundSize: "cover",
                    backgroundAttachment: "fixed",
                }}
            >
                <div className="container py-10 text-center">
                    <Text
                        tag="h1"
                        textSize="display2"
                        m={{ b: "1rem" }}
                        fontFamily="madetommy-bold"
                    >
                        The home for hackathons organised under COPS IIT(BHU)
                    </Text>
                    <Text tag="h2" textSize="title" textColor="#003e54">
                        Build products, practice skills, learn technologies, win
                        prizes,and connect with people.
                    </Text>
                </div>
            </div>
            <div className="container py-5">
                <Tab.Container defaultActiveKey="ongoing">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="ongoing">
                                        Ongoing
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="upcoming">
                                        Upcoming
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="completed">
                                        Completed
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="ongoing">
                                    {error[0] ? (
                                        <Container>
                                            Couldn't Fetch the List from Backend
                                        </Container>
                                    ) : ongoing.length ? (
                                        <HackathonList hackathons={ongoing} />
                                    ) : (
                                                <Container>
                                                    No Ongoing Hackathons Right Now
                                                </Container>
                                            )}
                                </Tab.Pane>
                                <Tab.Pane eventKey="upcoming">
                                    {error[1] ? (
                                        <Container>
                                            Couldn't Fetch the List from Backend
                                        </Container>
                                    ) : upcoming.length ? (
                                        <HackathonList hackathons={upcoming} />
                                    ) : (
                                                <Container>
                                                    No Upcoming Hackathons Right Now
                                                </Container>
                                            )}
                                </Tab.Pane>
                                <Tab.Pane eventKey="completed">
                                    {error[2] ? (
                                        <Container>
                                            Couldn't Fetch the List from Backend
                                        </Container>
                                    ) : completed.length ? (
                                        <HackathonList hackathons={completed} />
                                    ) : (
                                                <Container>
                                                    No Completed Hackathons Right Now
                                                </Container>
                                            )}
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </div>
    );
}

function HackathonList(props) {
    return (
        <div className="row no-gutters">
            {props.hackathons.map((hackathon, index) => (
                <div className="col-12 col-md-6 p-2" key={index}>
                    <HackathonCard
                        hackathon={hackathon}
                        key={hackathon.slug}
                    ></HackathonCard>
                </div>
            ))}
        </div>
    );
}
