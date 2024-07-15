const CONFIG = {
    resolution: 600,
    fog: true,
    fogColor: `${20 * 2},${0 * 2},${0 * 2}`,
    blurEffect: 0,
    lightLevel: 40
};
var lightCycle = 1;
setInterval(() => {
    let color = (1 + Math.sin(lightCycle));
    lightCycle += 0.1;
}, 10);
export default CONFIG;
//# sourceMappingURL=config.js.map