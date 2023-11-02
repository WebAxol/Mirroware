import Service from "../../Service.js";
import { SceneChunk } from "../../../types/SceneChunk.js";

// subordinate modules

import Dimensioner from "./Dimensioner.js";
import RGBA from "./RGBA.js";
import Texturer from "./Texturer.js";

class  SceneRenderer3D extends Service{
    
    protected canvas;
    protected context;
    
    #dimensioner :Dimensioner; 
    #rgba        :RGBA;
    #texturer    :Texturer;
    #renderStack :SceneChunk[];

    constructor(canvas){

        super();

        this.canvas  = canvas;
        this.context = canvas.getContext('2d');

        // subordinates (orchestrated services)

        this.#dimensioner = new Dimensioner(this);
        this.#rgba = new RGBA(this);
        this.#texturer = new Texturer(this);
        this.#renderStack = [];
    }

    public addChunk(chunk : SceneChunk){

        this.#renderStack.push(chunk);
    }

    public popStack() {

        const chunk = this.#renderStack.pop();

        if(chunk) this.world.removeAgent(chunk); // Translate to pool
    }

    public getStack(){

        return this.#renderStack;
    }

    private purgeStack(){

        while(this.#renderStack.length){

            this.popStack();
        }
    }

    public execute(){

        // Clear canvas
        try{    

            this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    
            this.#dimensioner.executeAsSubordinate();
            this.#rgba.executeAsSubordinate();
            this.#texturer.executeAsSubordinate();

            this.purgeStack();

            //this.world.pauseExecution();
        }
        catch(err){
            console.error(err);
            this.world.pauseExecution();
        }
    }
}

export default SceneRenderer3D;