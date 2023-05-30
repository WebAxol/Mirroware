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

        // Render ceiling

        this.context.fillStyle = 'rgba(0,0,0,1)';
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height);

        // Render floor
    
        this.context.fillStyle = 'brown';
        this.context.fillRect(0,0,this.canvas.width,this.canvas.height / 2);


        try{    
            this.#dimensioner.executeAsSubordinate();
        }
        catch(err){
            console.error(err);
            this.world.pauseExecution();
        }
    }

    public _onchunkReady(sceneChunk){

        //console.log(sceneChunk);

        this.#rgba.executeAsSubordinate(sceneChunk);
        this.context.globalAlpha = 1;

        //this.#texturer.executeAsSubordinate(info);
    
    }

}

export default SceneRenderer3D;