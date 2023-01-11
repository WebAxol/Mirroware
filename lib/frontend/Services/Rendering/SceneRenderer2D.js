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
var _SceneRenderer2D_context;
import Service from "../Service.js";
class SceneRenderer2D extends Service {
    constructor(c) {
        super();
        _SceneRenderer2D_context.set(this, void 0);
        __classPrivateFieldSet(this, _SceneRenderer2D_context, c, "f");
        this.scale = 50;
    }
    execute() {
        const horizontalWalls = this.world.getCollection('HorizontalWalls');
        const verticalWalls = this.world.getCollection('VerticalWalls');
        const raySource = this.world.getCollection('RaySources')[0];
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").fillStyle = 'rgba(0,0,0,0.1)';
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").fillRect(0, 0, 3000, 1500);
        raySource.rays.forEach(ray => {
            this.renderRay(ray, raySource.pos);
        });
        horizontalWalls.forEach(wall => {
            this.renderHorizontalWall(wall);
        });
        verticalWalls.forEach(wall => {
            this.renderVerticalWall(wall);
        });
    }
    ;
    renderHorizontalWall(wall) {
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").strokeStyle = 'red';
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").lineWidth = 3;
        if (wall.isMirror)
            __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").strokeStyle = 'lawngreen';
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").beginPath();
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").moveTo(wall.startX * this.scale, wall.posY * this.scale);
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").lineTo(wall.endX * this.scale, wall.posY * this.scale);
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").closePath();
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").stroke();
    }
    renderVerticalWall(wall) {
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").strokeStyle = 'red';
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").lineWidth = 3;
        if (wall.isMirror)
            __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").strokeStyle = 'lawngreen';
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").beginPath();
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").moveTo(wall.posX * this.scale, wall.startY * this.scale);
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").lineTo(wall.posX * this.scale, wall.endY * this.scale);
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").closePath();
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").stroke();
    }
    renderRay(ray, source) {
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").strokeStyle = 'white';
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").lineWidth = 3;
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").beginPath();
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").moveTo(source.x * this.scale, source.y * this.scale);
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").lineTo(ray.collidesAt.x * this.scale, ray.collidesAt.y * this.scale);
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").closePath();
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").stroke();
        if (ray.reflected.getType && ray.reflected.active) {
            this.renderRay(ray.reflected, ray.collidesAt);
        }
    }
}
_SceneRenderer2D_context = new WeakMap();
export default SceneRenderer2D;