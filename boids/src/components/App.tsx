import React, {useState} from "react";
import Toolbar from "./Toolbar";
import SimulationCanvas from "./SimulationCanvas";
import Sim from "../logic/sim";

//Connect to the canvas
const sim: Sim = new Sim();

function App() {
    //Default values for the sim and UI to start with
    const defaultShowGrid = true;
    const defaultEnablePerformance = true;
    const defaultShowFPS = true;

    //The only dynamic UI item between the simulation and react
    const [boidsCount, setBoidsCount] = useState(0);

    //Sim hooks from the UI

    const onSpawnClicked = () => {
        sim.spawn(25);
        setBoidsCount(prevState => prevState + 25);
    };

    const onClearClicked = () => {
        sim.clear();
        setBoidsCount(0);
    };

    const onGridToggled = (checked: boolean) => {
        sim.setShowGrid(checked);
    };

    const onPerformanceToggled = (checked: boolean) => {
        sim.setPerformanceMode(checked);
    };

    const onFpsToggled = (checked: boolean) => {
        sim.setShowFPS(checked);
    };

    return (
        <div className="w-screen h-screen bg-gray-900 flex flex-col">
            <Toolbar boidsCount={boidsCount}
                     spawnClicked={onSpawnClicked} clearClicked={onClearClicked}
                     gridChecked={defaultShowGrid} gridToggled={onGridToggled}
                     performanceChecked={defaultEnablePerformance} performanceToggled={onPerformanceToggled}
                     fpsChecked={defaultShowFPS} fpsToggled={onFpsToggled}/>
            <div className="flex justify-center mt-4">
                <SimulationCanvas sim={sim}/>
            </div>
        </div>
    )
}

export default App
