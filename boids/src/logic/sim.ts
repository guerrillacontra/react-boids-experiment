
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
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d")!;
    }

    spawn(amount:number):void {

    }

    clear():void{

    }

    setShowGrid(on: boolean): void {
        this.showGrid = on;
    }

    setPerformanceMode(on: boolean): void {
        this.enablePerformanceMode = on;
    }

    setShowFPS(on: boolean): void {
        this.showFPS = on;
    }
}

export default Sim;