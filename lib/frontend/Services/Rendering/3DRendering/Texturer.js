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
var _Texturer_chief;
import Service from "../../Service.js";
import textures from "../../../utils/Textures.js";
class Texturer extends Service {
    constructor(chief) {
        super();
        _Texturer_chief.set(this, void 0);
        __classPrivateFieldSet(this, _Texturer_chief, chief, "f");
    }
    executeAsSubordinate(info) {
        let scale = info.size.y / 1000;
        let height = 1000;
        let texture = textures.get('bricks');
        let context = __classPrivateFieldGet(this, _Texturer_chief, "f").context;
        let canvasHeight = __classPrivateFieldGet(this, _Texturer_chief, "f").canvas.height;
        context.globalAlpha = info.opacity / (info.distance / 5) / 5;
        context.scale(1, scale);
        context.drawImage(texture, (info.leftTop.x / 2) % 400, 0, 5, 400, info.leftTop.x, ((canvasHeight / 2) / scale) - (height / 2), 15, height);
        context.scale(1, 1 / scale);
    }
}
_Texturer_chief = new WeakMap();
export default Texturer;
