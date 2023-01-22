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
import Service from "../../Service.js";
import { camera } from "../../../utils/Camera.js";
class VariableCalculator extends Service {
    constructor(chief) {
        super();
        _VariableCalculator_chief.set(this, void 0);
        __classPrivateFieldSet(this, _VariableCalculator_chief, chief, "f");
    }
    // The scene is a histogram of rectangles aligned verically to the middle of the canvas
    executeAsSubordinate() {
        const cameraDegree = camera.rays[Math.floor((camera.rays.length) / 2)].degree;
        const context = __classPrivateFieldGet(this, _VariableCalculator_chief, "f").context;
        const total = camera.rays.length;
        const canvasWidth = __classPrivateFieldGet(this, _VariableCalculator_chief, "f").canvas.width;
        const canvasHeight = __classPrivateFieldGet(this, _VariableCalculator_chief, "f").canvas.height;
        var index = 0;
        camera.rays.forEach((ray, rayIndex) => {
            index = rayIndex;
            _calculateVariables(this, ray);
        });
        // Each fraction is a portion of the total length of the canvas horizontally
        function _calculateVariables(service, ray, prevDistance = 0, adjustment = undefined) {
            let distanceX = Math.abs(Math.abs(ray.collidesAt.x) - Math.abs(ray.source.pos ? ray.source.pos.x : ray.source.collidesAt.x));
            let distanceY = Math.abs(Math.abs(ray.collidesAt.y) - Math.abs(ray.source.pos ? ray.source.pos.y : ray.source.collidesAt.y));
            let distance = Math.hypot(distanceX, distanceY) + prevDistance;
            adjustment = adjustment || Math.cos(Math.abs((Math.abs(cameraDegree - ray.degree) / 180) * Math.PI));
            let adjustedDistance = distance * adjustment;
            let leftTop = { x: ((canvasWidth * index) / total), y: (canvasHeight / 2) - (canvasHeight) / adjustedDistance };
            let size = { x: canvasWidth / total, y: (canvasHeight * 2) / adjustedDistance };
            let info = {
                leftTop: leftTop,
                size: size,
                distance: distance,
                color: ray.collidesWith.color,
                opacity: ray.collidesWith.opacity
            };
            if (info.opacity < 1 && ray.reflected.getType) {
                _calculateVariables(service, ray.reflected, distance, adjustment);
            }
            __classPrivateFieldGet(service, _VariableCalculator_chief, "f")._onvariablesCalculated(info); // Internal event notified to chief module
        }
    }
}
_VariableCalculator_chief = new WeakMap();
export default VariableCalculator;
