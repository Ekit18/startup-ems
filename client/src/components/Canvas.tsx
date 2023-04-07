import React, { useRef, useState } from "react";
import axios from "axios";

function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    function handleMouseDown(event: any) {
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
    }

    function handleMouseMove(event: any) {
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
        <div>
            <canvas
                ref={canvasRef}
                width="500"
                height="500"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
            />
            <button onClick={handleSaveClick}>Save Drawing</button>
        </div>
    );
}

export default Canvas;
