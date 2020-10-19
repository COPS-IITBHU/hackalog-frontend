
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
                style={{ backgroundColor: "#EAEAEA", height: 120 }}>
                <Container>
                    <div className="row pt-3 justify-content-center">
                        <div className="col-auto">
                            <h6 className="text-center">
                                COPS IIT (BHU)
                            </h6>
                            <div className="row">
                                <a className="ml-0">Home</a>
                                <a className="ml-3">Hackathons</a>
                                <a className="ml-3">FAQ</a>
                            </div>
                        </div>
                    </div>
                </Container>
            </footer>
        </div>


    );
}

export default Profile;
