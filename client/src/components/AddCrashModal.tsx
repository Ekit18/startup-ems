/* eslint-disable no-extra-parens */
import { observer } from "mobx-react-lite"
import { useEffect, useState } from "react"
import { Modal, Button, Form } from "react-bootstrap"
import { Socket } from "socket.io-client"
import { CarInfo, CrashInfo, CrashModalState } from "./CrashMap"
import { LatLngTuple } from "leaflet"

export interface ModalData {
    description: string,
    userCarId: number,
}
interface CrashModalProps {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<CrashModalState>>,
    onSubmit: (modalData: ModalData) => void,
    userCars: (CrashInfo | CarInfo)[],
}


export const AddCrashModal: React.FC<CrashModalProps> = observer(({ show, setShow, onSubmit, userCars }) => {
    const [modalData, setModalData] = useState<ModalData>({ description: "", userCarId: 0 })
    const handleClose = () => setShow((prevState) => ({ ...prevState, show: false }));
    const handleOpen = () => setShow((prevState) => ({ ...prevState, show: true }));

    const handleInputChange = (event: any) => {
        if (!event.target.value) {
            return;
        }
        const value = event.target.name === "userCarId"
            ? Number(event.target.value)
            : event.target.value;
        const name = event.target.name;
        setModalData((modalData) => ({ ...modalData, [name]: value }))
    };


    const handleSubmit = () => {
        if (!modalData.userCarId) {
            return
        }
        onSubmit(modalData)
        handleClose();
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                    type="text"
                    id="inputDescription"
                    name="description"
                    onChange={(e) => handleInputChange(e)}
                />
                <Form.Text id="passwordHelpBlock" muted>
                    Your description of problem.
                </Form.Text>
                <Form.Select name="userCarId" onChange={(e) => handleInputChange(e)}>
                    <option >Select Your car</option>
                    {userCars.filter((car) => !((car as CrashInfo).location)).map((car) =>
                        <option value={car.userCarId} >{car.userCarId}-{car.brand}-{car.model}-{car.year}-{car.fuelType}-{car.carMileage}</option>
                    )}
                </Form.Select>
                <Form.Text id="passwordHelpBlock" muted>
                    Your broken car.
                </Form.Text>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Undo
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Add crash
                </Button>
            </Modal.Footer>
        </Modal >
    )
})
