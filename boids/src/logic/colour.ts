import {isFloatEqual, lerp} from "./math.js";

export type Colour = {
    r: number,
    g: number,
    b: number,
    a: number
}

export const colours = {

    black(): Colour {
        return {r: 0, g: 0, b: 0, a: 1}
    },
    white(): Colour {
        return {r: 1, g: 1, b: 1, a: 1}
    },
    red(): Colour {
        return {r: 1, g: 0, b: 0, a: 1}
    },
    green(): Colour {
        return {r: 0, g: 1, b: 0, a: 1}
    },
    blue(): Colour {
        return {r: 0, g: 0, b: 1, a: 1}
    }
}

export const isColourEqual = (a: Colour, b: Colour): boolean => {

    if (!isFloatEqual(a.r, b.r)) return false;
    if (!isFloatEqual(a.g, b.g)) return false;
    if (!isFloatEqual(a.b, b.b)) return false;
    return isFloatEqual(a.a, b.a);
}

export const rgbToHex = (c: Colour): string => {
    const rS = Math.round(c.r * 255).toString(16).padStart(2, '0');
    const gS = Math.round(c.g * 255).toString(16).padStart(2, '0');
    const bS = Math.round(c.b * 255).toString(16).padStart(2, '0');
    const aS = Math.round(c.a * 255).toString(16).padStart(2, '0');

    return "#" + rS + gS + bS + aS;
};

export const blendRGB = (first: Colour, last: Colour, amount: number): Colour => {
    let final = {r: 0, g: 0, b: 0, a: 0};
    final.r = lerp(first.r, last.r, amount);
    final.g = lerp(first.g, last.g, amount);
    final.b = lerp(first.b, last.b, amount);
    final.a = lerp(first.a, last.a, amount);
    return final;
};
