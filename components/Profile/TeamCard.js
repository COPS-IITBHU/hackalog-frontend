import { Card } from 'react-bootstrap';
import { Text } from 'atomize';

export default function TeamCard({ team }) {
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
					Ended on {team.hackathon.end.substr(0, 10)}
				</Text>
			</Card.Body>
		</Card>
	);
}
