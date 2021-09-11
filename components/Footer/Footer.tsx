import { Text } from "atomize"
import Link from "next/link"
import { ReactElement } from "react"

export default function Footer(): ReactElement {
    const TextProps = {
        tag: "h6",
        textSize: "paragraph",
        textColor: "#003e54c9",
        fontFamily: "madetommy-light",
    }
    return (
        <div style={{ backgroundColor: "rgb(197 210 213 / 28%)" }}>
            <footer className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-between p-3 py-4">
                    <div>
                        <Text {...TextProps}>
                            &copy;{new Date().getFullYear()}
                            {"  "}
                            <a
                                href="https://copsiitbhu.co.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                COPS
                            </a>
                        </Text>
                    </div>
                    <div>
                        <Text {...TextProps}>
                            Hackalog is made with
                            <span
                                role="img"
                                aria-label="pizza"
                                area-hidden="false"
                            >
                                🍕
                            </span>
                            ,{" "}
                            <span
                                role="img"
                                aria-label="coffee"
                                area-hidden="false"
                            >
                                ☕
                            </span>{" "}
                            and
                            <span
                                role="img"
                                aria-label="laptop"
                                area-hidden="false"
                            >
                                💻
                            </span>
                        </Text>
                    </div>
                    <div>
                        <Text {...TextProps}>
                            <Link href="/contributors" passHref>
                                <a href="/#" rel="noopener noreferrer">
                                    <span
                                        role="img"
                                        aria-label="laptop"
                                        area-hidden="false"
                                    >
                                        ✨
                                    </span>{" "}
                                    CONTRIBUTORS
                                </a>
                            </Link>
                        </Text>
                    </div>
                </div>
            </footer>
            <style jsx>{`
                a {
                    color: #003e54c9;
                }
            `}</style>
        </div>
    )
}
