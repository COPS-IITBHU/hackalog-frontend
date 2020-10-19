import { Nav, Container, Tab } from 'react-bootstrap';
import CardColumn from 'react-bootstrap/CardColumns'
import ProjectCard from './ProjectCard'


export default function ProfileTabs() {
    return (
        <Tab.Container defaultActiveKey="first">
            <Nav variant="tabs" defaultActiveKey="first" className="nav-fill">
                <Nav.Item>
                    <Nav.Link eventKey="first"><h5>Projects</h5></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="second"><h5>Hackathons</h5></Nav.Link>
                </Nav.Item>
            </Nav>
            <br />
            <Tab.Content>
                <Tab.Pane eventKey="first" >
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
                <Tab.Pane eventKey="second">
                    <Container>
                        {/* HACKATHON CARDS TO BE INSERTED HERE  */}
                                Here's cards for hackathons shall be displayed
                            </Container>
                </Tab.Pane>
            </Tab.Content>
        </Tab.Container>
    );
}