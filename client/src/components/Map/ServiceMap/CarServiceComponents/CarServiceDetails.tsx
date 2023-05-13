import { Button, Col, Row } from "react-bootstrap";
import { CarServiceInfo } from "../ServiceCrashMap";
import { CarInfo, CrashInfo } from '../../UserMap/CrashMap';
import { useState, useEffect, useMemo } from 'react'
import { observer } from "mobx-react-lite";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import _ from "lodash";

interface DetailsProps {
    carServiceMarker: CarServiceInfo
    index: number
    isListDetails: boolean
    handleClickMarker: (index: number) => void,
    handleDeleteCrashEmit: (userCarId: number) => void
    setCurrCrashToChooseCarServiceFor: React.Dispatch<React.SetStateAction<CarInfo | CrashInfo | null>>,
    currCrashToChooseCarServiceFor: CarInfo | CrashInfo | null,
    handleConfirm: (confirmCarServiceModal: boolean) => void
}

export const CarServiceDetails: React.FC<DetailsProps> = observer(({ handleConfirm, setCurrCrashToChooseCarServiceFor, currCrashToChooseCarServiceFor, handleDeleteCrashEmit, carServiceMarker, index, handleClickMarker, isListDetails }: DetailsProps) => {
    useEffect(() => {
            handleDeleteCrashEmit(currCrashToChooseCarServiceFor!.userCarId);
            setCurrCrashToChooseCarServiceFor(null);
    })

    return (
        <div
            onClick={isListDetails
                ? () => handleClickMarker(index)
                // eslint-disable-next-line no-undefined
                : undefined
            }
        >
            <hr />
            <h4>
                {
                    Object.entries(carServiceMarker).map(
                        (kv) => `${_.capitalize(kv[0])} ${kv[1]}`
                    )
                }
            </h4>
            <Row>
                <Col md={12} className="mb-3">
                    <Button className="w-100" variant={'primary'} onClick={() => {
                        handleConfirm(true);
                    }}>Choose</Button>
                </Col>
            </Row>
            <hr />

        </div>
    )
})
