const CONFIG = {


    resolution : 100,
    fog        : true,
    fogColor   : `${25*2},${6*2},${16*2}`, // RGB
    blurEffect : 0,

    transformDimensions : (frame, index, distance) => {
        //if(index > 25 && index < 75) return distance + Math.min(2* (Math.sin(5 * ((frame / 50) + (index / 20)) / 1) * (distance / 10)), 10);
    
        return distance;
    },

    lightLevel : 10
};

var lightCycle = 1;

setInterval(() => {

    let color = ( 1 + Math.sin(lightCycle)); 
    
    //CONFIG.fogColor = `${color * 20},${color * 10},${color * 10}`
    //CONFIG.lightLevel = 10 + Math.sin(lightCycle) * 10;
    lightCycle += 0.1;

}, 10)

export default CONFIG