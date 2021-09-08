import SingleIconButton from "../Buttons/IconsButton"

export default function Card(props) {
    const { name, image, description } = props
    return (
        <>
            <div className="item-shadow h-100 d-flex flex-column justify-content-between card-lift">
                <div>
                    <div
                        className="img-box"
                        style={{ backgroundImage: `url(${image})` }}
                    ></div>

                    <div className="p-3">
                        <div>
                            <h5 className="text-center h5">{name}</h5>
                        </div>
                        <div>
                            <br></br>
                            <h4>Contributed to:</h4>
                            <a
                                href="https://github.com/COPS-IITBHU/hackalog-frontend"
                                className="text-muted"
                            >
                                {description[0]}
                            </a>
                            <br></br>
                            <a
                                href="https://github.com/COPS-IITBHU/hackalog-backend"
                                className="text-muted"
                            >
                                {description[1]}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-center py-3">
                    <a href={props.github} target="_blank" rel="noreferrer">
                        <SingleIconButton>{props.handle_name}</SingleIconButton>
                    </a>
                </div>
            </div>
            <style jsx>{`
                .img-box {
                    padding-top: 85%;
                    background-size: cover;
                    background-position: center center;
                    border-radius: 5%;
                }
                .card-lift {
                    transform: translateZ(0);
                    backface-visibility: hidden;
                    transition: transform 0.3s;
                }
                .card-lift:hover {
                    transform: scale(1.05);
                }
            `}</style>
        </>
    )
}
