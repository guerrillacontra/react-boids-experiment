import React, {SyntheticEvent,useState} from "react";

type ButtonProp = {
    title: string,
    clicked: () => void
}

const Button = (props: ButtonProp) => {

    const onInputChanged = (e: SyntheticEvent): void => {
        e.preventDefault();
        props.clicked();
    }

    return (
        <button onClick={onInputChanged}
                className="w-24 h-8 border-2 border-amber-50 rounded text-white">
                {props.title}
        </button>
    )
}

type ToggleProps = {
    title: string,
    checked: boolean,
    toggled: (checked: boolean) => void
}

const Toggle = (props: ToggleProps) => {

    const [isChecked, setChecked] = useState(props.checked);

    const toggle = (): void => {
        setChecked(prevState => !prevState);
        props.toggled(!isChecked);
    }

    return (
        <div className="flex flex-row justify-center">
            <input
                className="appearance-none h-4 w-4 border border-gray-300 rounded-sm
                            mt-1 align-top bg-no-repeat bg-center bg-contain
                            float-left mr-2 cursor-pointer"
                type="checkbox"
                checked={isChecked}
                onChange={toggle}
            />
            <label className="text-gray-100">
                {props.title}
            </label>

        </div>
    )
}

export type ToolbarProps = {
    boidsCount:number,
    spawnClicked: () => void,
    clearClicked: () => void,
    gridChecked:boolean,
    gridToggled: (checked: boolean) => void,
    performanceChecked:boolean,
    performanceToggled: (checked: boolean) => void,
    fpsChecked:boolean,
    fpsToggled: (checked: boolean) => void
}

function Toolbar(props: ToolbarProps) {

    return (
        <div className="h-16 w-full bg-gray-800">
            <div className="flex justify-center gap-4 p-4">
                <Button title="Spawn" clicked={props.spawnClicked}/>
                <Button title="Clear" clicked={props.clearClicked}/>
                <div className="mt-1">
                    <Toggle title="Grid" checked={props.gridChecked} toggled={props.gridToggled}/>
                </div>
                <div className="mt-1">
                    <Toggle title="Optimized" checked={props.performanceChecked} toggled={props.performanceToggled}/>
                </div>
                <div className="mt-1">
                    <Toggle title="FPS" checked={props.fpsChecked} toggled={props.fpsToggled}/>
                </div>
                <label className="mt-1 text-gray-100 w-32 truncate">
                    Boids:{props.boidsCount}
                </label>
            </div>
        </div>
    );
}

export default Toolbar
