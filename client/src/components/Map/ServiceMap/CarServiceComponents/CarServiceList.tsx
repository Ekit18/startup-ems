/* eslint-disable no-extra-parens */
import React from 'react'
import { observer } from 'mobx-react-lite'
import { CarServiceInfo } from "../ServiceCrashMap";
import { CarInfo, CrashInfo } from '../../UserMap/CrashMap';
import { CarServiceDetails } from "./CarServiceDetails";

interface CrashesListProps {
    carServicemarkers: (CarServiceInfo)[],
    handleClickMarker: (index: number) => void,
    handleDeleteCrashEmit: (userCarId: number) => void,
    setCurrCrashToChooseCarServiceFor: React.Dispatch<React.SetStateAction<CarInfo | CrashInfo | null>>,
    setCurrCarService: React.Dispatch<React.SetStateAction<CarServiceInfo | null>>
    handleConfirm: (confirmCarServiceModal: boolean) => void
}

export const CarServiceList: React.FC<CrashesListProps> = observer(({ handleConfirm, setCurrCrashToChooseCarServiceFor, setCurrCarService, handleDeleteCrashEmit, carServicemarkers, handleClickMarker }) => {
    return (
        <>
            {
                carServicemarkers.map((marker, index) => {
                    return (
                        <CarServiceDetails
                            handleConfirm={handleConfirm}
                            setCurrCrashToChooseCarServiceFor={setCurrCrashToChooseCarServiceFor}
                            setCurrCarService={setCurrCarService}
                            handleDeleteCrashEmit={handleDeleteCrashEmit}
                            key={index}
                            carServiceMarker={marker}
                            index={index}
                            handleClickMarker={handleClickMarker}
                            isListDetails={true}
                        />
                    )
                })
            }
        </>
    );
})
