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
import CollisionDetector from "../../utils/CollisionDetector.js";
import { camera } from '../../utils/Camera.js';
import Service from "../Service.js";
class RayCaster extends Service {
    constructor(chief) {
        super();
        _RayCaster_chief.set(this, void 0);
        __classPrivateFieldSet(this, _RayCaster_chief, chief, "f");
    }
    execute() {
        let rays = camera.rays;
        // Input check
        if (typeof rays != 'object') {
            throw Error('Invalid ray array specified for raySource');
        }
        //
        rays.forEach(ray => {
            this.castRay(camera.pos, ray, camera.wallIndices);
        });
    }
    castRay(pos, ray, indices) {
        // Input check
        if (typeof indices.horizontal != 'number' || typeof indices.vertical != 'number') {
            throw Error('invalid wallIndices property');
        }
        //
        let newHorizontalIndex = this.testAgainstHorizontalWalls(ray, indices.horizontal);
        let newVerticalIndex = this.testAgainstVerticalWalls(ray, indices.vertical);
        let newIndices = {
            vertical: (newVerticalIndex === false) ? indices.vertical : newVerticalIndex,
            horizontal: (newHorizontalIndex === false) ? indices.horizontal : newHorizontalIndex
        };
        if ((newHorizontalIndex !== false || newVerticalIndex !== false) && (ray.collidesWith.opacity < 1) && ray.level < 10) {
            let isClosestHorizontal = ray.collidesWith.getType() == 'HorizontalWall';
            let angleAdd = isClosestHorizontal ? 360 : 180;
            if (!ray.reflected.getType) {
                ray.reflected.degree = (angleAdd - ray.degree);
                let reflectedRay = __classPrivateFieldGet(this, _RayCaster_chief, "f").world.createAgent('Ray');
                reflectedRay.source = ray;
                reflectedRay.level = ray.level + 1;
                ray.reflected = reflectedRay;
            }
            ray.reflected.active = true;
            ray.reflected.degree = (angleAdd - ray.degree);
            ray.wallIndices = newIndices;
            __classPrivateFieldGet(this, _RayCaster_chief, "f").calculateRayProperties(ray.collidesAt, ray.reflected);
            //console.log('Ray-------------------------------------------------');
            this.castRay(ray.collidesAt, ray.reflected, newIndices);
        }
        else {
            if (ray.reflected.getType) {
                ray.reflected.active = false;
            }
        }
    }
    // WARNING: The following functions assume that wall collections are properly sorted in ascending order
    testAgainstVerticalWalls(ray, index) {
        let sense;
        // Get sense
        if ((ray.degree % 360) > 270 && (ray.degree % 360) < 360)
            sense = 1;
        else if ((ray.degree % 360) >= 0 && (ray.degree % 360) < 90)
            sense = 1;
        else if ((ray.degree % 360) > 90 && (ray.degree % 360) < 270)
            sense = -1;
        if (!sense)
            return false; // Cannot collide; it is totally vertical
        const walls = __classPrivateFieldGet(this, _RayCaster_chief, "f").world.getCollection('VerticalWalls');
        for (index += (sense == 1 ? 1 : 0); (index < walls.length && sense == 1) || (index >= 0 && sense == -1); index += sense) {
            if (walls[index].posX <= ray.collidesAt.x && sense == -1)
                return index;
            if (walls[index].posX >= ray.collidesAt.x && sense == 1)
                return index - 1;
            let hasCollided = CollisionDetector.RayVsVerticalLine(ray, walls[index]);
            if (hasCollided) {
                let isCloser = this.compareWithClosest(ray, hasCollided);
                if (isCloser) {
                    ray.collidesAt.x = hasCollided[0];
                    ray.collidesAt.y = hasCollided[1];
                    ray.collidesWith = walls[index];
                }
                else
                    return index - 1;
                return index - (sense == 1 ? 1 : 0);
            }
        }
        return false;
    }
    testAgainstHorizontalWalls(ray, index) {
        let sense = 0;
        // Get sense
        if (ray.degree > 0 && ray.degree < 180)
            sense = 1;
        else if (ray.degree > 180 && ray.degree < 360)
            sense = -1;
        if (!sense)
            return false; // Cannot collide; it is totally horizontal
        const walls = __classPrivateFieldGet(this, _RayCaster_chief, "f").world.getCollection('HorizontalWalls');
        if (walls.length <= 0)
            return false;
        for (index += (sense == 1 ? 1 : 0); (index < walls.length && sense == 1) || (index >= 0 && sense == -1); index += sense) {
            let hasCollided = CollisionDetector.RayVsHorizontalLine(ray, walls[index]);
            if (hasCollided) {
                let isCloser = this.compareWithClosest(ray, hasCollided);
                if (isCloser) {
                    ray.collidesAt.x = hasCollided[0];
                    ray.collidesAt.y = hasCollided[1];
                    ray.collidesWith = walls[index];
                }
                else
                    return false;
                return index - (sense == 1 ? 1 : 0);
            }
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
