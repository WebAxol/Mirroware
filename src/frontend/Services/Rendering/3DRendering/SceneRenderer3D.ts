import Service from "../../Service.js";

// subordinate modules

import VariableCalculator from "./VariableCalculator.js";
import RGBA from "./RGBA.js";
import Texturer from "./Texturer.js";

class  SceneRenderer3D extends Service{
    
    public canvas;
    public context;
    
    #variableCalculator;
    #rgba;
    #texturer;

    constructor(canvas){

        super();

        this.canvas  = canvas;
        this.context = canvas.getContext('2d');

        // subordinates

        this.#variableCalculator = new VariableCalculator(this);
        this.#rgba = new RGBA(this);
        this.#texturer = new Texturer(this);
    }

    public execute(){

        try{
            this.context.fillStyle = 'rgba(0,0,0,1)';
            this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
    
            this.context.fillStyle = 'brown';
            this.context.fillRect(0,0,this.canvas.width,this.canvas.height / 2);
    
            this.#variableCalculator.executeAsSubordinate();
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