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
import Vector2D from "../../utils/physics/Vector2D.js";
import { camera } from "../../utils/scene/Camera.js";
class SceneRenderer2D extends Service {
    constructor(canvas) {
        super();
        _SceneRenderer2D_context.set(this, void 0);
        __classPrivateFieldSet(this, _SceneRenderer2D_context, canvas.getContext('2d'), "f");
        this.scale = 1.5 * 3;
    }
    execute() {
        const horizontalWalls = this.world.getCollection('HorizontalWalls');
        const verticalWalls = this.world.getCollection('VerticalWalls');
        const circles = this.world.getCollection('Circles');
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").fillStyle = 'rgba(0,0,0,1)';
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").fillRect(0, 0, 3000, 3000);
        horizontalWalls.forEach(wall => {
            this.renderWall(wall);
        });
        verticalWalls.forEach(wall => {
            this.renderWall(wall);
        });
        circles.forEach(circle => {
            this.renderCircle(circle);
        });
    }
    ;
    renderWall(wall) {
        if (!camera.castCenter)
            return;
        const deg = camera.castCenter?.direction.angle() * (180 / Math.PI);
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").strokeStyle = `rgba(${wall.color},1)`;
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").lineWidth = 1;
        let from = { x: wall.startX || wall.posX, y: wall.posY || wall.startY };
        let to = { x: wall.endX || wall.posX, y: wall.posY || wall.endY };
        from = Vector2D.rotate(from, camera.pos, deg);
        to = Vector2D.rotate(to, camera.pos, deg);
        from = Vector2D.sub(Vector2D.sub(from, camera.pos), { x: -10, y: -10 }).scale(this.scale);
        to = Vector2D.sub(Vector2D.sub(to, camera.pos), { x: -10, y: -10 }).scale(this.scale);
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").beginPath();
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").moveTo(from.x, from.y);
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").lineTo(to.x, to.y);
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").closePath();
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").stroke();
    }
    renderCircle(circle) {
        if (!camera.castCenter)
            return;
        const deg = camera.castCenter?.direction.angle() * (180 / Math.PI);
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").strokeStyle = `rgb(${circle.color})`;
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").lineWidth = 1;
        let center = Vector2D.rotate(circle.center, camera.pos, deg);
        center = Vector2D.sub(Vector2D.sub(center, camera.pos), { x: -10, y: -10 }).scale(this.scale);
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").beginPath();
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").arc(center.x, center.y, circle.radius * this.scale, 0, 2 * Math.PI);
        __classPrivateFieldGet(this, _SceneRenderer2D_context, "f").stroke();
    }
}
_SceneRenderer2D_context = new WeakMap();
export default SceneRenderer2D;
//# sourceMappingURL=SceneRenderer2D.js.map