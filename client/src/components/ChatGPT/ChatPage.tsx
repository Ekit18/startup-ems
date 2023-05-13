import React, { useEffect, useState, useRef, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import io, { Socket } from 'socket.io-client';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { $chatGptHost } from '../../http';
import { getChatGPTCarQuestionResponse } from '../../http/chatGptApi/chatGptApi';
import { Context } from '../..';
import { UserCarData } from '../../store/UserCarsStore';
import { MAIN_ROUTE } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';


export const ChatPage: React.FC = observer(() => {
    const { user, userCars } = useContext(Context)
    const navigate = useNavigate()
    const [currentPrompt, setCurrentPrompt] = useState<string>('');
    const [response, setResponse] = useState<string>('')
    const [selectedCar, setSelectedCar] = useState<UserCarData>({
        bodyType: "",
        brand: "",
        carMileage: 0,
        fuelType: "",
        id: 0,
        model: "",
        userCarId: 0,
        year: 0
    })


    const handleSubmit = (event:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        getChatGPTCarQuestionResponse(currentPrompt, selectedCar.userCarId).then((response) => setResponse(response));
    }
    const handleUserCarClick = (item:UserCarData) => {
        setSelectedCar(item)
    }

    useEffect(() => {
    if (userCars.userCars.length) {
        return;
    }
    userCars.loadUserCars(user.userId)
    }, [])

    return (
        <>
 <Container className="m-5">
 <Button onClick={() => navigate(MAIN_ROUTE)}>Return to main page</Button>

        <h2>Select your car:</h2>

        <Row className="d-flex" style={{ gap: "20px" }}>
           {
           userCars.userCars.length
           ? userCars.userCars.map((item) => (
            <Col md={4} key={item.id} className={
                `border p-4
                ${
                selectedCar === item
                ? 'bg-warning'
                : ''
            }`
            }onClick={() => handleUserCarClick(item)}>
                 <div>Model: {item.model}</div>
              <div>Brand: {item.brand}</div>
              <div>Body type: {item.bodyType}</div>
              <div>Year: {item.year}</div>
              <div>Fuel: {item.fuelType}</div>
              <div>Mileage: {item.carMileage}</div>
            </Col>
          ))
          : <h4>You don't have cars in ownership</h4>
        }
        <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Your prompt</Form.Label>
                    <Form.Control type="text" value={currentPrompt} onChange={(event) => setCurrentPrompt(event.target.value)} />
                </Form.Group>
                <Button type="button" onClick={(event) => handleSubmit(event)}>Submit form</Button>
            </Form>
            <div>{response}</div>
        </Row>
      </Container>
        </>
    )
})
