import Service from '../Service.js';
class CameraMover extends Service {
    constructor() {
        super();
        this.keyPressCount = 0;
        this.speed = 0.31;
        this.dt = 0;
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
        this.speed = 0.31 * this.dt;
        let keys = Object.keys(this.control);
        keys.forEach((key) => {
            if (this.control[key] === true) {
                this.command_KeyMap[key]();
            }
        });
    }
}
export default CameraMover;
//# sourceMappingURL=CameraMover.js.map