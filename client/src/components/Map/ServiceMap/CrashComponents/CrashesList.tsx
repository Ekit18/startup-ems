/* eslint-disable no-extra-parens */
import React from 'react'
import { observer } from 'mobx-react-lite'
import { CrashDetails } from './CrashDetails';
import { CarInfo, CrashInfo } from '../../UserMap/CrashMap';

interface CrashesListProps {
    markers: (CrashInfo | CarInfo)[],
    handleDeleteCrashEmit: (userCarId: number) => void,
    handleClickMarker: (index: number) => void,
    handleChooseCarServiceModeEmit: (flag: boolean) => void,
    setClickedMarker: React.Dispatch<React.SetStateAction<number | null>>,
    setCurrCrashToChooseCarServiceFor: React.Dispatch<React.SetStateAction<CarInfo | CrashInfo | null>>
}

export const CrashesList: React.FC<CrashesListProps> = observer(({ setCurrCrashToChooseCarServiceFor, markers, handleDeleteCrashEmit, handleClickMarker, handleChooseCarServiceModeEmit, setClickedMarker }) => {
    return (
        <>
            {
                markers.filter((marker) => {
                    return Boolean((marker as CrashInfo).description)
                }).map((marker, index) => {
                    return (
                        <CrashDetails setCurrCrashToChooseCarServiceFor={setCurrCrashToChooseCarServiceFor} setClickedMarker={setClickedMarker} handleChooseCarServiceModeEmit={handleChooseCarServiceModeEmit} key={index} marker={marker} index={index} handleClickMarker={handleClickMarker} handleDeleteCrashEmit={handleDeleteCrashEmit} isListDetails={true} />
                    )
                })
            }
        </>
    );
})
