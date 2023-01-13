import Service from "../Service.js";
class InputHandler extends Service {
    constructor() {
        super();
    }
    init() {
        // Global events
        window.addEventListener('keypress', (e) => { this.keypress(e); });
        window.addEventListener('mousemove', (e) => { this.mousemove(e); });
        // Internal framework events
        this.world.registerEvent('keypressed');
        this.world.registerEvent('mousemoved');
        return true;
    }
    keypress(e) {
        if (!this.world.pause) {
            const key = e.keyCode;
            console.log(key);
            let camera = this.world.getCollection('RaySources')[0];
            let cameraDegree = camera.rays[Math.floor((camera.rays.length - 1) / 2)].degree * (Math.PI / 180);
            //console.log(cameraDegree);
            switch (key) {
                case 87:
                    camera.pos.x += Math.cos(cameraDegree) * 0.2;
                    camera.pos.y += Math.sin(cameraDegree) * 0.2;
                    break;
                case 83:
                    camera.pos.x -= Math.cos(cameraDegree) * 0.2;
                    break;
                case 68:
                    camera.pos.y += 0.2;
                    break;
                case 65:
                    camera.pos.y -= 0.2;
                    break;
                case 39:
                    this.rotateCamera(camera, 2);
                    break;
                case 37: this.rotateCamera(camera, -2);
            }
        }
    }
    rotateCamera(camera, amount) {
        camera.rays.forEach(ray => {
            ray.degree = (ray.degree + amount) % 360;
        });
    }
    mousemove(e) { }
}
export default InputHandler;
