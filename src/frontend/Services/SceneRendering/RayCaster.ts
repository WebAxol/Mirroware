import CollisionDetector    from "../../utils/physics/CollisionDetector.js";
import { Ray }              from "../../types/Ray.js";
import Service              from "../Service.js";

class RayCaster extends Service {
    
    #chief;
    
    constructor(chief){
        super();
        this.#chief = chief;
    }

    public execute() {}

    public castRay(pos, ray : any, indices : { horizontal :number, vertical : number }){
        
        if(ray.reflected) ray.reflected.active = false;

        const newHorizontalIndex = this.testAgainstHorizontalWalls(ray,indices.horizontal);
        const newVerticalIndex   = this.testAgainstVerticalWalls(ray,indices.vertical);

        //this.testAgainstCircles(ray);

        // new indices imply that the ray has collided, and viceversa

        if(newHorizontalIndex == false && newVerticalIndex == false) return false; // No collision
        if(!((ray.collidesWith.opacity < 1) && ray.level < 5))      return false;
        
        indices = { 
            vertical  : (newVerticalIndex   === false ) ? indices.vertical   : newVerticalIndex, 
            horizontal: (newHorizontalIndex === false ) ? indices.horizontal : newHorizontalIndex
        };

        if(!ray.reflected){

            let reflectedRay = this.#chief.world.createAgent('Ray');

            reflectedRay.source = ray;
            reflectedRay.level  = ray.level + 1;
            ray.reflected = reflectedRay;
        }

        // Prepare reflected ray and cast recursively

        ray.reflected.active = true;

        this.castRay(ray.collidesAt,ray.reflected,indices);
        
    }

    // WARNING: The following functions assume that wall collections are properly sorted in ascending order

    public testAgainstHorizontalWalls(ray :Ray, index :number){ 

        if(ray.direction.y === 0) return false;

        const sense = ray.direction.y > 0 ? 1 : -1;

        const walls = this.#chief.world.getCollection('HorizontalWalls');

        for(index += (sense == 1 ? 1 : 0); (index < walls.length && sense == 1) || (index >= 0 && sense == -1) ; index += sense){

            let hasCollided = CollisionDetector.RayVsHorizontalWall(ray,walls[index]);

            if(!hasCollided) continue;

            let isCloser = this.compareWithClosest(ray,hasCollided);

            if(!isCloser) return false;
        
            return index - (sense == 1 ? 1 : 0);
        }

        return false;
    }

    public testAgainstVerticalWalls(ray :Ray, index :number){

        if(ray.direction.x === 0) return false;

        const sense = ray.direction.x > 0 ? 1 : -1;

        const walls = this.#chief.world.getCollection('VerticalWalls');

        for(index += (sense == 1 ? 1 : 0); (index < walls.length && sense == 1) || (index >= 0 && sense == -1) ; index += sense){

            let hasCollided = CollisionDetector.RayVsVerticalWall(ray,walls[index]);

            if(!hasCollided) continue;

            let isCloser = this.compareWithClosest(ray,hasCollided);

            if(!isCloser) return false;
        
            return index - (sense == 1 ? 1 : 0);
        }

        return false;
    }

    /*
    private testAgainstCircles(ray){

        const circles = this.#chief.world.getCollection('Circles');

        for(let i = 0; i < circles.length; i++){

            let hasCollided = CollisionDetector.RayVsCircle(ray,circles[i]);

            if(!hasCollided) continue;

            let isCloser = this.compareWithClosest(ray,hasCollided);

            if(!isCloser) continue;
        
            ray.collidesAt.x = hasCollided[0];
            ray.collidesAt.y = hasCollided[1];
            ray.collidesWith = circles[i];
        }
    }*/
    
    public compareWithClosest(ray,collisionPoint) :boolean {

        let rayOrigin = ray.source.pos || ray.source.collidesAt;

        let distanceToPoint = Math.abs(rayOrigin.x - collisionPoint[0]) + Math.abs(rayOrigin.y - collisionPoint[1]);
        let currentShortest = Math.abs(rayOrigin.x - ray.collidesAt.x)  + Math.abs(rayOrigin.y - ray.collidesAt.y);

        return distanceToPoint < currentShortest;
    }
    
}

export default RayCaster;