import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { observer } from 'mobx-react-lite'
import { Socket } from "socket.io-client";

interface RepairSigningSignatureCanvasProps {
    socket: Socket | undefined
    room:string
}


interface RepairSigningSignatureCanvasDrawingData {
    x: number,
    y: number,
}

export const RepairSigningSignatureCanvas: React.FC<RepairSigningSignatureCanvasProps> = observer(({ socket, room }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    function handleMouseDown(event: React.MouseEvent<HTMLCanvasElement>) {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const context = canvas.getContext("2d");
        if (!context) {
            return;
        }
        setIsDrawing(true);
        const rect = canvas.getBoundingClientRect();
        context.beginPath();
        context.moveTo(event.clientX - rect.left, event.clientY - rect.top);
        socket?.emit("down", { x: event.clientX - rect.left, y: event.clientY - rect.top, room });
    }

    function handleOnDraw(data: RepairSigningSignatureCanvasDrawingData) {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const context = canvas.getContext("2d");
        if (!context) {
            return;
        }
        context.lineTo(data.x, data.y);
        context.stroke();
    }

const handleOnDown = (data:RepairSigningSignatureCanvasDrawingData) => {
    const canvas = canvasRef.current;
    if (!canvas) {
        return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
        return;
    }
    context.moveTo(data.x, data.y)
}

    useEffect(() => {
        if (!socket) {
            return
        }

        socket.on("ondraw", handleOnDraw);
        socket.on("exception", handleException);
        socket.on("ondown", handleOnDown)

        return () => {
            if (!socket) {
                return
            }
            socket.off("ondraw", handleOnDraw);
            socket.off("exception", handleException);
        }
    }, [socket, handleOnDraw]);

    const handleException = (data: any) => {
        alert(data.message)
        console.error(data)
    }

    function handleMouseMove(event: React.MouseEvent<HTMLCanvasElement>) {
        if (!isDrawing) {
            return;
        }
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const context = canvas.getContext("2d");
        if (!context) {
            return;
        }
        const rect = canvas.getBoundingClientRect();
        context.lineWidth = 2;
        context.lineCap = "round";
        context.lineTo(event.clientX - rect.left, event.clientY - rect.top);
        context.stroke();
        socket?.emit("draw", { x: event.clientX - rect.left, y: event.clientY - rect.top, room });
    }

    function handleMouseUp() {
        setIsDrawing(false);
    }

    function handleSaveClick() {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }
        const dataURL = canvas.toDataURL();
        axios.post("/api/drawings", { dataURL }).then(() => {
            alert("Drawing saved!");
        });
    }

    return (
        <>
            <Container>
                <Row>
                    <Col md={12} className="text-center">
                        <canvas
                            className="border-1 border"
                            ref={canvasRef}
                            width="500"
                            height="500"
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                        />
                    </Col>
                    <Col md={12} className="text-center">
                        <button onClick={handleSaveClick}>Save Drawing</button>
                    </Col>
                </Row>
            </Container>
        </>
    );
})

