import { Col, Container, Row } from 'react-bootstrap';
import { io, Socket } from 'socket.io-client';
import { Context } from '../../../index';
import { getCrashesByUserId } from '../../../http/carServiceApi/crashesApi';

import React, { useContext, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { MapContainer, TileLayer } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import "leaflet/dist/leaflet.css"
import MarkerClusterGroup from 'react-leaflet-cluster'
import { AddCrashModal, ModalData } from './AddCrashModal';
import { MAP_ZOOM } from '../../../utils/constants';
import { MapClickComponent } from '../MapClickComponent';
import { CrashesMarkers } from './CrashComponents/CrashesMarkers';
import { CrashesList } from './CrashComponents/CrashesList';
import {
    crashMarkersHandleAdd,
    crashMarkersHandleDelete,
    crashMarkersInit,
    crashMarkersUserAdded,
    crashMarkersUserDeleted
} from "../ServiceMap/Reducer/CrashMarkersReducer";

interface CrashMapProps {
    test?: string;
}

export interface CrashInfo {
    carMileage: number;
    id: number;
    user: string;
    userCarId: number;
    brand: string;
    model: string;
    fuelType: string;
    bodyType: string;
    year: number;
    date: Date;
    description: string;
    location: string;
    latLngTuple?: LatLngTuple;
}

export type CarInfo = Omit<CrashInfo, 'latLngTuple' | 'description' | 'location'>
export interface CrashModalState {
    show: boolean,
    latLngTuple: LatLngTuple
}
export const CrashMap: React.FC<CrashMapProps> = observer(() => {
    const [markers, setMarkers] = useState<(CrashInfo | CarInfo)[]>([]);
    const [clickedMarker, setClickedMarker] = useState<number | null>(null);
    const [crashModal, setCrashModal] = useState<CrashModalState>({ show: false, latLngTuple: [-1, -1] })
    const mapRef = useRef<L.Map | null>(null)

    const [socket, setSocket] = useState<Socket>();
    const { user } = useContext(Context);


    useEffect(() => {
        if (!markers.length) {
            getCrashesByUserId(user.userId || 0).then((data: (CrashInfo | CarInfo)[]) => {
                crashMarkersInit(setMarkers, { data })
            });
        }
        const socket = io(process.env.REACT_APP_CAR_SERVICE_API_URL || "", {
            extraHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        socket.on('connect_error', (err) => {
            console.log("ERROR: ", err);
        })
        socket.on('user_deleted_crash', (userCarId: number) => {
            crashMarkersUserDeleted(setMarkers, { userCarId })
        })
        socket.on('user_added_crash', (crashInfo: CrashInfo) => {
            crashMarkersUserAdded(setMarkers, { crashInfo })
        })
        setSocket(socket)
        return () => {
            socket.disconnect();
        };
    }, [setSocket])


    const handleAddCrashEmit = (modalData: ModalData): void => {
        if (!socket) {
            return
        }
        crashMarkersHandleAdd(setMarkers, { modalData, crashModal, socket })
    }
    const handleDeleteCrashEmit = (userCarId: number) => {
        if (!socket) {
            return
        }
        crashMarkersHandleDelete(setMarkers, { socket, userCarId })
    }


    const handleClickMarker = (index: number) => {
        setClickedMarker(index);
    };
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={4} style={{ overflowY: "scroll", height: "100vh" }}>
                        <CrashesList handleDeleteCrashEmit={handleDeleteCrashEmit} markers={markers} handleClickMarker={handleClickMarker} />
                    </Col>
                    <Col md={8}>
                        <MapContainer style={{ height: "100vh" }} center={[46.963664, 32.010681]} zoom={MAP_ZOOM} ref={mapRef}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <MapClickComponent clickedMarker={clickedMarker} setCrashModal={setCrashModal} />
                            <MarkerClusterGroup>
                                <CrashesMarkers
                                    clickedMarker={clickedMarker}
                                    handleClickMarker={handleClickMarker}
                                    handleDeleteCrashEmit={handleDeleteCrashEmit}
                                    mapRef={mapRef}
                                    markers={markers}
                                    setClickedMarker={setClickedMarker} />
                            </MarkerClusterGroup>
                        </MapContainer>

                    </Col>
                </Row>
                <AddCrashModal show={crashModal.show} setShow={setCrashModal} onSubmit={handleAddCrashEmit} userCars={markers} />
            </Container>
        </>
    );
})
