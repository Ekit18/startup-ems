import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Spinner, Col, Container, Row, Form } from 'react-bootstrap';
import { EmptyStep } from '../../UserCars/AddUserCars/EmptyStep';
import StepItem from '../../UserCars/AddUserCars/StepItem';
import { StepWrapper } from '../../UserCars/AddUserCars/StepWrapper';
import { FormData } from '../Aws'
import { PartData, Static, deleteStatic, getAllBrands, getAllPartsByBrandAndType } from '../../../http/awsApi/awsApi';
import { StaticCard } from '../StaticCard';

interface NameStepProps {
    updateFields: (fields: Partial<FormData>) => void
    selectedBrand: string,
    selectedType: string
}

export const NameStep: React.FC<NameStepProps> = observer(({ updateFields, selectedBrand, selectedType }) => {
    const [staticFiles, setStaticFiles] = useState<Static>({
        partStatic: [],
        guideStatic: []
    });
    const [nameFilter, setNameFilter] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!staticFiles.partStatic.length && !staticFiles.guideStatic.length) {
            getAllPartsByBrandAndType(selectedBrand, selectedType).then((data: Static) => {
                console.log(data)
                setStaticFiles(data);
                setIsLoading(false);
            });
        }
    }, [])

    const handleChangeNameFilter = (e: any) => {
        setNameFilter(e.target.value)
    }

    const handleDeleteClick = (key: string) => {
        deleteStatic(key);
        setStaticFiles(
            (prev) => (
                {
                    guideStatic: prev.guideStatic.filter((statFile) => statFile.key !== key),
                    partStatic: prev.partStatic.filter((statFile) => statFile.key !== key)
                }
            )
        )
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
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="mileage">Enter your part name:</Form.Label>
                            <Form.Control
                                id="nameFilter"
                                type="text"
                                name="nameFilter"
                                value={nameFilter}
                                onChange={handleChangeNameFilter}
                            />
                        </Form.Group>
                    </Row>
                    <Row>
                        {
                            staticFiles.partStatic.filter((partStatic) => partStatic.part.name.includes(nameFilter)).map((partStatic) =>
                                <StaticCard url={partStatic.url} key={partStatic.key} _key={partStatic.key} part={partStatic.part} handleDeleteClick={handleDeleteClick} />
                            )
                        }
                    </Row>
                    <Row>
                        {
                            staticFiles.guideStatic.filter((guideStatic) => guideStatic.part.name.includes(nameFilter)).map((guideStatic) =>
                                <StaticCard url={guideStatic.url} key={guideStatic.key} _key={guideStatic.key} part={guideStatic.part} handleDeleteClick={handleDeleteClick} />
                            )
                        }
                    </Row>
                </Container>

            </StepWrapper>
        </>
    );
});
