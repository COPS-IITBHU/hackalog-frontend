import { Jumbotron, Col, Container, Row, Image } from 'react-bootstrap';

class ProfileJumbotron extends React.Component {
    render() {
        return (
            <div>
                <Jumbotron style={{
                    background: 'url("images/profile_cover.jpg") no-repeat',
                    backgroundSize: "cover"
                }} className="text-white">
                    <Container>
                        <Row>
                            <Col md={4} className="text-center">
                                <Image
                                    src="images/profilepic.jpg"
                                    fluid style={{
                                        borderRadius: 50,
                                        maxWidth: 200
                                    }} />
                            </Col>
                            <Col md={8}>
                                <div style={{ height: 20 }} className="d-sm-block d-none" />
                                <h2>Developer Name</h2>
                                <Row>
                                    <div className="col-6">College</div>
                                    <a href="#" className="col-6 text-white text-right">
                                        <i className="fa fa-github" /> overTheInternet
                                    </a>
                                </Row>
                                <br />
                                <h5>About Me</h5>
                                <hr style={{ borderColor: "white" }} />
                                <p className="text-break">
                                  DevOps & Backend Engineer | Graphic designer | I love to create and learn new things
                                  Javascript Lover | Canvas, Web Interactivity, Web Physics Simulations | CreativeCoder 
                                  
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}

export default ProfileJumbotron;