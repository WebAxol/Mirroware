const CONFIG = {


    resolution : 600,
    fog        : true,
    //fogColor   : `${25*2},${6*2},${16*2}`, // RGB
    fogColor   : `${20*2},${0*2},${0*2}`, // RGB
    blurEffect : 0,
    lightLevel : 40
};

var lightCycle = 1;

setInterval(() => {

    let color = ( 1 + Math.sin(lightCycle)); 
    
    //CONFIG.fogColor = `${color * 20},${color * 10},${color * 10}`
    //CONFIG.lightLevel = 10 + Math.sin(lightCycle) * 10;
    lightCycle += 0.1;

}, 10)

export default CONFIG