import Service from '../Service.js';
import { Camera, camera } from '../../utils/Camera.js';

class CameraMover extends Service{

    private control;
    private command_KeyMap;
    private keyPressCount :number = 0;
    private speed :number = 0.5;

    constructor(){
        super();

        this.command_KeyMap = {
            w : () => { this.translateCamera(0, this.speed) },
            s : () => { this.translateCamera(0,-this.speed) },
            a : () => { this.translateCamera( this.speed,0) },
            d : () => { this.translateCamera(-this.speed,0) }
        }

        this.control = {
            w : false,
            s : false,
            d : false,
            a : false
        }
    }

    public execute() {
        
        let keys = Object.keys(this.control);

        keys.forEach((key) => {

            if(this.control[key] === true){

                console.log(key);

                this.command_KeyMap[key]();
            }
        });

    }

    private rotateCamera(angle :number = 0){

        camera.rays.forEach(ray => {
            ray.degree = ray.degree % 360;
            ray.degree = Math.abs((ray.degree + angle)) % 360;
        });
    };

    private translateCamera(x :number = 0, y : number = 0){

        camera.pos.x += x;
        camera.pos.y += y;

        console.log(camera.pos);
    }

    // EVENTS

    public onkeydown(info){

        if(this.control[info.key] !== undefined && this.control[info.key] !== true){
            this.control[info.key] = true;
            this.keyPressCount++;

            console.log(this.keyPressCount);
        }
    }

    public onkeyup(info){

        if(this.control[info.key] !== undefined){
            this.control[info.key] = false;
            this.keyPressCount--;

            console.log(this.keyPressCount);
        }
    }
}

export default CameraMover;