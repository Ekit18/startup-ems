import { Card, Button } from "react-bootstrap"
import { PartData } from "../../http/awsApi/awsApi"

interface StaticCardProps {
    url: string,
    _key: string,
    part: PartData,
    handleDeleteClick: (key: string) => void
}
export const StaticCard: React.FC<StaticCardProps> = ({ url, _key, part, handleDeleteClick }) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={url} />
            <Card.Body>
                <Card.Title>{part.brand}/{part.type}/{part.name}</Card.Title>
                <Card.Text>
                    ID: {part.id}
                </Card.Text>
                <Button variant="danger" onClick={() => handleDeleteClick(_key)}>
                    Delete static file
                </Button>
            </Card.Body>
        </Card>
    )
}

