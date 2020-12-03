import { Container, Row } from 'react-bootstrap';

const Interests = ({ interests }) => {
    const skills = String(interests)
        .split(",")
        .map((skill) => skill.trim())
        .map((skill, id) => {
            return (
                <li key={id} className="list-unstyled d-inline-flex">
                    <h5>
                        <span
                            className="badge badge-info mr-1"
                            style={{
                                padding: "0.4rem 0.9rem",
                            }}
                        >
                            {skill}
                        </span>{" "}
                    </h5>
                </li>
            );
        });
    const noInterests = !skills.length ?? false;

    return (
        <Container style={{ paddingBottom: 40, paddingTop: 20 }}>
            <h3>Interests</h3>
            <hr />
            {noInterests ? "Add Your Interests to Show Off" :
                <Row>
                    <ul>
                        {skills}
                    </ul>
                </Row>
            }
        </Container>
    );
}
export default Interests;
