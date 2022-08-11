export const lerp = (a:number, b:number, x:number):number => {
    x = x < 0 ? 0 : x;
    x = x > 1 ? 1 : x;
    return a + (b - a) * x;
};

export const isFloatEqual = (a:number,b:number):boolean =>
{
    return Math.abs(a - b) < Number.EPSILON;
}
