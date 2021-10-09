import { useState, useEffect, ReactElement } from "react"
import { Button } from "atomize"
import { Spinner } from "react-bootstrap"
import { useAuth } from "../../context/auth"
import Link from "next/link"
import { HamburgerSpin } from "react-animated-burgers"

export default function Header(): ReactElement {
    const { handleSignIn, handleLogout, token, profile, loading } = useAuth()
    const [menu, setMenu] = useState<boolean>(false)

    useEffect(() => {
        if (profile && location.pathname != `/profile/${profile.username}`) {
            const arr = [
                profile.name,
                profile.username,
                profile.interests,
                profile.bio,
                profile.github_handle,
            ]
            // Check for null fields
            if (!arr.every((elm) => elm !== "" && elm !== null)) {
                window.alert("Complete Your Profile First!")
                window.location.replace(`/profile/${profile.username}`)
            }
        }
    }, [profile])

    return (
        <div
            className="position-fixed w-100 bg-white"
            style={{ zIndex: 10, height: "88px" }}
        >
            <div
                className={`d-flex align-items-center justify-content-between w-100 h-100 p-3`}
            >
                <Link href="/" passHref>
                    <a href="/#" className="text-dark">
                        <div>
                            <span
                                style={{
                                    fontWeight: 700,
                                    fontSize: 28,
                                    fontFamily: "Righteous",
                                }}
                            >
                                COPS
                            </span>
                            <span
                                style={{
                                    fontFamily: "Big Shoulders Display",
                                    fontSize: 28,
                                    marginLeft: 12,
                                    letterSpacing: 5,
                                }}
                            >
                                Hackalog
                            </span>
                        </div>
                    </a>
                </Link>
                <div className="d-block d-md-none">
                    <HamburgerSpin
                        isActive={menu}
                        toggleButton={() => setMenu(!menu)}
                        buttonWidth={23}
                        barColor="#003e54"
                    />
                </div>
                <div
                    className={`position-absolute position-md-static dropdown h-auto h-md-100 ${
                        menu && "visible"
                    }`}
                >
                    <div
                        className={`d-flex flex-column flex-md-row justify-content-center align-items-center`}
                    >
                        <div className="py-2">
                            <Link href="/">
                                <Button
                                    shadow="3"
                                    hoverShadow="4"
                                    m={{ r: { xs: "0rem", md: "1rem" } }}
                                    p="1rem"
                                    onClick={() => setMenu(!menu)}
                                >
                                    Home
                                </Button>
                            </Link>
                        </div>
                        <div className="py-2">
                            <Link href="/hackathons">
                                <Button
                                    shadow="3"
                                    hoverShadow="4"
                                    m={{ r: { xs: "0rem", md: "1rem" } }}
                                    p="1rem"
                                    onClick={() => setMenu(!menu)}
                                >
                                    Hackathons
                                </Button>
                            </Link>
                        </div>
                        {loading ? (
                            <Spinner
                                className="mt-auto mb-auto"
                                animation="border"
                                role="status"
                                size="sm"
                            >
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        ) : (
                            <>
                                {token && profile ? (
                                    <>
                                        <div className="py-2">
                                            <Link
                                                href={`/profile/${profile.username}`}
                                            >
                                                <Button
                                                    shadow="3"
                                                    hoverShadow="4"
                                                    m={{
                                                        r: {
                                                            xs: "0rem",
                                                            md: "1rem",
                                                        },
                                                    }}
                                                    p="1rem"
                                                    onClick={() =>
                                                        setMenu(!menu)
                                                    }
                                                >
                                                    Profile
                                                </Button>
                                            </Link>
                                        </div>
                                        <div className="py-2">
                                            <Button
                                                shadow="3"
                                                hoverShadow="4"
                                                m={{
                                                    r: {
                                                        xs: "0rem",
                                                        md: "1rem",
                                                    },
                                                }}
                                                p="1rem"
                                                onClick={() => {
                                                    handleLogout()
                                                    setMenu(!menu)
                                                }}
                                            >
                                                Logout
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="py-2">
                                        <Button
                                            shadow="3"
                                            hoverShadow="4"
                                            m={{
                                                r: { xs: "0rem", md: "1rem" },
                                            }}
                                            p="1rem"
                                            onClick={() => {
                                                handleSignIn()
                                                setMenu(!menu)
                                            }}
                                        >
                                            Login with Google
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .dropdown {
                    top: -400px;
                    left: 0px;
                    right: 0px;
                    background: white;
                    transition: 0.3s;
                }
                .visible {
                    top: 68px;
                    padding-bottom: 1rem;
                }
                @media (min-width: 768px) {
                    .position-md-static {
                        position: static !important;
                    }
                    .h-md-100 {
                        height: 100% !important;
                    }
                }
            `}</style>
        </div>
    )
}
