import {Vector2} from "./vector2";
import * as vector from "./vector2";

export type Boid = {
    pos:Vector2,
    vel:Vector2,
    speed:number,
    radius:number,
    colourHEX:string,
    /**
     * A value that can record how many second
     * to display a boid that has recently hit another,
     * rendering it a different colour
     */
    collisionCoolDownSeconds:number
}

export const createRandomlyOnACanvas = (canvas:HTMLCanvasElement, minRadius:number, maxRadius:number, colourHEX:string, speed:number):Boid => {

    const radius:number = minRadius + (maxRadius-minRadius) * Math.random();
    const minX:number = radius;
    const maxX:number = canvas.width-radius;
    const minY:number = radius;
    const maxY:number = canvas.height-radius;

    const x:number = minX + (maxX - minX) * Math.random();
    const y:number = minY + (maxY - minY) * Math.random();

    return {
        pos:{x, y},
        vel:{x:0,y:0},
        radius,
        colourHEX,
        collisionCoolDownSeconds:0,
        speed
    }
}

export const randomizeVelocityDirection = (boid:Boid):void => {
    const dir: number = Math.random() * (Math.PI * 2);
    boid.vel = vector.scale(vector.radiansToVector(dir), boid.speed);
}

export const move = (boid:Boid, dt:number):void => {
    boid.pos.x += boid.vel.x * dt;
    boid.pos.y += boid.vel.y * dt;
}