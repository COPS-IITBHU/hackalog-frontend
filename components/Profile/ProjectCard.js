import { Card, ListGroupItem, Image } from 'react-bootstrap';

const hackathonParticipants = <Image
    src="images/profilepic.jpg"
    width={25}
    height={25}
    className="rounded-circle"
/>;

export default function ProjectCard() {
    return (
        <Card className="shadow-sm">
            <Card.Img style={{ height: 200 }} variant="top" src="https://miro.medium.com/max/1924/1*OengjbOmGldeir-D6k1sYA.png" />
            <Card.Body>
                <Card.Title><h5>Project Name</h5></Card.Title>

                <Card.Text className="small">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.
            </Card.Text>
                <Card.Subtitle className="mb-2 text-muted">Team</Card.Subtitle>
                <ListGroupItem className="d-flex align-items-center justify-content-between rounded-pill bg-light">
                    {hackathonParticipants}{hackathonParticipants}{hackathonParticipants}{hackathonParticipants}
                </ListGroupItem>
            </Card.Body>
        </Card>
    );
}
