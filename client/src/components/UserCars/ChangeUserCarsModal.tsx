import { observer } from 'mobx-react-lite'
import React, { useEffect, useState, useContext } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Context } from '../..'

interface ChangeUserCarsModalProps {
  show: boolean
  setShow: React.Dispatch<
    React.SetStateAction<{
      show: boolean
      carId: number
      userId: number
    }>
  >
  userId: number
  carId: number
}

export const ChangeUserCarsModal: React.FC<ChangeUserCarsModalProps> = observer(
  ({ show, setShow, carId, userId }) => {
    const { userCars } = useContext(Context)
    const [mileage, setMileage] = useState<number>(0)
    const handleClose = () => {
      setShow({ show: false, carId: -1, userId: -1 })
    }

    const handleCommit = () => {
      userCars.changeUserCars(userId, carId, mileage)
      handleClose()
    }

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change car mileage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="mileage">Enter new mileage:</Form.Label>
              <Form.Control
                type="number"
                placeholder=""
                onChange={(event) => setMileage(Number(event.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCommit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
)
