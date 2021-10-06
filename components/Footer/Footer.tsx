import { Text, Div, Row, Col } from "atomize"
import Link from "next/link"
import { ReactElement } from "react"
import { useAuth } from "../../context/auth"

export default function Footer(): ReactElement {
    const { token, profile } = useAuth()
    const TextProps = {
        tag: "h6",
        textSize: "paragraph",
        textColor: "#003e54c9",
        fontFamily: "madetommy-light",
    }
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
                                    &copy;{new Date().getFullYear()}
                                    {"  "}
                                    <a
                                        href="https://copsiitbhu.co.in/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        COPS
                                    </a>
                                </Text>
                            </Div>
                        </Col>
                        <Col
                            size={{ xs: 12, sm: 6, lg: 4 }}
                            textAlign={{ xs: "center", lg: "center" }}
                            order={{ xs: 2, lg: 3 }}
                        >
                            <Div
                                textSize={{ xs: "body", md: "1rem" }}
                                m={{ b: { xs: "1rem", lg: 0 } }}
                            >
                                <b>Quick Links</b>
                                <Text m={{ t: "0.5rem" }}>
                                    <Link href="/" passHref>
                                        <p>Home</p>
                                    </Link>
                                </Text>
                                <Text>
                                    <Link href="/hackathons" passHref>
                                        <p>Hackathons</p>
                                    </Link>
                                </Text>
                                {token && profile && (
                                    <Text>
                                        <Link
                                            href={`/profile/${profile.username}`}
                                            passHref
                                        >
                                            <p>Profile</p>
                                        </Link>
                                    </Text>
                                )}
                                <Text>
                                    <Link
                                        href="https://copsiitbhu.co.in"
                                        passHref
                                    >
                                        <p>COPS</p>
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
                                    <i
                                        className="fab fa-linkedin fa-2x"
                                        style={{ margin: "10px 5px" }}
                                    />
                                </Link>
                                <Link
                                    href="https://github.com/COPS-IITBHU"
                                    passHref
                                >
                                    <i
                                        className="fab fa-github fa-2x"
                                        style={{ margin: "10px 5px" }}
                                    />
                                </Link>
                                <Link
                                    href="https://www.facebook.com/cops.iitbhu/"
                                    passHref
                                >
                                    <i
                                        className="fab fa-facebook fa-2x"
                                        style={{ margin: "10px 5px" }}
                                    />
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
                p {
                    color: #a1eafb;
                }
                p:hover {
                    cursor: pointer;
                    color: #cbf1f5;
                    transform: scale(1.1);
                }
            `}</style>
        </div>
    )
}
