import Service from "../../Service.js";
import { Camera, camera } from "../../../utils/Camera.js";
import textures from "../../../utils/Textures.js";


class Texturer extends Service{

    #chief;

    constructor(chief){
        super();
        this.#chief = chief;
    }

    public executeAsSubordinate(info){

        let scale  = info.size.y / 1000;
        let height = 1000;
        let texture = textures.get('bricks');
        let context = this.#chief.context;
        let canvasHeight = this.#chief.canvas.height;
        
        context.globalAlpha = info.opacity / (info.distance / 5);
        context.scale(1,scale);
            
        context.drawImage(
            texture,
            (info.leftTop.x / 2) % 400,
            0,                 
            5,                  
            400,                
            info.leftTop.x,
            ((canvasHeight / 2) / scale) - (height / 2),
            15,                 
            height
        );

        context.scale(1, 1 / scale);
    }

}

export default Texturer;