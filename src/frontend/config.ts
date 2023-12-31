const CONFIG = {

    resolution : 300,
    fog        : true,
    fogColor   : "10,0,0", // RGB
    blurEffect : 0,

    transformDimensions : (frame, index, distance) => {
        return distance //+ Math.sin(frame / 100) * 5 //+ Math.min((Math.sin(((frame / 50) + (index / 20)) / 1) * (distance / 10)), 10);
    },

    lightLevel : 10
};

export default CONFIG