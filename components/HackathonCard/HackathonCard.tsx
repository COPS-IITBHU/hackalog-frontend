import { Div, Row, Col, Text, Button } from "atomize"
import Link from "next/link"
import Date from "../Date/Date"
import { HackathonSerializer } from "types/backend"

interface HackathonCardProps {
    hackathon: HackathonSerializer
}

export default function HackathonCard({ hackathon }: HackathonCardProps) {
    return (
        <>
            <Div bg="white" shadow="4" rounded="xl" m={{ b: "1rem" }}>
                <Div
                    bgImg={hackathon.thumbnail}
                    bgSize="cover"
                    bgPos="center"
                    h="12rem"
                    rounded={{ t: "xl" }}
                >
                    {/* <Image src= rounded={{ t: "xl" }} maxH="9rem" /> */}
                </Div>
                <Div p={{ xs: "1rem", md: "1.5rem" }}>
                    <Text
                        tag="h3"
                        textSize={{ xs: "subheader", md: "title" }}
                        textColor="#003e54"
                        fontFamily="madetommy-bold"
                    >
                        {hackathon.title}
                    </Text>
                    <Text
                        m={{ b: "1rem" }}
                        textSize={{ xs: "caption", md: "body" }}
                    >
                        {hackathon.tagline}
                    </Text>
                    <Row>
                        <Col size="6">
                            <Text
                                textSize={{ xs: "body", md: "subheader" }}
                                textWeight="500"
                            >
                                <Date dateString={hackathon.start} />
                            </Text>
                            <Text textSize="caption" textColor="light">
                                event
                            </Text>
                        </Col>
                        <Col size="6">
                            <Link 
                            href={`/hackathon/${hackathon.slug}`}
                            passHref
                            >
                                <a href="/#">
                                    <Button
                                        m={{ l: "auto" }}
                                        textSize={{
                                            xs: "tiny",
                                            md: "tiny",
                                            lg: "tiny",
                                            xl: "body",
                                        }}
                                    >
                                        See more...
                                    </Button>
                                </a>
                            </Link>
                        </Col>
                    </Row>
                </Div>
            </Div>
        </>
    )
}
