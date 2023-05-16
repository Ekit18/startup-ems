import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { RepairHistoryData } from './UserCars'
import { getAllCarHistoryByUserUserCarId as getAllCarHistoryByUserCarId } from '../../http/carServiceApi/repairsHistoryApi'
import { EmptyStep } from './AddUserCars/EmptyStep'
import { Container, Row, Col, Button, Accordion, Badge } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { USER_SIGNING as USER_REPAIR_SIGNING } from '../../utils/constants'

interface RepairsHistoryProps {
  userCarId: number
}

export const RepairsHistory: React.FC<RepairsHistoryProps> = observer(({ userCarId }) => {
  const [carHistory, setCarHistory] = useState<RepairHistoryData[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    getAllCarHistoryByUserCarId(userCarId).then((data) => setCarHistory(data))
  }, [])

  console.log(carHistory)
  return (
    <>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header >
            <div className="d-flex w-100 justify-content-between">
              Repairs history
              {carHistory.some(({ operations }) => operations.some(({ isSigned }) => !isSigned)) && <Badge pill bg="danger">
                You have unsigned document
              </Badge>}
            </div>
          </Accordion.Header>
          <Accordion.Body>
            {
              carHistory.length
                ? carHistory.map((carService) => {
                  return (<Container key={carService.id}>
                    <Row className="d-flex">
                      <Col md={12} className="border p-4" >
                        <div>Car service name: {carService.name}</div>
                        <div>Location: {carService.location}</div>
                        <div>Rating: {carService.rating}</div>
                        <div>Operations:</div>
                        {carService.operations.map((operation) => {
                          return (<Col md={12} key={operation.id} className={`border p-4 ${!operation.isSigned && "bg-danger text-white"}`} >
                            <div>Name: {operation.name}</div>
                            <div>Symptom: {operation.symptom}</div>
                            <div>Repair: {operation.repair}</div>
                            <div>Price: {operation.price}$</div>
                            {
                            !operation.isSigned &&
                            <Button onClick={() => navigate(`${USER_REPAIR_SIGNING}?carServiceId=${carService.id}&repairHistoryId=${operation.repairsHistoryId}`)}
                            className="mt-3">Move to Signing</Button>
                            }
                          </Col>)
                        })}
                      </Col>
                    </Row>
                  </Container>)
                })
                : <EmptyStep />
            }
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
})
