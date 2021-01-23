import HackathonCard from "../components/HackathonCard/HackathonCard"
import Sorry from "../components/Sorry/Sorry";
import Header from "../components/Header/Header";
import { Text, Button, Div } from "atomize";
import { Spinner } from "react-bootstrap";
import axiosInstance from "../util/axios";


function useOnScreen(options) {
    const ref = React.useRef();
    const [visible, setVisible] = React.useState(false)

    React.useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setVisible(entry.isIntersecting);
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref.options]);
    return [ref, visible]
}



export default function Home() {
    const [hackathons, setHackathons] = React.useState([])
    const [ref, visible] = useOnScreen({
        rootMargin: '-100px'
    })
    React.useEffect(() => {
        axiosInstance.get('hackathons').then((response) => {
            console.log(response.data);
            setHackathons(response.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    var previousHackathons = false;
    if (hackathons.length) {
        previousHackathons = hackathons.filter((hackathon) => hackathon.status == "Completed").slice(0, 3);
    }

    var currentAndUpcomingHackathons = false;
    if (hackathons.length) {
        currentAndUpcomingHackathons = hackathons.filter(
            (hackathon) => hackathon.status == "Upcoming" || hackathon.status == "Ongoing").slice(0, 3);
    }
    return (
        <div>
            <div className={visible ? "" : "d-none"} ref={ref}>
                {visible ? (<Header />) : ""}
            </div>
            <div style={{
                background: "url(/images/home-jumbo.jpg) no-repeat",
                backgroundSize: "cover",
                backgroundAttachment: "fixed"
            }}>
                <div className="container py-10 text-center">
                    <Text tag="h1" textSize="display2" m={{ b: "1rem" }} fontFamily="madetommy-bold">
                        The home for hackathons organised under COPS IIT(BHU)
                    </Text>
                    <Text tag="h2" textSize="title" textColor="#003e54">
                        Build products, practice skills, learn technologies, win prizes,and connect with people.
                    </Text>
                </div>
            </div>
            <div className="container fluid">
                <div className="py-5">
                    <div className="row no-gutters align-items-stretch justify-content-center">
                        <div className="col-12 py-4">
                            <Text tag="h3" textSize="title" textColor="#003e54" fontFamily="madetommy-bold">
                                Built for you to:
                            </Text>
                        </div>
                        <div className="col-12 col-md-4 p-3">
                            <div className="p-4 bs-light h-100">
                                <div className="icon-container">
                                    <img src="/images/icon1.png" />
                                </div>
                                <h5 className="card-title">Collaborate</h5>
                                <div className="regular-text">
                                    To cooperate with or willingly assist an enemy of one's
                                    country and especially an occupying force
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 p-3">
                            <div className="p-4 bs-light h-100">
                                <div className="icon-container">
                                    <img src="/images/icon2.jpg" />
                                </div>
                                <h5 className="card-title">Learn</h5>
                                <div className="regular-text">
                                    To cooperate with or willingly assist an enemy of one's
                                    country and especially an occupying force
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 p-3">
                            <div className="p-4 bs-light h-100">
                                <div className="icon-container">
                                    <img src="/images/icon3.png" />
                                </div>
                                <h5 className="card-title">Share</h5>
                                <div className="regular-text">
                                    A portion belonging to, due to, or contributed by an
                                    individual or group
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-between align-items-center">
                    <div className="pl-3">
                        <Text tag="h3" textSize="title" textColor="#003e54" fontFamily="madetommy-bold">
                            Ongoing and Upcoming Hackathons:
                        </Text>
                    </div>
                    <div className="pr-3">
                        <Button shadow="3" hoverShadow="4" m={{ r: "1rem" }} p="1rem">
                            See all
                        </Button>
                    </div>
                </div>
                <div className="py-3 py-md-5">
                    {currentAndUpcomingHackathons ?
                        <>
                            {currentAndUpcomingHackathons.length ? (
                                <div className="row no-gutters align-items-stretch justify-content-start">
                                    {currentAndUpcomingHackathons.map((hackathon) => <div key={hackathon.slug} className="col-12 col-md-4 p-3">
                                        <HackathonCard hackathon={hackathon} />
                                    </div>)}
                                </div>
                            ) : (
                                    <div className="row align-items-stretch justify-content-center">
                                        <div className="col-12 col-md-4 p-3">
                                            <Sorry />
                                        </div>
                                    </div>
                                )}
                        </>
                        :
                        <Spinner />
                    }
                </div>
                <div className="row justify-content-between align-items-center">
                    <div className="pl-3">
                        <Text tag="h3" textSize="title" textColor="#003e54" fontFamily="madetommy-bold">
                            Hackathons and Events Archive:
                        </Text>
                    </div>
                    <div className="pr-3">
                        <Button shadow="3" hoverShadow="4" m={{ r: "1rem" }} p="1rem">
                            See all
                        </Button>
                    </div>
                </div>
                <div className="py-3 py-md-5">
                    {!previousHackathons ?
                        <Spinner /> :
                        previousHackathons.length ? (
                            <div className="row no-gutters align-items-stretch justify-content-start">
                                {previousHackathons.map((hackathon) =>
                                    <div key={hackathon.slug} className="col-12 col-md-4 p-3">
                                        <HackathonCard hackathon={hackathon} />
                                    </div>)}
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
            <div className="listhackathon-container py-4"></div>
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
    );
}
