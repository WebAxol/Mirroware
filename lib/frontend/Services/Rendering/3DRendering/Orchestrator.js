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
var _SceneRenderer3D_dimensioner, _SceneRenderer3D_rgba, _SceneRenderer3D_texturer, _SceneRenderer3D_modelPurger;
import Service from "../../Service.js";
// subordinate modules
import Dimensioner from "./Dimensioner.js";
import RGBA from "./RGBA.js";
import Texturer from "./Texturer.js";
class SceneRenderer3D extends Service {
    constructor(canvas) {
        super();
        _SceneRenderer3D_dimensioner.set(this, void 0);
        _SceneRenderer3D_rgba.set(this, void 0);
        _SceneRenderer3D_texturer.set(this, void 0);
        _SceneRenderer3D_modelPurger.set(this, void 0);
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        // subordinates (orchestrated services)
        __classPrivateFieldSet(this, _SceneRenderer3D_dimensioner, new Dimensioner(this), "f");
        __classPrivateFieldSet(this, _SceneRenderer3D_rgba, new RGBA(this), "f");
        __classPrivateFieldSet(this, _SceneRenderer3D_texturer, new Texturer(this), "f");
    }
    execute() {
        // Render ceiling
        this.context.fillStyle = 'rgba(0,0,0,1)';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Render floor
        this.context.fillStyle = 'brown';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height / 2);
        try {
            __classPrivateFieldGet(this, _SceneRenderer3D_dimensioner, "f").executeAsSubordinate();
        }
        catch (err) {
            console.error(err);
            this.world.pauseExecution();
        }
    }
    _onvariablesCalculated(info) {
        __classPrivateFieldGet(this, _SceneRenderer3D_rgba, "f").executeAsSubordinate(info);
        __classPrivateFieldGet(this, _SceneRenderer3D_texturer, "f").executeAsSubordinate(info);
        this.context.globalAlpha = 1;
    }
}
_SceneRenderer3D_dimensioner = new WeakMap(), _SceneRenderer3D_rgba = new WeakMap(), _SceneRenderer3D_texturer = new WeakMap(), _SceneRenderer3D_modelPurger = new WeakMap();
export default SceneRenderer3D;
