import { Button } from "atomize"
import Link from "next/link"
import EventText from "../Headline/EventText"

export default function EventHeader({ headerText }: { headerText: string }) {
    return (
        <div
            className="row justify-content-between align-items-center py-2"
            style={{ flexWrap: "nowrap" }}
        >
            <div className="pl-3">
                <EventText
                    text={headerText}
                    tag="h3"
                    textSizeXs="subheader"
                    textSizeMd="title"
                />
            </div>
            <div className="pr-3">
                <Link href="/hackathons" passHref>
                    <Button
                        shadow="3"
                        hoverShadow="4"
                        hoverBg="black300"
                        m={{ r: "1rem" }}
                        p="1rem"
                        textSize={{ xs: "tiny", md: "body" }}
                    >
                        View More
                    </Button>
                </Link>
            </div>
        </div>
    )
}
