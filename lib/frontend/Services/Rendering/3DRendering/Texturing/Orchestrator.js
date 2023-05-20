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
var _Texturer_textureMapper, _Texturer_textureDisplayer;
import Service from "../../../Service.js";
import TextureMapper from './TextureMapper.js';
import TextureDisplayer from './TextureDisplayer.js';
class Texturer extends Service {
    constructor(chief) {
        super();
        _Texturer_textureMapper.set(this, void 0);
        _Texturer_textureDisplayer.set(this, void 0);
        this.chief = chief; // Sub-service of SceneRenderer3D
        // subordinate services
        __classPrivateFieldSet(this, _Texturer_textureMapper, new TextureMapper(this), "f");
        __classPrivateFieldSet(this, _Texturer_textureDisplayer, new TextureDisplayer(this), "f");
    }
    executeAsSubordinate(info) {
        __classPrivateFieldGet(this, _Texturer_textureDisplayer, "f").executeAsSubordinate(info);
    }
}
_Texturer_textureMapper = new WeakMap(), _Texturer_textureDisplayer = new WeakMap();
export default Texturer;
