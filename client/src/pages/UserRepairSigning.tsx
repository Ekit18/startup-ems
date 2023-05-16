import React, { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from "react-bootstrap";
import { RepairSigningAddItem } from "../components/RepairSigning/RepairSigningAddItem";
import { RepairSigningShowItem } from "../components/RepairSigning/RepairSigningShowItem";
import { RepairSigningSignatureCanvas } from "../components/RepairSigning/RepairSigningSignatureCanvas";
import { RepairSigningUnsignedItems } from "../components/RepairSigning/RepairSigningUnsignedItem";
import { MAIN_ROUTE, REPAIR_SIGNING } from "../utils/constants";
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Socket, io } from 'socket.io-client';
import { CarServiceInfo } from '../components/Map/ServiceMap/ServiceCrashMap';
import { getAllCarServices } from '../http/carServiceApi/carServiceApi';
import { postAllSignedCarHistory } from '../http/carServiceApi/repairsHistoryApi';
import { RepairSigningData, CarOperationItem } from './RepairSigning';

export const repairSigningInitialItem = {
  id: 0,
  name: "Діагностика",
  symptom: "Запис до СТО",
  repair: "Постановка діагнозу",
  price: 500,
  partId: 0
}

export const UserRepairSigning: React.FC = observer(() => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCarService, setSelectedCarService] = useState<number>(Number(searchParams.get('carServiceId')) || 0)
  const [socket, setSocket] = useState<Socket>();
  const [signingFormData, setSigningFormData] = useState<RepairSigningData>({
    items: [

    ],
    repairHistoryId: Number(searchParams.get('repairHistoryId')) || 0,
    isSigning: false,
    userCarId: 0
  });


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
  }, [socket])


  const getTotalPriceSum = useCallback(() => {
    return signingFormData.items.reduce((total, item) => total + item.price, repairSigningInitialItem.price);
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


  const handleSubmit = () => {
    socket?.emit("finish", { repairHistoryId: signingFormData.repairHistoryId });
    postAllSignedCarHistory(signingFormData.userCarId,
      selectedCarService,
      signingFormData.repairHistoryId,
      signingFormData.items.map((item) => item.id))
      .then(() => navigate(MAIN_ROUTE))
  }
  return (
    <>
      <Button onClick={() => {
        setSelectedCarService(0)
        navigate(MAIN_ROUTE)
      }} className="me-5">Return to main page</Button>
      <hr />
      {Boolean(signingFormData.repairHistoryId) &&
        <>
          <h4>Your crash id: {signingFormData.repairHistoryId}</h4>
          <h4 className="text-center">Added Operations</h4>
          <div style={{ borderStyle: "dashed", borderColor: "green" }} className="mx-5">
            <RepairSigningShowItem
              item={repairSigningInitialItem}
              handleCarOperationDelete={handleCarOperationDelete}
              isSigning={signingFormData.isSigning}
              isService={false}
            />
          </div>
          {signingFormData.items.map((item) => {
            return (
              <RepairSigningShowItem
                key={item.id}
                item={item}
                handleCarOperationDelete={handleCarOperationDelete}
                isSigning={signingFormData.isSigning}
                isService={false}
              />
            );
          })}
          <h2>Total price: {getTotalPriceSum()}</h2>
          <hr />
          <Button variant="success" disabled={!signingFormData.items.length} onClick={() => handleIsSigningChange()}>Start Signing</Button>
          {signingFormData.isSigning && (
            <RepairSigningSignatureCanvas socket={socket} repairHistoryId={signingFormData.repairHistoryId} handleSubmit={handleSubmit} />
          )}
        </>
      }
    </>
  );
})
