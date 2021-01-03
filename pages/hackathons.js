import HackathonCard from "../components/HackathonCard/HackathonCard"
import axiosInstance from "../util/axios"
import { Tab, Col, Row, Nav, Container } from "react-bootstrap"
import { useEffect, useState } from 'react'

export default function hackathons() {
    const [ongoing, setOngoing] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [completed, setCompleted] = useState([]);

    useEffect(
        () => {
            axiosInstance.get('hackathons?query=ongoing').then(
                (response) => setOngoing(response.data)
            ).catch(
                (err) => null
            )
            axiosInstance.get('hackathons?query=upcoming').then(
                (response) => setUpcoming(response.data)
            ).catch(
                (err) => null
            )
            axiosInstance.get('hackathons?query=completed').then(
                (response) => setCompleted(response.data)
            ).catch(
                (err) => null
            )
        }, []
    )

    return (
        <Container>
            <Tab.Container defaultActiveKey="ongoing">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="ongoing">Ongoing</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="upcoming">Upcoming</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="completed">Completed</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="ongoing">
                                <HackathonList hackathons={ ongoing } />
                            </Tab.Pane>
                            <Tab.Pane eventKey="upcoming">
                                <HackathonList hackathons={ upcoming } />
                            </Tab.Pane>
                            <Tab.Pane eventKey="completed">
                                <HackathonList hackathons={ completed } />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    )
}

function HackathonList(props) {
    return (
        <div>
            {props.hackathons.map(
                hackathon => <HackathonCard hackathon={ hackathon } key={hackathon.slug}></HackathonCard>
            )}
        </div>
    )
}