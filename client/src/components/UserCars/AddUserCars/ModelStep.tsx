import { useEffect, useState } from 'react'
import { StepWrapper } from './StepWrapper'
import { StepItem } from './StepItem'
import { Col, Container, Row } from 'react-bootstrap'
import { getAllModelsByBrandId } from '../../../http/carApi/carApi'
import { EmptyStep } from './EmptyStep'

export type ModelData = {
    model: string,
}


type ModelStepData = ModelData

type ModelStepProps = ModelStepData & {
    brandId: number,
    updateFields: (fields: Partial<ModelStepData>) => void,
}

export function ModelStep({
    model,
    brandId,
    updateFields,
}: ModelStepProps) {
    const [selectedModel, setSelectedModel] = useState<string>(model)
    const [models, setModels] = useState<ModelData[]>([])


    useEffect(() => {
        getAllModelsByBrandId(brandId).then((data) => setModels(data))
        setSelectedModel(models.find((item) => selectedModel === item.model)?.model || model)
    }, [])

    const handleSelectItem = (itemId: string) => {
        setSelectedModel(itemId)
        updateFields({ model: itemId })
    }


    return (
        <StepWrapper title="Select Model">
            <Container>
                <Row>
                    {
                        models.length
                            ? models.map((model, idx) =>
                                <Col md={4} key={idx}>
                                    <StepItem itemId={model.model} itemTitle={model.model} setItemSelect={handleSelectItem} itemSelected={selectedModel} />
                                </Col>
                            )
                            : <EmptyStep />
                    }
                </Row>
            </Container>

        </StepWrapper>
    )
}
