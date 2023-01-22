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
var _SceneRenderer3D_canvas, _SceneRenderer3D_context;
import Service from "../../Service.js";
import { camera } from "../../../utils/Camera.js";
import textures from "../../../utils/Textures.js";
// TODO: Modularize into finer-grained rendering sub-services
class SceneRenderer3D extends Service {
    constructor(canvas) {
        super();
        _SceneRenderer3D_canvas.set(this, void 0);
        _SceneRenderer3D_context.set(this, void 0);
        __classPrivateFieldSet(this, _SceneRenderer3D_canvas, canvas, "f");
        __classPrivateFieldSet(this, _SceneRenderer3D_context, canvas.getContext('2d'), "f");
    }
    execute() {
        __classPrivateFieldGet(this, _SceneRenderer3D_context, "f").fillStyle = 'rgba(0,0,0,1)';
        __classPrivateFieldGet(this, _SceneRenderer3D_context, "f").fillRect(0, 0, __classPrivateFieldGet(this, _SceneRenderer3D_canvas, "f").width, __classPrivateFieldGet(this, _SceneRenderer3D_canvas, "f").height);
        __classPrivateFieldGet(this, _SceneRenderer3D_context, "f").fillStyle = 'brown';
        __classPrivateFieldGet(this, _SceneRenderer3D_context, "f").fillRect(0, 0, __classPrivateFieldGet(this, _SceneRenderer3D_canvas, "f").width, __classPrivateFieldGet(this, _SceneRenderer3D_canvas, "f").height / 2);
        this.renderScene(camera);
    }
    // The scene is a histogram of rectangles aligned verically to the middle of the canvas
    renderScene(camera) {
        const cameraDegree = camera.rays[Math.floor((camera.rays.length) / 2)].degree;
        const context = __classPrivateFieldGet(this, _SceneRenderer3D_context, "f");
        const total = camera.rays.length;
        const canvasWidth = __classPrivateFieldGet(this, _SceneRenderer3D_canvas, "f").width;
        const canvasHeight = __classPrivateFieldGet(this, _SceneRenderer3D_canvas, "f").height;
        var index = 0;
        camera.rays.forEach((ray, rayIndex) => {
            index = rayIndex;
            _calculateVariables(ray);
        });
        // Each fraction is a portion of the total length of the canvas horizontally
        function _calculateVariables(ray, prevDistance = 0, adjustment = undefined) {
            let distanceX = Math.abs(Math.abs(ray.collidesAt.x) - Math.abs(ray.source.pos ? ray.source.pos.x : ray.source.collidesAt.x));
            let distanceY = Math.abs(Math.abs(ray.collidesAt.y) - Math.abs(ray.source.pos ? ray.source.pos.y : ray.source.collidesAt.y));
            let distance = Math.hypot(distanceX, distanceY) + prevDistance;
            adjustment = adjustment || Math.cos(Math.abs((Math.abs(cameraDegree - ray.degree) / 180) * Math.PI));
            let adjustedDistance = distance * adjustment;
            let leftTop = { x: ((canvasWidth * index) / total), y: (canvasHeight / 2) - (canvasHeight) / adjustedDistance };
            let size = { x: canvasWidth / total, y: (canvasHeight * 2) / adjustedDistance };
            let info = {
                leftTop: leftTop,
                size: size,
                distance: distance,
                color: ray.collidesWith.color,
                opacity: ray.collidesWith.opacity
            };
            if (info.opacity < 1 && ray.reflected.getType) {
                _calculateVariables(ray.reflected, distance, adjustment);
            }
            _renderRectangle(info);
            _renderHorizontalBorders(info);
        }
        function _renderRGBA(info) {
            context.fillStyle = `rgba(${info.color}, ${info.opacity / (info.distance / 5)}`;
            context.fillRect(info.leftTop.x, info.leftTop.y, canvasWidth / total, info.size.y);
            context.globalAlpha = 1;
        }
        function _renderTexture(info) {
            let scale = info.size.y / 1000;
            let height = 1000;
            let texture = textures.get('bricks');
            context.globalAlpha = info.opacity / (info.distance / 5);
            context.scale(1, scale);
            context.drawImage(texture, (info.leftTop.x / 2) % 400, 0, 5, 400, info.leftTop.x, ((canvasHeight / 2) / scale) - (height / 2), 15, height);
            context.scale(1, 1 / scale);
        }
        function _renderRectangle(info) {
            context.fillStyle = `rgba(0,0,0,${info.opacity})`;
            context.fillRect(info.leftTop.x, info.leftTop.y, canvasWidth / total, info.size.y);
            _renderTexture(info);
            context.globalAlpha = 1;
        }
        function _renderHorizontalBorders(info) {
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
}
_SceneRenderer3D_canvas = new WeakMap(), _SceneRenderer3D_context = new WeakMap();
export default SceneRenderer3D;
