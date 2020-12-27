import React, { useState, useEffect } from "react";
import {
	Spinner, Jumbotron, Row, Col,
	Button, Container, Image
} from "react-bootstrap";
import { FaGithub } from "react-icons/fa";
import axios from "../../util/axios";
import { useAuth } from "../../context/auth";

import Footer from "../../components/Footer/Footer";

import { EditProfile, Interests, ProfileTabs } from '../../components/Profile'

function Profile() {
	const { firebaseUser, token, loading } = useAuth();
	const [userRequest, setUserRequest] = useState({ loading: false });
	const [editDialog, setEdit] = useState({ show: false, closable: true });
	const editProfile = () => setEdit({ show: true, closable: true });
	const handleClose = () => setEdit({ show: false, closable: false });
	useEffect(() => {
		if (token) {
			setUserRequest({ loading: true });
			axios.defaults.headers.common['Authorization'] = `Token ${token}`;
			axios.get(`profile/`).then((res) => {
				setUserRequest({
					loading: false,
					user: res.data,
				});
				const arr = [
					res.data.name,
					res.data.username,
					res.data.interests,
					res.data.bio,
					res.data.github_handle,
				];
				// Check for null fields
				if (!arr.every((elm) => elm !== '' && elm !== null)) {
					setEdit({
						show: true,
						closable: false,
					});
				}
			}, console.error);
		}
	}, [token]);

	const url = (userRequest.user) ? userRequest.user.photoURL : '../images/person.jpeg';
	if (loading || userRequest.loading)
		return (
			<Container className="text-center">
				<Spinner
					style={{
						position: 'absolute',
						top: '50%',
					}}
					className="mt-auto mb-auto"
					animation="border"
					role="status"
				>
					<span className="sr-only">Loading...</span>
				</Spinner>
			</Container>
		);
	else if (!firebaseUser || !userRequest.user) {
		return (
			<Container className="text-center">
				Please Login to View this Page
			</Container>
		);
	}
	return (
		<div>
			{editDialog.show && (
				<EditProfile
					handleClose={handleClose}
					show={editDialog.show}
					closable={editDialog.closable}
					url={url}
					username={userRequest.user.username}
					name={userRequest.user.name}
					handle={userRequest.user.github_handle}
					bio={userRequest.user.bio}
					interest={userRequest.user.interests}
				/>
			)}

			<Jumbotron
				style={{
					background: 'url("images/profile_cover.jpg") no-repeat',
					backgroundSize: 'cover',
				}}
				className="text-white"
			>
				<Container>
					<Row>
						<Col md={4} className="text-center pt-sm-3">
							<Image
								src={url}
								fluid
								style={{
									boxShadow: '1px 1px 40px 1px black',
									border: '2px solid white',
									'border radius': 50,
									width: 200,
									height: 200,
								}}
								roundedCircle
							/>
							<p className="h4 p-sm-3">
								{userRequest.user.username}
							</p>
						</Col>
						<Col md={8}>
							<div
								style={{ height: 20 }}
								className="d-sm-block d-none"
							/>
							<h2 style={{ color: 'white' }}>
								{userRequest.user.name}
							</h2>
							<Row>
								<div className="col-6">
									{'IIT (BHU) Varanasi'}
								</div>
								{userRequest.user.github_handle && (
									<a
										href={`https://github.com/${userRequest.user.github_handle}`}
										className="col-6 text-white text-right"
									>
										<FaGithub />{' '}
										{userRequest.user.github_handle}
									</a>
								)}
							</Row>
							<br />
							<h5 className="text-white">About Me</h5>
							<hr style={{ borderColor: 'white' }} />
							<p className="text-break">{userRequest.user.bio}</p>
							<Button variant="light" onClick={editProfile}>
								Edit Profile
							</Button>
						</Col>
					</Row>
				</Container>
			</Jumbotron>
			<div className="container">
				<Interests interests={userRequest.user.interests} />
				<ProfileTabs teams={userRequest.user.teams} />
			</div>
			<Footer />
		</div>
	);
}



export default Profile;
