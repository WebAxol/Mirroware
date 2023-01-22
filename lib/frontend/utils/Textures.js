var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Textures_textures;
class Textures {
    constructor() {
        _Textures_textures.set(this, {});
    }
    add(textureName, src) {
        if (typeof textureName !== 'string' || !textureName) {
            throw Error(`Invalid texture name given, it must be a non-empty string`);
        }
        if (__classPrivateFieldGet(this, _Textures_textures, "f")[textureName]) {
            throw Error(`Cannot add texture with name '${textureName}'; the name has already been registered`);
        }
        let image;
        try {
            image = new Image();
            image.src = './img/textures/' + src; // at '/public'
        }
        catch (err) {
            throw Error(`The image with source '/img/textures/${src}' could not be found`);
        }
        __classPrivateFieldGet(this, _Textures_textures, "f")[textureName] = image;
        return true;
    }
    remove(textureName) {
        if (!__classPrivateFieldGet(this, _Textures_textures, "f")[textureName]) {
            return false;
        }
        delete __classPrivateFieldGet(this, _Textures_textures, "f")[textureName];
        return true;
    }
    get(textureName) {
        if (!__classPrivateFieldGet(this, _Textures_textures, "f")[textureName]) {
            return false;
        }
        return __classPrivateFieldGet(this, _Textures_textures, "f")[textureName];
    }
}
_Textures_textures = new WeakMap();
const textures = new Textures();
// add Textures to 'textures' : textures.add(textureName,src);
textures.add('bricks', 'bricks.png');
//
export default textures;
