/* eslint-disable no-extra-parens */
import React from 'react'
import {observer} from 'mobx-react-lite'
import {Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import {CarInfo, CrashInfo} from '../CrashMap';
import {CrashIcon} from '../../../../ui/icons';
import {MARKER_ZOOM} from '../../../../utils/constants';
import {CrashDetails} from './CrashDetails';

interface CrashesMarkersProps {
        markers: (CrashInfo | CarInfo)[],
        setClickedMarker: React.Dispatch<React.SetStateAction<number | null>>,
        clickedMarker: number | null,
        mapRef: React.MutableRefObject<L.Map | null>,
        handleClickMarker: (index: number) => void,
        handleDeleteCrashEmit: (userCarId: number) => void,
}

export const CrashesMarkers: React.FC<CrashesMarkersProps> = observer(({ markers, setClickedMarker, clickedMarker, mapRef, handleClickMarker, handleDeleteCrashEmit }) => {
  return (
    <>
      {markers.filter((marker) => Boolean((marker as CrashInfo).description)).map((marker, index) =>
        <Marker key={index} position={(marker as Required<CrashInfo>).latLngTuple} eventHandlers={{
          click: () => {
            setClickedMarker(index);
          },
          popupclose: () => {
            setClickedMarker(null);
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
            <CrashDetails marker={marker} index={index} handleClickMarker={handleClickMarker} handleDeleteCrashEmit={handleDeleteCrashEmit} isListDetails={false} />
          </Popup>
        </Marker>
      )}
    </>
  );
})
