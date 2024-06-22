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
class RayCaster extends Service {
    constructor(chief) {
        super();
        _RayCaster_chief.set(this, void 0);
        __classPrivateFieldSet(this, _RayCaster_chief, chief, "f");
    }
    execute() { }
    castRay(pos, ray, indices) {
        if (ray.reflected)
            ray.reflected.active = false;
        const newHorizontalIndex = this.testAgainstHorizontalWalls(ray, indices.horizontal);
        const newVerticalIndex = this.testAgainstVerticalWalls(ray, indices.vertical);
        if (newHorizontalIndex == false && newVerticalIndex == false)
            return false;
        if (!((ray.collidesWith.opacity < 1) && ray.level < 5))
            return false;
        indices = {
            vertical: (newVerticalIndex === false) ? indices.vertical : newVerticalIndex,
            horizontal: (newHorizontalIndex === false) ? indices.horizontal : newHorizontalIndex
        };
        if (!ray.reflected) {
            let reflectedRay = __classPrivateFieldGet(this, _RayCaster_chief, "f").world.createAgent('Ray');
            reflectedRay.source = ray;
            reflectedRay.level = ray.level + 1;
            ray.reflected = reflectedRay;
        }
        ray.reflected.active = true;
        this.castRay(ray.collidesAt, ray.reflected, indices);
    }
    testAgainstHorizontalWalls(ray, index) {
        if (ray.direction.y === 0)
            return false;
        const sense = ray.direction.y > 0 ? 1 : -1;
        const walls = __classPrivateFieldGet(this, _RayCaster_chief, "f").world.getCollection('HorizontalWalls');
        for (index += (sense == 1 ? 1 : 0); (index < walls.length && sense == 1) || (index >= 0 && sense == -1); index += sense) {
            let hasCollided = CollisionDetector.RayVsHorizontalWall(ray, walls[index]);
            if (!hasCollided)
                continue;
            let isCloser = this.compareWithClosest(ray, hasCollided);
            if (!isCloser)
                return false;
            return index - (sense == 1 ? 1 : 0);
        }
        return false;
    }
    testAgainstVerticalWalls(ray, index) {
        if (ray.direction.x === 0)
            return false;
        const sense = ray.direction.x > 0 ? 1 : -1;
        const walls = __classPrivateFieldGet(this, _RayCaster_chief, "f").world.getCollection('VerticalWalls');
        for (index += (sense == 1 ? 1 : 0); (index < walls.length && sense == 1) || (index >= 0 && sense == -1); index += sense) {
            let hasCollided = CollisionDetector.RayVsVerticalWall(ray, walls[index]);
            if (!hasCollided)
                continue;
            let isCloser = this.compareWithClosest(ray, hasCollided);
            if (!isCloser)
                return false;
            return index - (sense == 1 ? 1 : 0);
        }
        return false;
    }
    compareWithClosest(ray, collisionPoint) {
        let rayOrigin = ray.source.pos || ray.source.collidesAt;
        let distanceToPoint = Math.abs(rayOrigin.x - collisionPoint[0]) + Math.abs(rayOrigin.y - collisionPoint[1]);
        let currentShortest = Math.abs(rayOrigin.x - ray.collidesAt.x) + Math.abs(rayOrigin.y - ray.collidesAt.y);
        return distanceToPoint < currentShortest;
    }
}
_RayCaster_chief = new WeakMap();
export default RayCaster;
//# sourceMappingURL=RayCaster.js.map