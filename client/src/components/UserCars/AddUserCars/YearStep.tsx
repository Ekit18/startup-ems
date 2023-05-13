import { useEffect, useState } from 'react'
import { StepWrapper } from './StepWrapper'
import { StepItem } from './StepItem'
import { Col, Container, Row } from 'react-bootstrap'
import { getAllYearsByBrandIdAndModel } from '../../../http/carApi/carApi'
import { EmptyStep } from './EmptyStep'

export type YearData = {
    year: number
}


type YearStepData = YearData

type YearStepProps = YearStepData & {
    updateFields: (fields: Partial<YearStepData>) => void,
    brandId: number,
    model: string,
}

export function YearStep({
    year,
    brandId,
    model,
    updateFields,
}: YearStepProps) {
    const [selectedYear, setSelectedYear] = useState<number>(year)
    const [years, setYears] = useState<YearData[]>([])


    useEffect(() => {
        getAllYearsByBrandIdAndModel(brandId, model).then((data) => setYears(data))
    }, [])


    const handleSelectItem = (itemId: number) => {
        setSelectedYear(itemId)
        updateFields({ year: itemId })
    }


    return (
        <StepWrapper title="Select Year">
            <Container>
                <Row>
                    {
                        years.length
                            ? years.map((year) =>
                                <Col md={4} key={year.year}>
                                    <StepItem itemId={year.year} itemTitle={String(year.year)} setItemSelect={handleSelectItem} itemSelected={selectedYear} />
                                </Col>
                            )
                            : <EmptyStep />
                    }
                </Row>
            </Container>

        </StepWrapper>
    )
}
