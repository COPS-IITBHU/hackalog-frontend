import { Text, Div, Row, Col } from "atomize"
import Link from "next/link"
import { ReactElement } from "react"
import { useAuth } from "../../context/auth"

export default function Footer(): ReactElement {
    const { token, profile } = useAuth()

    return (
        <div>
            <Div
                textAlign="center"
                style={{ backgroundColor: "#393E46" }}
                p={{ t: "1.5rem", b: "2rem" }}
            >
                <Text
                    textSize={{ xs: "body", md: "subheader" }}
                    textColor="white"
                >
                    Hackalog is made with{" "}
                    <span role="img" aria-label="pizza" area-hidden="false">
                        ☕
                    </span>
                    ,{" "}
                    <span role="img" aria-label="coffee" area-hidden="false">
                        💻
                    </span>{" "}
                    and
                    <span role="img" aria-label="laptop" area-hidden="false">
                        🍕
                    </span>
                </Text>
            </Div>
            <footer style={{ backgroundColor: "#393E46" }}>
                <Div
                    m={{ x: { xs: "5rem", lg: "10rem" } }}
                    p={{ b: "1rem" }}
                    textColor="white"
                >
                    <Row>
                        <Col
                            size={{ xs: 12, md: 12, lg: 4 }}
                            align="center"
                            order={{ xs: 3, lg: 1 }}
                        >
                            <Div
                                textAlign={{ xs: "center", lg: "left" }}
                                m={{ xs: "1rem", lg: "0.5rem" }}
                                p={{ x: { lg: "7rem" } }}
                            >
                                <Text m={{ y: "0.5rem" }} textColor="white">
                                    <Link href="/contributors" passHref>
                                        <a href="/#" rel="noopener noreferrer">
                                            <span
                                                role="img"
                                                aria-label="laptop"
                                                area-hidden="false"
                                            >
                                                ✨
                                            </span>{" "}
                                            CONTRIBUTORS
                                        </a>
                                    </Link>
                                </Text>
                                <Text>
                                    <a
                                        href="https://copsiitbhu.co.in/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {" "}
                                        &copy;{new Date().getFullYear()}
                                        {"  "}
                                        COPS IIT BHU
                                    </a>
                                </Text>
                            </Div>
                        </Col>
                        <Col size={{ lg: 2 }} order={{ xs: 4, lg: 3 }}></Col>
                        <Col
                            size={{ xs: 12, sm: 6, lg: 2 }}
                            textAlign={{ xs: "center", lg: "left" }}
                            order={{ xs: 2, lg: 4 }}
                        >
                            <Div
                                textSize={{ xs: "body", md: "1rem" }}
                                m={{ b: { xs: "1rem", lg: 0 } }}
                            >
                                <b>Quick Links</b>
                                <Text m={{ t: "0.5rem" }}>
                                    <Link href="/" passHref>
                                        <a href="/#">
                                            <span>Home</span>
                                        </a>
                                    </Link>
                                </Text>
                                <Text>
                                    <Link href="/hackathons" passHref>
                                        <a href="/#">
                                            <span>Hackathons</span>
                                        </a>
                                    </Link>
                                </Text>
                                {token && profile && (
                                    <Text>
                                        <Link
                                            href={`/profile/${profile.username}`}
                                            passHref
                                        >
                                            <a href="/#">
                                                <span>Profile</span>
                                            </a>
                                        </Link>
                                    </Text>
                                )}
                                <Text>
                                    <Link
                                        href="https://copsiitbhu.co.in"
                                        passHref
                                    >
                                        <a href="/#">
                                            <span>COPS</span>
                                        </a>
                                    </Link>
                                </Text>
                            </Div>
                        </Col>
                        <Col
                            size={{ xs: 12, sm: 6, lg: 4 }}
                            textAlign="center"
                            order={{ xs: 2, lg: 2 }}
                            textSize={{ xs: "body", md: "1rem" }}
                        >
                            <b>Follow Us</b>
                            <Text m={{ t: { md: "0.5rem" } }}>
                                <Link
                                    href="https://www.linkedin.com/company/cops-iitbhu/mycompany/"
                                    passHref
                                >
                                    <a href="/#">
                                        <i
                                            className="fab fa-linkedin fa-2x"
                                            style={{ margin: "10px 5px" }}
                                        />
                                    </a>
                                </Link>
                                <Link
                                    href="https://github.com/COPS-IITBHU"
                                    passHref
                                >
                                    <a href="/#">
                                        <i
                                            className="fab fa-github fa-2x"
                                            style={{ margin: "10px 5px" }}
                                        />
                                    </a>
                                </Link>
                                <Link
                                    href="https://www.facebook.com/cops.iitbhu/"
                                    passHref
                                >
                                    <a href="/#">
                                        <i
                                            className="fab fa-facebook fa-2x"
                                            style={{ margin: "10px 5px" }}
                                        />
                                    </a>
                                </Link>
                                <Link
                                    href="https://cops-discord-freshers.herokuapp.com/"
                                    passHref
                                >
                                    <a href="/#">
                                        <i
                                            className="fab fa-discord fa-2x"
                                            style={{ margin: "10px 5px" }}
                                        />
                                    </a>
                                </Link>
                            </Text>
                        </Col>
                    </Row>
                </Div>
            </footer>
            <style jsx>{`
                a {
                    color: #f5f5f5;
                }
                a:hover {
                    color: #e4f9f5;
                }
                i {
                    color: #a1eafb;
                }
                i:hover {
                    color: #cbf1f5;
                    cursor: pointer;
                    transform: scale(1.2);
                }
                span {
                    color: #a1eafb;
                }
                span:hover {
                    cursor: pointer;
                    color: #cbf1f5;
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    )
}
