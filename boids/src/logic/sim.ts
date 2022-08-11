import {createRealtimeUpdate} from "./realtime";
import {Boid, createRandomlyOnACanvas} from "./boid";

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
    boids:Boid[];

    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.showGrid = false;
        this.showFPS = false;
        this.enablePerformanceMode = false;
        this.boids =[];
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

    hasInit():boolean {
        return this.canvas !== null;
    }

    spawn(amount:number):void {
        if(!this.canvas){
            console.error('Simulation has not been initialised');
            return;
        }

        //Todo: Clear spatial caches

        for(let i = 0; i < amount;i++){
            this.boids.push(createRandomlyOnACanvas(this.canvas, 4, 8, '#FFFFFFFF', 64));
        }

        //Todo: Regenerate spatial caches
    }

    clear():void{
        if(!this.canvas){
            console.error('Simulation has not been initialised');
            return;
        }

        //Todo: Clear spatial caches

        this.boids.length = 0;
    }

    setShowGrid(on: boolean): void {
        if(!this.canvas){
            console.error('Simulation has not been initialised');
            return;
        }
        this.showGrid = on;
    }

    setPerformanceMode(on: boolean): void {
        if(!this.canvas){
            console.error('Simulation has not been initialised');
            return;
        }
        this.enablePerformanceMode = on;
    }

    setShowFPS(on: boolean): void {
        if(!this.canvas){
            console.error('Simulation has not been initialised');
            return;
        }
        this.showFPS = on;
    }


    private update(dt:number):void {

        if(!this.ctx || !this.canvas)return;

        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.renderBoids(dt);
    }


    renderBoids(dt:number) {

        if(!this.ctx)return;

        const ctx = this.ctx;

        for (let i: number = 0; i < this.boids.length; i++) {
            const boid: Boid = this.boids[i];
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.arc(boid.pos.x, boid.pos.y, boid.radius, 0, 2 * Math.PI);
            ctx.fillStyle = boid.colourHEX;
            ctx.fill();
            ctx.stroke();
        }
    }
}

export default Sim;