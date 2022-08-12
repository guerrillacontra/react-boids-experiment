/**
 * Create a real time update loop that will execute a callback with elapsed delta time (s) every frame.
 */
export const createRealtimeUpdate = (fps:number, window:Window, callback:(dt:number, fps:number)=>void) : void => {
    let lastTime:number = new Date().getTime();
    let currentTime:number = 0;
    let deltaTime:number = 0;
    const interval:number = 1000 / fps;
    let elapsedFrames = 0;
    let elapsedTime = 0;

    const onTick = () => {

        currentTime = new Date().getTime();
        deltaTime = currentTime - lastTime;

        //delta time in seconds
        const dt:number = deltaTime * 0.001;
        elapsedTime += dt;

        if (deltaTime > interval) {

            const fps:number = Math.round(elapsedFrames / elapsedTime);
            callback(dt, fps);


            lastTime = currentTime - deltaTime % interval;
        }

        if(elapsedTime >= 1){
            elapsedTime -=1;
            elapsedFrames = 0;
        }

        elapsedFrames ++;
        window.requestAnimationFrame(onTick);
    }

    //Kick off the update process
    window.requestAnimationFrame(onTick);
}