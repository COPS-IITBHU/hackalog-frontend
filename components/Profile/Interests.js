import { Container, Row } from 'react-bootstrap';

const Interests = ({ interests }) => {
    var m = String(interests).split(',');
    m.map(s => s.trim());
    const skills = m.map((e, id) => {
        return (
            <li key={id} className="list-unstyled d-inline-flex">
                <h5><span className="badge badge-info mr-1" style={{
                    padding: "0.4rem 0.9rem"
                }} >{e}</span> </h5>
            </li>
        );
    });
    return (
        <Container style={{ paddingBottom: 40, paddingTop: 20 }}>
            <h3>Interests</h3>
            <hr />
            <Row>
                <ul>
                    {skills}
                </ul>
            </Row>
        </Container>
    );
}
export default Interests;
