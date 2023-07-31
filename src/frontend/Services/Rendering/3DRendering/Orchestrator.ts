import Service from "../../Service.js";

// subordinate modules

import Dimensioner from "./Dimensioner.js";
import RGBA from "./RGBA.js";
import Texturer from "./Texturer.js";

class  SceneRenderer3D extends Service{
    
    protected canvas;
    protected context;
    
    #dimensioner;
    #rgba;
    #texturer;
    #modelPurger;

    constructor(canvas){

        super();

        this.canvas  = canvas;
        this.context = canvas.getContext('2d');

        // subordinates (orchestrated services)

        this.#dimensioner = new Dimensioner(this);
        this.#rgba = new RGBA(this);
        this.#texturer = new Texturer(this);
    }

    public execute(){

        // Clear canvas

        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);


        try{    
            this.#dimensioner.executeAsSubordinate();
        }
        catch(err){
            console.error(err);
            this.world.pauseExecution();
        }
    }

    public _onvariablesCalculated(info){

        this.#rgba.executeAsSubordinate(info);
        this.#texturer.executeAsSubordinate(info);
        this.context.globalAlpha = 1;
    
    }

}

export default SceneRenderer3D;