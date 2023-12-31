import CollisionDetector    from "../../utils/CollisionDetector.js";
import { Camera, camera }   from '../../utils/Camera.js';
import { Ray }              from "../../types/Ray.js";
import Service              from "../Service.js";

class RayCastProcessor extends Service {
    
    #chief;
    
    constructor(chief){
        super();
        this.#chief = chief;
    }

    public execute() {

        let rays :Ray[] = camera.rays;
        let reflectedRay = this.#chief.world.createAgent('Ray');
        camera.sceneModel.purge();

        for(let i = 0; i < camera.rays.length; i++) this.castRay(camera.pos , rays[i] , camera.wallIndices);
    }

    public castRay(pos, ray : any, indices : { horizontal :number, vertical : number }){

        if(ray.reflected) ray.reflected.active = false;

        let newHorizontalIndex = this.testAgainstHorizontalWalls(ray,indices.horizontal);
        let newVerticalIndex   = this.testAgainstVerticalWalls(ray,indices.vertical);

        this.testAgainstCircles(ray);

        // new indices imply that the ray has collided, and viceversa

        camera.sceneModel.update(ray);

        if(newHorizontalIndex == false && newVerticalIndex == false) return false; // No collision
        if(!((ray.collidesWith.opacity < 1) && ray.level < 5))      return false;
        
        let newIndices =  { 
            vertical  : (newVerticalIndex   === false ) ? indices.vertical   : newVerticalIndex, 
            horizontal: (newHorizontalIndex === false ) ? indices.horizontal : newHorizontalIndex
        };

        let angleAdd = (ray.collidesWith.getType() == 'HorizontalWall') ? 360 : 180;

        if(!ray.reflected.getType){

            let reflectedRay = this.#chief.world.createAgent('Ray');

            ray.reflected.degree = (angleAdd - ray.degree);
            reflectedRay.source = ray;
            reflectedRay.level  = ray.level + 1;
            ray.reflected = reflectedRay;
        }

        // Prepare reflected ray and cast recursively

        ray.reflected.active = true;
        ray.reflected.degree = (angleAdd - ray.degree);
        ray.wallIndices = newIndices;

        this.#chief.calculateRayProperties(ray.collidesAt,ray.reflected);
        this.castRay(ray.collidesAt,ray.reflected,newIndices);
        
    }

    // WARNING: The following functions assume that wall collections are properly sorted in ascending order


    public testAgainstVerticalWalls(ray :Ray, index :number){

        
        if(ray.degree == 90 || ray.degree == 270) return false; // Cannot collide; it is totally vertical

        let sense = Math.cos(ray.degree * (Math.PI / 180)) > 0 ? 1 : -1;

        const walls = this.#chief.world.getCollection('VerticalWalls');

        if(walls.length <= 0) return false;

        for(index += (sense == 1 ? 1 : 0); (index < walls.length && sense == 1) || (index >= 0 && sense == -1) ; index += sense){

            if(walls[index].posX <= ray.collidesAt.x && sense == -1) return index;
            if(walls[index].posX >= ray.collidesAt.x && sense == 1 ) return index - 1;

            let hasCollided = CollisionDetector.RayVsVerticalLine(ray,walls[index]);

            if(!hasCollided) continue;

            let isCloser = this.compareWithClosest(ray,hasCollided);

            if(!isCloser) return index - 1;

            ray.collidesAt.x = hasCollided[0];
            ray.collidesAt.y = hasCollided[1];
            ray.collidesWith = walls[index];

            return index - (sense == 1 ? 1 : 0); 
        }

        return false;
    }

    public testAgainstHorizontalWalls(ray :Ray, index :number){
        
        if(ray.degree == 180 || ray.degree == 0) return false; // Cannot collide; it is totally horizontal

        let sense = Math.sin(ray.degree * (Math.PI / 180)) > 0 ? 1 : -1;

        const walls = this.#chief.world.getCollection('HorizontalWalls');

        if(walls.length <= 0) return false;

        for(index += (sense == 1 ? 1 : 0); (index < walls.length && sense == 1) || (index >= 0 && sense == -1) ; index += sense){

            let hasCollided = CollisionDetector.RayVsHorizontalLine(ray,walls[index]);

            if(!hasCollided) continue;

            let isCloser = this.compareWithClosest(ray,hasCollided);

            if(!isCloser) return false;
        
            ray.collidesAt.x = hasCollided[0];
            ray.collidesAt.y = hasCollided[1];
            ray.collidesWith = walls[index];

            return index - (sense == 1 ? 1 : 0);
        }

        return false;
    }

    public testAgainstCircles(ray){

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
    }

    public compareWithClosest(ray,collisionPoint) :boolean {

        let rayOrigin = ray.source.pos || ray.source.collidesAt;

        let distanceToPoint = Math.abs(rayOrigin.x - collisionPoint[0]) + Math.abs(rayOrigin.y - collisionPoint[1]);
        let currentShortest = Math.abs(rayOrigin.x - ray.collidesAt.x)  + Math.abs(rayOrigin.y - ray.collidesAt.y);

        return distanceToPoint < currentShortest;
    }
}

export default RayCastProcessor;