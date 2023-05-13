import { StepWrapper } from './StepWrapper'
import { Col, Container, Form, Row } from 'react-bootstrap'


type MileageStepData = {
    mileage: number
}

type MileageStepProps = MileageStepData & {
    updateFields: (fields: Partial<MileageStepData>) => void,
}

export function MileageStep({
    mileage,
    updateFields,
}: MileageStepProps) {
    const handleInputChange = (mileage: number) => {
        updateFields({ mileage })
    }

    return (
        <StepWrapper title="Select Mileage">
            <Container>
                <Row>
                    <Col md={{ offset: 4, span: "4" }} >
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="mileage">Enter your car mileage:</Form.Label>
                            <Form.Control
                                id="mileage"
                                type="number"
                                name="mileage"
                                value={mileage || ""}
                                onChange={(event) => handleInputChange(Number(event.target.value))}
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Container>

        </StepWrapper>
    )
}

