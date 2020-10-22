import HackathonCard from "../components/HackathonCard/HackathonCard";
import { Jumbotron, Container, Row, Col, Card } from "react-bootstrap";
import Sorry from "../components/Sorry/Sorry";
import Header from "../components/Header/Header";
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
      if(ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref.options]);
  return [ref, visible]
}



export default function Home() {
  const [ref, visible] = useOnScreen({
    rootMargin : '-100px'
  })
  const hackathons = [
    {
      title: "Hackathon-1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliquI",
      start: "2020-11-09",
      end: "2020-11-10",
      image: "https://miro.medium.com/max/1924/1*OengjbOmGldeir-D6k1sYA.png",
      link: "#",
      slug: "slug-1",
    },
    {
      title: "Hackathon-2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliquI",
      start: "2020-11-09",
      end: "2020-11-10",
      image: "https://miro.medium.com/max/1924/1*OengjbOmGldeir-D6k1sYA.png",
      link: "#",
      slug: "slug-2",
    },
    {
      title: "Hackathon-3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliquI",
      start: "2020-11-09",
      end: "2020-11-10",
      image: "https://miro.medium.com/max/1924/1*OengjbOmGldeir-D6k1sYA.png",
      link: "#",
      slug: "slug-3",
    },
  ];
  const previousHackathons = [];
  return (
    <div>
      <div class={visible? "": "d-none"} ref = {ref}>
        {visible?(<Header/>):""}
      </div>
      <Jumbotron
        
        style={{
          background: "url(/images/home-jumbo.jpg) no-repeat",
          backgroundSize: "cover",
          height: "100vh",
          display: "flex",
          flex: "flex-wrap",
        }}
      >
        <Container>
          <Row className="d-flex align-items-center">
            <Col sm={12} md={10} className="mb-3 mt-5">
              <h2 className="jumbotron-heading">
                The home for hackathons organised under COPS IIT(BHU)
              </h2>
            </Col>
            <Col
              sm={12}
              md={10}
              className="jumbotron-sub-heading d-none d-sm-flex"
            >
              Build products, practice skills, learn technologies, win prizes,
              and connect with people.
            </Col>
          </Row>
        </Container>
      </Jumbotron>
      <div className="container fluid">
        <div className="py-3">
          <div className="row no-gutters align-items-stretch justify-content-center">
            <div className="col-12 pl-2">
              <h3 className="jumbotron-heading">
                <u>Built for you to:</u>
              </h3>
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
        <hr className="regular-text" />
        <div className="row justify-content-between">
          <div className="ml-2">
            <h3 className="jumbotron-heading">
              <u>Upcoming events and hackathons:</u>
            </h3>
          </div>
          <div className="mr-2">
            {hackathons.length ? (
              <button
                className="btn"
                style={{ backgroundColor: "#003e54", cursor: "pointer" }}
              >
                <a href="" style={{ color: "white" }}>
                  See all
                </a>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="py-3 py-md-5">
          {hackathons.length ? (
            <div className="row no-gutters align-items-stretch justify-content-center">
              {hackathons.map((hackathon) => {
                return (
                  <div className="col-12 col-md-4 p-3">
                    <HackathonCard
                      hackathon={hackathon}
                      key={hackathon.slug}
                    ></HackathonCard>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="row align-items-stretch justify-content-center">
              <div className="col-12 col-md-4 p-3">
                <Sorry />
              </div>
            </div>
          )}
        </div>
        <hr className="regular-text" />
        <div className="row justify-content-between">
          <div className="ml-2">
            <h3 className="jumbotron-heading">
              <u>Hackathons and events archive:</u>
            </h3>
          </div>
          <div className="mr-2">
            {hackathons.length ? (
              <button
                className="btn"
                style={{ backgroundColor: "#003e54", cursor: "pointer" }}
              >
                <a href="" style={{ color: "white" }}>
                  See all
                </a>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="py-3 py-md-5">
          {previousHackathons.length ? (
            <div className="row no-gutters align-items-stretch justify-content-center">
              {previousHackathons.map((hackathon) => {
                return (
                  <div className="col-12 col-md-4 p-3">
                    <HackathonCard
                      hackathon={hackathon}
                      key={hackathon.slug}
                    ></HackathonCard>
                  </div>
                );
              })}
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
