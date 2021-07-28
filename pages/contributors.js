import axios from "axios"
import React from "react"
import Head from "next/head"
import { useEffect, useState } from "react"
import animationData from "../lottie/sad.json"
import { Text } from "atomize"
import { Spinner } from "react-bootstrap"
import Lottie from "react-lottie"
import Card from "../components/Cards/Card"

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
}

export default function Contributors() {
    const [contriFrontend, setContributorsFront] = useState()
    const [contriBackend, setContributorsBack] = useState()
    const [fullname, setFullName] = useState([{}])
    const [contributors, setContributors] = useState()
    const [error, setError] = useState([false, false, false])

    useEffect(() => {
        axios
            .get(
                "https://api.github.com/repos/COPS-IITBHU/hackalog-frontend/contributors"
            )
            .then((res) => setContributorsFront(res.data))
            .catch((err) => {
                let arr = error
                arr[0] = true
                setError(arr)
            })
        axios
            .get(
                "https://api.github.com/repos/COPS-IITBHU/hackalog-backend/contributors"
            )
            .then((res) => setContributorsBack(res.data))
            .catch((err) => {
                let arr = error
                arr[1] = true
                setError(arr)
            })
    }, [error])
    useEffect(() => {
        if (contriFrontend && contriBackend) {
            let commonF = []
            let commonB = []
            let arr = []
            for (let x of contriFrontend) {
                for (let y of contriBackend) {
                    if (x.login === y.login) commonF.push(x), commonB.push(y)
                }
            }

            for (let x of commonF) {
                arr.push({
                    handle_name: x.login,
                    name: x.login,
                    handle_url: x.url,
                    image: x.avatar_url,
                    github: x.html_url,
                    description: ["hackalog-frontend", "hackalog-backend"],
                })
            }
            for (let x of contriFrontend) {
                if (!commonF.includes(x))
                    arr.push({
                        handle_name: x.login,
                        handle_url: x.url,
                        name: x.login,
                        image: x.avatar_url,
                        github: x.html_url,
                        description: ["hackalog-frontend"],
                    })
            }
            for (let x of contriBackend) {
                if (!commonB.includes(x))
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
            let arr = contributors
            for (let x of arr) {
                let url = x.handle_url
                axios
                    .get(url)
                    .then((res) =>
                        setFullName([
                            ...fullname,
                            (fullname[0][res.data.login] = res.data.name),
                        ])
                    )
                    .catch((e) => console.error(e))
            }
        }
    }, [contributors])

    return (
        <div style={{ background: "#87a3bb17", minHeight: "100vh" }}>
            <Head>
                <title>CONTRIBUTORS | COPS Hackalog</title>
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
            {error[0] ? (
                <div className="text-center">
                    Unable to fetch data, please try again!
                </div>
            ) : (
                <>
                    {contributors && contributors.length ? (
                        <div className="container py-4">
                            <div className="row no-gutters mt-2">
                                {contributors.map((item, index) => (
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
                                        ></Card>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : contributors ? (
                        <div className="text-center">
                            <Lottie options={defaultOptions} height={300} />
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
