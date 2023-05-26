import Service from "../Service.js";
import VariableCalculator from "./VariableCalculator.js";
import RayCastProcessor from './RayCastProcessor.js';

class RayCaster extends Service{

    // subordinate services

    #variableCalculator : VariableCalculator // Calculates required variables for the raycasting algorithm
    #rayCastProcessor   : RayCastProcessor   // Uses previously calculated variables to perform the raycast algorithm

    constructor(){
        super();
        this.#variableCalculator = new VariableCalculator(this);
        this.#rayCastProcessor = new RayCastProcessor(this);
    }

    public execute(): boolean { 
        try{
            
            this.#variableCalculator.execute();
            this.#rayCastProcessor.execute();
            
            return true;

        }catch(err){
            this.world.pauseExecution();
            console.error(err);
            return false;
        }

    }

    public calculateRayProperties(source,ray){
        return this.#variableCalculator.calculateRayProperties(source,ray);
    }
}

export default RayCaster;