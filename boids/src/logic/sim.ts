import {
    Boid,
    collideAndBounceOffCanvas,
    collideAndBounceOffOtherBoid,
    createRandomlyOnACanvas,
    randomizeVelocityDirection,
    update
} from "./boid";
import {Cell, generateGridFromCanvas, getCellFromCanvasPos, iterateGrid, renderGridLines, renderTiles} from "./grid";
import {createRealtimeUpdate} from "./realtime";
import {blendRGB, colours, rgbToHex} from "./colour";


export interface Sim {
    init: (canvasElement: HTMLCanvasElement) => void,
    hasInit: () => boolean,
    spawn: (count: number) => void,
    clear: () => void,
    setShowGrid: (on: boolean) => void,
    setPerformanceMode: (on: boolean) => void,
    setShowFPS: (on: boolean) => void,
}

export const createSim = () => {

    const CELL_SIZE = 64;
    let canvas: HTMLCanvasElement | null = null;
    let ctx: CanvasRenderingContext2D | null = null;
    let showGrid: boolean = true;
    let showFPS: boolean = true;
    let enablePerformanceMode: boolean = true;
    let boids: Boid[] = [];
    let grid: Cell[][];

    const init = (canvasElement: HTMLCanvasElement): void => {

        if (canvas !== null) {
            console.error('Cannot re-initialise the simulation');
            return;
        }

        canvas = canvasElement;
        ctx = canvas.getContext("2d")!;

        grid = generateGridFromCanvas(canvas, 64, '#ffe282');

        createRealtimeUpdate(60, window, tick);

    }

    const hasInit = (): boolean => {
        return canvas !== null;
    }

    const spawn = (count: number): void => {

        if (canvas === null) {
            console.error('Simulation has not been initialised');
            return;
        }

        for (let i = 0; i < count; i++) {
            const boid: Boid = createRandomlyOnACanvas(canvas, 4, 8, '#FFFFFFFF', 32);
            randomizeVelocityDirection(boid);
            boids.push(boid);
        }

    }

    const clear = (): void => {

        if (canvas === null) {
            console.error('Simulation has not been initialised');
            return;
        }

        boids.length = 0;
    }

    const setShowGrid = (on: boolean): void => {
        if (canvas === null) {
            console.error('Simulation has not been initialised');
            return;
        }

        showGrid = on;
    }

    const setPerformanceMode = (on: boolean): void => {
        if (canvas === null) {
            console.error('Simulation has not been initialised');
            return;
        }

        enablePerformanceMode = on;
    }

    const setShowFPS = (on: boolean): void => {
        if (canvas === null) {
            console.error('Simulation has not been initialised');
            return;
        }

        showFPS = on;
    }


    const tick = (dt: number, fps: number): void => {

        if (canvas === null || ctx === null) return;

        //Collision detection and response
        if (enablePerformanceMode) {
            fastCollisions();
        } else {
            collideBoidsTogether(boids);
        }

        //Bounce boids off walls and move them
        for (const boid of boids) {

            const collision = collideAndBounceOffCanvas(boid, canvas);

            if (collision) {
                boid.pos = collision.newPos;
                boid.vel = collision.newVelocity;
            }

            update(boid, dt);
        }

        //Rendering

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (showGrid) {
            renderGrid(ctx);
        }

        renderBoids();

        if (showFPS) {
            renderFPS(ctx, fps);
        }
    }

    //Collisions

    const fastCollisions = (): void => {
        //Subsets all boids into cells so the n^2 can work with a
        //lower amount of candidates at once and is much faster.

        iterateGrid(grid, cell => {
            cell.boids = [];
        });

        for (const b of boids) {
            const cell = getCellFromCanvasPos(grid, CELL_SIZE, b.pos);
            if (!cell) continue;
            cell.boids.push(b);
        }

        iterateGrid(grid, cell => {
            collideBoidsTogether(cell.boids);
        });

    }

    const collideBoidsTogether = (boids: Boid[]): void => {

        //Low performance n^2 boid v boid collision + response with large amounts
        //of boids

        for (let i = 0; i < boids.length; i++) {
            const a: Boid = boids[i];

            for (let k = 0; k < boids.length; k++) {

                //same boid
                if (k === i) continue;

                const b: Boid = boids[k];

                const avb = collideAndBounceOffOtherBoid(a, b);

                if (avb) {

                    const bva = collideAndBounceOffOtherBoid(b, a);

                    a.pos = avb.newPos;
                    a.vel = avb.newVelocity;
                    a.collisionCoolDownSeconds = 1;

                    //Technically bva won't ever be null as avb wasn't but this pleases my brain :)
                    if (bva) {
                        b.pos = bva.newPos;
                        b.vel = bva.newVelocity;
                        b.collisionCoolDownSeconds = 1;
                    }
                }
            }
        }

    }

    //Rendering

    const renderGrid = (ctx: CanvasRenderingContext2D): void => {
        const coldCell = colours.white();
        const hotCell = colours.black();

        if (enablePerformanceMode) {
            iterateGrid(grid, cell => {
                cell.colourHEX = rgbToHex(blendRGB(coldCell, hotCell, cell.boids.length / 32));
            });
        } else {
            iterateGrid(grid, cell => {
                cell.colourHEX = rgbToHex(coldCell);
            });
        }

        renderTiles(ctx, grid, CELL_SIZE);
        renderGridLines(grid, CELL_SIZE, ctx, 0.25);

    }

    const renderFPS = (ctx: CanvasRenderingContext2D, fps: number): void => {
        ctx.fillStyle = "#494949";
        ctx.fillRect(5, 32, 75, 24);
        ctx.fillStyle = '#ffffff';
        ctx.font = '16px Verdana';
        ctx.fillText(`FPS: ${fps.toFixed(0)}`, 10, 50);
    }

    const renderBoids = (): void => {

        if (ctx === null) return;

        const normalBoidColour = colours.white();
        const collidedBoidColour = colours.red();

        for (const boid of boids) {
            boid.colourHEX = rgbToHex(blendRGB(normalBoidColour, collidedBoidColour, boid.collisionCoolDownSeconds));
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.arc(boid.pos.x, boid.pos.y, boid.radius, 0, 2 * Math.PI);
            ctx.fillStyle = boid.colourHEX;
            ctx.fill();
            ctx.stroke();
        }

    }

    return {
        init,
        hasInit,
        spawn,
        clear,
        setShowGrid,
        setPerformanceMode,
        setShowFPS
    } as Sim;
}