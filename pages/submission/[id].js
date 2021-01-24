import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import DefaultErrorPage from "next/error";
import { Spinner, Row, Container, Table } from "react-bootstrap";
import { Text, Button, Div, Image } from "atomize";
import axios from "../../util/axios";
import { useAuth } from "../../context/auth";
import { Jumbotron } from "react-bootstrap";
import Head from 'next/head';


export default function SubmissionDetail() {
	/*
	  Initially status = 190 => loading
	  if status = 200, show page
	  else some error occurred
	*/

	const router = useRouter();
	const { id } = router.query;
	const { token } = useAuth();
	const [submission, setSubmission] = useState({});
	const [team, setteam] = useState();
	const [status, setStatus] = useState(190);
	const [teamStat, setTeamStat] = useState(190);

	useEffect(() => {
		if (id) {
			if (token)
				axios.defaults.headers.common["Authorization"] = `Token ${token}`;
			axios
				.get(`/submissions/${id}/`)
				.then((response) => {
					let sub = response.data;
					if (!sub.hackathon.image)
						sub.hackathon.image = "/images/home-jumbo.jpg";
					setSubmission(sub);
					setStatus(200);
				})
				.catch((err) => {
					console.error(err);
					setStatus(err.response.status);
				});
		}
	}, [id, token]);

	useEffect(() => {
		if (JSON.stringify(submission) !== "{}") {
			axios
				.get(`/teams/${submission.team.team_id}/`)
				.then((response) => {
					setteam(response.data);
				})
				.catch((err) => {
					setTeamStat(err.response.status);
					console.error(err);
				});
		}
	}, [submission]);

	if (!Number(id) || status == 404)
		return (
			<div className="text-center pt-3 mb-2">
				<Image src={'/images/404.svg'} className="mb-3" maxH={{ xs: '40vw', sm: '25vh' }} />
				<Text textSize="title" >
					Error 404: Submission Not Found
		   		</Text>
			</div>
		);
	if (status == 190)
		return (
			<Container className="text-center">
				<Head>
					<title>Submission Details</title>
				</Head>
				<Spinner
					style={{
						position: "absolute",
						top: "50%",
					}}
					className="mt-auto mb-auto"
					animation="border"
					role="status"
				>
					<span className="sr-only">Loading...</span>
				</Spinner>
			</Container>
		);
	if (status == 200)
		return (
			<div style={{ background: "#87a3bb17", minHeight: "100vh" }}>
				<Head>
					{team
						? <title>Team {team.name}'s Submission</title>
						: <title>Submission Details</title>
					}
				</Head>
				<Jumbotron
					fluid
					style={{
						backgroundImage: `url(${submission.hackathon.image})`,
						minHeight: "20em",
					}}
				/>
				<Text className="text-center mb-3" tag="h1" textSize="display1">
					{submission.hackathon.title} Submissions
        		</Text>
				<Container>
					<Text textSize="title">Team {submission.team.name}'s Submission</Text>
					<hr />
					<Text textSize="subheader">
						<u>Description</u>
					</Text>
					<Text textSize="paragraph">{submission.description}</Text>
					<Row className="justify-content-around mt-3">
						<Div shadow="4" className="col-sm-5" rounded="md" m={{ b: "1rem" }}>
							<Container>
								<Text
									textWeight="600"
									className="text-center mb-2"
									textSize="subheader"
									textDecor="underline"
								>
									Team Members
                				</Text>
								{teamStat !== 190 ? (
									<div className="text-center pt-3 mb-2">
										<Text textSize="display1">😟</Text>
										<Text textWeight="600" textColor="red">
											Unable to Fetch Team Details
               						    </Text>
									</div>
								) : team ? (
									<>
										<Table hover size="sm" className="mb-3 pb-3">
											<tbody>
												<tr>
													<td>{team.leader.name}</td>
													<td>
														<a href={`/profile/${team.leader.username}`}>
															@{team.leader.username}
														</a>
													</td>
													<td>Leader</td>
												</tr>
												{team.members.map((elm) => {
													if (team.leader !== elm)
														<tr key={elm.username}>
															<td>{elm.name}</td>
															<td>
																<a href={`/profile/${elm.username}`}>
																	@{elm.username}
																</a>
															</td>
															<td>Member</td>
														</tr>;
												})}
											</tbody>
										</Table>
										{submission.score ? (
											<Text
												textSize="title"
												className="text-center pb-2"
												textColor="success900"
											>
												Scored: {submission.score}/100
											</Text>
										) : (
												<Text
													textSize="title"
													className="text-center pb-2"
													textColor="blue"
												>
													Scores Awaited
												</Text>
											)}
									</>
								) : (
											<Container className="text-center">
												<Spinner
													style={{
														position: "absolute",
														top: "50%",
													}}
													className="mt-auto mb-auto"
													animation="border"
													role="status"
												>
													<span className="sr-only">Loading...</span>
												</Spinner>
											</Container>
										)}
							</Container>
						</Div>

						<Div shadow="4" className="col-sm-5" rounded="md" m={{ b: "1rem" }}>
							<Container className="text-center">
								<Text
									textWeight="600"
									className="text-center mb-2"
									textSize="subheader"
									textDecor="underline"
								>
									Hackathon Details
            				    </Text>
								<Table hover size="sm" className="mb-3 pb-3">
									<tbody>
										<tr>
											<td>Title</td>
											<td>{submission.hackathon.title}</td>
										</tr>
										<tr>
											<td>Tagline</td>
											<td>{submission.hackathon.tagline}</td>
										</tr>
										<tr>
											<td>Start Date</td>
											<td>{submission.hackathon.start}</td>
										</tr>
										<tr>
											<td>End Date</td>
											<td>{submission.hackathon.end}</td>
										</tr>
										<tr>
											<td>Status</td>
											<td
												className={
													submission.hackathon.status == "Completed"
														? "text-success"
														: "text-warning"
												}
											>
												{submission.hackathon.status}
											</td>
										</tr>
									</tbody>
								</Table>
							</Container>
						</Div>
					</Row>
					<a href={`/hackathon/${submission.hackathon.id}`}>
						<Button className="mb-3" bg="purple">
							View Other Submissions
            			</Button>
					</a>
				</Container>
			</div>
		);
	else return (
		<>
			<Head>
				<title>Submission Details</title>
			</Head>
			<div>Some Error Occurred</div>
		</>);
}
