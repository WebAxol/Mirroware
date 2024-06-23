import Service from "../Service.js";
import { Camera, camera } from "../../utils/scene/Camera.js";

class InputHandler extends Service {

    constructor(){
        super();
    }

    public init() : boolean {

        // Global window events

        window.addEventListener('keydown',  (e) => { this.keydown(e) });
        window.addEventListener('keyup',    (e) => { this.keyup(e)   });
    
        // Internal framework events

        this.world.registerEvent('keydown');
        this.world.registerEvent('keyup');

        this.world.registerServiceToEvent('CameraMover','keydown');
        this.world.registerServiceToEvent('CameraMover','keyup');
        
        return true;
    }

    private keydown(e){
        if(!this.world.pause) this.world.notifyEvent('keydown',{ key : e.key });
    }

    private keyup(e){
        if(!this.world.pause) this.world.notifyEvent('keyup',{ key : e.key });

    }

 
}

export default InputHandler;
