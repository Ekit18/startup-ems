import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { StaticImage, getAllStatic } from '../../http/awsApi/awsApi'
import { Button, Card, Spinner } from 'react-bootstrap'


export const AwsComponent: React.FC = observer(() => {
    const [staticImgs, setStaticImgs] = useState<StaticImage[] | null>(null);
    const [parts, setParts] = useState<Part[] | null>(null);
    useEffect(() => {
        if (!staticImgs) {
            getAllStatic().then((data) => setStaticImgs(data));
        }
        else if (!parts){
            getPartsOfStatic(staticImgs)
        }
    }, [])
    const waitForStaticImgs =
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    return (
        <>
            {!staticImgs ? waitForStaticImgs : staticImgs.guideStatic
        </>);
})

function getStaticImgCard(url, part){
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="holder.js/100px180" />
    <Card.Body>
      <Card.Title>Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
}