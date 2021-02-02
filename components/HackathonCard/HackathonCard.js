import { Div, Row, Col, Text, Image, Button } from 'atomize'
import Link from 'next/link';
import Date from "../Date/Date";

export default function HackathonCard({ hackathon }) {
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
                <Div p="1.5rem">
                    <Text tag="h3" textSize="title" textColor="#003e54" fontFamily="madetommy-bold">
                        {hackathon.title}
                    </Text>
                    <Text m={{ b: "1rem" }}>
                        {hackathon.tagline}
                    </Text>
                    <Row>
                        <Col size="7">
                            <Text textSize="subheader" textWeight="500">
                                <Date dateString={hackathon.start} />
                            </Text>
                            <Text textSize="caption" textColor="light">
                                event
                            </Text>
                        </Col>
                        <Col size="5">
                            <Link href={`/hackathon/${hackathon.slug}`}>
                                <a>
                                    <Button m={{ l: "auto" }}>
                                        See more...
                                    </Button>
                                </a>
                            </Link>
                        </Col>
                    </Row>
                </Div>
            </Div>
        </>
    );
}
