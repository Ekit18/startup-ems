import { useEffect, useState } from 'react'
import { StepWrapper } from './StepWrapper'
import { getAllBrands } from '../../../http/carApi/brandApi'
import { StepItem } from './StepItem'
import { Col, Container, Row } from 'react-bootstrap'
import { EmptyStep } from './EmptyStep'

export type BrandData = {
  id: number,
  brand: string
}


type BrandStepData = {
  brandId: number,
}

type BrandStepProps = BrandStepData & {
  updateFields: (fields: Partial<BrandStepData>) => void,
}

export function BrandStep({
  brandId,
  updateFields,
}: BrandStepProps) {
  const [selectedBrand, setSelectedBrand] = useState<number>(brandId)
  const [brands, setBrands] = useState<BrandData[]>([])


  useEffect(() => {
    getAllBrands().then((data) => setBrands(data.sort((a, b) => (a.brand > b.brand
      ? 1
      : -1))))
  }, [])


  const handleSelectItem = (itemId: number) => {
    setSelectedBrand(itemId)
    updateFields({ brandId: itemId })
  }

  return (
    <StepWrapper title="Select Brand">
      <Container>
        <Row>
          {
            brands.length
              ? brands.map((brand) =>
                <Col md={4} key={brand.id}>
                  <StepItem itemId={brand.id} itemTitle={brand.brand} setItemSelect={handleSelectItem} itemSelected={selectedBrand} />
                </Col>
              )
              : <EmptyStep />


          }
        </Row>
      </Container>

    </StepWrapper>
  )
}
