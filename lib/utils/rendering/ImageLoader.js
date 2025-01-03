var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ImageLoader_textures;
class ImageLoader {
    constructor() {
        _ImageLoader_textures.set(this, new Map());
    }
    load(name, src) {
        if (typeof name !== 'string' || !name) {
            throw Error(`Invalid texture name given, it must be a non-empty string`);
        }
        if (__classPrivateFieldGet(this, _ImageLoader_textures, "f").get(name))
            throw Error(`Cannot add texture with name '${name}'; the name has already been registered`);
        try {
            const image = new Image();
            image.src = './assets/textures/' + src;
            __classPrivateFieldGet(this, _ImageLoader_textures, "f").set(name, image);
        }
        catch (err) {
            throw Error(`The image with source '/img/textures/${src}' could not be found`);
        }
        return true;
    }
    remove(name) {
        return __classPrivateFieldGet(this, _ImageLoader_textures, "f").delete(name);
    }
    get(name) {
        const texture = __classPrivateFieldGet(this, _ImageLoader_textures, "f").get(name);
        return texture ? texture : false;
    }
}
_ImageLoader_textures = new WeakMap();
export default ImageLoader;
//# sourceMappingURL=ImageLoader.js.map