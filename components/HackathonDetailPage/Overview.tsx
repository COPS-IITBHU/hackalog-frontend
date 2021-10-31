import { Text } from "atomize"
import { PropsWithChildren } from "react"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import highlight from "remark-highlight.js"
import codeformatter from "remark-code-frontmatter"
import { HackathonDetailSerializer } from "@/types/backend"

type OverviewPropTypes = PropsWithChildren<{
    hackathon: HackathonDetailSerializer
}>

export function Overview({ hackathon }: OverviewPropTypes) {
    return (
        <div className="overview_body">
            <div className="p-3">
                <Text
                    tag="h1"
                    textSize="display1"
                    m={{ b: "1rem" }}
                    fontFamily="madetommy-bold"
                >
                    {hackathon.title}
                </Text>

                <ReactMarkdown
                    plugins={[gfm, codeformatter, highlight]}
                    className="pb-3 markabcs"
                >
                    {hackathon.description}
                </ReactMarkdown>
                <div className="pb-3">
                    <Text
                        tag="h6"
                        textSize="subheader"
                        fontFamily="madetommy-bold"
                    >
                        START DATE:
                    </Text>
                    {new Date(hackathon.start).toString()}
                </div>
                <div className="pb-3">
                    <Text
                        tag="h6"
                        textSize="subheader"
                        fontFamily="madetommy-bold"
                    >
                        END DATE:
                    </Text>
                    {new Date(hackathon.end).toString()}
                </div>
                {/* <div className="pb-3">
                    <Text
                        tag="h6"
                        textSize="subheader"
                        fontFamily="madetommy-bold"
                    >
                        STATUS:
                    </Text>
                    {hackathon.status}
                </div> */}
                <div className="pb-3">
                    <Text
                        tag="h6"
                        textSize="subheader"
                        fontFamily="madetommy-bold"
                    >
                        MAX TEAM SIZE:
                    </Text>
                    {hackathon.max_team_size}
                </div>
                <div className="pb-3">
                    <Text
                        tag="h6"
                        textSize="subheader"
                        fontFamily="madetommy-bold"
                    >
                        RESULTS DECLARED:
                    </Text>
                    {hackathon.results_declared ? "Yes" : "No"}
                </div>
            </div>
            <style jsx>{`
                .p3 {
                    margin-left: 50px;
                }
                .overview_body {
                    margin-left: 50px;
                }
                .title {
                    font-size: 30px;
                    padding-bottom: 30px;
                    padding-top: 30px;
                }
            `}</style>
        </div>
    )
}
