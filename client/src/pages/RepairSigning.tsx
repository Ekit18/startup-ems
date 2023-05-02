import React, { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Socket, io } from 'socket.io-client'
import { RepairSigningShowItem } from '../components/RepairSigning/RepairSigningShowItem';
import { RepairSigningAddItem } from '../components/RepairSigning/RepairSigningAddItem';
import { Button } from 'react-bootstrap';
import { RepairSigningSignatureCanvas } from '../components/RepairSigning/RepairSigningSignatureCanvas';


export type CarOperationItem = {
    id: number;
    name: string;
    symptom: string;
    repair: string;
    price: number;
    partId?: number;
}

interface RepairSigningData {
    items: CarOperationItem[];
    repairHistoryId: number;
    room?: string;
    isSigning: boolean;
}

export const RepairSigning: React.FC = observer(() => {
    const [signingFormData, setSigningFormData] = useState<RepairSigningData>(
        {
            items: [
                // {
                //     id: 1,
                //     name: "oil change",
                //     symptom: "drove 6000km",
                //     repair: "gearbox and engine oil change",
                //     price: 200,
                // }
            ],
            repairHistoryId: 0,
            isSigning: false,
        }
    )
    const [socket, setSocket] = useState<Socket>()

    useEffect(() => {
        const socket = io(process.env.REACT_APP_CAR_SERVICE_API_URL || "", {
            extraHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setSocket(socket)
        return () => {
            socket.disconnect();
        };
    }, [setSocket])


    const handleSigningUpdate = (data: any) => {
        setSigningFormData(data);
        console.log(data)
    }

    const handleException = (data: any) => {
        alert(data.message)
        console.error(data)
    }


    useEffect(() => {
        if (!socket) {
            return
        }

        socket.on("signing_update", handleSigningUpdate);
        socket.on("exception", handleException);

        return () => {
            if (!socket) {
                return
            }
            socket.off("signing_update", handleSigningUpdate);
            socket.off("exception", handleException);
        }
    }, [socket, handleSigningUpdate]);


    const handleCarOperationAdd = (carOperation: CarOperationItem) => {
        if (!signingFormData.items.find((item) => item.id === carOperation.id)) {
            setSigningFormData((prevFormData) => {
                console.log("submit")
                const newFormData = {
                    ...prevFormData,
                    items: [...prevFormData.items, carOperation],
                };
                socket?.emit("form_submit", newFormData)
                return newFormData;
            });
        }
    };

    const handleCarOperationDelete = (id: number) => {
        setSigningFormData((prevFormData) => {
            console.log("submit")
            const newFormData = {
                ...prevFormData,
                items: prevFormData.items.filter((item) => item.id !== id),
            }
            socket?.emit("form_submit", newFormData)
            return newFormData;
        });
    };


    const handleJoinRoom = () => {
        setSigningFormData((prevFormData) => {
            const newFormData = { ...prevFormData, room: "test" };
            return newFormData;
        });
        socket?.emit("join_room", "test")
    }

    const getTotalPriceSum = useCallback(() => {
        return signingFormData.items.reduce((total, item) => total + item.price, 0);
    }, [signingFormData.items]);

    const handleIsSigningChange = () => {
        setSigningFormData((prevFormData) => {
            const newFormData = { ...prevFormData, isSigning: !signingFormData.isSigning }
            socket?.emit("form_submit", newFormData)
            return newFormData;
        })
    }

    return (
        <>
            <button onClick={() => handleIsSigningChange()}>test </button >
            <h4>{signingFormData.repairHistoryId}</h4>
            <h4 className="text-center">Added Operations</h4>
    {
        signingFormData.items.map((item) => {
            return <RepairSigningShowItem key={item.id} item={item} handleCarOperationDelete={handleCarOperationDelete} isSigning={signingFormData.isSigning} />
        })
    }
            <Button onClick={() => handleJoinRoom()}>Test</Button>
            <h2>{getTotalPriceSum()}</h2>
            <RepairSigningAddItem handleInputChange={handleCarOperationAdd} isSigning={signingFormData.isSigning} />
    { signingFormData.isSigning && <RepairSigningSignatureCanvas socket={socket} room="test"/> }
        </>
    );
})
