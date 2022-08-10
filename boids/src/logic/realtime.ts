/**
 * Create a real time update loop that will execute a callback with elapsed delta time (s) every frame.
 */
export const createRealtimeUpdate = (fps:number, window:Window, callback:(dt:number)=>void) : void => {
    let lastTime:number = new Date().getTime();
    let currentTime:number = 0;
    let deltaTime:number = 0;
    const interval:number = 1000 / fps;

    const onTick = () => {

        currentTime = new Date().getTime();
        deltaTime = currentTime - lastTime;

        if (deltaTime > interval) {

            //delta time in seconds
            const dt:number = deltaTime * 0.001;

            callback(dt);

            lastTime = currentTime - deltaTime % interval;
        }

        window.requestAnimationFrame(onTick);
    }

    //Kick off the update process
    window.requestAnimationFrame(onTick);
}