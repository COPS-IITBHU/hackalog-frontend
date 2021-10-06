import axios from "axios"
import React, { useEffect, useState } from "react"
import Head from "next/head"
import animationData from "../lottie/sad.json"
import { Text } from "atomize"
import { Spinner } from "react-bootstrap"
import Lottie from "react-lottie"
import Card from "../components/Cards/ContributorCard"

// Created for Contributors props using the data received from GITHUB APIs
type Contributor = {
    handle_name: string
    name: string
    handle_url: string
    image: string
    github: string
    description: string[]
}

// These are few of the fields received from GITHUB APIs
// Only these field have been used, so rest have been left out
type ContriResponseSerializer = {
    login: string
    url: string
    avatar_url: string
    html_url: string
}

interface DefaultOptionType {
    loop: boolean
    autoplay: boolean
    animationData: any
}

const defaultLottieOptions: DefaultOptionType = {
    loop: true,
    autoplay: true,
    animationData: animationData,
}

export default function Contributors() {
    const [contriFrontend, setContributorsFront] =
        useState<ContriResponseSerializer[]>(null)
    const [contriBackend, setContributorsBack] =
        useState<ContriResponseSerializer[]>(null)
    const [fullname, setFullName] = useState<Object[]>([{}] as Object[])
    const [contributors, setContributors] = useState<Contributor[]>(null)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        axios
            .get<ContriResponseSerializer[]>(
                "https://api.github.com/repos/COPS-IITBHU/hackalog-frontend/contributors"
            )
            .then((res) => setContributorsFront(res.data))
            .catch(() => {
                setError(true)
            })
        axios
            .get<ContriResponseSerializer[]>(
                "https://api.github.com/repos/COPS-IITBHU/hackalog-backend/contributors"
            )
            .then((res) => setContributorsBack(res.data))
            .catch(() => {
                setError(true)
            })
    }, [error])
    useEffect(() => {
        if (contriFrontend && contriBackend) {
            let repoTracker: Object = {}
            let arr: Contributor[] = []

            for (let x of contriFrontend) {
                repoTracker[x.login] = 1
            }
            for (let x of contriBackend) {
                if (repoTracker[x.login]) repoTracker[x.login] = 0
            }

            for (let x of contriFrontend) {
                let repos: string[] = ["hackalog-frontend"]
                if (repoTracker[x.login] === 0)
                    repos = ["hackalog-frontend", "hackalog-backend"]
                arr.push({
                    handle_name: x.login,
                    handle_url: x.url,
                    name: x.login,
                    image: x.avatar_url,
                    github: x.html_url,
                    description: repos,
                })
            }
            for (let x of contriBackend) {
                if (repoTracker[x.login] !== 0)
                    arr.push({
                        handle_name: x.login,
                        handle_url: x.url,
                        name: x.login,
                        image: x.avatar_url,
                        github: x.html_url,
                        description: ["hackalog-backend"],
                    })
            }
            setContributors(arr)
        }
    }, [contriFrontend, contriBackend])
    useEffect(() => {
        if (contributors) {
            let arr: Contributor[] = contributors
            for (let x of arr) {
                let url: string = x.handle_url
                axios
                    .get<{ login: string; name: string }>(url)
                    .then((res) =>
                        setFullName((fullname) => [
                            ...fullname,
                            (fullname[0][res.data.login] = res.data.name),
                        ])
                    )
                    .catch(() => setError(true))
            }
        }
    }, [contributors])
    return (
        <div style={{ background: "#87a3bb17", minHeight: "100vh" }}>
            <Head>
                <title>Contributors | COPS Hackalog</title>
                <meta name="title" content="Contributors" />
                <meta
                    name="description"
                    content="A list of all the contributors to the front-end and back-end repositories of COPS Hackalog Website."
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
            {error ? (
                <div className="text-center">
                    Unable to fetch data, please try again!
                </div>
            ) : (
                <>
                    {contributors && contributors.length ? (
                        <div className="container py-4">
                            <div className="row no-gutters mt-2">
                                {contributors.map((item) => (
                                    <div
                                        className="col-12 col-md-6 col-lg-3 p-3"
                                        key={item.handle_name}
                                    >
                                        <Card
                                            name={
                                                fullname[0][item.handle_name] ||
                                                item.name
                                            }
                                            image={item.image}
                                            github={item.github}
                                            description={item.description}
                                            handle_name={item.handle_name}
                                        ></Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : contributors ? (
                        <div className="text-center">
                            <Lottie
                                options={defaultLottieOptions}
                                height={300}
                            />
                            <Text
                                tag="h6"
                                textSize="subheader"
                                textColor="003e54bd"
                                fontFamily="madetommy-bold"
                            >
                                No Contributors Right Now
                            </Text>
                        </div>
                    ) : (
                        <div className="text-center">
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
