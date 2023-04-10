import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import { Container, Row, Col } from 'react-bootstrap';
import { Socket, io } from 'socket.io-client';
import { MAP_X_ROTATE, MAP_Y_ROTATE } from '../../utils/constants';
import { $authHost, $host } from '../../http';

interface MapProps {
  test?: string
}

interface CrashInfo {
  carMileage: number;
  id: number;
  brand: string;
  model: string;
  fuelType: string;
  bodyType: string;
  year: number;
  description: string;
  location: string;
}

const geoUrl = "https://parts-guides.s3.eu-central-1.amazonaws.com/test.json";

export const ServiceCrashMap: React.FC<MapProps> = observer(({ test }) => {
  const [socket, setSocket] = useState<Socket>();
  const [markers, setMarkers] = useState<CrashInfo[]>([{
    carMileage: 0,
    id: 0,
    brand: "",
    model: "",
    fuelType: "",
    bodyType: "",
    year: 0,
    description: "",
    location: "",
  }]);

  useEffect(() => {
    const socket = io("http://localhost:5000", {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setSocket(socket)
    // socket.emit('join_service_room', $authHost.get('/get-service-room-id').then((value) => {
    //   console.log(value.data.roomId);
    //   return value.data.roomId;
    // }));
    return () => {
      socket.disconnect();
    };
  }, [setSocket])

  function handleUpdateMarkers(data: CrashInfo[]) {
    setMarkers(data)
    console.log(data);
  }

  useEffect(() => {
    if (!socket) {
      return
    }
    socket.on("got_all_crashes", handleUpdateMarkers)
    return () => {
      if (!socket) {
        return
      }
      socket.off("got_all_crashes", handleUpdateMarkers)
    }
  }, [handleUpdateMarkers])

  function handleClick(event: any) {
    setMarkers((markers) => {
      const newMarkers = [...markers, {
        carMileage: 0,
        id: 0,
        brand: "",
        model: "",
        fuelType: "",
        bodyType: "",
        year: 0,
        description: "",
        location: "50.383916, 30.503074"
      }]
      // socket?.emit("", newMarkers)
      console.log(newMarkers)
      return newMarkers
    })
  }


  const Xrotate = -9

  const Yrotate = -4

  return (

    <>
      <Container fluid>
        <Row>

          <Col md={4} className="bg-secondary">
            <button onClick={handleClick}>Add marker</button>
            <hr />
            {
              markers.map((marker: CrashInfo) =>
                <h4>{marker.id} {marker.location}</h4>
              )
            }
          </Col>
          <Col md={8}>
            <ComposableMap
              projectionConfig={{
                rotate: [Xrotate, Yrotate, 0],
                scale: 2500,
              }}
            >
              <Geographies geography="/test.json">
                {({ geographies }) =>
                  geographies.map((geo) =>
                    <Geography key={geo.rsmKey} geography={geo} />
                  )
                }
              </Geographies>
              {
                markers.map((marker: CrashInfo) => {
                  const X = parseFloat(marker.location?.split(', ')[1]) - MAP_X_ROTATE
                  const Y = parseFloat(marker.location?.split(', ')[0]) - MAP_Y_ROTATE
                  return (
                    <Marker coordinates={[X, Y]}>
                      <circle r={2} fill="#F53" />
                      <text textAnchor="middle" fill="#0000FF">
                        {X} {Y}
                      </text>
                    </Marker>
                  )
                }
                )
              }
            </ComposableMap>
          </Col>
        </Row>
      </Container >


    </>
  );
})


/* <Marker coordinates={[parseFloat(marker.location?.split(', ')[1]) - 22, parseFloat(marker.location?.split(', ')[0]) - 44.4]}>
projectionConfig={{
  rotate: [Xrotate, Yrotate, 0],
  scale: 2500,
}} */
