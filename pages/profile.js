
import ProfileJumbotron from '../components/Profile/Jumbotron'
import Interests from '../components/Profile/Interests';
import Footer from '../components/Footer/Footer';
import { Nav, Container, Tabs, Tab, Col, Card, Row, ListGroupItem, Image, CardDeck, CardGroup } from 'react-bootstrap';
import CardColumn from 'react-bootstrap/CardColumns'
import ProjectCard from '../components/Profile/ProjectCard'
import ProfileTabs from '../components/Profile/ProfileTabs'
const Profile = () => {
    return (
        <div>
            <ProfileJumbotron />
            <div className="container">
                <Interests />
                <ProfileTabs />
            </div>
            {/* FOOTER TO BE INSERTED HERE */}
            <footer
                className="footer"
                style={{ backgroundColor: "#EAEAEA", height: 150 }}>
                <div className="container">
                    <div className="row pt-3 justify-content-center">
                        <div className="col-auto">
                            <h6>
                                <img
                                    src="images/cops_logo.png"
                                    width={50}
                                    height={50}
                                    className="rounded-circle"
                                />{" "}
                        COPS IIT (BHU)
                        </h6>
                            <div className="row">
                                <a className="ml-0">Home</a>
                                <a className="ml-3">Hackathons</a>
                                <a className="ml-3">FAQ</a>
                            </div>
                        </div>

                    </div>
                </div>
            </footer>
        </div>


    );
}

export default Profile;
/*

<div className="col-xl-5 col-lg-4 col-md-6 mb-4">
                                        <div className="bg-white rounded shadow-sm">
                                            <img
                                                src="https://www.ipfcc.org/images/rainbow-bulb-bgBlue.png"

                                                className="card-img-top "
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">Project Name</h5>
                                                <p className="card-text small">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                                    sed do eiusmod tempor incididunt ut labore et dolore
                                                    magna aliqua.
                      </p>
                                                <p className="font-weight-bold">Team</p>
                                                <div className="d-flex row align-items-center justify-content-between rounded-pill bg-light mx-1 px-3 py-2 mt-4">
                                                    <img
                                                        src="images/profilepic.jpg"
                                                        width={25}
                                                        height={25}
                                                        className="rounded-circle"
                                                    />
                                                    <img
                                                        src="images/profilepic.jpg"
                                                        width={25}
                                                        height={25}
                                                        className="rounded-circle"
                                                    />
                                                    <img
                                                        src="images/profilepic.jpg"
                                                        width={25}
                                                        height={25}
                                                        className="rounded-circle"
                                                    />
                                                    <img
                                                        src="images/profilepic.jpg"
                                                        width={25}
                                                        height={25}
                                                        className="rounded-circle"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <p />
                                    </div>

*/