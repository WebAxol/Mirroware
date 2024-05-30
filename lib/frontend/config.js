const CONFIG = {
    resolution: 100,
    fog: true,
    fogColor: `${25 * 2},${6 * 2},${16 * 2}`,
    blurEffect: 0,
    transformDimensions: (frame, index, distance) => {
        return distance;
    },
    lightLevel: 10
};
var lightCycle = 1;
setInterval(() => {
    let color = (1 + Math.sin(lightCycle));
    lightCycle += 0.1;
}, 10);
export default CONFIG;
//# sourceMappingURL=config.js.map