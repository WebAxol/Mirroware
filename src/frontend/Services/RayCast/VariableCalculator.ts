import Service from "../Service.js";
import World from '/cases/World.js';

class VariableCalculator extends Service{

    #chief : Service;

    constructor(chief){
        super();
        this.#chief = chief;
    }

    public execute() {
        this.calculateRayProperties();
    }

    public calculateRaySlope(ray) {

        // Input check

        if(typeof ray.slope != 'number' || typeof ray.degree != 'number'){
            console.log(ray);
            throw Error('Invalid argument passed as ray');
        }

        //

        let degrees = ((ray.degree / 180) * Math.PI);
        ray.slope   = Math.sin(degrees) / Math.cos(degrees);
        
    }

    public calculateRayYIntercept(pos,ray){

        // Input check

        if(typeof ray.YIntercept != 'number'){
            throw Error('Invalid argument passed as ray');
        }

        //

        ray.YIntercept = pos.y - (ray.slope * pos.x);

    }

    public calculateRayProperties() :boolean{
    
        const raySources = this.#chief.world.getCollection('RaySources');

        raySources.forEach(raySource => {
            let rays = raySource.rays;

            rays.forEach(ray => {
                this.calculateRaySlope(ray);
                this.calculateRayYIntercept(raySource.pos, ray);
            });

        });

        return true;
    };
}

export default VariableCalculator;