import React, {createRef, Ref, useState} from "react";
import Toolbar from "./Toolbar";
import Canvas from "./Canvas";

function App() {
    //Default values for the sim and UI to start with
    const defaultShowGrid = true;
    const defaultEnablePerformance = true;
    const defaultShowFPS = true;

    //The only dynamic UI item between the simulation and react
    const [boidsCount, setBoidsCount] = useState(0);

    //Connect to the canvas

    const sim:any = {};

    const onCanvasReady = (canvasRef:Ref<HTMLCanvasElement>):void =>{
        // @ts-ignore
        console.log(canvasRef.current.getContext("2d")!);
        //Setup the sim
        //sim.setup(canvasRef.current, defaultShowGrid, defaultEnablePerformance, defaultShowFPS);
    }


    //Sim hooks from the UI

    const onSpawnClicked = () => {
        //sim.spawn(25);
        setBoidsCount(prevState => prevState+25);
    };

    const onClearClicked = () => {
        //sim.clear();
        setBoidsCount(prevState => 0);
    };

    const onGridToggled = (checked: boolean) => {
        //sim.setGrid(checked);
    };

    const onPerformanceToggled = (checked: boolean) => {
        //sim.setPerformance(checked);
    };

    const onFpsToggled = (checked: boolean) => {
        //sim.setFPS(checked);
    };

    return (
        <div className="w-screen h-screen bg-gray-900 flex flex-col">
            <Toolbar boidsCount={boidsCount}
                     spawnClicked={onSpawnClicked} clearClicked={onClearClicked}
                     gridChecked={defaultShowGrid} gridToggled={onGridToggled}
                     performanceChecked={defaultEnablePerformance} performanceToggled={onPerformanceToggled}
                     fpsChecked={defaultShowFPS} fpsToggled={onFpsToggled}/>
            <div className="flex justify-center mt-4">
                <Canvas canvasReady={onCanvasReady}/>
            </div>
        </div>
    )
}

export default App
