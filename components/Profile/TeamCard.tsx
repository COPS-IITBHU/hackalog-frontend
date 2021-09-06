import { Text, Div, Image } from "atomize"
import Link from "next/link"
import { TeamSerializer } from "@/types/backend"

export default function TeamCard({ team }: { team: TeamSerializer }) {
    const date: Date = new Date(team.hackathon.end)
    const currentDate: Date = new Date()
    return (
        <Link href={`/hackathon/${team.hackathon.slug}/`}>
            <Div bg="white" shadow="4" rounded="xl" m={{ b: "1rem" }}>
                <Div>
                    <Image
                        src={team.hackathon.image}
                        style={{ height: 200 }}
                        rounded={{ t: "xl" }}
                        alt={`${team.hackathon.title} Logo`}
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
                        {(date < currentDate ? "Ended on " : "Ends on ") +
                            date.toDateString()}
                    </Text>
                    <Text textSize="caption" textColor="light">
                        event
                    </Text>
                </Div>
            </Div>
        </Link>
    )
}
