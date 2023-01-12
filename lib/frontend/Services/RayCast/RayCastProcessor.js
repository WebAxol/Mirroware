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
var _RayCastProcessor_variableCalculator, _RayCastProcessor_raycaster;
import Service from "../Service.js";
import VariableCalculator from "./VariableCalculator.js";
import RayCaster from "./RayCaster.js";
class RayCastProcessor extends Service {
    constructor() {
        super();
        // subordinate services
        _RayCastProcessor_variableCalculator.set(this, void 0); // Calculates required variables for the raycasting algorithm
        _RayCastProcessor_raycaster.set(this, void 0); // Uses previously calculated variables to perform the raycast algorithm
        __classPrivateFieldSet(this, _RayCastProcessor_variableCalculator, new VariableCalculator(this), "f");
        __classPrivateFieldSet(this, _RayCastProcessor_raycaster, new RayCaster(this), "f");
    }
    execute() {
        try {
            let source = this.world.getCollection('RaySources')[0];
            source.rays.forEach(ray => {
                ray.degree = (ray.degree + 1) % 360;
            });
            __classPrivateFieldGet(this, _RayCastProcessor_variableCalculator, "f").execute();
            __classPrivateFieldGet(this, _RayCastProcessor_raycaster, "f").execute();
            return true;
        }
        catch (err) {
            this.world.pauseExecution();
            console.error(err);
            return false;
        }
    }
    calculateRayProperties(source, ray) {
        return __classPrivateFieldGet(this, _RayCastProcessor_variableCalculator, "f").calculateRayProperties(source, ray);
    }
}
_RayCastProcessor_variableCalculator = new WeakMap(), _RayCastProcessor_raycaster = new WeakMap();
export default RayCastProcessor;
