import React, {createRef, useEffect, Ref} from "react";
import "./Canvas.css"
import {Sim} from "../logic/sim";

export type CanvasProps = {
    sim: Sim,
}

function SimulationCanvas(props: CanvasProps) {

    const sim = props.sim;

    //Default values for the sim and UI to start with
    const defaultShowGrid = true;
    const defaultEnablePerformance = true;
    const defaultShowFPS = true;

    const canvasRef: Ref<HTMLCanvasElement> = createRef();

    useEffect(() => {

        const canvas: HTMLCanvasElement = canvasRef?.current!;

        sim.init(canvas);
        sim.setShowGrid(defaultShowGrid);
        sim.setShowFPS(defaultShowFPS);
        sim.setPerformanceMode(defaultEnablePerformance);

    }, []);

    return (
        <canvas className="canvas rounded-xl" ref={canvasRef} width="800" height="640"/>
    )
}

export default SimulationCanvas
