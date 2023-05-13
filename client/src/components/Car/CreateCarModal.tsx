import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Modal, Button, Form } from 'react-bootstrap';
import { getAllBrands } from '../../http/carApi/brandApi';
import { BrandData } from '../UserCars/AddUserCars/BrandStep';
import { createCar } from '../../http/carApi/carApi';

interface CreateCarModalProps {
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>,
}


export type CarData = {
    brandId: number;
    model: string;
    fuelType: string;
    bodyType: string;
    year: number;
}


export const CreateCarModal: React.FC<CreateCarModalProps> = observer(({ show, setShow }) => {
    const [brands, setBrands] = useState<BrandData[]>([])
    const [formData, setFormData] = useState<CarData>({
        brandId: 0,
        model: "",
        fuelType: "",
        bodyType: "",
        year: 0,
    })
    const handleClose = () => {
        setShow(false)
    }


    useEffect(() => {
        getAllBrands().then((data) => setBrands(data.sort((a, b) => (a.brand > b.brand
            ? 1
            : -1))))
    }, [])


    const handleFormChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev, [name]: name === 'brandId' || name === "year"
                ? Number(value)
                : value
        }))
    }

    const handleSubmit = () => {
        createCar(formData).then(handleClose)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Car modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="brandId">Enter mileage:</Form.Label>
                        <Form.Select
                            name="brandId"
                            id="brandId"
                            onChange={(event) => handleFormChange(event)}
                            defaultValue={"default"}
                        >
                            <option disabled value={"default"} >Select brand</option>
                            {brands.map((brand) => <option key={brand.id} value={brand.id}>{brand.brand}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="model">Enter model:</Form.Label>
                        <Form.Control
                            type="text"
                            name="model"
                            id="model"
                            value={formData.model}
                            placeholder=""
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFormChange(event)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="fuelType">Enter fuel type:</Form.Label>
                        <Form.Control
                            type="text"
                            name="fuelType"
                            value={formData.fuelType}
                            id="fuelType"
                            placeholder=""
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFormChange(event)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="bodyType">Enter body type:</Form.Label>
                        <Form.Control
                            type="text"
                            name="bodyType"
                            value={formData.bodyType}
                            id="bodyType"
                            placeholder=""
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFormChange(event)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="year">Enter year:</Form.Label>
                        <Form.Control
                            type="number"
                            name="year"
                            value={formData.year || ""}
                            id="year"
                            placeholder=""
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFormChange(event)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
})
