import React from 'react'
import { Button } from "atomize";
import { Spinner } from "react-bootstrap"
import { useAuth } from "../../context/auth";
import Link from 'next/link'
import { HamburgerSpin } from 'react-animated-burgers'

export default function Header() {
    const { handleSignIn, handleLogout, token, profile, loading } = useAuth() 
    const [ menu, setMenu ] = React.useState(false)

    React.useEffect(() => {
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
        <div className="position-fixed w-100 bg-white" style={{ zIndex: "10", height: "88px" }}>
            <div className={`d-flex align-items-center justify-content-between w-100 h-100 p-3`}>
                <Link href="/">
                    <a className="text-dark">
                        <div className="font-weight-bold">
                            COPS <span className="text-monospace">Hackalog</span>
                        </div>
                    </a>
                </Link>
                <div className="d-block d-md-none">
                    <HamburgerSpin isActive={menu} toggleButton={() => setMenu(!menu)} buttonWidth={23} barColor="#003e54" />
                </div>
                <div className={`position-absolute position-md-static dropdown h-auto h-md-100 ${menu && "visible"}`}>
                    <div className={`d-flex flex-column flex-md-row justify-content-center align-items-center`}>
                        <div className="py-2">
                            <Link href="/">
                                <Button shadow="3" hoverShadow="4" m={{ r: { xs: '0rem', md: '1rem' } }} p="1rem">
                                    Home
                                </Button>
                            </Link>
                        </div>
                        <div className="py-2">
                            <Link href="/hackathons">
                                <Button shadow="3" hoverShadow="4" m={{ r: { xs: '0rem', md: '1rem' } }} p="1rem">
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
                                                <Button shadow="3" hoverShadow="4" m={{ r: { xs: '0rem', md: '1rem' } }} p="1rem">
                                                    Profile
                                                </Button>
                                            </Link>
                                        </div>
                                        <div className="py-2">
                                            <Button shadow="3" hoverShadow="4" m={{ r: { xs: '0rem', md: '1rem' } }} p="1rem" onClick={() => handleLogout()}>
                                                Logout
                                            </Button>
                                        </div>
                                    </>
                                    :
                                    <div className="py-2">
                                        <Button shadow="3" hoverShadow="4" m={{ r: { xs: '0rem', md: '1rem' } }} p="1rem" onClick={() => handleSignIn()}>
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