
import CollisionDetector from "../../utils/CollisionDetector.js";
import VariableCalculator from './VariableCalculator.js';
import { Camera, camera } from '../../utils/Camera.js';
import Service from "../Service.js";


class RayCaster extends Service {
    
    #chief;
    
    constructor(chief){
        super();
        this.#chief = chief;
    }

    public execute() {

        let rays = camera.rays;

        // Input check

        if(typeof rays != 'object'){
            throw Error('Invalid ray array specified for raySource');
        }

        //

        rays.forEach(ray => {
            this.castRay(camera.pos , ray , camera.wallIndices);
        });
    }

    public castRay(pos, ray : any, indices){

        // Input check

        if(typeof indices.horizontal != 'number' || typeof indices.vertical != 'number'){
            throw Error('invalid wallIndices property');
        }

        //

        let newHorizontalIndex = this.testAgainstHorizontalWalls(ray,indices.horizontal);
        let newVerticalIndex   = this.testAgainstVerticalWalls(ray,indices.vertical);

        let newIndices =  { 
            vertical  : (newVerticalIndex  === false )  ? indices.vertical   : newVerticalIndex, 
            horizontal: (newHorizontalIndex === false ) ? indices.horizontal : newHorizontalIndex
        };

        if((newHorizontalIndex !== false || newVerticalIndex !== false) && (ray.collidesWith.opacity < 1) && ray.level < 3){

            let isClosestHorizontal = ray.collidesWith.getType() == 'HorizontalWall';
            let angleAdd = isClosestHorizontal ? 360 : 180;


            if(!ray.reflected.getType){


                ray.reflected.degree = (angleAdd - ray.degree);
                let reflectedRay = this.#chief.world.createAgent('Ray');
                reflectedRay.source = ray;
                reflectedRay.level  = ray.level + 1;
                ray.reflected = reflectedRay;


            }

            ray.reflected.active = true;
            ray.reflected.degree = (angleAdd - ray.degree);
            ray.wallIndices = newIndices;

            this.#chief.calculateRayProperties(ray.collidesAt,ray.reflected);

            //console.log('Ray-------------------------------------------------');

            
            this.castRay(ray.collidesAt,ray.reflected,newIndices);
        }else{
            if(ray.reflected.getType){
                ray.reflected.active = false;
            }
        }
    }

    // WARNING: The following functions assume that wall collections are properly sorted in ascending order

    public testAgainstVerticalWalls(ray,index){

        let sense;
        
        // Get sense

        if(     (ray.degree % 360) > 270 && (ray.degree % 360) < 360)   sense = 1;
        else if((ray.degree % 360) >= 0   && (ray.degree % 360) < 90)    sense = 1;
        else if((ray.degree % 360) > 90  && (ray.degree % 360) < 270)   sense = -1;

        if(!sense) return false; // Cannot collide; it is totally vertical

        const walls = this.#chief.world.getCollection('VerticalWalls');

        for(index  += (sense == 1 ? 1 : 0); (index < walls.length && sense == 1) || (index >= 0 && sense == -1) ; index += sense){

            if(walls[index].posX <= ray.collidesAt.x && sense == -1) return index;
            if(walls[index].posX >= ray.collidesAt.x && sense == 1 ) return index - 1;


            let hasCollided = CollisionDetector.RayVsVerticalLine(ray,walls[index]);

            if(hasCollided){

                let isCloser = this.compareWithClosest(ray,hasCollided);

                if(isCloser){

                    ray.collidesAt.x = hasCollided[0];
                    ray.collidesAt.y = hasCollided[1];
                    ray.collidesWith = walls[index];

                }
                else return index - 1;
                
                return index - (sense == 1 ? 1 : 0);
            }
        }

        return false;

    }

    public testAgainstHorizontalWalls(ray,index){

        let sense = 0;
        
        // Get sense

        if(ray.degree > 0 && ray.degree < 180)          sense = 1;
        else if(ray.degree > 180 && ray.degree < 360)   sense = -1;

        if(!sense) return false; // Cannot collide; it is totally horizontal

        const walls = this.#chief.world.getCollection('HorizontalWalls');

        if(walls.length <= 0) return false;

        for(index += (sense == 1 ? 1 : 0); (index < walls.length && sense == 1) || (index >= 0 && sense == -1) ; index += sense){

            let hasCollided = CollisionDetector.RayVsHorizontalLine(ray,walls[index]);

            if(hasCollided){

                let isCloser = this.compareWithClosest(ray,hasCollided);

                if(isCloser){

                    ray.collidesAt.x = hasCollided[0];
                    ray.collidesAt.y = hasCollided[1];
                    ray.collidesWith = walls[index];

                }
                else return false;

                return index - (sense == 1 ? 1 : 0);
            }

        }

        return false;
    }


    public compareWithClosest(ray,collisionPoint) :boolean {

        let rayOrigin = ray.source.pos || ray.source.collidesAt;

        let distanceToPoint = Math.abs(rayOrigin.x - collisionPoint[0]) + Math.abs(rayOrigin.y - collisionPoint[1]);
        let currentShortest = Math.abs(rayOrigin.x - ray.collidesAt.x)  + Math.abs(rayOrigin.y - ray.collidesAt.y);
        return distanceToPoint < currentShortest;
    }
}

export default RayCaster;