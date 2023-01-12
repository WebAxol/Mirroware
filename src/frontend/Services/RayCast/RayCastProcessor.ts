import Service from "../Service.js";
import VariableCalculator from "./VariableCalculator.js";
import RayCaster from "./RayCaster.js";

class RayCastProcessor extends Service{

    // subordinate services

    #variableCalculator : VariableCalculator // Calculates required variables for the raycasting algorithm
    #raycaster          : RayCaster          // Uses previously calculated variables to perform the raycast algorithm

    constructor(){
        super();
        this.#variableCalculator = new VariableCalculator(this);
        this.#raycaster = new RayCaster(this);
    }

    public execute(): boolean { 
        try{
            
            
            let source = this.world.getCollection('RaySources')[0];

            source.rays.forEach(ray => {
                ray.degree =  (ray.degree + 1) % 360; 
            });

            this.#variableCalculator.execute();
            this.#raycaster.execute();
            
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

export default RayCastProcessor;