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
var _RGBA_chief;
import Service from "../../Service.js";
import { camera } from "../../../utils/Camera.js";
class RGBA extends Service {
    constructor(chief) {
        super();
        _RGBA_chief.set(this, void 0);
        __classPrivateFieldSet(this, _RGBA_chief, chief, "f");
    }
    executeAsSubordinate(info) {
        this.renderRectangle(info);
        this.renderHorizontalBorders(info);
    }
    renderRectangle(info) {
        let context = __classPrivateFieldGet(this, _RGBA_chief, "f").context;
        let canvasWidth = __classPrivateFieldGet(this, _RGBA_chief, "f").canvas.width;
        context.fillStyle = `rgba(10,0,0,${info.opacity})`;
        context.fillRect(info.leftTop.x, info.leftTop.y, canvasWidth / camera.rays.length, info.size.y);
        if (!info.color)
            return;
        context.fillStyle = `rgba(${info.color}, ${info.opacity / ((info.distance * 5) / 15)}`;
        context.fillRect(info.leftTop.x, info.leftTop.y, canvasWidth / camera.rays.length, info.size.y);
    }
    renderHorizontalBorders(info) {
        let context = __classPrivateFieldGet(this, _RGBA_chief, "f").context;
        context.strokeStyle = `red`;
        context.lineWidth = 30 / info.distance;
        context.beginPath();
        context.moveTo(info.leftTop.x, info.leftTop.y);
        context.lineTo(info.leftTop.x + info.size.x, info.leftTop.y);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(info.leftTop.x, (info.leftTop.y + info.size.y));
        context.lineTo(info.leftTop.x + info.size.x, (info.leftTop.y + info.size.y));
        context.closePath();
        context.stroke();
    }
}
_RGBA_chief = new WeakMap();
export default RGBA;
