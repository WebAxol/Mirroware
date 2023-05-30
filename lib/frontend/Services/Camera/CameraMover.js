import Service from '../Service.js';
import { camera } from '../../utils/Camera.js';
class CameraMover extends Service {
    constructor() {
        super();
        this.keyPressCount = 0;
        this.speed = 0.5;
        this.command_KeyMap = {
            w: () => { this.translateCamera(0, this.speed); },
            s: () => { this.translateCamera(0, -this.speed); },
            a: () => { this.translateCamera(this.speed, 0); },
            d: () => { this.translateCamera(-this.speed, 0); },
            k: () => { this.rotateCamera(-5); },
            ñ: () => { this.rotateCamera(5); },
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
        camera.pos.x += x;
        camera.pos.y += y;
    }
    // EVENTS
    onkeydown(info) {
        if (this.control[info.key] !== undefined && this.control[info.key] !== true) {
            this.control[info.key] = true;
            this.keyPressCount++;
        }
    }
    onkeyup(info) {
        if (this.control[info.key] !== undefined) {
            this.control[info.key] = false;
            this.keyPressCount--;
        }
    }
}
export default CameraMover;
