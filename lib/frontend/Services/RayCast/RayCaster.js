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
import Service from "../Service.js";
class RayCaster extends Service {
    constructor(chief) {
        super();
        _RayCaster_chief.set(this, void 0);
        __classPrivateFieldSet(this, _RayCaster_chief, chief, "f");
    }
    execute() {
        const raySources = __classPrivateFieldGet(this, _RayCaster_chief, "f").world.getCollection('RaySources');
        raySources.forEach(raySource => {
            let rays = raySource.rays;
            // Input check
            if (typeof rays != 'object') {
                throw Error('Invalid ray array specified for raySource');
            }
            //
            rays.forEach(ray => {
                this.castRay(raySource.pos, ray, raySource.wallIndices);
            });
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
        if ((newHorizontalIndex !== false || newVerticalIndex !== false) && (ray.collidesWith.isMirror === true)) {
            let isClosestHorizontal = ray.collidesWith.getType() == 'HorizontalWall';
            let angleAdd = isClosestHorizontal ? 360 : 180;
            if (!ray.reflected.getType) {
                ray.reflected.degree = (angleAdd - ray.degree);
                let reflectedRay = __classPrivateFieldGet(this, _RayCaster_chief, "f").world.createAgent('Ray');
                reflectedRay.source = ray;
                ray.reflected = reflectedRay;
            }
            ray.reflected.active = true;
            ray.reflected.degree = (angleAdd - ray.degree);
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
        //return false;
        let sense;
        // Get sense
        if ((ray.degree % 360) > 270 && (ray.degree % 360) < 360)
            sense = 1;
        else if ((ray.degree % 360) >= 0 && (ray.degree % 360) < 90)
            sense = 1;
        else if ((ray.degree % 360) > 90 && (ray.degree % 360) < 270)
            sense = -1;
        if (!sense)
            return false; // Cannot collide; it is totally horizontal
        // console.log('Vertical----------------------------------');
        // console.log('sense:',sense, 'index',index);
        const walls = __classPrivateFieldGet(this, _RayCaster_chief, "f").world.getCollection('VerticalWalls');
        for (index += (sense == 1 ? 1 : 0); (index < walls.length && sense == 1) || (index >= 0 && sense == -1); index += sense) {
            //console.log(walls[index]);
            let hasCollided = CollisionDetector.RayVsVerticalLine(ray, walls[index]);
            if (hasCollided) {
                let isCloser = this.compareWithClosest(ray, hasCollided);
                if (isCloser) {
                    //console.log('change');
                    ray.collidesAt.x = hasCollided[0];
                    ray.collidesAt.y = hasCollided[1];
                    ray.collidesWith = walls[index];
                    // console.log('so:', ray.collidesAt);
                }
                index -= (sense == 1 ? 1 : 0) - 1;
                return index;
            }
        }
        return false;
    }
    testAgainstHorizontalWalls(ray, index) {
        //return false;
        let sense = 0;
        // Get sense
        if (ray.degree > 0 && ray.degree < 180)
            sense = 1;
        else if (ray.degree > 180 && ray.degree < 360)
            sense = -1;
        if (!sense)
            return false; // Cannot collide; it is totally horizontal
        // console.log('Horizontal----------------------------------');
        // console.log('sense:',sense, 'index',index);
        const walls = __classPrivateFieldGet(this, _RayCaster_chief, "f").world.getCollection('HorizontalWalls');
        if (walls.length <= 0)
            return false;
        for (index += (sense == 1 ? 1 : 0); (index < walls.length && sense == 1) || (index >= 0 && sense == -1); index += sense) {
            let hasCollided = CollisionDetector.RayVsHorizontalLine(ray, walls[index]);
            if (hasCollided) {
                //console.log('ray has collided with wall at', hasCollided);
                let isCloser = this.compareWithClosest(ray, hasCollided);
                if (isCloser) {
                    ray.collidesAt.x = hasCollided[0];
                    ray.collidesAt.y = hasCollided[1];
                    ray.collidesWith = walls[index];
                    // console.log('so:', ray.collidesAt);
                }
                index -= (sense == 1 ? 1 : 0);
                return index;
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
