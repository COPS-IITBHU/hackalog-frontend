import HackathonCard from "../components/HackathonCard/HackathonCard"
import Sorry from "../components/Sorry/Sorry"
import Header from "../components/Header/Header"
import { Text, Button } from "atomize"
import { Spinner } from "react-bootstrap"
import axiosInstance from "../util/axios"
import React from "react"
import Link from "next/link"
import Head from "next/head"

function useOnScreen(options) {
    const ref = React.useRef()
    const [visible, setVisible] = React.useState(false)

    React.useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setVisible(entry.isIntersecting)
        }, options)

        if (ref.current) {
            observer.observe(ref.current)
        }
        const current = ref.current

        return () => {
            if (current) {
                observer.unobserve(current)
            }
        }
    }, [ref.options, options])
    return [ref, visible]
}

export default function Home() {
    const [hackathons, setHackathons] = React.useState([])
    const [ref, visible] = useOnScreen({
        rootMargin: "-100px",
    })
    React.useEffect(() => {
        axiosInstance
            .get("hackathons")
            .then((response) => {
                setHackathons(response.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])

    var previousHackathons = false
    if (hackathons.length) {
        previousHackathons = hackathons
            .filter((hackathon) => hackathon.status == "Completed")
            .slice(0, 3)
    }

    var currentAndUpcomingHackathons = false
    if (hackathons.length) {
        currentAndUpcomingHackathons = hackathons
            .filter(
                (hackathon) =>
                    hackathon.status == "Upcoming" ||
                    hackathon.status == "Ongoing"
            )
            .slice(0, 3)
    }
    return (
        <div>
            <Head>
                <title>COPS Hackalog</title>
                <meta name="title" content="COPS Hackalog" />
                <meta
                    name="description"
                    content="Hackathons are an enjoyable, inspiring experience for hackers and organizers alike. To promote budding developers and hackathon like events, the hackers at Club of Programmers IIT BHU have developed The COPS Hackalog a platform for organizing Hackathons and Dev sprints. This platform opens up opportunities to learn from others, collaborate with people and get your great projects reviewed all you have to do is register ;)."
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://cops-hackalog.netlify.app/"
                />
                <meta property="og:title" content="COPS Hackalog" />
                <meta
                    property="og:description"
                    content="Hackathons are an enjoyable, inspiring experience for hackers and organizers alike. To promote budding developers and hackathon like events, the hackers at Club of Programmers IIT BHU have developed The COPS Hackalog a platform for organizing Hackathons and Dev sprints. This platform opens up opportunities to learn from others, collaborate with people and get your great projects reviewed all you have to do is register ;)."
                />
                <meta
                    property="og:image"
                    content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
                />
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:url"
                    content="https://cops-hackalog.netlify.app/"
                />
                <meta property="twitter:title" content="COPS Hackalog" />
                <meta
                    property="twitter:description"
                    content="Hackathons are an enjoyable, inspiring experience for hackers and organizers alike. To promote budding developers and hackathon like events, the hackers at Club of Programmers IIT BHU have developed The COPS Hackalog a platform for organizing Hackathons and Dev sprints. This platform opens up opportunities to learn from others, collaborate with people and get your great projects reviewed all you have to do is register ;)."
                />
                <meta
                    property="twitter:image"
                    content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
                />
                <meta name="robots" content="index, follow" />
                <meta
                    name="keywords"
                    content="Hackathon, Developers, IIT, BHU, COPS, Devs, Hackers"
                />
                <meta name="author" content="COPS IITBHU" />
                <meta name="application-name" content="COPS Hackalog" />
            </Head>
            <div className={visible ? "" : "d-none"} ref={ref}>
                {visible ? <Header /> : ""}
            </div>
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
            <div className="container fluid">
                <div className="py-5">
                    <div className="row no-gutters align-items-stretch justify-content-center">
                        <div className="col-12 py-4">
                            <Text
                                tag="h3"
                                textSize="title"
                                textColor="#003e54"
                                fontFamily="madetommy-bold"
                            >
                                Built for you to:
                            </Text>
                        </div>
                        <div className="col-12 col-md-4 p-3">
                            <div className="p-4 bs-light h-100">
                                <div className="icon-container">
                                    <img
                                        src="/images/icon1.png"
                                        loading="lazy"
                                    />
                                </div>
                                <h5 className="card-title">Collaborate</h5>
                                <div className="regular-text">
                                    To cooperate with or willingly assist an
                                    enemy of one&apos;s country and especially
                                    an occupying force
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 p-3">
                            <div className="p-4 bs-light h-100">
                                <div className="icon-container">
                                    <img
                                        src="/images/icon2.jpg"
                                        loading="lazy"
                                    />
                                </div>
                                <h5 className="card-title">Learn</h5>
                                <div className="regular-text">
                                    To cooperate with or willingly assist an
                                    enemy of one&apos;s country and especially
                                    an occupying force
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 p-3">
                            <div className="p-4 bs-light h-100">
                                <div className="icon-container">
                                    <img
                                        src="/images/icon3.png"
                                        loading="lazy"
                                    />
                                </div>
                                <h5 className="card-title">Share</h5>
                                <div className="regular-text">
                                    A portion belonging to, due to, or
                                    contributed by an individual or group
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="row justify-content-between align-items-center"
                    style={{ flexWrap: "nowrap" }}
                >
                    <div className="pl-3">
                        <Text
                            tag="h3"
                            textSize="title"
                            textColor="#003e54"
                            fontFamily="madetommy-bold"
                        >
                            Ongoing and Upcoming Hackathons:
                        </Text>
                    </div>
                    <div className="pr-3">
                        <Link href="/hackathons">
                            <Button
                                shadow="3"
                                hoverShadow="4"
                                m={{ r: "1rem" }}
                                p="1rem"
                            >
                                View More
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="py-3 py-md-5">
                    {currentAndUpcomingHackathons ? (
                        <>
                            {currentAndUpcomingHackathons.length ? (
                                <div className="row no-gutters align-items-stretch justify-content-start">
                                    {currentAndUpcomingHackathons.map(
                                        (hackathon) => (
                                            <div
                                                key={hackathon.slug}
                                                className="col-12 col-md-4 p-3"
                                            >
                                                <HackathonCard
                                                    hackathon={hackathon}
                                                />
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                <div className="row align-items-stretch justify-content-center">
                                    <div className="col-12 col-md-4 p-3">
                                        <Sorry />
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <Spinner
                            style={{
                                position: "absolute",
                                left: "50%",
                            }}
                            animation="border"
                            role="status"
                        >
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    )}
                </div>
                <div
                    className="row justify-content-between align-items-center"
                    style={{ flexWrap: "nowrap" }}
                >
                    <div className="pl-3">
                        <Text
                            tag="h3"
                            textSize="title"
                            textColor="#003e54"
                            fontFamily="madetommy-bold"
                        >
                            Hackathons and Events Archive:
                        </Text>
                    </div>
                    <div className="pr-3">
                        <Link href="/hackathons">
                            <Button
                                shadow="3"
                                hoverShadow="4"
                                m={{ r: "1rem" }}
                                p="1rem"
                            >
                                View More
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="py-3 py-md-5">
                    {!previousHackathons ? (
                        <Spinner
                            style={{
                                position: "absolute",
                                left: "50%",
                            }}
                            animation="border"
                            role="status"
                        >
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    ) : previousHackathons.length ? (
                        <div className="row no-gutters align-items-stretch justify-content-start">
                            {previousHackathons.map((hackathon) => (
                                <div
                                    key={hackathon.slug}
                                    className="col-12 col-md-4 p-3"
                                >
                                    <HackathonCard hackathon={hackathon} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="row align-items-stretch justify-content-center">
                            <div className="col-12 col-md-4 p-3">
                                <Sorry />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/*<div className="listhackathon-container py-4"></div>*/}
            <style jsx>{`
                .icon-container {
                    text-align: left;
                }
                .icon-container img {
                    margin: 20px 0px;
                    max-width: 60px;
                    border-radius: 50%;
                }
                .listhackathon-container {
                    background: linear-gradient(
                        to top left,
                        #2986a5,
                        #0d6697,
                        #00879a,
                        #00776b
                    );
                }
            `}</style>
        </div>
    )
}
