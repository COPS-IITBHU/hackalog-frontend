import { Nav, Tab } from 'react-bootstrap';
import HackathonCard from '../HackathonCard/HackathonCard';
import CardColumn from 'react-bootstrap/CardColumns';
import TeamCard from './TeamCard';

export default function ProfileTabs({ teams }) {
	return (
		<Tab.Container defaultActiveKey="myProjects">
			<Nav
				variant="tabs"
				defaultActiveKey="myProjects"
				className="nav-fill"
			>
				<Nav.Item>
					<Nav.Link eventKey="myProjects">
						<h5>Projects</h5>
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="myHackathons">
						<h5>Hackathons</h5>
					</Nav.Link>
				</Nav.Item>
			</Nav>
			<br />
			<Tab.Content>
				<Tab.Pane eventKey="myProjects">
					<div className="container">
						<CardColumn>
							{
								teams.length ?
									teams.map(team => <TeamCard team={team} />)
									: <p>No Teams to Show</p>
							}

						</CardColumn>
					</div>
				</Tab.Pane>
				<Tab.Pane eventKey="myHackathons">
					<div className="row">
						{
							teams.length
								? teams.map(({ hackathon, id }) => (
									<div key={id} className="col-12 col-sm-6">
										<HackathonCard
											hackathon={hackathon}
											key={hackathon.slug}
										></HackathonCard>
									</div>
								))
								: <p>No Participation in Hackathons to Show</p>
						}
					</div>
				</Tab.Pane>
			</Tab.Content>
		</Tab.Container>
	);
}
