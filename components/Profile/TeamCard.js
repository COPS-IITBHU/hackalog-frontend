import { Card } from 'react-bootstrap';
import { Text } from 'atomize';

export function TeamCard({ team }) {
	const date = new Date(team.hackathon.end);
	return (
		<Card className="shadow-sm">
			<Card.Img
				style={{ height: 200 }}
				variant="top"
				src={team.hackathon.image}
			/>
			<Card.Body>
				<Card.Title>
					<h5>{team.name}</h5>
				</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">
					Participated in {team.hackathon.title}
				</Card.Subtitle>
				<Text textSize="subheader" textWeight="500">
					{date < Date.now() ? 'Ended on ' + date.toDateString() : 'Ends on ' + date.toDateString()}
				</Text>
			</Card.Body>
		</Card>
	);
}
