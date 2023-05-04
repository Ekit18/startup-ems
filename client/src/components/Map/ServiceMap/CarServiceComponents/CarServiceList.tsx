/* eslint-disable no-extra-parens */
import React from 'react'
import { observer } from 'mobx-react-lite'
import { CarServiceInfo } from "../ServiceCrashMap";
import { CarServiceDetails } from "./CarServiceDetails";

interface CrashesListProps {
    carServicemarkers: (CarServiceInfo)[],
    handleClickMarker: (index: number) => void,
}

export const CarServiceList: React.FC<CrashesListProps> = observer(({ carServicemarkers, handleClickMarker }) => {
    return (
        <>
            {
                carServicemarkers.map((marker, index) => {
                    return (
                        <CarServiceDetails
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
