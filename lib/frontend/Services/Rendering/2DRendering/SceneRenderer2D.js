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
import Service from "../../Service.js";
import { camera } from "../../../utils/Camera.js";
class SceneRenderer2D extends Service {
    constructor(canvas) {
        super();
        _SceneRenderer2D_context.set(this, void 0);
        __classPrivateFieldSet(this, _SceneRenderer2D_context, canvas.getContext('2d'), "f");
        this.scale = 100;
    }
    execute() {
        const horizontalWalls = this.world.getCollection('HorizontalWalls');
        const verticalWalls = this.world.getCollection('VerticalWalls');
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").fillStyle = 'rgba(0,0,0,1)';
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").fillRect(0, 0, 3000, 3000);
        camera.rays.forEach(ray => {
            this.renderRay(ray, camera.pos);
        });
        horizontalWalls.forEach(wall => {
            this.renderWall(wall);
        });
        verticalWalls.forEach(wall => {
            this.renderWall(wall);
        });
    }
    ;
    renderWall(wall) {
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").strokeStyle = `rgba(${wall.color},1)`;
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").lineWidth = 15;
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").beginPath();
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").moveTo((wall.startX || wall.posX) * this.scale, (wall.posY || wall.startY) * this.scale);
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").lineTo((wall.endX || wall.posX) * this.scale, (wall.posY || wall.endY) * this.scale);
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").closePath();
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").stroke();
    }
    renderRay(ray, source) {
        if (ray.reflected.getType && ray.reflected.active) {
            this.renderRay(ray.reflected, ray.collidesAt);
        }
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").strokeStyle = ray.level <= 1 ? 'white' : 'red';
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").lineWidth = 1;
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").beginPath();
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").moveTo(source.x * this.scale, source.y * this.scale);
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").lineTo(ray.collidesAt.x * this.scale, ray.collidesAt.y * this.scale);
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").closePath();
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").stroke();
    }
}
_SceneRenderer2D_context = new WeakMap();
export default SceneRenderer2D;
