import { useEffect, useState } from 'react'
import { StepWrapper } from './StepWrapper'
import { StepItem } from './StepItem'
import { Col, Container, Row } from 'react-bootstrap'
import { UserCarData } from '../../../store/UserCarsStore'
import { getAllCarsByBrandAndModelAndYear } from '../../../http/carApi/carApi'


type CarStepData = {
    carId: number
}

type CarStepProps = CarStepData & {
    updateFields: (fields: Partial<CarStepData>) => void,
    brandId: number,
    model: string,
    year: number
}

export function CarStep({
    carId,
    brandId,
    model,
    year,
    updateFields,
}: CarStepProps) {
    const [selectedCar, setSelectedCar] = useState<number>(carId)
    const [cars, setCars] = useState<UserCarData[]>([])


    useEffect(() => {
        getAllCarsByBrandAndModelAndYear(brandId, model, year).then((data) => setCars(data))
    }, [])

    const handleSelectItem = (itemId:number) => {
        setSelectedCar(itemId)
        updateFields({ carId: itemId })
      }


    return (
        <StepWrapper title="Select Car">
            <Container>
                <Row>
                    {
                        cars.map((car) =>
                            <Col md={4} key={car.id}>
                                <StepItem itemId={car.id} itemTitle={`${car.bodyType} ${car.fuelType} ${car.model} ${car.year}`} setItemSelect={handleSelectItem} itemSelected={selectedCar} />
                            </Col>
                        )
                    }
                </Row>
            </Container>

        </StepWrapper>
    )
}

