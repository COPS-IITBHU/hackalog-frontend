import { Text } from "atomize"
import Link from "next/link"
import { ReactElement } from "react"

export default function Footer(): ReactElement {
    return (
        <div style={{ backgroundColor: "rgb(197 210 213 / 28%)" }}>
            <footer className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-between p-3 py-4">
                    <div>
                        <Text
                            tag="h6"
                            textSize="paragraph"
                            textColor="#003e54c9"
                            fontFamily="madetommy-light"
                        >
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
                        <Text
                            tag="h6"
                            textSize="paragraph"
                            textColor="#003e54c9"
                            fontFamily="madetommy-light"
                        >
                            Hackalog is made with 🍕, ☕ and 💻
                        </Text>
                    </div>
                    <div>
                        <Text
                            tag="h6"
                            textSize="paragraph"
                            textColor="#003e54c9"
                            fontFamily="madetommy-light"
                        >
                            <Link href="/contributors">
                                <a rel="noopener noreferrer">✨ CONTRIBUTORS</a>
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
