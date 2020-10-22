import { Card, Row, Button, Col } from "react-bootstrap";
import Date from "../Date/Date";

export default function HackathonCard({ hackathon }) {
  return (
      <>
        <Card className="shadow-sm" id="main">
            <Card.Img style={{ height: 200 }} variant="top" src={hackathon.image} />
            <Card.Body>
                <Card.Title>
                <h5 className="card-title">{hackathon.title}</h5>
                </Card.Title>

                <Card.Text className="regular-text">{hackathon.description}</Card.Text>
                <Card.Subtitle className="mb-2 card-sub-title">Event Date</Card.Subtitle>
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
  <style jsx>{`
    .shadow-sm:hover {
        box-shadow: 0 .125rem .25rem #003e54 !important;
    }
  `}</style>
      </>
  );
}
