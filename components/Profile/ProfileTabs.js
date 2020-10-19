import { Nav, Container, Tab } from 'react-bootstrap';
import CardColumn from 'react-bootstrap/CardColumns'
import ProjectCard from './ProjectCard'


export default function ProfileTabs() {
    return (
        <Tab.Container defaultActiveKey="myProjects">
            <Nav variant="tabs" defaultActiveKey="myProjects" className="nav-fill">
                <Nav.Item>
                    <Nav.Link eventKey="myProjects"><h5>Projects</h5></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="myHackathons"><h5>Hackathons</h5></Nav.Link>
                </Nav.Item>
            </Nav>
            <br />
            <Tab.Content>
                <Tab.Pane eventKey="myProjects">
                    {/* PROJECTS  */}
                    <div className="container">
                        <CardColumn>
                            <ProjectCard />
                            <ProjectCard />
                            <ProjectCard />
                            <ProjectCard />
                            <ProjectCard />
                        </CardColumn>
                    </div>
                </Tab.Pane>
                <Tab.Pane eventKey="myHackathons">
                    <Container>
                        {/* HACKATHON CARDS TO BE INSERTED HERE  */}
                                Here's cards for hackathons shall be displayed
                    </Container>
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
    );
}
