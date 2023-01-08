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
var _VariableCalculator_chief;
import Service from "../Service.js";
class VariableCalculator extends Service {
    constructor(chief) {
        super();
        _VariableCalculator_chief.set(this, void 0);
        __classPrivateFieldSet(this, _VariableCalculator_chief, chief, "f");
    }
    execute() {
        this.calculateRayProperties();
    }
    calculateRaySlope(ray) {
        // Input check
        if (typeof ray.slope != 'number' || typeof ray.degree != 'number') {
            console.log(ray);
            throw Error('Invalid argument passed as ray');
        }
        //
        let degrees = ((ray.degree / 180) * Math.PI);
        ray.slope = Math.sin(degrees) / Math.cos(degrees);
    }
    calculateRayYIntercept(pos, ray) {
        // Input check
        if (typeof ray.YIntercept != 'number') {
            throw Error('Invalid argument passed as ray');
        }
        //
        ray.YIntercept = pos.y - (ray.slope * pos.x);
    }
    calculateRayProperties() {
        const raySources = __classPrivateFieldGet(this, _VariableCalculator_chief, "f").world.getCollection('RaySources');
        raySources.forEach(raySource => {
            let rays = raySource.rays;
            rays.forEach(ray => {
                this.calculateRaySlope(ray);
                this.calculateRayYIntercept(raySource.pos, ray);
            });
        });
        return true;
    }
    ;
}
_VariableCalculator_chief = new WeakMap();
export default VariableCalculator;
