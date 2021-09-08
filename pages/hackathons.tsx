import HackathonCard from "../components/HackathonCard/HackathonCard"
import axiosInstance from "../util/axios"
import { Tab, Col, Row, Nav, Spinner } from "react-bootstrap"
import { Text } from "atomize"
import { useEffect, useState } from "react"
import Head from "next/head"

import Lottie from "react-lottie"
import animationData from "../lottie/sad.json"
import { HackathonSerializer } from "@/types/backend"
import { AxiosResponse } from "axios"
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
}

export default function Hackathons() {
    const [ongoing, setOngoing] = useState<HackathonSerializer[]>()
    const [upcoming, setUpcoming] = useState<HackathonSerializer[]>()
    const [completed, setCompleted] = useState<HackathonSerializer[]>()
    const [error, setError] = useState<boolean[]>([false, false, false])

    useEffect(() => {
        axiosInstance
            .get("hackathons?query=ongoing")
            .then((response: AxiosResponse<HackathonSerializer[]>) =>
                setOngoing(response.data)
            )
            .catch((err) => {
                let arr = error
                arr[0] = true
                setError(arr)
            })
    }, [error])

    useEffect(() => {
        axiosInstance
            .get("hackathons?query=upcoming")
            .then((response: AxiosResponse<HackathonSerializer[]>) =>
                setUpcoming(response.data)
            )
            .catch((err) => {
                let arr = error
                arr[1] = true
                setError(arr)
            })
        axiosInstance
            .get("hackathons?query=completed")
            .then((response: AxiosResponse<HackathonSerializer[]>) =>
                setCompleted(response.data)
            )
            .catch((err) => {
                let arr = error
                arr[2] = true
                setError(arr)
            })
    }, [error])

    return (
        <div style={{ background: "#87a3bb17", minHeight: "100vh" }}>
            <Head>
                <title>Hackathons | COPS Hackalog</title>
                <meta name="title" content="Hackathons" />
                <meta
                    name="description"
                    content="A list of all the completed, ongoing and upcoming hackthaons on COPS Hacklog."
                />
            </Head>
            <div
                style={{
                    background: "url(/images/home-jumbo.jpg) no-repeat",
                    backgroundSize: "cover",
                    backgroundAttachment: "fixed",
                }}
            >
                <div className="container py-10 text-center">
                    <Text
                        tag="h1"
                        textSize="display2"
                        m={{ b: "1rem" }}
                        fontFamily="madetommy-bold"
                    >
                        The home for hackathons organised under COPS IIT(BHU)
                    </Text>
                    <Text tag="h2" textSize="title" textColor="#003e54">
                        Build products, practice skills, learn technologies, win
                        prizes,and connect with people.
                    </Text>
                </div>
            </div>
            <div className="container py-5">
                <Tab.Container defaultActiveKey="ongoing">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="ongoing">
                                        Ongoing
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="upcoming">
                                        Upcoming
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="completed">
                                        Completed
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="ongoing">
                                    {error[0] ? (
                                        <div className="text-center">
                                            Unable to fetch data, please try
                                            again!
                                        </div>
                                    ) : (
                                        <>
                                            {ongoing && ongoing.length ? (
                                                <HackathonList
                                                    hackathons={ongoing}
                                                />
                                            ) : ongoing ? (
                                                <div className="text-center">
                                                    <Lottie
                                                        options={defaultOptions}
                                                        height={300}
                                                    />
                                                    <Text
                                                        tag="h6"
                                                        textSize="subheader"
                                                        textColor="003e54bd"
                                                        fontFamily="madetommy-bold"
                                                    >
                                                        No Ongoing Hackathons
                                                        Right Now
                                                    </Text>
                                                </div>
                                            ) : (
                                                <div className="text-center">
                                                    <Spinner
                                                        animation="border"
                                                        role="status"
                                                    >
                                                        <span className="sr-only">
                                                            Loading...
                                                        </span>
                                                    </Spinner>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </Tab.Pane>
                                <Tab.Pane eventKey="upcoming">
                                    {error[1] ? (
                                        <div className="text-center">
                                            Unable to fetch data, please try
                                            again!
                                        </div>
                                    ) : (
                                        <>
                                            {upcoming && upcoming.length ? (
                                                <HackathonList
                                                    hackathons={upcoming}
                                                />
                                            ) : upcoming ? (
                                                <div className="text-center">
                                                    <Lottie
                                                        options={defaultOptions}
                                                        height={300}
                                                    />
                                                    <Text
                                                        tag="h6"
                                                        textSize="subheader"
                                                        textColor="003e54bd"
                                                        fontFamily="madetommy-bold"
                                                    >
                                                        No Upcoming Hackathons
                                                        Right Now
                                                    </Text>
                                                </div>
                                            ) : (
                                                <div className="text-center">
                                                    <Spinner
                                                        animation="border"
                                                        role="status"
                                                    >
                                                        <span className="sr-only">
                                                            Loading...
                                                        </span>
                                                    </Spinner>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </Tab.Pane>
                                <Tab.Pane eventKey="completed">
                                    {error[2] ? (
                                        <div className="text-center">
                                            Unable to fetch data, please try
                                            again!
                                        </div>
                                    ) : (
                                        <>
                                            {completed && completed.length ? (
                                                <HackathonList
                                                    hackathons={completed}
                                                />
                                            ) : completed ? (
                                                <div className="text-center">
                                                    <Lottie
                                                        options={defaultOptions}
                                                        height={300}
                                                    />
                                                    <Text
                                                        tag="h6"
                                                        textSize="subheader"
                                                        textColor="003e54bd"
                                                        fontFamily="madetommy-bold"
                                                    >
                                                        No Completed Hackathons
                                                        Right Now
                                                    </Text>
                                                </div>
                                            ) : (
                                                <div className="text-center">
                                                    <Spinner
                                                        animation="border"
                                                        role="status"
                                                    >
                                                        <span className="sr-only">
                                                            Loading...
                                                        </span>
                                                    </Spinner>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </div>
    )
}

function HackathonList(props: { hackathons: HackathonSerializer[] }) {
    return (
        <div className="row no-gutters">
            {props.hackathons.map((hackathon, index) => (
                <div className="col-12 col-md-6 p-2" key={index}>
                    <HackathonCard
                        hackathon={hackathon}
                        key={hackathon.slug}
                    ></HackathonCard>
                </div>
            ))}
        </div>
    )
}
