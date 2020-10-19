import { Card, Row, Button, Col } from "react-bootstrap";
import Date from "../Date/Date";

export default function HackathonCard({ hackathon }) {
  return (
    <Card className="shadow-sm">
      <Card.Img style={{ height: 200 }} variant="top" src={hackathon.image} />
      <Card.Body>
        <Card.Title>
          <h5>{hackathon.title}</h5>
        </Card.Title>

        <Card.Text className="small">{hackathon.description}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Event Date</Card.Subtitle>
        <Row className="justify-content-space-between">
          <Col>
            <Date dateString={hackathon.start}></Date>
          </Col>
          <Col>
            <Button variant="info" href="">
                See more...
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
