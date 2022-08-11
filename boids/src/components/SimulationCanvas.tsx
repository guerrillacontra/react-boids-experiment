import React, {createRef, useEffect, Ref, useRef} from "react";
import "./Canvas.css"
import Sim from "../logic/sim";

export type CanvasProps = {
    sim: Sim,
}

function SimulationCanvas(props: CanvasProps) {

    const sim = props.sim;

    //Default values for the sim and UI to start with
    const defaultShowGrid = true;
    const defaultEnablePerformance = true;
    const defaultShowFPS = true;

    const canvas: Ref<HTMLCanvasElement> = createRef();

    useEffect(() => {

        if (sim.hasInit()) return;

        // @ts-ignore
        sim.init(canvas?.current);
        sim.setShowGrid(defaultShowGrid);
        sim.setShowFPS(defaultShowFPS);
        sim.setPerformanceMode(defaultEnablePerformance);
    }, []);

    return (
        <canvas className="canvas" ref={canvas} width="800" height="640"/>
    )
}

export default SimulationCanvas
