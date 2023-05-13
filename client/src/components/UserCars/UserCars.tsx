import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../..'
import { Container, Row, Col, Button, Accordion } from 'react-bootstrap'
import { fetchUserCars } from '../../http/carApi/userCarsApi'
import { observer } from 'mobx-react-lite'
import { ChangeUserCarsModal } from './ChangeUserCarsModal'
import { useNavigate } from 'react-router-dom'
import { ADD_USER_CARS_ROUTE } from '../../utils/constants'
import { CarServiceInfo } from '../Map/ServiceMap/ServiceCrashMap'
import { RepairsHistory } from './RepairsHistory'


export interface CarOperationData {
  id: number;
  name: string;
  symptom: string;
  repair: string;
  price: number;
  partId: number;
}

export interface RepairHistoryData extends CarServiceInfo {
  operations: [CarOperationData]
}

export const UserCars: React.FC = observer(() => {
  const { user, userCars } = useContext(Context)
  const navigate = useNavigate()
  const [showChangeModal, setShowChangeModal] = useState({
    show: false,
    carId: -1,
    userId: -1,
  })
  useEffect(() => {
    fetchUserCars(user.userId).then((data) => userCars.setUserCars(data))
  }, [userCars])


  // const getCarHistory = (userCarId: number) => {
  //   getAllCarHistoryByUserUserCarId(userCarId).then((data) => setCarHistory(data))
  // }

  const handleDeleteClick = (carId: number) => {
    userCars.deleteUserCars(user.userId, carId)
  }

  const handleUpdateClick = (carId: number) => {
    setShowChangeModal({ show: true, carId, userId: user.userId })
  }

  const handleAddUserCar = () => {
    navigate(ADD_USER_CARS_ROUTE)
  }

  return (
    <>
      <Container>
        <Button variant="dark" onClick={() => handleAddUserCar()}>Add new user car</Button>
        <h2>User cars:</h2>
        <Row className="d-flex" style={{ gap: "20px" }}>
          {userCars.userCars.map((item) => (
            <Col md={4} key={item.id} className="border p-4" >
              <div>Model: {item.model}</div>
              <div>Brand: {item.brand}</div>
              <div>Body type: {item.bodyType}</div>
              <div>Year: {item.year}</div>
              <div>Fuel: {item.fuelType}</div>
              <div>Mileage: {item.carMileage}</div>
              <Button
                variant="success"
                className="m-3"
                onClick={() => handleUpdateClick(item.id)}
              >
                Update
              </Button>
              <Button
                variant="danger"
                className="m-3"
                onClick={() => handleDeleteClick(item.id)}
              >
                Delete
              </Button>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    Repairs history
                  </Accordion.Header>
                  <Accordion.Body>
                    <RepairsHistory userCarId={item.userCarId} />
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
          ))}
        </Row>
      </Container>
      <ChangeUserCarsModal
        show={showChangeModal.show}
        setShow={setShowChangeModal}
        carId={showChangeModal.carId}
        userId={showChangeModal.userId}
      />
    </>
  )
})
