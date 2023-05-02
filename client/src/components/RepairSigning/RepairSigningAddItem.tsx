import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import io, { Socket } from 'socket.io-client';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { CarOperationItem } from '../../pages/RepairSigning';
import { getAllCarOperations } from '../../http/carServiceApi/carOperationsApi';

interface RepairSigningAddItemProps {
    handleInputChange: (event: any) => void
    isSigning: boolean
}

export const RepairSigningAddItem: React.FC<RepairSigningAddItemProps> = observer(({ handleInputChange, isSigning }) => {
    const [carOperations, setCarOperations] = useState<CarOperationItem[]>([])
    useEffect(() => {
        getAllCarOperations().then((data) => setCarOperations(data))
    }, [])


    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(Number(event.target.value))
        if (!Number(event.target.value)) {
            return
        }
        handleInputChange(carOperations.find((carOperation) => carOperation.id === Number(event.target.value)));
    }

    return (
        <>
            <Container>
                <Row>
                    <Col md={12} className="d-flex justify-content-between">
                        <Form>
                            <Form.Select disabled={isSigning} aria-label="Default select example" onChange={(event) => handleSelectChange(event)}>
                                <option>Select car operation</option>
                                {carOperations.map((carOperation) => <option key={carOperation.id} value={carOperation.id}>{carOperation.name} {carOperation.price}</option>)}
                            </Form.Select>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </>
    );
})
