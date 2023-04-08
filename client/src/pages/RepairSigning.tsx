import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Socket, io } from 'socket.io-client'


type RepairSigningItem = {
    name: string;
    symptom: string;
    repair: string;
    price: number;
}

interface RepairSigningData {
    items: [RepairSigningItem];
    repairHistoryId:number;
    room?: string;
}

export const RepairSigning: React.FC = observer(() => {
    const [signingFormData, setSigningFormData] = useState<RepairSigningData>(
        {
            items: [
                {
                    name: "",
                    symptom: "",
                    repair: "",
                    price: 0,
                }
            ],
            repairHistoryId: 0
        }
    )
    const [socket, setSocket] = useState<Socket>()


    useEffect(() => {
        const socket = io("http://localhost:5000", {
            extraHeaders: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (!socket?.active) {
            console.error("test not connected")
        }
        setSocket(socket)
        return () => {
            socket.disconnect();
        };
    }, [setSocket])


    const newSigningFormData = (data: RepairSigningData) => {
        setSigningFormData(data);
        console.log(`tes${data}`)
    }

    const handleError = (data: any) => {
        alert(data.message)
        console.error(data)
    }

    useEffect(() => {
        if (!socket) {
            return
        }
        socket.on("form_update", newSigningFormData)
        socket.on("exception", handleError)
        return () => {
            if (!socket) {
                return
            }
            socket.off("signing_update", newSigningFormData)
            socket.off("exception", handleError)
        }
    }, [])

    const handleInputChange = (event: any) => {
        const value = event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value;
        const name = event.target.name;
        setSigningFormData((prevFormData) => {
            const newFormData = { ...prevFormData, [name]: value };
            console.log(newFormData);
            socket?.emit("form_submit", newFormData);
            return newFormData;
        });
    };


    const handleCheckboxClick = (event: any) => {
        console.log("test")
        const { checked } = event.target;
        socket?.emit('send_check', checked);
    };

    const handleJoinRoom = () => {
        setSigningFormData((prevFormData) => {
            const newFormData = { ...prevFormData, room: "test" };
            return newFormData;
        });
        socket?.emit("join_room", "test")
    }
    return (
        <>
        <h4>{signingFormData.repairHistoryId}</h4>
        </>
    );
})
