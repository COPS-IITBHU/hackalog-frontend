import { Text, Div, Image } from "atomize"
import Link from "next/link"

export default function TeamCard({ team }) {
    const date = new Date(team.hackathon.end)
    return (
        <Link href={`/hackathon/${team.hackathon.slug}/`}>
            <Div bg="white" shadow="4" rounded="xl" m={{ b: "1rem" }}>
                <Div>
                    <Image
                        src={team.hackathon.image}
                        style={{ height: 200 }}
                        rounded={{ t: "xl" }}
                        alt= {`${team.hackathon.title} Logo`}
                    />
                </Div>
                <Div p="1.5rem">
                    <Text
                        tag="h4"
                        textSize="subheader"
                        textColor="#003e54"
                        fontFamily="madetommy-bold"
                    >
                        {team.name}
                    </Text>
                    <Text m={{ b: "1rem" }}>
                        Participated in {team.hackathon.title}
                    </Text>
                    <Text textSize="subheader" textWeight="500">
                        {date < Date.now()
                            ? "Ended on " + date.toDateString()
                            : "Ends on " + date.toDateString()}
                    </Text>
                    <Text textSize="caption" textColor="light">
                        event
                    </Text>
                </Div>
            </Div>
        </Link>
    )
}
