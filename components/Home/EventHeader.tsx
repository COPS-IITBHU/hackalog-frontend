import { Text, Button } from "atomize"
import Link from "next/link"

export default function EventHeader({headerText}:{headerText:string}){
    return(
        <div
            className="row justify-content-between align-items-center py-2"
            style={{ flexWrap: "nowrap" }}
        >
            <div className="pl-3">
                <Text
                    tag="h3"
                    textSize={{ xs: "subheader", md: "title" }}
                    textColor="#003e54"
                    fontFamily="madetommy-bold"
                >
                    {headerText}
                </Text>
            </div>
            <div className="pr-3">
                <Link href="/hackathons">
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


