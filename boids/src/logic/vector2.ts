
export type Vector2 = {
    x:number,
    y:number
}

export const sub = (a:Vector2, b:Vector2):Vector2 => {
    return { x: a.x - b.x, y: a.y - b.y };
};

export const add = (a:Vector2, b:Vector2):Vector2 => {
    return { x: a.x + b.x, y: a.y + b.y };
};

export const mult = (a:Vector2, b:Vector2):Vector2 => {
    return { x: a.x * b.x, y: a.y * b.y };
};

export const scale = (v:Vector2, scaleFactor:number):Vector2 => {
    return { x: v.x * scaleFactor, y: v.y * scaleFactor };
};

export const mag2 = (v:Vector2):number => {
    return v.x * v.x + v.y * v.y;
};

export const mag = (v:Vector2):number => {
    return Math.sqrt(v.x * v.x + v.y * v.y);
};

export const dot =  (a:Vector2, b:Vector2):number => {
    return (a.x * b.x + a.y * b.y);
};

export const normalized = (v:Vector2):Vector2 => {
    const m = mag(v);

    if (m === 0) {
        return { x: 0, y: 0 };
    }
    return { x: v.x / m, y: v.y / m };
};

export const radiansToVector = (r:number):Vector2 => {
    return {x:Math.cos(r), y:Math.sin(r)};
}

export const reflect = (v:Vector2, normal:Vector2): Vector2 => {

    const d = dot(v, normal);

    return {
        x:v.x - 2 * d * normal.x,
        y:v.y - 2 * d * normal.y
    }
}
export const leftNormal = (v:Vector2):Vector2 => {
    return normalized({x:v.y, y:-v.x});
}

export const rightNormal = (v:Vector2):Vector2 => {
    return normalized({x:-v.y, y:v.x});
}