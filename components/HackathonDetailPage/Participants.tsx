import Link from "next/link"
import { PropsWithChildren, useEffect, useState } from "react"
import { Table, Spinner, Badge } from "react-bootstrap"
import { TeamDetailSerializer } from "@/types/backend"
import axios from "../../util/axios"

type ParticipantsPropTypes = PropsWithChildren<{ slug: string }>

export function Participants({ slug }: ParticipantsPropTypes) {
    const [teams, setTeams] = useState<TeamDetailSerializer[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        setLoading(true)
        if (slug) {
            axios
                .get<TeamDetailSerializer[]>(`/hackathons/${slug}/teams/`)
                .then((response) => {
                    setTeams(response.data)
                })
                .catch(() => {})
                .finally(() => setLoading(false))
        }
    }, [slug])

    return (
        <div>
            {loading ? (
                <div className="text-center">
                    <Table
                        responsive
                        style={{
                            borderCollapse: "separate",
                            borderSpacing: "0px 5px",
                        }}
                    >
                        <thead
                            style={{
                                backgroundColor: "rgba(0.9,0,0,0.04)",
                            }}
                        >
                            <tr>
                                <th>Name</th>
                                <th>Team Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                    </Table>
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div>
                    <Table
                        responsive
                        style={{
                            borderCollapse: "separate",
                            borderSpacing: "0px 5px",
                        }}
                    >
                        <thead
                            style={{
                                backgroundColor: "rgba(0.9,0,0,0.04)",
                            }}
                        >
                            <tr>
                                <th>Name</th>
                                <th>Team Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.map((team) => {
                                var members = []
                                members.push(
                                    <tr
                                        key={team.name + "_" + team.leader.name}
                                        className="bg-grey rounded"
                                    >
                                        <td>
                                            {team.leader.name}{" "}
                                            <Badge variant="info">Leader</Badge>
                                        </td>
                                        <td>{team.name}</td>
                                        <td>
                                            <Link
                                                href={`/profile/${team.leader.username}`}
                                                passHref
                                            >
                                                <a>{team.leader.username}</a>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                                for (var i = 0; i < team.members.length; i++) {
                                    if (
                                        team.members[i].username !=
                                        team.leader.username
                                    ) {
                                        members.push(
                                            <tr
                                                key={
                                                    team.name +
                                                    "_" +
                                                    team.members[i].username
                                                }
                                                className="bg-grey rounded"
                                            >
                                                <td>{team.members[i].name}</td>
                                                <td>{team.name}</td>
                                                <td>
                                                    <Link
                                                        href={`/profile/${team.members[i].username}`}
                                                        passHref
                                                    >
                                                        <a>
                                                            {
                                                                team.members[i]
                                                                    .username
                                                            }
                                                        </a>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    }
                                }
                                return members
                            })}
                        </tbody>
                    </Table>
                    {!teams.length ? (
                        <div className="bg-grey text-center py-3 rounded">
                            No Participants Found
                        </div>
                    ) : null}
                    <style jsx>{`
                        .bg-grey {
                            margin-top: 2px;
                            background-color: rgba(0.9, 0, 0, 0.04);
                            height: 7vh;
                            margin-bottom: 4px;
                        }
                    `}</style>
                </div>
            )}
        </div>
    )
}
