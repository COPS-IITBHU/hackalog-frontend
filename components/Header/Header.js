import { Button } from "atomize";
import { Spinner } from "react-bootstrap"
import { useAuth } from "../../context/auth";
import Link from 'next/link'
import { useEffect } from 'react'


export default function Header() {
    const { handleSignIn, handleLogout, token, profile, loading } = useAuth()

    useEffect(() => {
        if (profile && location.pathname != `/profile/${profile.username}`) {
            const arr = [
                profile.name,
                profile.username,
                profile.interests,
                profile.bio,
                profile.github_handle,
            ];
            // Check for null fields
            if (!arr.every((elm) => elm !== "" && elm !== null)) {
                window.alert('Complete Your Profile First!')
                window.location.replace(`/profile/${profile.username}`)
            }
        }
    }, [profile])

    return (
        <div className="position-fixed w-100 bg-white" style={{ zIndex: "10" }}>
            <div className="d-flex align-items-center justify-content-between w-100 p-3">
                <Link href="/">
                    <a className="text-dark">
                        <div className="font-weight-bold">
                            COPS <span className="text-monospace">Hackalog</span>
                        </div>
                    </a>
                </Link>
                <div>
                    <div className="d-flex align-items-center">
                        <div className="py-2">
                            <Link href="/">
                                <Button shadow="3" hoverShadow="4" m={{ r: "1rem" }} p="1rem">
                                    Home
                                </Button>
                            </Link>
                        </div>
                        <div className="py-2">
                            <Link href="/hackathons">
                                <Button shadow="3" hoverShadow="4" m={{ r: "1rem" }} p="1rem">
                                    Hackathons
                                </Button>
                            </Link>
                        </div>
                        {loading ?
                            <Spinner
                                className="mt-auto mb-auto"
                                animation="border"
                                role="status"
                                size="sm"
                            >
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                            :
                            <>
                                {token && profile ?
                                    <>
                                        <div className="py-2">
                                            <Link href={`/profile/${profile.username}`}>
                                                <Button shadow="3" hoverShadow="4" m={{ r: "1rem" }} p="1rem">
                                                    Profile
                                                </Button>
                                            </Link>
                                        </div>
                                        <div className="py-2">
                                            <Button shadow="3" hoverShadow="4" m={{ r: "1rem" }} p="1rem" onClick={() => handleLogout()}>
                                                Logout
                                            </Button>
                                        </div>
                                    </>
                                    :
                                    <div className="py-2">
                                        <Button shadow="3" hoverShadow="4" m={{ r: "1rem" }} p="1rem" onClick={() => handleSignIn()}>
                                            Login with Google
                                        </Button>
                                    </div>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
            <style jsx>{`

            `}</style>
        </div>
    )
}