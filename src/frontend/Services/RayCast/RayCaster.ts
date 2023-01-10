import CollisionDetector from "../../utils/CollisionDetector.js";
import Service from "../Service.js";

class RayCaster extends Service {
    
    #chief;
    
    constructor(chief){
        super();
        this.#chief = chief;
    }

    public execute() {

        const raySources = this.#chief.world.getCollection('RaySources');

        raySources.forEach(raySource => {
            let rays = raySource.rays;

            // Input check

            if(typeof rays != 'object'){
                throw Error('Invalid ray array specified for raySource');
            }

            //

            rays.forEach(ray => {
                this.castRay(ray,raySource.wallIndices);
            });
        });
    }

    public castRay(ray, indices){

        // Input check

        if(typeof indices.horizontal != 'number' || typeof indices.vertical != 'number'){
            throw Error('invalid wallIndices property');
        }

        //

        this.testAgainstHorizontalWalls(ray,indices.horizontal);
        //this.testAgainstVerticalWalls(ray,indices.vertical);

    }

    // WARNING: The following functions assume that wall collections are properly sorted in ascending order

    public testAgainstVerticalWalls(ray,index){
        
        let sense;
        
        // Get sense

        if(ray.degree > 0 && ray.degree < 180)          sense = 1;
        else if(ray.degree > 180 && ray.degree < 360)   sense = -1;

        if(!sense) return false; // Cannot collide; it is totally horizontal

        console.log(sense);

        const walls = this.#chief.world.getCollection('VerticalWalls');

        for(let i = index; (i < walls.length && sense == 1) || (i >= 0 && sense == -1) ; i += sense){

            console.log(i);

            let hasCollided = CollisionDetector.RayVsHorizontalLine(ray,walls[i]);

            if(hasCollided){
                console.log('ray has collided with wall', walls[i]);
            }

        }

    }

    public testAgainstHorizontalWalls(ray,index){

        let sense;
        
        // Get sense

        if(ray.degree > 0 && ray.degree < 180)          sense = 1;
        else if(ray.degree > 180 && ray.degree < 360)   sense = -1;

        if(!sense) return false; // Cannot collide; it is totally horizontal

        console.log(sense);

        const walls = this.#chief.world.getCollection('HorizontalWalls');

        for(let i = index; (i < walls.length && sense == 1) || (i >= 0 && sense == -1) ; i += sense){

            console.log(i);

            let hasCollided = CollisionDetector.RayVsHorizontalLine(ray,walls[i]);

            if(hasCollided){
                console.log('ray has collided with wall', walls[i]);
            }

        }


    }
}

export default RayCaster;