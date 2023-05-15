import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Spinner, Col, Container, Row } from 'react-bootstrap';
import { EmptyStep } from '../../UserCars/AddUserCars/EmptyStep';
import StepItem from '../../UserCars/AddUserCars/StepItem';
import { StepWrapper } from '../../UserCars/AddUserCars/StepWrapper';
import { FormData } from '../Aws'
import { TypeData, getAllBrands, getAllPartTypes } from '../../../http/awsApi/awsApi';

interface TypeStepProps {
    updateFields: (fields: Partial<FormData>) => void,
    selectedBrand: string
}

export const TypeStep: React.FC<TypeStepProps> = observer(({ updateFields, selectedBrand }) => {
    const [types, setTypes] = useState<TypeData[]>([]);
    const [selectedType, setSelectedType] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!types.length) {
            getAllPartTypes(selectedBrand).then((data) => {
                console.log("HERE!!");
                console.log(data);
                setTypes(data);
                setIsLoading(false);
            });
        }
    }, [])

    const handleSelectItem = (itemId: string) => {
        setSelectedType(itemId)
        updateFields({ type: itemId })
    }

    if (isLoading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }
    return (
        <StepWrapper title="Select Type">
            <Container>
                <Row>
                    {
                        types.length
                            ? types.map((type) =>
                                <Col md={4} key={type.type}>
                                    <StepItem itemSelected={selectedType} itemId={type.type} itemTitle={type.type} setItemSelect={handleSelectItem} />
                                </Col>
                            )
                            : <EmptyStep />
                    }
                </Row>
            </Container>

        </StepWrapper>
    );
});
