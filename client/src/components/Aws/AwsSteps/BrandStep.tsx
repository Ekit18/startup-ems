import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Spinner, Col, Container, Row } from 'react-bootstrap';
import { EmptyStep } from '../../UserCars/AddUserCars/EmptyStep';
import StepItem from '../../UserCars/AddUserCars/StepItem';
import { StepWrapper } from '../../UserCars/AddUserCars/StepWrapper';
import { FormData } from '../Aws'
import { getAllBrands } from '../../../http/awsApi/awsApi';

interface BrandStepProps {
    updateFields: (fields: Partial<FormData>) => void,
}

interface BrandData {
    brand: string
}

export const BrandStep: React.FC<BrandStepProps> = observer(({ updateFields }) => {
    const [brands, setBrands] = useState<BrandData[]>([]);
    const [selectedBrand, setSelectedBrand] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!brands.length) {
            getAllBrands().then((data) => {
                setBrands(data.map((value) => ({ brand: value })));
                setIsLoading(false);
            });
        }
    }, [])

    const handleSelectItem = (itemId: string) => {
        setSelectedBrand(itemId)
        updateFields({ brand: itemId })
    }

    if (isLoading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }
    return (
        <>
            <StepWrapper title="Select Brand">
                <Container>
                    <Row>
                        {
                            brands.length
                                ? brands.map((brand) =>
                                    <Col md={4} key={brand.brand}>
                                        <StepItem itemSelected={selectedBrand} itemId={brand.brand} itemTitle={brand.brand} setItemSelect={handleSelectItem} />
                                    </Col>
                                )
                                : <EmptyStep />


                        }
                    </Row>
                </Container>

            </StepWrapper>
        </>
    );
});
