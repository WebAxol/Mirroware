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
var _RayProcessor_rayCalculator;
import Service from "../Service.js";
import RayCalculator from "./RayCalculator.js";
class RayProcessor extends Service {
    constructor() {
        super();
        // subordinate services
        _RayProcessor_rayCalculator.set(this, void 0);
        __classPrivateFieldSet(this, _RayProcessor_rayCalculator, new RayCalculator(this), "f");
    }
    execute() {
        try {
            __classPrivateFieldGet(this, _RayProcessor_rayCalculator, "f").execute();
            return true;
        }
        catch (err) {
            this.world.pauseExecution();
            console.error(err);
            return false;
        }
    }
}
_RayProcessor_rayCalculator = new WeakMap();
export default RayProcessor;
