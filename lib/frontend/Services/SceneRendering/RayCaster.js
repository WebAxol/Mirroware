var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _RayCaster_chief;
import CollisionDetector from "../../utils/physics/CollisionDetector.js";
import Service from "../Service.js";
import Vector2D from "../../utils/physics/Vector2D.js";
class RayCaster extends Service {
    constructor(chief) {
        super();
        _RayCaster_chief.set(this, void 0);
        __classPrivateFieldSet(this, _RayCaster_chief, chief, "f");
    }
    castRay(ray, indices) {
        if (ray.reflected)
            ray.reflected.active = false;
        ray.collidesWith = null;
        ray.lambda = Infinity;
        const collision = this.iterativeWallCollisionTest(ray, indices);
        if (!collision)
            return;
        if (ray.level < 5 && ray.collidesWith.opacity < 1 && this.reflect(ray))
            this.castRay(ray.reflected, indices);
    }
    reflect(ray) {
        if (!ray.collidesWith)
            return false;
        if (!ray.reflected) {
            ray.reflected = __classPrivateFieldGet(this, _RayCaster_chief, "f").world.createAgent('Ray');
            ray.reflected.level = ray.level + 1;
        }
        ray.reflected.source = Vector2D.copy(ray.collidesAt);
        ray.reflected.direction = Vector2D.copy(ray.direction);
        ray.reflected.active = true;
        const surfaceType = ray.collidesWith.getType();
        const strategy = {
            HorizontalWall: (reflected) => { reflected.direction.y *= -1; },
            VerticalWall: (reflected) => { reflected.direction.x *= -1; }
        };
        const reflectStrategy = strategy[surfaceType];
        if (!reflectStrategy)
            return false;
        reflectStrategy(ray.reflected);
        return true;
    }
    iterativeWallCollisionTest(ray, indices) {
        const sense = { x: ray.direction.x > 0 ? 1 : -1, y: ray.direction.y > 0 ? 1 : -1 };
        const horizontalWalls = __classPrivateFieldGet(this, _RayCaster_chief, "f").world.getCollection('HorizontalWalls');
        const verticalWalls = __classPrivateFieldGet(this, _RayCaster_chief, "f").world.getCollection('VerticalWalls');
        var wallH, wallV, lambdaH, lambdaV, collision;
        while ((indices.horizontal < horizontalWalls.length && sense.y == 1) || (indices.horizontal >= 0 && sense.y == -1) ||
            (indices.vertical < verticalWalls.length && sense.x == 1) || (indices.vertical >= 0 && sense.x == -1)) {
            wallH = horizontalWalls[indices.horizontal + (sense.y == 1 ? 1 : 0)];
            wallV = verticalWalls[indices.vertical + (sense.x == 1 ? 1 : 0)];
            lambdaH = wallH ? CollisionDetector.RayVsHorizontalLine(ray, wallH.posY) : Infinity;
            lambdaV = wallV ? CollisionDetector.RayVsVerticalLine(ray, wallV.posX) : Infinity;
            if (lambdaV === lambdaH)
                break;
            collision = (lambdaH < lambdaV) ? CollisionDetector.RayVsHorizontalWall(ray, wallH) : CollisionDetector.RayVsVerticalWall(ray, wallV);
            if (collision) {
                ray.collidesAt = collision;
                ray.lambda = Math.min(lambdaH, lambdaV);
                ray.collidesWith = (lambdaH <= lambdaV) ? wallH : wallV;
                break;
            }
            indices.horizontal += (lambdaH <= lambdaV) ? sense.y : 0;
            indices.vertical += (lambdaH >= lambdaV) ? sense.x : 0;
        }
        ;
        return collision ? true : false;
    }
    testAgainstCircles(ray) {
        const circles = __classPrivateFieldGet(this, _RayCaster_chief, "f").world.getCollection('Circles');
        for (let i = 0; i < circles.length; i++) {
            let hasCollided = CollisionDetector.RayVsCircle(ray, circles[i]);
            if (!hasCollided)
                continue;
            let isCloser = ray.lambda > hasCollided;
            if (!isCloser)
                continue;
            ray.collidesAt.x = hasCollided[0];
            ray.collidesAt.y = hasCollided[1];
            ray.collidesWith = circles[i];
        }
    }
}
_RayCaster_chief = new WeakMap();
export default RayCaster;
//# sourceMappingURL=RayCaster.js.map