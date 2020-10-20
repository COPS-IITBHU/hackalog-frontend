import Link from 'next/link'

export default function Hackathon() {
    return(
        <div>
            <div className="banner-section">
                <div>

                </div>
            </div>
            <div className="container">
                <div className="d-flex">
                    <Link href="/">
                        <a className="menu-item">Overview</a>
                    </Link>
                    <Link href="/">
                        <a className="menu-item px-3 px-md-5">Participants</a>
                    </Link>
                    <Link href="/">
                        <a className="menu-item">Updates</a>
                    </Link>
                </div>
            </div>
            <div className="bg-grey">
                <div className="container py-3 py-md-5">
                    <div className="row no-gutters">
                        <div className="col-12 col-lg-4 order-1 order-lg-2">
                            <div className="pb-5 pb-lg-0">
                                <div className="bg-white p-3 p-md-4">
                                    <div className="pb-3">Join to receive hackathon updates, find teammates, and submit a project.</div>
                                    <div>
                                        <div className="btn btn-success w-100">Join Hackathon</div>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-8 order-2 order-lg-1">
                            <div>
                                <h1 className="mb-3 mb-lg-5">Hackathon Name - New one </h1>
                                <p className="pt-3">
                                    The contest is based on Machine Learning, AI and Analytics for software development under the Image Recognition theme during 3 days and based on a pre-delivered (by the organization) dataset.
                                </p>
                                <p className="pt-3">
                                    Source code, trained model(s) and executables (if any), and usage instructions, for a system that processes an image dataset (to be revealed at the event start) and outputs a CSV file according to the defined challenge rules and template;
                                </p>
                                <p className="pt-3">
                                    The contest is based on Machine Learning, AI and Analytics for software development under the Image Recognition theme during 3 days and based on a pre-delivered (by the organization) dataset.
                                </p>
                                <p className="pt-3">
                                    Source code, trained model(s) and executables (if any), and usage instructions, for a system that processes an image dataset (to be revealed at the event start) and outputs a CSV file according to the defined challenge rules and template;
                                </p>
                                <p className="pt-3">
                                    The contest is based on Machine Learning, AI and Analytics for software development under the Image Recognition theme during 3 days and based on a pre-delivered (by the organization) dataset.
                                </p>
                                <p className="pt-3">
                                    Source code, trained model(s) and executables (if any), and usage instructions, for a system that processes an image dataset (to be revealed at the event start) and outputs a CSV file according to the defined challenge rules and template;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .banner-section {
                    min-height: 350px;
                    background: linear-gradient(to top left, #2986a5,#0d6697,#00879a,#00776b);
                    background-image: ;

                }
                .menu-item {
                    padding: 1.5rem 0.3rem;
                    color: rgba(0,0,0,0.7);
                }
                .menu-item:hover {
                    color: black;
                }
                .bg-grey {
                    background-color: rgba(0,0,0,0.04);
                }
            `}</style>
        </div>
    )
}