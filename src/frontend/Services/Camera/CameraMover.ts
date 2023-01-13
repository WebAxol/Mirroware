import Service from '../Service.js';
import { Camera, camera } from '../../utils/Camera.js';

class CameraMover extends Service{

    public control;
    public control_KeyMap;

    constructor(){
        super();

        this.control_KeyMap = {
            w : 'moveFront',
            s : 'moveBack',
            k : 'rotateClockwise',
            ñ : 'rotateAntiClockwise'
        }

        this.control = {
            moveFront : false,
            moveBack  : false,
            rotateClockwise     : false,
            rotateAntiClockwise : false
        }
      
    }

    public execute() {

    }

    public onkeydown(info){

        let mappedOperation : string  = this.control_KeyMap[info.key];

        if(mappedOperation && this.control[mappedOperation] !== undefined){
            this.control[mappedOperation] = true;
            console.log(this.control);
        }
    }

    public onkeyup(info){

        let mappedOperation : string  = this.control_KeyMap[info.key];

        if(mappedOperation && this.control[mappedOperation] !== undefined){
            this.control[mappedOperation] = false;
            console.log(this.control);
        }
    }

    public

    public rotateCamera(angle){

        camera.rays.forEach(ray => {
            ray.degree = ray.degree % 360;
            ray.degree = Math.abs((ray.degree + angle)) % 360;
        });
    };

    public translateCamera(){

    }

}

export default CameraMover;