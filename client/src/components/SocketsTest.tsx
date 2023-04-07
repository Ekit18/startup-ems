import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import io, { Socket } from 'socket.io-client';
import { Button, Form } from 'react-bootstrap';
import Canvas from './Canvas';

interface FormData {
    name: string;
    email: string;
    phone: string;
    updates: boolean;
}
export const SocketsTest: React.FC = observer(() => {
    const [socket, setSocket] = useState<Socket>()
    const [value, setValue] = useState<string>("")
    const [messages, setMessages] = useState<string[]>([])
    const [checked, setChecked] = useState<boolean>(false)
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        updates: false,
    });
    const send = (value: string) => {
        socket?.emit("send_message", value)
    }
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

    const messageListener = (message: string) => {
        setMessages((messages) => [...messages, message])
    }

    const checkboxListener = (checked: boolean) => {
        console.log(checked)
        setChecked(checked)
    }

    const newFormData = (data: FormData) => {
        setFormData(data);
        console.log(`tes${data}`)
    }

    const handleError = (data: any) => {
        console.error(data)
    }

    useEffect(() => {
        if (!socket) {
            return
        }
        socket.on("send_message", messageListener)
        socket.on("send_check", checkboxListener)
        socket.on("form_update", newFormData)
        socket.on("exception", handleError)
        return () => {
            if (!socket) {
                return
            }
            socket.off("send_message", messageListener)
            socket.off("send_check", checkboxListener)
            socket.off("form_update", newFormData)
            socket.off("exception", handleError)
        }
    }, [messageListener])

    const handleInputChange = (event: any) => {
        const value = event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value;
        const name = event.target.name;
        setFormData((prevFormData) => {
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

    return <>
        <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            name="message"
            placeholder="Enter your message..." className="mt-2"
        />
        <Button onClick={() => send(value)}>test</Button>
        {messages.map((message, index) => <h4 key={index}>{message}</h4>
        )}
        <div>
            <input type="checkbox" checked={checked} onChange={handleCheckboxClick} />
            <Canvas />
        </div>

        <form>
            <label>
                Name:
                <input type="text" value={formData.name} name="name" onChange={handleInputChange} />
            </label>
            <label>
                Email:
                <input type="email" value={formData.email} name="email" onChange={handleInputChange} />
            </label>
            <label>
                Phone:
                <input type="tel" value={formData.phone} name="phone" onChange={handleInputChange} />
            </label>
            <label>
                Receive Updates?
                <input type="checkbox" checked={formData.updates} name="updates" onChange={handleInputChange} />
            </label>
        </form>
        {`test ${socket?.active} ${socket?.connected} ${socket?.disconnected} ${socket?.auth}`}
    </>;
})
