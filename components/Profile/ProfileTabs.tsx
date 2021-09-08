import { Nav, Tab, Col, Row } from "react-bootstrap"
import HackathonCard from "../HackathonCard/HackathonCard"
import TeamCard from "./TeamCard"
import { TeamSerializer } from "@/types/backend"

export function ProfileTabs({ teams }: { teams: TeamSerializer[] }) {
    return (
        <Tab.Container defaultActiveKey="myProjects">
            <Nav
                variant="tabs"
                defaultActiveKey="myProjects"
                className="nav-fill"
            >
                <Nav.Item>
                    <Nav.Link eventKey="myProjects">
                        <h5>Projects</h5>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="myHackathons">
                        <h5>Hackathons</h5>
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <br />
            <Tab.Content>
                <Tab.Pane eventKey="myProjects">
                    <div className="container">
                        <Row>
                            {teams.length ? (
                                teams.map((team) => (
                                    <Col className="pb-3" sm={6} key={team.id}>
                                        <TeamCard team={team} />
                                    </Col>
                                ))
                            ) : (
                                <p>No Teams to Show</p>
                            )}
                        </Row>
                    </div>
                </Tab.Pane>
                <Tab.Pane eventKey="myHackathons">
                    <div className="row">
                        {teams.length ? (
                            teams.map(({ hackathon }) => (
                                <Col sm={6} key={hackathon.slug}>
                                    <HackathonCard
                                        hackathon={hackathon}
                                    ></HackathonCard>
                                </Col>
                            ))
                        ) : (
                            <p>No Participation in Hackathons to Show</p>
                        )}
                    </div>
                </Tab.Pane>
            </Tab.Content>
            <style>{`
				
			`}</style>
        </Tab.Container>
    )
}
