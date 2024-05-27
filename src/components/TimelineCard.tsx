import Card from "react-bootstrap/Card";

interface TimelineCardProps {
  title: string;
  description: string;
  username: string;
}

function TimelineCard({ title, description, username }: TimelineCardProps) {
  return (
    <Card style={{ width: "28rem" }}>
      <Card.Body>
        <Card.Title>Title: {title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          By: {username}
        </Card.Subtitle>
        <Card.Text>
          {" "}
          <span className="fw-medium"> Description:</span> {description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default TimelineCard;
