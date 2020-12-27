import { Container, Row } from 'react-bootstrap';

export const Interests = ({ interests }) => {
	const skills = interests.length
		? interests.split(',').map((skill, id) => {
				return (
					<li key={id} className="list-unstyled d-inline-flex">
						<h5>
							<span
								className="badge badge-info mr-1"
								style={{
									padding: '0.4rem 0.9rem',
								}}
							>
								{skill.trim()}
							</span>{' '}
						</h5>
					</li>
				);
		  })
		: [];
	return (
		<Container style={{ paddingBottom: 40, paddingTop: 20 }}>
			<h3>Interests</h3>
			<hr />
			{!skills.length ? (
				'Add Your Interests to Show Off'
			) : (
				<Row>
					<ul>{skills}</ul>
				</Row>
			)}
		</Container>
	);
};
