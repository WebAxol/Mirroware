import Service from '../Service.js';
import { camera } from '../../utils/Camera.js';
import Vector2D from '../../utils/Vector2D.js';
class CameraMover extends Service {
    constructor() {
        super();
        this.keyPressCount = 0;
        this.speed = 0.41;
        this.dt = 0;
        this.command_KeyMap = {
            w: () => { this.translateCamera(0, 1); },
            s: () => { this.translateCamera(0, -1); },
            a: () => { this.translateCamera(1, 0); },
            d: () => { this.translateCamera(-1, 0); },
            k: () => { this.rotateCamera(-3 * this.dt); },
            ñ: () => { this.rotateCamera(3 * this.dt); },
        };
        this.control = {
            w: false,
            s: false,
            d: false,
            a: false,
            k: false,
            ñ: false
        };
    }
    execute() {
        this.dt = 50 / this.world.fps;
        this.speed = 0.41 * this.dt;
        let keys = Object.keys(this.control);
        keys.forEach((key) => {
            if (this.control[key] === true) {
                this.command_KeyMap[key]();
            }
        });
    }
    rotateCamera(angle = 0) {
        camera.rays.forEach(ray => {
            ray.degree = (ray.degree + angle) % 360;
            if (ray.degree < 0)
                ray.degree += 360;
        });
    }
    ;
    translateCamera(x = 0, y = 0) {
        let midRay = camera.rays[Math.floor(camera.rays.length / 2)];
        let sense = (midRay.degree > 270 || midRay.degree < 90) ? 1 : -1;
        let direction = y ? midRay.slope : -1 * Math.pow(midRay.slope, -1);
        let normalize = Vector2D.normalize(new Vector2D(1, direction));
        let addX = (normalize.x * sense * (x | y) * this.speed);
        let addY = (normalize.y * sense * (x | y) * this.speed);
        if (Math.abs(addX) >= 0)
            camera.pos.x += addX;
        if (Math.abs(addY) >= 0)
            camera.pos.y += addY;
    }
    // EVENTS
    onkeydown(info) {
        if (this.control[info.key] !== undefined && this.control[info.key] !== true) {
            this.control[info.key] = true;
        }
    }
    onkeyup(info) {
        if (this.control[info.key] !== undefined && this.control[info.key] !== false) {
            this.control[info.key] = false;
        }
    }
}
export default CameraMover;
//# sourceMappingURL=CameraMover.js.map