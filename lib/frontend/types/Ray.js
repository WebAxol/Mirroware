import Vector2D from "../utils/physics/Vector2D.js";
const rayPrototype = {
    active: true,
    source: new Vector2D(NaN, NaN),
    direction: new Vector2D(NaN, NaN),
    reflected: undefined,
    level: 1,
    collidesWith: undefined,
    collidesAt: (new Vector2D(NaN, NaN)),
};
export { rayPrototype };
//# sourceMappingURL=Ray.js.map