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
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { Socket, io } from 'socket.io-client';
import { Context } from '..';
import { getCrashesByUserId } from '../http/crashesApi';

import React, { useContext, useEffect, useState, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import "leaflet/dist/leaflet.css"
import MarkerClusterGroup from 'react-leaflet-cluster'
import { AddCrashModal } from './AddCrashModal';

interface CrashMapProps {
    test?: string;
}

export interface CrashInfo {
    carMileage: number;
    id: number;
    brand: string;
    model: string;
    fuelType: string;
    bodyType: string;
    year: number;
    description: string;
    location: string;
    latLngTuple?: LatLngTuple;
}

export const CrashMap: React.FC<CrashMapProps> = observer(({ test }) => {
    const [markers, setMarkers] = useState<Required<CrashInfo>[]>([]);
    const [clickedMarker, setClickedMarker] = useState<number | null>(null);

    const [showState, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const [socket, setSocket] = useState<Socket>();
    const { user } = useContext(Context);

    const icon = L.icon({
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png",
    });

    useEffect(() => {
        if (!markers.length) {
            getCrashesByUserId(user.userId).then((data: CrashInfo[]) => {
                const dataWithLatLng: Required<CrashInfo>[] = data.map(
                    (crash): Required<CrashInfo> => {
                        const [lat, lng] = crash.location.split(" ").map((val) => parseFloat(val));
                        return { ...crash, latLngTuple: [lat, lng] };
                    })
                setMarkers(dataWithLatLng);
                console.log(markers)
                console.log(data)
            });
        }

        const socket = io("http://localhost:5000", {
            extraHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setSocket(socket)
        return () => {
            socket.disconnect();
        };
    }, [])

    interface ClickInterface {
        setMarkers: typeof setMarkers
    }

    const MyComponent: React.FC<ClickInterface> = ({ setMarkers }) => {
        const map = useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;
                setShow((prev) => !prev)
                // setMarkers((prevMarker) => [...prevMarker, [lat, lng]]); TODO:
                // Make modal show, then user fills form, clicks `submit`, and then it is checked,
                // and then marker with such data added
            }
        });
        return null;
    }

    const handleClickMarker = (index: number) => {
        setClickedMarker(index);
    };
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={4} style={{ overflowY: "scroll", height: "100vh" }}>
                        {markers.map((marker, index) => {
                            return (
                                <div onClick={() => handleClickMarker(index)}>
                                    <h2> Marker {index + 1} <br /> lat: {marker.latLngTuple[0]}, lng: {marker.latLngTuple[1]}</h2>
                                </div>)
                        }
                        )}
                    </Col>
                    <Col md={8}>
                        <MapContainer style={{ height: "100vh" }} center={[46.963664, 32.010681]} zoom={13}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <MyComponent setMarkers={setMarkers} />
                            <MarkerClusterGroup>
                                {markers.map((marker, index) => <Marker key={index} position={marker.latLngTuple} icon={icon} ref={(ref) => {
                                    if (ref && clickedMarker === index) {
                                        ref.openPopup();
                                        setClickedMarker(null);
                                    }
                                }}>
                                    <Popup>
                                        <hr />
                                        Marker {index + 1} <br /> lat: {marker.latLngTuple[0]}, lng: {marker.latLngTuple[1]}
                                    </Popup>
                                </Marker>
                                )}
                            </MarkerClusterGroup>
                        </MapContainer>

                    </Col>
                </Row>
                <AddCrashModal />
            </Container>
        </>
    );
})
