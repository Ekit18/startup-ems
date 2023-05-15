import { observer } from "mobx-react-lite";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { Socket, io } from "socket.io-client";
import { RepairSigningAddItem } from "../components/RepairSigning/RepairSigningAddItem";
import { RepairSigningShowItem } from "../components/RepairSigning/RepairSigningShowItem";
import { RepairSigningSignatureCanvas } from "../components/RepairSigning/RepairSigningSignatureCanvas";
import { CarServiceInfo } from "../components/Map/ServiceMap/ServiceCrashMap";
import { getAllCarServices } from "../http/carServiceApi/carServiceApi";
import { RepairSigningUnsignedItems } from "../components/RepairSigning/RepairSigningUnsignedItem";
import { useNavigate, useParams } from "react-router-dom";
import { REPAIR_SIGNING, MAIN_ROUTE } from "../utils/constants";
import { postAllSignedCarHistory } from "../http/carServiceApi/repairsHistoryApi";

export type CarOperationItem = {
  id: number;
  name: string;
  symptom: string;
  repair: string;
  price: number;
  partId?: number;
};

export interface RepairSigningData {
  items: CarOperationItem[];
  repairHistoryId: number;
  isSigning: boolean;
  userCarId: number;
}

export const RepairSigning: React.FC = observer(() => {
  const { id } = useParams();
  const [selectedCarService, setSelectedCarService] = useState<number>(Number(id) || 0)
  const [socket, setSocket] = useState<Socket>();
  const [carService, setCarService] = useState<(CarServiceInfo)[]>([])
  const [signingFormData, setSigningFormData] = useState<RepairSigningData>({
    items: [
      {
        id: 0,
        name: "Діагностика",
        symptom: "Запис до СТО",
        repair: "Постановка діагнозу",
        price: 500,
        partId: 0
      }
    ],
    repairHistoryId: 0,
    isSigning: false,
    userCarId: 0
  });
  const navigate = useNavigate()

  useEffect(() => {
    getAllCarServices().then((data) => {
      setCarService(data)
    })
  }, [])

  useEffect(() => {
    const socket = io(process.env.REACT_APP_CAR_SERVICE_API_URL || "", {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setSocket(socket);
    return () => {
      socket.disconnect();
    };
  }, [setSocket]);

  const handleSigningUpdate = (data: any) => {
    setSigningFormData(data);
    console.log(data);
  };

  const handleException = (data: any) => {
    alert(data.message);
    console.error(data);
  };

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("signing_update", handleSigningUpdate);
    socket.on("exception", handleException);

    return () => {
      if (!socket) {
        return;
      }
      socket.off("signing_update", handleSigningUpdate);
      socket.off("exception", handleException);
    };
  }, [socket, handleSigningUpdate]);

  const handleCarOperationAdd = (carOperation: CarOperationItem) => {
    if (!signingFormData.items.find((item) => item.id === carOperation.id)) {
      setSigningFormData((prevFormData) => {
        console.log("submit");
        const newFormData = {
          ...prevFormData,
          items: [...prevFormData.items, carOperation],
        };
        socket?.emit("form_submit", newFormData);
        return newFormData;
      });
    }
  };

  const handleCarOperationDelete = (id: number) => {
    setSigningFormData((prevFormData) => {
      console.log("submit");
      const newFormData = {
        ...prevFormData,
        items: prevFormData.items.filter((item) => item.id !== id),
      };
      socket?.emit("form_submit", newFormData);
      return newFormData;
    });
  };

  useEffect(() => {
    socket?.emit("join_room", signingFormData.repairHistoryId);
  }, [signingFormData])


  const getTotalPriceSum = useCallback(() => {
    return signingFormData.items.reduce((total, item) => total + item.price, 0);
  }, [signingFormData.items]);

  const handleIsSigningChange = () => {
    setSigningFormData((prevFormData) => {
      const newFormData = {
        ...prevFormData,
        isSigning: !signingFormData.isSigning,
      };
      socket?.emit("form_submit", newFormData);
      return newFormData;
    });
  };

  const handleCarServiceSelect = (id: number) => {
    navigate(`${REPAIR_SIGNING}/${id}`)
    setSelectedCarService(id)
  }

  const handleSubmit = () => {
    postAllSignedCarHistory(signingFormData.userCarId, selectedCarService, signingFormData.repairHistoryId, signingFormData.items.map((item) => item.id))
    .then(() => navigate(MAIN_ROUTE))
  }

  return (
    <>
      {
        !selectedCarService && <>
          <Container>
            <Row>
              <Col md={5} className="mt-5">
              <Button onClick={() => navigate(MAIN_ROUTE)} className="me-5">Return to main page</Button>
                <h2>Select your car service:</h2>
                <Form>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(event) => handleCarServiceSelect(Number(event.target.value))}
                  >
                    <option>Select car service</option>
                    {carService.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.id} - {item.name} {item.location}
                      </option>
                    ))}
                  </Form.Select>
                </Form>
              </Col>
            </Row>
          </Container>
        </>


      }

      {
        Boolean(selectedCarService) &&

        <>
         <Button onClick={() => {
          setSelectedCarService(0)
          navigate(REPAIR_SIGNING)
          }} className="me-5">Return to services page</Button>
          <h2>Selected Car Service: {selectedCarService}</h2>
          <RepairSigningUnsignedItems carServiceId={selectedCarService} selected={signingFormData} setSelected={setSigningFormData} />
          <hr />
          {Boolean(signingFormData.repairHistoryId) &&
            <>
            <button onClick={() => handleIsSigningChange()}>test </button>
            <h4>{signingFormData.repairHistoryId}</h4>
              <h4 className="text-center">Added Operations</h4>
              {signingFormData.items.map((item) => {
                return (
                  <RepairSigningShowItem
                    key={item.id}
                    item={item}
                    handleCarOperationDelete={handleCarOperationDelete}
                    isSigning={signingFormData.isSigning}
                  />
                );
              })}
              <h2>{getTotalPriceSum()}</h2>
              <RepairSigningAddItem
                handleInputChange={handleCarOperationAdd}
                isSigning={signingFormData.isSigning}
              />
              {signingFormData.isSigning && (
                <RepairSigningSignatureCanvas socket={socket} repairHistoryId={signingFormData.repairHistoryId} handleSubmit={handleSubmit}/>
              )}
            </>
          }
        </>
      }

    </>
  );
});
