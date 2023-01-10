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
                this.castRay(ray, raySource.wallIndices);
            });
        });
    }
    castRay(ray, indices) {
        // Input check
        if (typeof indices.horizontal != 'number' || typeof indices.vertical != 'number') {
            throw Error('invalid wallIndices property');
        }
        //
        this.testAgainstHorizontalWalls(ray, indices.horizontal);
        //this.testAgainstVerticalWalls(ray,indices.vertical);
    }
    // WARNING: The following functions assume that wall collections are properly sorted in ascending order
    testAgainstVerticalWalls(ray, index) {
        let sense;
        // Get sense
        if (ray.degree > 0 && ray.degree < 180)
            sense = 1;
        else if (ray.degree > 180 && ray.degree < 360)
            sense = -1;
        if (!sense)
            return false; // Cannot collide; it is totally horizontal
        console.log(sense);
        const walls = __classPrivateFieldGet(this, _RayCaster_chief, "f").world.getCollection('VerticalWalls');
        for (let i = index; (i < walls.length && sense == 1) || (i >= 0 && sense == -1); i += sense) {
            console.log(i);
            let hasCollided = CollisionDetector.RayVsHorizontalLine(ray, walls[i]);
            if (hasCollided) {
                console.log('ray has collided with wall', walls[i]);
            }
        }
    }
    testAgainstHorizontalWalls(ray, index) {
        let sense;
        // Get sense
        if (ray.degree > 0 && ray.degree < 180)
            sense = 1;
        else if (ray.degree > 180 && ray.degree < 360)
            sense = -1;
        if (!sense)
            return false; // Cannot collide; it is totally horizontal
        console.log(sense);
        const walls = __classPrivateFieldGet(this, _RayCaster_chief, "f").world.getCollection('HorizontalWalls');
        for (let i = index; (i < walls.length && sense == 1) || (i >= 0 && sense == -1); i += sense) {
            console.log(i);
            let hasCollided = CollisionDetector.RayVsHorizontalLine(ray, walls[i]);
            if (hasCollided) {
                console.log('ray has collided with wall', walls[i]);
            }
        }
    }
}
_RayCaster_chief = new WeakMap();
export default RayCaster;
