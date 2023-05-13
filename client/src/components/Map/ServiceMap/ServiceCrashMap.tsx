/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-extra-parens */
// import React, { useContext, useEffect, useState } from 'react'
// import { observer } from 'mobx-react-lite'
// import {
//     ComposableMap,
//     Geographies,
//     Geography,
//     Marker,
// } from "react-simple-maps";
// import { MAP_X_ROTATE, MAP_Y_ROTATE } from '../utils/constants';
// import { geoMercator, geoProjection, GeoProjection, geoPath } from 'd3-geo';
// interface MapProps {
//     test?: string
// }

// export interface CrashInfo {
//     carMileage: number;
//     id: number;
//     brand: string;
//     model: string;
//     fuelType: string;
//     bodyType: string;
//     year: number;
//     description: string;
//     location: string;
// }

// const geoUrl = "/test.json";

// export const CrashMap: React.FC<MapProps> = observer(({ test }) => {
//     const [socket, setSocket] = useState<Socket>();
//     const [markers, setMarkers] = useState<CrashInfo[]>([{
//         carMileage: 0,
//         id: 0,
//         brand: "",
//         model: "",
//         fuelType: "",
//         bodyType: "",
//         year: 0,
//         description: "",
//         location: "",
//     }]);
//     const { user } = useContext(Context);

//     useEffect(() => {
//         // getCrashesByUserId(user.userId).then((data: CrashInfo[]) => {
//         //     setMarkers(data)
//         //     console.log(markers)
//         //     console.log(data)
//         // });

//         const socket = io("http://localhost:5000", {
//             extraHeaders: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             }
//         })
//         setSocket(socket)
//         return () => {
//             socket.disconnect();
//         };
//     }, [setSocket])

//     function handleUpdateMarkers(data: CrashInfo[]) {
//         setMarkers(data)
//         console.log(data);
//     }


//     useEffect(() => {
//         if (!socket) {
//             return
//         }
//         socket.on("got_all_crashes", handleUpdateMarkers)
//         return () => {
//             if (!socket) {
//                 return
//             }
//             socket.off("got_all_crashes", handleUpdateMarkers)
//         }
//     }, [handleUpdateMarkers])

//     function handleClick(event: any) { // TODO: add handleMarkerDeleteClick(e)
//         setMarkers((markers) => {
//             const newMarker = {
//                 carMileage: 0,
//                 id: 0,
//                 brand: "",
//                 model: "",
//                 fuelType: "",
//                 bodyType: "",
//                 year: 0,
//                 description: "",
//                 location: "51.725483, 34.407349" // TODO: Detect correct click coords
//             };
//             const newMarkers = [...markers, newMarker]
//             // socket?.emit("", {newMarkers,user.id}) TODO: emit event that will add newMarker to DB
//             console.log(newMarkers)
//             return newMarkers
//         })
//     }

//     // const projection = geoMercator()
//     //     .scale(100)
//     //     .translate([400, 400]);


//     // function handleTestClick(event: any) {
//     //     if (event.target.tagName === "path" || event.target.closest("path") !== null) {
//     //         const pathRect = event.target.getBoundingClientRect();

//     //         // Calculate the click event's coordinates relative to the <path> element
//     //         const y = event.clientY - pathRect.top;
//     //         const GMapY = -0.0950686 + 2.51611 * y - 0.0581981 * Math.pow(y, 2) + 0.000474048 * Math.pow(y, 3) - 1.52632e-6 * Math.pow(y, 4) + 1.68456e-9 * Math.pow(y, 5);

//     //         const x = event.clientX - pathRect.left;
//     //         const GMapX = 307.165 - 13.7051 * x + 0.138106 * Math.pow(x, 2) - 0.000564608 * Math.pow(x, 3) + 1.03622e-6 * Math.pow(x, 4) - 7.09364e-10 * Math.pow(x, 5);

//     //         const width = 100;
//     //         const height = 100;
//     //         // const projection = geoMercator().translate([width / 2, height / 2]).scale(150);
//     //         // if (projection) {
//     //         //     const [longitude, latitude] = projection?.invert([x, y]) ?? [];
//     //         // }
//     //         const gp = geoPath().projection(projection)
//     //         // if (projection) {
//     //         //     const test: [number, number] | null | undefined = projection. && projection.invert([x, y]);
//     //         //     console.log(test)
//     //         // }


//     //         console.log(`${x}   ${y}`)
//     //         setMarkers((markers) => {
//     //             const newMarker = {
//     //                 carMileage: 0,
//     //                 id: 0,
//     //                 brand: "",
//     //                 model: "",
//     //                 fuelType: "",
//     //                 bodyType: "",
//     //                 year: 0,
//     //                 description: "",
//     //                 location: `${GMapX}, ${GMapY}` // TODO: Detect correct click coords
//     //             };
//     //             const newMarkers = [...markers, newMarker]
//     //             // socket?.emit("", {newMarkers,user.id}) TODO: emit event that will add newMarker to DB

//     //             return newMarkers
//     //         })
//     //     }
//     // }


//     const Xrotate = -9

//     const Yrotate = -4


//     return ( // TODO: add logic that will outline clicked marker in the sidebar

//         <>
//             <Container fluid>
//                 <Row>

//                     <Col md={4} className="bg-secondary">
//                         <button onClick={handleClick}>Add marker</button>
//                         <hr />
//                         {
//                             markers.map((marker: CrashInfo) =>
//                                 <h4>{marker.id} {marker.location}</h4>
//                             )
//                         }
//                     </Col>
//                     <Col md={8}>
//                         <div>
//                             <ComposableMap
//                                 projectionConfig={{
//                                     rotate: [Xrotate, Yrotate, 0],
//                                     scale: 2500,
//                                 }}
//                             >

//                                 <Geographies geography={geoUrl}>
//                                     {({ geographies, projection }) =>
//                                         geographies.map((geo) =>
//                                             <Geography key={geo.rsmKey} geography={geo}
//                                                 onClick={(event: any) => {
//                                                     const dim = event.target.getBoundingClientRect();
//                                                     const cx = event.clientX - dim.left;
//                                                     const cy = event.clientY - dim.top;
//                                                     const gp = geoPath().projection(projection.rotate([Xrotate, Yrotate, 0]).scale(2500))
//                                                     const [orgX, orgY] = gp.bounds(geo)[0]
//                                                     const clickCoordsInsideSvg = [
//                                                         orgX + cx,
//                                                         orgY + cy
//                                                     ];
//                                                     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//                                                     // @ts-ignore
//                                                     const [realX, realY] = projection.rotate([Xrotate, Yrotate, 0]).scale(2500).invert(clickCoordsInsideSvg)
//                                                     console.log([realX + MAP_X_ROTATE, realY + MAP_Y_ROTATE])
//                                                     setMarkers((markers) => {
//                                                         const newMarker = {
//                                                             carMileage: 0,
//                                                             id: 0,
//                                                             brand: "",
//                                                             model: "",
//                                                             fuelType: "",
//                                                             bodyType: "",
//                                                             year: 0,
//                                                             description: "",
//                                                             location: `${realY + MAP_Y_ROTATE}, ${realX + MAP_X_ROTATE}` // TODO: Detect correct click coords
//                                                         };
//                                                         const newMarkers = [...markers, newMarker]
//                                                         // socket?.emit("", {newMarkers,user.id}) TODO: emit event that will add newMarker to DB

//                                                         return newMarkers
//                                                     })
//                                                 }}
//                                             />
//                                         )
//                                     }
//                                 </Geographies>

//                                 {
//                                     markers.map((marker: CrashInfo) => {
//                                         const X = parseFloat(marker.location?.split(', ')[1]) - MAP_X_ROTATE
//                                         const Y = parseFloat(marker.location?.split(', ')[0]) - MAP_Y_ROTATE
//                                         return (
//                                             <Marker coordinates={[X, Y]}>
//                                                 <circle r={5} fill="#F53" />
//                                                 <text textAnchor="middle" fill="#0000FF">
//                                                     {X} {Y}
//                                                 </text>
//                                             </Marker>
//                                         )
//                                     }
//                                     )
//                                 }
//                             </ComposableMap>
//                         </div>
//                     </Col>
//                 </Row>
//             </Container >


//         </>
//     );
// })


// /* <Marker coordinates={[parseFloat(marker.location?.split(', ')[1]) - 22, parseFloat(marker.location?.split(', ')[0]) - 44.4]}>
// projectionConfig={{
//   rotate: [Xrotate, Yrotate, 0],
//   scale: 2500,
// }} */
import { Button, Col, Container, Row } from 'react-bootstrap';
import { io, Socket } from 'socket.io-client';
import { getAllCrashes } from '../../../http/carServiceApi/crashesApi';

import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { MapContainer, TileLayer } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import "leaflet/dist/leaflet.css"
import MarkerClusterGroup from 'react-leaflet-cluster'
import { ModalData } from '../UserMap/AddCrashModal';
import { MAP_ZOOM } from '../../../utils/constants';
import { CarInfo, CrashInfo } from '../UserMap/CrashMap';
import { ServiceAddCrashModal } from './ServiceAddCrashModal';
import { CrashesMarkers } from './CrashComponents/CrashesMarkers';
import { CrashesList } from './CrashComponents/CrashesList';
import { MapClickComponent } from '../MapClickComponent';
import { getAllCarServices } from "../../../http/carServiceApi/carServiceApi";
import {
    crashMarkersHandleAdd,
    crashMarkersHandleDelete,
    crashMarkersInit,
    crashMarkersUserAdded,
    crashMarkersUserDeleted
} from "./Reducer/CrashMarkersReducer";
import { CarServiceList } from "./CarServiceComponents/CarServiceList";
import { CarServiceMarkers } from "./CarServiceComponents/CarServiceMarkers";
import { ConfirmCarServiceModal } from './ConfirmCarServiceModal';

interface CrashMapProps {
    test?: string;
}

export interface CrashModalState {
    show: boolean,
    latLngTuple: LatLngTuple
}

export interface CarServiceInfo {
    id: number
    name: string
    location: string
    rating: number
    latLngTuple: LatLngTuple
}


export const ServiceCrashMap: React.FC<CrashMapProps> = observer(() => {
    const [crashMarkers, setCrashMarkers] = useState<(CrashInfo | CarInfo)[]>([]);

    const [chooseServiceMode, setChooseServiceMode] = useState<boolean>(false)
    const [carServiceMarkers, setCarServiceMarkers] = useState<(CarServiceInfo)[]>([])
    const [currCrashToChooseCarServiceFor, setCurrCrashToChooseCarServiceFor] = useState<null | CrashInfo | CarInfo>(null);
    const [confirmCarServiceModal, setConfirmCarServiceModal] = useState<boolean>(false);
    const [currCarService, setCurrCarService] = useState<CarServiceInfo | null>(null);

    const [clickedMarker, setClickedMarker] = useState<number | null>(null);

    const [crashModal, setCrashModal] = useState<CrashModalState>({ show: false, latLngTuple: [-1, -1] })

    const mapRef = useRef<L.Map | null>(null)

    const [socket, setSocket] = useState<Socket>();


    useEffect(() => {
        if (!crashMarkers.length) {
            getAllCrashes().then((data: Required<CrashInfo | CarInfo>[]) => {
                crashMarkersInit(setCrashMarkers, { data })
            });
        }
        if (!carServiceMarkers.length) {
            getAllCarServices().then((data) => {
                setCarServiceMarkers(data)
            })
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
            crashMarkersUserDeleted(setCrashMarkers, { userCarId })
        })
        socket.on('user_added_crash', (crashInfo: CrashInfo) => {
            crashMarkersUserAdded(setCrashMarkers, { crashInfo })
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
        crashMarkersHandleAdd(setCrashMarkers, { modalData, crashModal, socket })
    }
    const handleDeleteCrashEmit = (userCarId: number) => {
        if (!socket) {
            return
        }
        crashMarkersHandleDelete(setCrashMarkers, { socket, userCarId }, setClickedMarker)
    }

    const handleClickMarker = (index: number) => {
        setClickedMarker(index);
    };

    const handleChooseCarServiceModeEmit = (flag: boolean) => {
        setChooseServiceMode(flag);
    };

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={4} style={{ overflowY: "scroll", height: "100vh" }}>
                        {
                            chooseServiceMode &&
                            <Button variant={'primary'} onClick={() => handleChooseCarServiceModeEmit(false)}>
                                Back to crashes
                            </Button>
                        }
                        {
                            (chooseServiceMode &&
                                <CarServiceList
                                    handleConfirm={setConfirmCarServiceModal}
                                    setCurrCrashToChooseCarServiceFor={setCurrCrashToChooseCarServiceFor}
                                    setCurrCarService={setCurrCarService}
                                    handleDeleteCrashEmit={handleDeleteCrashEmit}
                                    carServicemarkers={carServiceMarkers}
                                    handleClickMarker={handleClickMarker}
                                />
                            ) ||
                            <CrashesList
                                setCurrCrashToChooseCarServiceFor={setCurrCrashToChooseCarServiceFor}
                                setClickedMarker={setClickedMarker}
                                handleDeleteCrashEmit={handleDeleteCrashEmit}
                                markers={crashMarkers}
                                handleClickMarker={handleClickMarker}
                                handleChooseCarServiceModeEmit={handleChooseCarServiceModeEmit}
                            />
                        }
                    </Col>
                    <Col md={8}>
                        <MapContainer style={{ height: "100vh" }} center={[46.963664, 32.010681]} zoom={MAP_ZOOM}
                            ref={mapRef}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <MapClickComponent clickedMarker={clickedMarker} setCrashModal={setCrashModal} />
                            <MarkerClusterGroup>
                                {
                                    (chooseServiceMode &&
                                        <CarServiceMarkers
                                            handleConfirm={setConfirmCarServiceModal}
                                            setCurrCrashToChooseCarServiceFor={setCurrCrashToChooseCarServiceFor}
                                            setCurrCarService={setCurrCarService}
                                            carServiceMarkers={carServiceMarkers}
                                            setClickedMarker={setClickedMarker}
                                            clickedMarker={clickedMarker}
                                            mapRef={mapRef}
                                            handleClickMarker={handleClickMarker}
                                            handleDeleteCrashEmit={handleDeleteCrashEmit}
                                        />
                                    ) ||
                                    <CrashesMarkers
                                        setCurrCrashToChooseCarServiceFor={setCurrCrashToChooseCarServiceFor}
                                        handleChooseCarServiceModeEmit={handleChooseCarServiceModeEmit}
                                        clickedMarker={clickedMarker}
                                        handleClickMarker={handleClickMarker}
                                        handleDeleteCrashEmit={handleDeleteCrashEmit}
                                        mapRef={mapRef}
                                        markers={crashMarkers}
                                        setClickedMarker={setClickedMarker}
                                    />
                                }
                            </MarkerClusterGroup>
                        </MapContainer>

                    </Col>
                </Row>
                <ServiceAddCrashModal show={crashModal.show} setShow={setCrashModal} onSubmit={handleAddCrashEmit}
                    userCars={crashMarkers}/>
                <ConfirmCarServiceModal
                    currCarService={currCarService!}
                    handleDeleteCrashEmit={handleDeleteCrashEmit}
                    show={confirmCarServiceModal}
                    setShow={setConfirmCarServiceModal}
                    currCrashToChooseCarServiceFor={currCrashToChooseCarServiceFor!}
                    setChooseServiceMode={setChooseServiceMode}
                />
            </Container>
        </>
    );
})
