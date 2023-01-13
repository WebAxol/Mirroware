import Service from "../Service.js";
import { Camera, camera } from "../../utils/Camera.js";

class InputHandler extends Service {

    constructor(){
        super();
    }

    public init() : boolean {

        // Global events

        console.log(this.world);
        window.addEventListener('keydown',  (e) => { this.keydown(e) }  );
     
        // Internal framework events

        this.world.registerEvent('keydown');
        this.world.registerServiceToEvent('CameraMover','keydown');

        return true;
    }

    public keydown(e){
        if(!this.world.pause){
            this.world.notifyEvent('keydown',{ key : e.key });
        }

    }

 
}

export default InputHandler;
