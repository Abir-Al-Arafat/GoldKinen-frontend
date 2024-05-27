import Card from "react-bootstrap/Card";
import useComments from "../react-query/hooks/useComments";
import { Comment } from "../react-query/hooks/useComments";
import { useState } from "react";
import { Button, ListGroup } from "react-bootstrap";

interface TimelineCardProps {
  title: string;
  description: string;
  username: string;
  postId: number;
}

function TimelineCard({
  title,
  description,
  username,
  postId,
}: TimelineCardProps) {
  const [showComments, setShowComments] = useState(false);
  const { data: comments, isLoading, error } = useComments(postId);

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };
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

        <Button onClick={handleToggleComments} variant="link">
          {showComments ? "Hide Comments" : "Show Comments"}
        </Button>
        {showComments && (
          <>
            {isLoading ? (
              <p>Loading comments...</p>
            ) : error ? (
              <p>{error.message}</p>
            ) : (
              <ListGroup variant="flush">
                {comments?.map((comment: Comment) => (
                  <ListGroup.Item key={comment.id}>
                    <strong>{comment.name}</strong> <br />
                    {comment.body}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default TimelineCard;
