import Service from '../Service.js';
import { camera } from '../../utils/Camera.js';
class CameraMover extends Service {
    constructor() {
        super();
        this.control_KeyMap = {
            w: 'moveFront',
            s: 'moveBack',
            k: 'rotateClockwise',
            ñ: 'rotateAntiClockwise'
        };
        this.control = {
            moveFront: false,
            moveBack: false,
            rotateClockwise: false,
            rotateAntiClockwise: false
        };
    }
    execute() {
    }
    onkeydown(info) {
        let mappedOperation = this.control_KeyMap[info.key];
        if (mappedOperation && this.control[mappedOperation] !== undefined) {
            this.control[mappedOperation] = true;
            console.log(this.control);
        }
    }
    onkeyup(info) {
        let mappedOperation = this.control_KeyMap[info.key];
        if (mappedOperation && this.control[mappedOperation] !== undefined) {
            this.control[mappedOperation] = false;
            console.log(this.control);
        }
    }
    rotateCamera(angle) {
        camera.rays.forEach(ray => {
            ray.degree = ray.degree % 360;
            ray.degree = Math.abs((ray.degree + angle)) % 360;
        });
    }
    ;
    translateCamera() {
    }
}
export default CameraMover;
