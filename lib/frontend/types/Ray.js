import Vector2D from "../utils/Vector2D.js";
const rayPrototype = {
    active: true,
    source: {},
    reflected: {},
    level: 1,
    degree: NaN,
    slope: NaN,
    YIntercept: NaN,
    // for collision detection and response
    collidesWith: undefined,
    collidesAt: (new Vector2D(NaN, NaN)),
    wallIndices: { horizontal: NaN, vertical: NaN }
};
export { rayPrototype };
//# sourceMappingURL=Ray.js.map