import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { RepairHistoryData } from './UserCars'
import { getAllCarHistoryByUserUserCarId } from '../../http/carServiceApi/repairsHistoryApi'
import { EmptyStep } from './AddUserCars/EmptyStep'
import { Container, Row, Col, Button, Accordion } from 'react-bootstrap'

interface RepairsHistoryProps {
    userCarId: number
}

export const RepairsHistory: React.FC<RepairsHistoryProps> = observer(({ userCarId }) => {
    const [carHistory, setCarHistory] = useState<RepairHistoryData[]>([])


    useEffect(() => {
        getAllCarHistoryByUserUserCarId(userCarId).then((data) => setCarHistory(data))
    }, [])


    return (
        <>
            {
                carHistory.length
                    ? carHistory.map((item) => {
                        return (<Container>
                            <Row className="d-flex">
                                <Col md={12} key={item.id} className="border p-4" >
                                    <div>Car service name: {item.name}</div>
                                    <div>Location: {item.location}</div>
                                    <div>Rating: {item.rating}</div>
                                    <div>Operations:</div>
                                    {item.operations.map((item) => {
                                        return (<Col md={12} key={item.id} className="border p-4" >
                                            <div>Name: {item.name}</div>
                                            <div>Symptom: {item.symptom}</div>
                                            <div>Repair: {item.repair}</div>
                                            <div>Price: {item.price}$</div>
                                        </Col>)
                                    })}
                                </Col>
                            </Row>
                        </Container>)
                    })
                    : <EmptyStep />
            }
        </>
    );
})
