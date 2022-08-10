import {createRealtimeUpdate} from "./realtime";
import canvas from "../components/Canvas";

/**
 * A simulation that can have a number of circle 'boids' moving about a 2d html canvas
 * in realtime.
 *
 * The boids will bounce off the canvas edges and each other with correct collision detection
 * and physics as well as indicate when a collision has happened.
 *
 * You can decide to render a 2D grid, show the FPS and swap between a low/high performance mode
 * in realtime as well as add/remove boids from the sim.
 */
class Sim {
    canvas: HTMLCanvasElement|null;
    ctx:CanvasRenderingContext2D|null;
    showGrid:boolean;
    showFPS:boolean;
    enablePerformanceMode:boolean;

    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.showGrid = false;
        this.showFPS = false;
        this.enablePerformanceMode = false;
    }

    init(canvas:HTMLCanvasElement):void {
        if(this.canvas){
            console.error('Cannot re-initialise the simulation');
            return;
        }

        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d")!;

        createRealtimeUpdate(60, window, this.update.bind(this));
    }

    private update(dt:number):void {

    }

    spawn(amount:number):void {
        if(!canvas){
            console.error('Simulation has not been initialised');
            return;
        }

    }

    clear():void{
        if(!canvas){
            console.error('Simulation has not been initialised');
            return;
        }

    }

    setShowGrid(on: boolean): void {
        if(!canvas){
            console.error('Simulation has not been initialised');
            return;
        }
        this.showGrid = on;
    }

    setPerformanceMode(on: boolean): void {
        if(!canvas){
            console.error('Simulation has not been initialised');
            return;
        }
        this.enablePerformanceMode = on;
    }

    setShowFPS(on: boolean): void {
        if(!canvas){
            console.error('Simulation has not been initialised');
            return;
        }
        this.showFPS = on;
    }
}

export default Sim;