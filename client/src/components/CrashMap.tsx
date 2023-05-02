import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { Socket, io } from 'socket.io-client';
import { Context } from '..';
import { getCrashesByUserId } from '../http/carServiceApi/crashesApi';

import React, { useContext, useEffect, useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import "leaflet/dist/leaflet.css"
import MarkerClusterGroup from 'react-leaflet-cluster'
import { AddCrashModal, ModalData } from './AddCrashModal';
import { MAP_ZOOM, MARKER_ZOOM } from '../utils/constants';
import { format } from 'date-fns';
import { CrashDetails } from './CrashDetails';
import { MapClickComponent } from './Service/markers/MapClickComponent';
import { CrashesMarkers } from './Service/markers/CrashesMarkers';
import { CrashesList } from './Service/markers/CrashesList';

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
                setMarkers(data);
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
            setMarkers((oldMarkers) => {
                return oldMarkers.map((carOrCrash) => {
                    if (carOrCrash.userCarId !== userCarId) {
                        return { ...carOrCrash };
                    }
                    // eslint-disable-next-line no-undefined
                    return {
                        ...carOrCrash, location: '', description: '', latLngTuple: []
                    };
                })
            })
        })
        socket.on('user_added_crash', (crashInfo: CrashInfo) => {
            if (crashInfo.user !== user._user.email) {
                return;
            }
            console.log("ADD!")
            const [lat, lng] = crashInfo.location.split(" ").map((val) => parseFloat(val));
            crashInfo.latLngTuple = [lat, lng]
            setMarkers((oldMarkers) => {
                return oldMarkers.map((marker) => {
                    if (marker.userCarId === crashInfo.userCarId) {
                        return { ...marker, description: crashInfo.description, location: crashInfo.location, latLngTuple: crashInfo.latLngTuple }
                    }
                    return { ...marker }
                })
            })
        })
        setSocket(socket)
        return () => {
            socket.disconnect();
        };
    }, [setSocket])


    const handleAddCrashEmit = (modalData: ModalData): void => {
        // { ...modalData, location: crashModal.latLngTuple.join(", ") }
        const location = crashModal.latLngTuple.join(", ")
        // eslint-disable-next-line max-statements-per-line
        let createdAt: Date = new Date();
        socket?.emitWithAck('user_add_crash', { ...modalData, location })!.then(
            (dateStr) => {
                createdAt = new Date(dateStr)
            }
        )
        console.log(createdAt)
        setMarkers((oldMarkers) => {
            return oldMarkers.map((carOrCrash) => {
                if (carOrCrash.userCarId !== modalData.userCarId) {
                    return { ...carOrCrash };
                }
                return { ...carOrCrash, description: modalData.description, location, latLngTuple: crashModal.latLngTuple, date: createdAt };
            })
        })
    }
    const handleDeleteCrashEmit = (userCarId: number) => {
        socket?.emit('user_delete_crash', userCarId)
        setMarkers((oldMarkers) => {
            return oldMarkers.map((carOrCrash) => {
                if (carOrCrash.userCarId !== userCarId) {
                    return { ...carOrCrash };
                }
                // eslint-disable-next-line no-undefined
                return ({
                    carMileage: carOrCrash.carMileage,
                    id: carOrCrash.id,
                    userCarId: carOrCrash.userCarId,
                    brand: carOrCrash.brand,
                    model: carOrCrash.model,
                    fuelType: carOrCrash.fuelType,
                    bodyType: carOrCrash.bodyType,
                    year: carOrCrash.year
                } as CarInfo);
            })
        })
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
