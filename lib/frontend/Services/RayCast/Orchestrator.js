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
var _RayCaster_variableCalculator, _RayCaster_rayCastProcessor;
import Service from "../Service.js";
import VariableCalculator from "./VariableCalculator.js";
import RayCastProcessor from './RayCastProcessor.js';
class RayCaster extends Service {
    constructor() {
        super();
        _RayCaster_variableCalculator.set(this, void 0);
        _RayCaster_rayCastProcessor.set(this, void 0);
        __classPrivateFieldSet(this, _RayCaster_variableCalculator, new VariableCalculator(this), "f");
        __classPrivateFieldSet(this, _RayCaster_rayCastProcessor, new RayCastProcessor(this), "f");
    }
    execute() {
        try {
            __classPrivateFieldGet(this, _RayCaster_variableCalculator, "f").execute();
            __classPrivateFieldGet(this, _RayCaster_rayCastProcessor, "f").execute();
            return true;
        }
        catch (err) {
            this.world.pauseExecution();
            console.error(err);
            return false;
        }
    }
    calculateRayProperties(source, ray) {
        return __classPrivateFieldGet(this, _RayCaster_variableCalculator, "f").calculateRayProperties(source, ray);
    }
}
_RayCaster_variableCalculator = new WeakMap(), _RayCaster_rayCastProcessor = new WeakMap();
export default RayCaster;
//# sourceMappingURL=Orchestrator.js.map