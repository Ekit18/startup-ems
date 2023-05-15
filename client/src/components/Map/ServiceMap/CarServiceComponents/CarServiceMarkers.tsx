/* eslint-disable no-extra-parens */
import React from 'react'
import { observer } from 'mobx-react-lite'
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { MARKER_ZOOM } from '../../../../utils/constants';
import { ServiceIcon } from '../../../../ui/icons';
import { CarServiceInfo } from "../ServiceCrashMap";
import { CarInfo, CrashInfo } from '../../UserMap/CrashMap';
import { CarServiceDetails } from "./CarServiceDetails";

interface CarServiceMarkersProps {
  carServiceMarkers: (CarServiceInfo)[],
  setClickedMarker: React.Dispatch<React.SetStateAction<number | null>>,
  clickedMarker: number | null,
  mapRef: React.MutableRefObject<L.Map | null>,
  handleClickMarker: (index: number) => void,
  handleDeleteCrashEmit: (userCarId: number) => void,
  setCurrCrashToChooseCarServiceFor: React.Dispatch<React.SetStateAction<CarInfo | CrashInfo | null>>,
  setCurrCarService: React.Dispatch<React.SetStateAction<CarServiceInfo | null>>,
  handleConfirm: (confirmCarServiceModal: boolean) => void,
}

export const CarServiceMarkers: React.FC<CarServiceMarkersProps> = observer(({ handleConfirm, setCurrCarService, setCurrCrashToChooseCarServiceFor, handleDeleteCrashEmit, carServiceMarkers, setClickedMarker, clickedMarker, mapRef, handleClickMarker }) => {
  return (
    <>
      {carServiceMarkers.map((marker, index) =>
        <Marker
          key={index}
          position={marker.latLngTuple}
          eventHandlers={{
            click: () => setClickedMarker(index),
            popupclose: () => setClickedMarker(null)
          }}
          icon={ServiceIcon}
          ref={(ref) => {
            if (ref && clickedMarker === index) {
              ref.openPopup();
              if (mapRef.current) {
                mapRef.current.setView(ref.getLatLng(), MARKER_ZOOM)
              }
              setClickedMarker(null);
            }
          }}
        >
          <Popup>
            <CarServiceDetails setCurrCarService={setCurrCarService} handleConfirm={handleConfirm} setCurrCrashToChooseCarServiceFor={setCurrCrashToChooseCarServiceFor} handleDeleteCrashEmit={handleDeleteCrashEmit} carServiceMarker={marker} index={index} handleClickMarker={handleClickMarker} isListDetails={false} />
          </Popup>
        </Marker>
      )}
    </>
  );
})
