import {Vector2} from "./vector2";
import * as vector from "./vector2";

export type Boid = {
    pos: Vector2,
    vel: Vector2,
    speed: number,
    radius: number,
    colourHEX: string,
    /**
     * A value that can record how many second
     * to display a boid that has recently hit another,
     * rendering it a different colour
     */
    collisionCoolDownSeconds: number
}

//Setup

export const createRandomlyOnACanvas = (canvas: HTMLCanvasElement, minRadius: number, maxRadius: number, colourHEX: string, speed: number): Boid => {

    const radius: number = minRadius + (maxRadius - minRadius) * Math.random();
    const minX: number = radius;
    const maxX: number = canvas.width - radius;
    const minY: number = radius;
    const maxY: number = canvas.height - radius;

    const x: number = minX + (maxX - minX) * Math.random();
    const y: number = minY + (maxY - minY) * Math.random();

    return {
        pos: {x, y},
        vel: {x: 0, y: 0},
        radius,
        colourHEX,
        collisionCoolDownSeconds: 0,
        speed
    }
}

export const randomizeVelocityDirection = (boid: Boid): void => {
    const dir: number = Math.random() * (Math.PI * 2);
    boid.vel = vector.scale(vector.radiansToVector(dir), boid.speed);
}


export const update = (boid: Boid, dt: number): void => {
    boid.pos.x += boid.vel.x * dt;
    boid.pos.y += boid.vel.y * dt;

    boid.collisionCoolDownSeconds -= dt;
    if (boid.collisionCoolDownSeconds < 0) boid.collisionCoolDownSeconds = 0;
}

//Collisions

export type CollisionResult = {
    newPos: Vector2,
    newVelocity: Vector2
}

export const collideAndBounceOffCanvas = (boid: Boid, canvas: HTMLCanvasElement): CollisionResult | null => {

    let pos: Vector2 = {...boid.pos};
    let vel: Vector2 = {...boid.vel};

    let hasCollided: boolean = false;

    const leftX: number = boid.radius;
    const rightX: number = canvas.width - boid.radius;

    if (pos.x < leftX) {
        pos.x = leftX;
        vel.x = -vel.x;
        hasCollided = true;
    } else if (pos.x > rightX) {
        pos.x = rightX;
        vel.x = -vel.x;
        hasCollided = true;
    }

    const bottomY: number = boid.radius;
    const topY: number = canvas.height - boid.radius;

    if (pos.y < bottomY) {
        pos.y = bottomY;
        vel.y = -vel.y;
        hasCollided = true;
    } else if (pos.y > topY) {
        pos.y = topY;
        vel.y = -vel.y;
        hasCollided = true;
    }

    if (!hasCollided) return null;

    return {
        newPos: pos,
        newVelocity: vel
    };
}

export const collideAndBounceOffOtherBoid = (a: Boid, b: Boid): CollisionResult | null => {

    const radii2: number = Math.pow(a.radius + b.radius, 2);
    const delta: Vector2 = vector.sub(b.pos, a.pos);
    const mag2: number = vector.mag2(delta);

    if (mag2 > radii2) return null;

    let pos: Vector2 = {...a.pos};
    let vel: Vector2 = {...a.vel};

    //dist between both boids
    const mag = Math.sqrt(mag2);

    //coefficient for how much to push a's radii vs b's radii as they could be different
    const coeff = (a.radius / b.radius) / mag;

    //Separate the boid from the other
    const pushOffset: Vector2 = vector.scale(delta, -0.5 * coeff);

    pos.x += pushOffset.x;
    pos.y += pushOffset.y;

    //Make the boid bounce off the other
    const leftNormal = vector.leftNormal(delta);
    const reflect = vector.normalized(vector.reflect(b.vel, leftNormal));
    const velSpeed: number = vector.mag(a.vel);

    vel.x = reflect.x * velSpeed;
    vel.y = reflect.y * velSpeed;

    return {
        newPos: pos,
        newVelocity: vel
    };
}