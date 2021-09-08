import { Card } from "react-bootstrap"

export default function Sorry() {
    return (
        <Card className="shadow-sm" id="main">
            <Card.Img
                style={{ height: 200 }}
                variant="top"
                src="/images/no-events.jpeg"
            />
            <Card.Body>
                <Card.Text className="card-title">
                    Nothing here for now, but check back soon.
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
