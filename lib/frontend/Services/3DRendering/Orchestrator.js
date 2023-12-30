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
var _SceneRenderer3D_dimensioner, _SceneRenderer3D_rgba, _SceneRenderer3D_texturer, _SceneRenderer3D_renderStack;
import Service from "../Service.js";
import Dimensioner from "./Dimensioner.js";
import RGBA from "./RGBA.js";
import Texturer from "./Texturer.js";
class SceneRenderer3D extends Service {
    constructor(canvas) {
        super();
        _SceneRenderer3D_dimensioner.set(this, void 0);
        _SceneRenderer3D_rgba.set(this, void 0);
        _SceneRenderer3D_texturer.set(this, void 0);
        _SceneRenderer3D_renderStack.set(this, void 0);
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
        __classPrivateFieldSet(this, _SceneRenderer3D_dimensioner, new Dimensioner(this), "f");
        __classPrivateFieldSet(this, _SceneRenderer3D_rgba, new RGBA(this), "f");
        __classPrivateFieldSet(this, _SceneRenderer3D_texturer, new Texturer(this), "f");
        __classPrivateFieldSet(this, _SceneRenderer3D_renderStack, [], "f");
    }
    addChunk(chunk) {
        __classPrivateFieldGet(this, _SceneRenderer3D_renderStack, "f").push(chunk);
    }
    popStack() {
        const chunk = __classPrivateFieldGet(this, _SceneRenderer3D_renderStack, "f").pop();
        if (chunk)
            this.world.removeAgent(chunk);
    }
    getStack() {
        return __classPrivateFieldGet(this, _SceneRenderer3D_renderStack, "f");
    }
    purgeStack() {
        while (__classPrivateFieldGet(this, _SceneRenderer3D_renderStack, "f").length) {
            this.popStack();
        }
    }
    execute() {
        try {
            this.context.fillStyle = 'rgb(0,0,0)';
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height / 2);
            this.context.fillRect(0, this.canvas.height / 2, this.canvas.width, this.canvas.height);
            const grd = this.context.createRadialGradient(this.canvas.width / 4, this.canvas.height / 4, 10, 100, 60, 100);
            grd.addColorStop(0, "rgba(0,200,0,1)");
            grd.addColorStop(1, "rgba(0,0,0,0)");
            this.context.fillStyle = grd;
            this.context.fillRect(0, this.canvas.height / 2, this.canvas.width, this.canvas.height);
            __classPrivateFieldGet(this, _SceneRenderer3D_dimensioner, "f").executeAsSubordinate();
            __classPrivateFieldGet(this, _SceneRenderer3D_rgba, "f").executeAsSubordinate();
            __classPrivateFieldGet(this, _SceneRenderer3D_texturer, "f").executeAsSubordinate();
            this.purgeStack();
        }
        catch (err) {
            console.error(err);
            this.world.pauseExecution();
        }
    }
}
_SceneRenderer3D_dimensioner = new WeakMap(), _SceneRenderer3D_rgba = new WeakMap(), _SceneRenderer3D_texturer = new WeakMap(), _SceneRenderer3D_renderStack = new WeakMap();
export default SceneRenderer3D;
//# sourceMappingURL=Orchestrator.js.map