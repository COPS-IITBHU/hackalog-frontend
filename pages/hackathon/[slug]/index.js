import Link from 'next/link';
import { useRouter } from "next/router"
import { useEffect, useState } from 'react';
import axios from "../../../util/axios";
import { useAuth } from "../../../context/auth";
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
import { Nav, Tab, Container, Spinner } from 'react-bootstrap'
import { Text } from 'atomize'

export default function Hackathon() {
    const router = useRouter()
    const hackathonId = router.query.slug

    const { firebaseUser, token, loading } = useAuth()
    const [ localLoading, setLocalLoading ] = useState(true)
    const [ hackathon, setHackathon ] = useState([])
    const [ id, setId ] = useState([])
    const [ participants, setParticipants ] = useState([])
    const [ activeTab, setActiveTab ] = useState([])
    const [ allSubmissions, setAllSubmisssions ]  = useState([])

    useEffect(() => {
        if(hackathonId){
            console.log("hackathon id: ", hackathonId)
            //axios.defaults.headers.common['Authorization'] = `Token ${token}`;
            axios.get(`/hackathons/${hackathonId}/`)
                .then((response) => {
                    console.log("hackathon response: ", response.data)
                    let hackathon = response.data
                    if(!hackathon.image) hackathon.image = "/images/home-jumbo.jpg"
                    setHackathon(hackathon)
                    setId(hackathon.id)
                    setLocalLoading(false)
                }).catch((err) => {
                    console.log(err)
                })
            axios.get(`/hackathons/${hackathonId}/teams/`)
                .then((response) => {
                    console.log("teams response: ", response.data)
                    setParticipants(response.data)
                }).catch((err) => {
                    console.log(err)
                    console.log(err.response.data)
                })
            axios.get(`/hackathons/${hackathonId}/submissions/`)
                .then((response) => {
                    console.log("submissions response: ", response.data)
                    setAllSubmisssions(response.data.sort((a,b) => b.score >  a.score? 1: -1).slice (0,10))
                }).catch((err) => {
                    console.log(err)
                    console.log(err.response.data)
                })
        }
    }, [hackathonId, token])

    return(
        <>
            {loading || localLoading ?
                <Container className="text-center">
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
            :
                <div style={{background: "#87a3bb17", minHeight: "100vh"}}>
                    <div className="banner-section" style = {{backgroundImage:`url(${hackathon.image})`}}>
                        <div>
                            
                        </div>
                    </div>
                    <div className="hackathon-nav">
                        <Tab.Container defaultActiveKey="overview">
                            <div className="text-center">
                                <Nav>
                                    <Nav.Item>
                                        <Nav.Link eventKey="overview">Overview</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="participants">Participants</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="updates">Updates</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="leaderboard">Leaderboard</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                            <div className="row no-gutters container-lg mx-auto align-items-start">
                                <div className="col-9 p-2">
                                    <Tab.Content>
                                        <Tab.Pane eventKey="overview" title='Overview'>
                                            <Overview hackathon={hackathon} />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="participants" title='Participants'>
                                            <Participants participants={participants} />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="updates" title='Updates'>
                                            <Overview hackathon={hackathon} />
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="leaderboard" title="Leaderboard">
                                            <Leaderboard submissions={allSubmissions} />
                                        </Tab.Pane>
                                    </Tab.Content>
                                </div>
                                <div className="col-3 p-2">
                                    <div className="">
                                        <div className="pb-5 pb-lg-0">
                                            <div className="bg-grey p-3 p-md-4 rounded" >
                                                <div className="pb-3">Join to receive hackathon updates, find teammates, and submit a project.
                                                </div>
                                                <div>
                                                    <Link href={`/hackathon/${hackathonId}/register`}>
                                                        <a className="btn btn-success w-100">Join Hackathon</a>
                                                    </Link>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tab.Container>
                    </div>
                    <style jsx>{`
                        .banner-section {
                            min-height: 350px;
                            width: 100%;
                            background: linear-gradient(to top left, #2986a5,#0d6697,#00879a,#00776b);
                            background-size: cover;
                            box-shadow: 0px 0px 40px 41px #21212135 inset;
                        }
                        .bg-grey {
                            background-color: rgba(0,0,0,0.04);
                        }
                    `}</style>
                </div>
            }
        </>
    )
}
function Overview( {hackathon} )  {
    return (
        <div className = "overview_body">
            <div className="p-3">
                <Text tag="h1" textSize="display1" m={{ b: "1rem" }} fontFamily="madetommy-bold">
                    {hackathon.title}
                </Text>
                <div className="pb-3">
                    {hackathon.description}
                </div>
                <div className="pb-3">
                    <Text tag="h6" textSize="subheader" fontFamily="madetommy-bold">
                        START DATE:
                    </Text>
                    {(new Date(hackathon.start)).toString()}
                </div>
                <div className="pb-3">
                    <Text tag="h6" textSize="subheader" fontFamily="madetommy-bold">
                        END DATE:
                    </Text>
                    {(new Date(hackathon.end)).toString()} 
                </div>
                <div className="pb-3">
                    <Text tag="h6" textSize="subheader" fontFamily="madetommy-bold">
                        STATUS:
                    </Text>
                    {hackathon.status}
                </div>
                <div className="pb-3">
                    <Text tag="h6" textSize="subheader" fontFamily="madetommy-bold">
                        RESULTS DECLARED:
                    </Text>
                    {hackathon.results_declared ? "Yes" : "No"}
                </div>
                <div className="pb-3">
                    <Text tag="h6" textSize="subheader" fontFamily="madetommy-bold">
                        MAX TEAM SIZE:
                    </Text>
                    {hackathon.max_team_size}
                </div>
            </div>
            <style jsx>{`
                .p3 {
                    margin-left: 50px;
                }
                .overview_body {
                    margin-left: 50px;
                }
                .title {
                    font-size : 30px;
                    padding-bottom : 30px;
                    padding-top: 30px;
                }                        
           `}</style>                
        </div>
    )
}

function Participants({participants}) {
    if(participants){
        return (
            <div>
               {participants.length ?
                    participants.map((team, index) => 
                        team.name.indexOf('Team Ongoing') == -1 ?
                            <div className="bg-grey d-flex align-items-center px-3 rounded" key={index}>
                                <h6>{index}. {team.name}</h6>
                                <style jsx>{`
                                    .bg-grey {
                                        background-color: rgba(0.9,0,0,0.04);
                                        height: 7vh;
                                        margin-bottom: 4px;
                                    }
                                `}</style>
                            </div>
                        :
                        <div></div>
                    )
                :
                <div>Empty</div>
            }
            </div>
        )
    }else{
        return null
    }
}

function Leaderboard({submissions}) {
        return (
        <div>
            <div className="bg-grey heading row no-gutters px-3 px-md-5 align-items-center rounded-top"> 
                <div className="col-2"> <h6>RANK</h6> </div>
                <div className="col-7"> <h6>TEAM NAME</h6> </div>
                <div className="col-3"> <h6>SCORE</h6> </div>
            </div>
        
            {submissions && submissions.map((submission, index) => 
                <div className={`bg-grey row no-gutters px-3 px-md-5 align-items-center ${index === submissions.length-1 && "rounded-bottom"}`} key={index}>
                    <div className="col-2"> {index + 1}.</div>
                    <div className="col-7"> {submission.team} </div>
                    <div className="col-3"> {submission.score} </div>
                </div>
            )}
           <style jsx>{`
                .bg-grey {
                    background-color: rgba(0.9,0,0,0.04);
                    display : flex;
                    height: 7vh;
                    margin-bottom: 4px;
                    color: rgba(0.9,0,0,0.8);
                    padding: 10px;
                }
                .heading {
                    color: black
                }
            `}</style>
        </div>
        )
}

