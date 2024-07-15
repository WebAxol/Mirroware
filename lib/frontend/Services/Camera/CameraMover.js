import Service from '../Service.js';
import { camera } from '../../utils/scene/Camera.js';
import Vector2D from '../../utils/physics/Vector2D.js';
class CameraMover extends Service {
    constructor() {
        super();
        this.keyPressCount = 0;
        this.speed = 0;
        this.dt = 0;
        this.command_KeyMap = {
            w: () => { this.translateCamera(1, 0); },
            s: () => { this.translateCamera(-1, 0); },
            a: () => { this.translateCamera(0, 1); },
            d: () => { this.translateCamera(0, -1); },
            k: () => { this.rotateCamera(30 * this.dt); },
            l: () => { this.rotateCamera(-30 * this.dt); },
        };
        this.control = {
            w: false,
            s: false,
            d: false,
            a: false,
            k: false,
            l: false
        };
    }
    execute() {
        this.dt = 50 / this.world.fps;
        this.speed = 0.09 * this.dt;
        let keys = Object.keys(this.control);
        keys.forEach((key) => {
            if (this.control[key] === true) {
                this.command_KeyMap[key]();
            }
        });
    }
    rotateCamera(angle = 0) {
        if (!camera || !camera.castEdge || !camera.castCenter)
            return false;
        const complex = [Math.cos(angle / Math.PI / 180), Math.sin(angle / Math.PI / 180)];
        camera.castCenter.direction.complexRotate(complex);
        camera.castEdge.direction.complexRotate(complex);
    }
    ;
    translateCamera(forward = 0, lateral = 0) {
        if (!camera || !camera.castEdge || !camera.castCenter)
            return false;
        const complex = [Math.cos(Math.PI / 2), Math.sin(Math.PI / 2)];
        let frontalMovement = Vector2D.scale(camera.castCenter.direction, forward);
        let lateralMovement = Vector2D.complexRotate(camera.castCenter.direction, complex).scale(lateral);
        let movementDirection = frontalMovement.add(lateralMovement).normalize();
        let displacement = movementDirection.scale(this.speed);
        console.log(displacement, this.speed);
        camera.pos.add(displacement);
    }
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