import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { observer } from 'mobx-react-lite'
import { getAllUnsignedCarServiceHistory } from '../../http/carServiceApi/repairsHistoryApi'
import { RepairHistoryData } from '../UserCars/UserCars'
import { UserCarData } from '../../store/UserCarsStore';
import { RepairSigningData } from '../../pages/RepairSigning';

interface RepairSigningUnsignedItemProps {
  carServiceId: number,
  selected: RepairSigningData,
  setSelected: React.Dispatch<React.SetStateAction<RepairSigningData>>
}

export interface RepairHistoryStrippedData extends UserCarData {
  carOperationId: number;
  carServiceId: number;
  createdAt: string;
  id: number;
  isSigned: boolean;
  userCarId: number;
}

export const RepairSigningUnsignedItems: React.FC<RepairSigningUnsignedItemProps> = observer(({ carServiceId, selected, setSelected }) => {
  const [unsignedItems, setUnsignedItems] = useState<RepairHistoryStrippedData[]>([])
  useEffect(() => {
    getAllUnsignedCarServiceHistory(carServiceId).then((data) => setUnsignedItems(data))
  }, [])

  const handleClick = (repairHistoryId: number, userCarId:number) => {
    setSelected((prev) => ({ ...prev, items: [], repairHistoryId, userCarId }))
  }

  return (
    <>
      <Container>
        <h2>Unsigned customers:</h2>
        <Row className="d-flex" style={{ gap: "20px" }}>
          {
            unsignedItems.map((item) => {
              return (
                <Col md={4} key={item.id} className={`border p-4 ${selected.repairHistoryId === item.id
                  ? "bg-warning"
                  : ""}`}
                  onClick={() => handleClick(item.id, item.userCarId)}
                >
                  <div>Model: {item.id}</div>
                  <div>Brand: {item.createdAt}</div>
                  <div>Body type: {item.bodyType}</div>
                  <div>Year: {item.year}</div>
                  <div>Fuel: {item.fuelType}</div>
                  <div>Mileage: {item.carMileage}</div>
                </Col>
              )
            })
          }
        </Row>
      </Container>
    </>
  );
})
