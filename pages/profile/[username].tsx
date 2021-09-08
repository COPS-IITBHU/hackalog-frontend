import { useState, useEffect, lazy, Suspense } from "react"
import { useRouter } from "next/router"
import DefaultErrorPage from "next/error"
import { Spinner, Row, Col, Container, Tab, Nav } from "react-bootstrap"
import { Text, Image, Button, Div } from "atomize"
import { FaGithub } from "react-icons/fa"

import axios from "../../util/axios"
import { AxiosResponse } from "axios"
import { useAuth } from "../../context/auth"
import { Interests } from "../../components/Profile"
import TeamCard from "../../components/Profile/TeamCard"
import HackathonCard from "../../components/HackathonCard/HackathonCard"
import Head from "next/head"

import Lottie from "react-lottie"
import animationData from "../../lottie/sad.json"
import {ProfileSerializer} from "types/backend"
const defaultOptions: {
    loop: boolean
    autoplay: boolean
    animationData: any | null
} = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    // rendererSettings: {
    // 	preserveAspectRatio: 'xMidYMid slice'
    // }
}
export interface Auth {
    token?: string | null
    profile?: any | null
    loading?: boolean
}
export interface RUser {
    loading?: boolean
    user?: any | null
}
export interface Edit {
    (e: any): void
}
export interface EditSet {
    show: boolean
    closable: boolean
}


const EditProfile = lazy(
    () => import("../../components/Profile/EditProfileModal")
)

function Profile(): JSX.Element {
    const router = useRouter()
    const { username } = router.query
    const { token, profile, loading }: Auth = useAuth()

    const [userRequest, setUserRequest] = useState<RUser>({ loading: false })
    const [currentUser, setCurrentUser] = useState<boolean>(false)
    const [editDialog, setEdit] = useState<EditSet>({
        show: false,
        closable: true,
    })

    const editProfile: Edit = (): void =>
        setEdit({ show: true, closable: true })
    const handleClose: Edit = (): void =>
        setEdit({ show: false, closable: false })

    useEffect(() => {
        if (username) {
            setUserRequest({ loading: true })
            axios
                .get<ProfileSerializer[]>(`profile/${username}/`)
                .then((res: AxiosResponse) => {
                    setUserRequest({
                        loading: false,
                        user: res.data,
                    })
                    const arr: ProfileSerializer[] = [
                        res.data.name,
                        res.data.username,
                        res.data.interests,
                        res.data.bio,
                        res.data.github_handle,
                    ]
                    // Check for null fields
                    if (
                        !arr.every((elm:any) => elm !== "" && elm !== null)
                    ) {
                        setEdit({
                            show: true,
                            closable: false,
                        })
                    }
                })
                .catch((err) => {
                    console.error(err)
                    setUserRequest({
                        loading: false,
                        user: "NOT FOUND", //dev things, sorry for the changes
                    })
                })
        }
    }, [username])

    useEffect(() => {
        if (userRequest.user && token && profile) {
            if (profile.username === userRequest.user.username)
                setCurrentUser(true)
        } else {
            setCurrentUser(false)
        }
    }, [profile, token, userRequest.user])

    const url = userRequest.user
        ? userRequest.user.photoURL
            ? userRequest.user.photoURL
            : "../images/person.jpeg"
        : "../images/person.jpeg"
    if (loading || userRequest.loading)
        return (
            <Container className="text-center">
                <Head>
                    {username ? (
                        <title>{username} on COPS Hackalog</title>
                    ) : (
                        <title>Profile Page</title>
                    )}
                </Head>
                <Spinner
                    style={{
                        position: "absolute",
                        top: "50%",
                    }}
                    className="mt-auto mb-auto"
                    animation="border"
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </Container>
        )
    else if (userRequest.user === "NOT FOUND")
        return <DefaultErrorPage statusCode={404} />
    return (
        <div style={{ background: "#87a3bb17" }}>
            <Head>
                {userRequest.user ? (
                    <title>{userRequest.user.name} - on COPS Hackalog</title>
                ) : (
                    <title>{username} on COPS Hackalog</title>
                )}
                <meta
                    name="description"
                    content={
                        userRequest.user
                            ? `${userRequest.user.name}'s Profile on COPS Hackalog, a platform for organising hackathons`
                            : `${username}'s Profile on COPS Hackalog, a platform for organising hackathons`
                    }
                />
            </Head>
            {currentUser && editDialog.show && (
                <Suspense fallback={<h1>Loading...</h1>}>
                    <EditProfile
                        handleClose={handleClose}
                        show={editDialog.show}
                        url={url}
                        closable={editDialog.closable}
                        username={userRequest.user.username}
                        name={userRequest.user.name}
                        handle={userRequest.user.github_handle}
                        bio={userRequest.user.bio}
                        interest={userRequest.user.interests}
                    />
                </Suspense>
            )}
            <Div
                shadow="2"
                p={{ t: "15rem" }}
                className="cover-image-container"
            ></Div>
            {userRequest && userRequest.user && (
                <div className="container-md">
                    <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey="profile"
                    >
                        <div className="row no-gutters py-5">
                            <div className="col-12 col-md-4 sidebar">
                                <div className="text-center">
                                    <Image
                                        src={url}
                                        className="profile-image"
                                        shadow="4"
                                        alt={`${userRequest.user.name}'s Profile Pic`}
                                    />
                                </div>
                                <div className="p-3 p-md-5">
                                    <Text
                                        tag="h3"
                                        textSize="title"
                                        textColor="#003e54"
                                        fontFamily="madetommy-bold"
                                        m={{ b: "0.5rem" }}
                                    >
                                        {userRequest.user.name}
                                    </Text>
                                    <p className="text-muted">
                                        @{userRequest.user.username}
                                    </p>
                                    {userRequest.user.github_handle && (
                                        <a
                                            href={`https://github.com/${userRequest.user.github_handle}`}
                                            target="_blank"
                                            className="d-flex align-items-center text-muted"
                                            rel="noopener noreferrer"
                                        >
                                            <FaGithub className="mr-1" />{" "}
                                            {userRequest.user.github_handle}
                                        </a>
                                    )}
                                    {/* <p className="text-muted"><MdLocationOn /> IIT BHU Varanasi</p> */}
                                    <Nav
                                        variant="pills"
                                        className="flex-column pt-4"
                                    >
                                        <Nav.Item>
                                            <Nav.Link eventKey="profile">
                                                Profile
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="teams">
                                                Teams
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="hackathons">
                                                Hackathons
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </div>
                            </div>
                            <div className="col-12 col-md-8 px-2 px-md-3">
                                <Tab.Content>
                                    <Tab.Pane eventKey="profile">
                                        <div>
                                            {currentUser && (
                                                <Button
                                                    shadow="3"
                                                    hoverShadow="4"
                                                    m={{ r: "1rem", b: "2rem" }}
                                                    p="1rem"
                                                    onClick={editProfile}
                                                >
                                                    Edit Profile
                                                </Button>
                                            )}
                                            <div>
                                                <Text
                                                    tag="h4"
                                                    textSize="title"
                                                    textColor="#003e54"
                                                    fontFamily="madetommy-bold"
                                                >
                                                    Email
                                                </Text>
                                                <Text
                                                    tag="p"
                                                    textSize="paragraph"
                                                    textColor="#003e54"
                                                >
                                                    {userRequest.user.email}
                                                </Text>
                                            </div>
                                            <br />
                                            <div>
                                                <Text
                                                    tag="h4"
                                                    textSize="title"
                                                    textColor="#003e54"
                                                    fontFamily="madetommy-bold"
                                                >
                                                    About Me
                                                </Text>
                                                <Text
                                                    tag="p"
                                                    textSize="paragraph"
                                                    textColor="#003e54"
                                                >
                                                    {userRequest.user.bio}
                                                </Text>
                                            </div>
                                            <br />
                                            <Interests
                                                interests={
                                                    userRequest.user.interests
                                                }
                                            />
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="teams">
                                        <div>
                                            <Row>
                                                {userRequest.user.teams &&
                                                userRequest.user.teams
                                                    .length ? (
                                                    userRequest.user.teams.map(
                                                        (team) => (
                                                            <Col
                                                                className="pb-3"
                                                                sm={6}
                                                                key={team.id}
                                                            >
                                                                <TeamCard
                                                                    team={team}
                                                                />
                                                            </Col>
                                                        )
                                                    )
                                                ) : (
                                                    <div className="col-12 text-center text-muted">
                                                        <Lottie
                                                            options={
                                                                defaultOptions
                                                            }
                                                            height={300}
                                                        />
                                                        <Text
                                                            tag="h6"
                                                            textSize="subheader"
                                                            textColor="003e54bd"
                                                            fontFamily="madetommy-bold"
                                                        >
                                                            No Projects to Show
                                                        </Text>
                                                    </div>
                                                )}
                                            </Row>
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="hackathons">
                                        <div>
                                            <Row>
                                                {userRequest.user.teams &&
                                                userRequest.user.teams
                                                    .length ? (
                                                    userRequest.user.teams.map(
                                                        ({ hackathon, id }) => (
                                                            <Col
                                                                sm={6}
                                                                className="pb-3"
                                                                key={
                                                                    hackathon.slug +
                                                                    "-" +
                                                                    id
                                                                }
                                                            >
                                                                <HackathonCard
                                                                    hackathon={
                                                                        hackathon
                                                                    }
                                                                ></HackathonCard>
                                                            </Col>
                                                        )
                                                    )
                                                ) : (
                                                    <div className="col-12 text-center text-muted">
                                                        <Lottie
                                                            options={
                                                                defaultOptions
                                                            }
                                                            height={300}
                                                        />
                                                        <Text
                                                            tag="h6"
                                                            textSize="subheader"
                                                            textColor="#003e54bd"
                                                            fontFamily="madetommy-bold"
                                                        >
                                                            No Participation in
                                                            Hackathons to Show
                                                        </Text>
                                                    </div>
                                                )}
                                            </Row>
                                        </div>
                                    </Tab.Pane>
                                </Tab.Content>
                            </div>
                        </div>
                    </Tab.Container>
                </div>
            )}
            <style>{`
				.cover-image-container {
					background-image: url("/backgrounds/bg2.jpg");
					background-size: cover;
					background-position: center;
				}
				@media(min-width: 772px){
					.sidebar {
						position: relative;
						top: -100px;
					}
				}
				.profile-image {
					width: 80%;
					max-width: 200px;
					border-radius: 50%;
				}
				.nav-link {
					color: grey !important;
					transition: 0.3s;
				}
				.nav-pills .nav-link.active, .nav-pills .show>.nav-link{
					background: white;
					border-radius: 10px;
					color: #003e54 !important;
					font-size: 1rem;
					padding: 1rem 1rem;
					//font-family: madetommy-bold;
				}
				// a {
				// 	color: #003e54;
				// }
			`}</style>
        </div>
    )
}

export default Profile
