/* eslint-disable no-extra-parens */
import React from 'react'
import { observer } from 'mobx-react-lite'
import { CarInfo, CrashInfo } from '../../UserMap/CrashMap';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MARKER_ZOOM } from '../../../../utils/constants';
import { CrashDetails } from './CrashDetails';
import { CrashIcon } from '../../../../ui/icons';

interface CrashesMarkersProps {
  markers: (CrashInfo | CarInfo)[],
  setClickedMarker: React.Dispatch<React.SetStateAction<number | null>>,
  clickedMarker: number | null,
  mapRef: React.MutableRefObject<L.Map | null>,
  handleClickMarker: (index: number) => void,
  handleDeleteCrashEmit: (userCarId: number) => void,
  handleChooseCarServiceModeEmit: (flag: boolean) => void,
  setCurrCrashToChooseCarServiceFor: React.Dispatch<React.SetStateAction<CarInfo | CrashInfo | null>>
}

export const CrashesMarkers: React.FC<CrashesMarkersProps> = observer(({ setCurrCrashToChooseCarServiceFor, markers, setClickedMarker, clickedMarker, mapRef, handleClickMarker, handleDeleteCrashEmit, handleChooseCarServiceModeEmit }) => {
  return (
    <>
      {markers.filter((marker) => Boolean((marker as CrashInfo).description)).map((marker, index) =>
        <Marker key={index} position={(marker as Required<CrashInfo>).latLngTuple} eventHandlers={{
          click: () => {
            console.log(`POPUPCLICK: ${index}`);
            setClickedMarker(index);
          },
          popupclose: () => {
            console.log("POPUPCLOSE");
            setClickedMarker(null);
          },
          unload: () => {
            setClickedMarker(null);
          },
          remove: () => {
            setClickedMarker(null);
            console.log("test")
          }
        }} icon={CrashIcon} ref={(ref) => {
          if (ref && clickedMarker === index) {
            ref.openPopup();
            if (mapRef.current) {
              mapRef.current.setView((marker as Required<CrashInfo>).latLngTuple, MARKER_ZOOM)
            }
            setClickedMarker(index);
          }
        }}>
          <Popup>
            <CrashDetails setCurrCrashToChooseCarServiceFor={setCurrCrashToChooseCarServiceFor} setClickedMarker={setClickedMarker} handleChooseCarServiceModeEmit={handleChooseCarServiceModeEmit} marker={marker} index={index} handleClickMarker={handleClickMarker} handleDeleteCrashEmit={handleDeleteCrashEmit} isListDetails={false} />
          </Popup>
        </Marker>
      )}
    </>
  );
})
