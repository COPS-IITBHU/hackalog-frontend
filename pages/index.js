export default function Home() {
  return (
    <div>
      <div className="py-5">

      </div>
      <div>
        <div className="container">
          <div className="py-1 py-md-5 text-center">
            <h3>
              "That sometimes it is the very people no one images anything of, who do things no one can imagine." - Alan Turing
            </h3>
          </div>
          <div className="py-3 py-md-5">
            <div className="row no-gutters align-items-stretch justify-content-center">
              <div className="col-12 col-md-4 p-3">
                <div className="p-4 bs-light h-100">
                  <div className="icon-container">
                    <img src="/images/icon1.png" />
                  </div>
                  <h5>Collaborate</h5>
                  <div>
                    To cooperate with or willingly assist an enemy of one's country and especially an occupying force
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 p-3">
                <div className="p-4 bs-light h-100">
                  <div className="icon-container">
                    <img src="/images/icon2.jpg" />
                  </div>
                  <h5>Learn</h5>
                  <div>
                    To cooperate with or willingly assist an enemy of one's country and especially an occupying force
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-4 p-3">
                <div className="p-4 bs-light h-100">
                  <div className="icon-container">
                    <img src="/images/icon3.png" />
                  </div>
                  <h5>Share</h5>
                  <div>
                    A portion belonging to, due to, or contributed by an individual or group
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="listhackathon-container py-4">

      </div>
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
          background: linear-gradient(to top left, #2986a5,#0d6697,#00879a,#00776b);
        }
      `}</style>
    </div>
  )
}