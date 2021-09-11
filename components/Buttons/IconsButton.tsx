import { FiGithub } from "react-icons/fi"

export default function SingleIconButton(props: { children: string }) {
    return (
        <>
            <button className="btn btn-round">
                <div className="d-flex align-items-center">
                    <div className="text-content">{props.children}</div>
                    <div className="arrow pl-2">
                        <FiGithub className="pl-1" color="white" size="17" />
                    </div>
                </div>
            </button>
            <style jsx>{`
                .text-content {
                    position: relative;
                    left: 15px;
                    transition: 0.3s;
                }
                .arrow {
                    transform: scale(0);
                    transition: 0.3s;
                    overflow: hidden;
                }
                .btn:hover .arrow {
                    transform: scale(1.2);
                }
                .btn:hover .text-content {
                    left: 5px;
                }
                .btn-round {
                    padding: 0.63rem 1.7rem;
                    background: linear-gradient(to right, #0c253a, #0c363a);
                    border: none;
                    border-radius: 100px;
                    color: white;
                    font-size: 0.8rem;
                }
                .btn-round:hover {
                    color: white;
                }
            `}</style>
        </>
    )
}
