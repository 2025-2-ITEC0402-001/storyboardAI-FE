import { useRef, useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/app/store/store";

import { maskingActions } from "@/features/masking/store/maskingSlice";

export interface VideoTrajactoryLayerProps {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

export const VideoTrajactoryLayer = ({ canvasRef }: VideoTrajactoryLayerProps) => {
    const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
    const [trajectory, setTrajectory] = useState<number[][]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const dispatch = useDispatch();

    const isMasked = useSelector((state: RootState) => state.layout.isMasked);

    const startDrawing = useCallback(
        (e: React.MouseEvent<HTMLCanvasElement>) => {
            if (!isMasked || isCompleted || !overlayCanvasRef.current) return;

            setIsDrawing(true);
            const canvas = overlayCanvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;

            setTrajectory([[x, y]]);
        },
        [isMasked, isCompleted],
    );

    const draw = useCallback(
        (e: React.MouseEvent<HTMLCanvasElement>) => {
            if (!isDrawing || !isMasked || isCompleted || !overlayCanvasRef.current) return;

            const canvas = overlayCanvasRef.current;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            const x = (e.clientX - rect.left) * scaleX;
            const y = (e.clientY - rect.top) * scaleY;

            setTrajectory((prev) => [...prev, [x, y]]);

            ctx.strokeStyle = "#00ff59";
            ctx.lineWidth = 3;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            if (trajectory.length > 0) {
                const [lastX, lastY] = trajectory[trajectory.length - 1];
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        },
        [isDrawing, isMasked, isCompleted, trajectory],
    );

    const stopDrawing = useCallback(() => {
        if (!isDrawing) return;

        setIsDrawing(false);
        setIsCompleted(true);
        dispatch(maskingActions.setTrajectory(trajectory));
        console.log("Trajectory completed:", trajectory);
    }, [isDrawing, trajectory, dispatch]);

    useEffect(() => {
        const baseCanvas = canvasRef.current;
        const overlayCanvas = overlayCanvasRef.current;
        if (!baseCanvas || !overlayCanvas) return;

        overlayCanvas.width = baseCanvas.width;
        overlayCanvas.height = baseCanvas.height;
    }, [canvasRef]);

    return (
        <canvas
            ref={overlayCanvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 720,
                height: "auto",
                cursor: isMasked && !isCompleted ? "crosshair" : "not-allowed",
                pointerEvents: isMasked && !isCompleted ? "auto" : "none",
            }}
        />
    );
};
