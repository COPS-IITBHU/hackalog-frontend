import Link from "next/link"
import { PropsWithChildren } from "react"
import { Table, Spinner, Image } from "react-bootstrap"
import { Text } from "atomize"
import { SubmissionsSerializer } from "../../types/backend"

type LeaderboardPropTypes = PropsWithChildren<{
    status: string
    submissions: SubmissionsSerializer[]
    loading: boolean
}>

export function Leaderboard({
    status,
    submissions,
    loading,
}: LeaderboardPropTypes) {
    const submissionList = submissions
        .sort((a, b) => b.score - a.score)
        .map((submission, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{submission.teamName} </td>
                <td> {submission.score}</td>
                <td>
                    <Link href={`/submission/${submission.id}`} passHref>
                        <a>{submission.title}</a>
                    </Link>
                </td>
            </tr>
        ))
    return (
        <div>
            <Table responsive>
                <thead
                    style={{
                        backgroundColor: "rgba(0.9,0,0,0.04)",
                    }}
                >
                    <tr>
                        <th>Rank</th>
                        <th>Team Name</th>
                        <th>Score</th>
                        <th>Submission Link</th>
                    </tr>
                </thead>
                <tbody>
                    {status == "Upcoming" ? (
                        <tr>
                            <td colSpan={4} className="px-3">
                                <div
                                    className="row rounded-bottom"
                                    style={{
                                        backgroundColor: "rgba(0.9,0,0,0.04)",
                                    }}
                                >
                                    <div className="col-12 text-center py-3">
                                        <Image
                                            src="/images/rocket.svg"
                                            style={{ height: "80px" }}
                                            alt="Rocket Icon"
                                        />
                                        <p>Let the Hackathon Begin</p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ) : status == "Ongoing" ? (
                        <tr>
                            <td colSpan={4} className="px-3">
                                <div
                                    className="row rounded-bottom"
                                    style={{
                                        backgroundColor: "rgba(0.9,0,0,0.04)",
                                    }}
                                >
                                    <div className="col-12 text-center py-3">
                                        <Image
                                            src="/images/rocket.svg"
                                            style={{ height: "80px" }}
                                            alt="Rocket Icon"
                                        />
                                        <p>
                                            Submissions can only be viewed once
                                            the hackathon has ended!
                                        </p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <>
                            {loading ? (
                                <tr>
                                    <td colSpan={4}>
                                        <Spinner
                                            style={{
                                                position: "absolute",
                                                left: "50%",
                                            }}
                                            animation="border"
                                            role="status"
                                        >
                                            <span className="sr-only">
                                                Loading...
                                            </span>
                                        </Spinner>
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {submissionList.length ? (
                                        <>{submissionList}</>
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-3">
                                                <div
                                                    className="row rounded-bottom"
                                                    style={{
                                                        backgroundColor:
                                                            "rgba(0.9,0,0,0.04)",
                                                    }}
                                                >
                                                    <div className="col-12 text-center py-3">
                                                        <Text textSize="display1">
                                                            <span
                                                                role="img"
                                                                aria-label="sad face"
                                                            >
                                                                😔
                                                            </span>
                                                        </Text>
                                                        <Text>
                                                            No Submissions Found
                                                        </Text>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </tbody>
            </Table>
            <style jsx>{`
                .bg-grey {
                    background-color: rgba(0.9, 0, 0, 0.04);
                    display: flex;
                    height: 7vh;
                    margin-bottom: 4px;
                    color: rgba(0.9, 0, 0, 0.8);
                    padding: 10px;
                }
                .heading {
                    color: black;
                }
            `}</style>
        </div>
    )
}
