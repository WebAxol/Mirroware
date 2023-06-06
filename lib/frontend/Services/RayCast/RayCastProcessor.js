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
var _RayCastProcessor_chief;
import CollisionDetector from "../../utils/CollisionDetector.js";
import { camera } from '../../utils/Camera.js';
import Service from "../Service.js";
class RayCastProcessor extends Service {
    constructor(chief) {
        super();
        _RayCastProcessor_chief.set(this, void 0);
        __classPrivateFieldSet(this, _RayCastProcessor_chief, chief, "f");
    }
    execute() {
        let rays = camera.rays;
        let reflectedRay = __classPrivateFieldGet(this, _RayCastProcessor_chief, "f").world.createAgent('Ray');
        camera.sceneModel.purge();
        for (let i = 0; i < camera.rays.length; i++)
            this.castRay(camera.pos, rays[i], camera.wallIndices);
    }
    castRay(pos, ray, indices) {
        if (ray.reflected)
            ray.reflected.active = false;
        let newHorizontalIndex = this.testAgainstHorizontalWalls(ray, indices.horizontal);
        let newVerticalIndex = this.testAgainstVerticalWalls(ray, indices.vertical);
        // new indices imply that the ray has collided, and viceversa
        camera.sceneModel.update(ray);
        if (newHorizontalIndex == false && newVerticalIndex == false)
            return false; // No collision
        if (!((ray.collidesWith.opacity < 1) && ray.level < 4))
            return false;
        let newIndices = {
            vertical: (newVerticalIndex === false) ? indices.vertical : newVerticalIndex,
            horizontal: (newHorizontalIndex === false) ? indices.horizontal : newHorizontalIndex
        };
        let angleAdd = (ray.collidesWith.getType() == 'HorizontalWall') ? 360 : 180;
        if (!ray.reflected.getType) {
            let reflectedRay = __classPrivateFieldGet(this, _RayCastProcessor_chief, "f").world.createAgent('Ray');
            ray.reflected.degree = (angleAdd - ray.degree);
            reflectedRay.source = ray;
            reflectedRay.level = ray.level + 1;
            ray.reflected = reflectedRay;
        }
        // Prepare reflected ray and cast recursively
        ray.reflected.active = true;
        ray.reflected.degree = (angleAdd - ray.degree);
        ray.wallIndices = newIndices;
        __classPrivateFieldGet(this, _RayCastProcessor_chief, "f").calculateRayProperties(ray.collidesAt, ray.reflected);
        this.castRay(ray.collidesAt, ray.reflected, newIndices);
    }
    // WARNING: The following functions assume that wall collections are properly sorted in ascending order
    // These functions compute the closest horizontal and vertical walls that collide with the given ray
    testAgainstVerticalWalls(ray, index) {
        let sense;
        // Get sense : Sense is relevant because rays are unidirectional
        if ((ray.degree % 360) > 270 && (ray.degree % 360) < 360)
            sense = 1;
        else if ((ray.degree % 360) >= 0 && (ray.degree % 360) < 90)
            sense = 1;
        else if ((ray.degree % 360) > 90 && (ray.degree % 360) < 270)
            sense = -1;
        if (!sense)
            return false; // Cannot collide; it is totally vertical
        const walls = __classPrivateFieldGet(this, _RayCastProcessor_chief, "f").world.getCollection('VerticalWalls');
        for (index += (sense == 1 ? 1 : 0); (index < walls.length && sense == 1) || (index >= 0 && sense == -1); index += sense) {
            if (walls[index].posX <= ray.collidesAt.x && sense == -1)
                return index;
            if (walls[index].posX >= ray.collidesAt.x && sense == 1)
                return index - 1;
            let hasCollided = CollisionDetector.RayVsVerticalLine(ray, walls[index]);
            if (!hasCollided)
                continue;
            let isCloser = this.compareWithClosest(ray, hasCollided);
            if (!isCloser)
                return index - 1;
            ray.collidesAt.x = hasCollided[0];
            ray.collidesAt.y = hasCollided[1];
            ray.collidesWith = walls[index];
            return index - (sense == 1 ? 1 : 0);
        }
        return false;
    }
    testAgainstHorizontalWalls(ray, index) {
        let sense = 0;
        // Get sense : Sense is relevant because rays are unidirectional
        if (ray.degree > 0 && ray.degree < 180)
            sense = 1;
        else if (ray.degree > 180 && ray.degree < 360)
            sense = -1;
        if (!sense)
            return false; // Cannot collide; it is totally horizontal
        const walls = __classPrivateFieldGet(this, _RayCastProcessor_chief, "f").world.getCollection('HorizontalWalls');
        if (walls.length <= 0)
            return false;
        for (index += (sense == 1 ? 1 : 0); (index < walls.length && sense == 1) || (index >= 0 && sense == -1); index += sense) {
            let hasCollided = CollisionDetector.RayVsHorizontalLine(ray, walls[index]);
            if (!hasCollided)
                continue;
            let isCloser = this.compareWithClosest(ray, hasCollided);
            if (!isCloser)
                return false;
            ray.collidesAt.x = hasCollided[0];
            ray.collidesAt.y = hasCollided[1];
            ray.collidesWith = walls[index];
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
_RayCastProcessor_chief = new WeakMap();
export default RayCastProcessor;
//# sourceMappingURL=RayCastProcessor.js.map