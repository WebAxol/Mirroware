import CollisionDetector    from "../../utils/physics/CollisionDetector.js";
import { Ray }              from "../../types/Ray.js";
import Service              from "../Service.js";
import Vector2D             from "../../utils/physics/Vector2D.js";

class RayCaster extends Service {
    
    #chief;
    
    constructor(chief){
        super();
        this.#chief = chief;
    }

    public execute() {}

    public castRay(ray : any, indices : { horizontal :number, vertical : number }){
        
        if(ray.reflected) ray.reflected.active = false;

        ray.collidesWith = null;
        ray.lambda = Infinity;

        const collision = this.iterativeWallCollisionTest(ray, indices);

        if(!collision) return;
            
        if(ray.level <= 1 &&  ray.collidesWith.opacity < 1 &&this.reflect(ray)) this.castRay(ray.reflected,indices);
    }

    public reflect(ray :any) :boolean {

        if(!ray.collidesWith) return false;

        if(!ray.reflected){
            ray.reflected       = this.#chief.world.createAgent('Ray');
            ray.reflected.level = ray.level + 1;
        }

        ray.reflected.source    = Vector2D.copy(ray.collidesAt);
        ray.reflected.direction = Vector2D.copy(ray.direction);        
        ray.reflected.active    = true;

        const surfaceType = ray.collidesWith.getType();
        const strategy = {
            HorizontalWall : (reflected) => { reflected.direction.y *= -1 },
            VerticalWall   : (reflected) => { reflected.direction.x *= -1 }
        };

        const reflectStrategy = strategy[surfaceType];

        if(!reflectStrategy)  return false;

        reflectStrategy(ray.reflected);

        return true;
    }

    // WARNING: The following function assumes that wall collections are properly sorted in ascending order based on their posX and posY values

    public iterativeWallCollisionTest(ray : Ray, indices : { horizontal :number, vertical : number }) :boolean {

        const sense = { x :  ray.direction.x > 0 ? 1 : -1, y :  ray.direction.y > 0 ? 1 : -1  };
 
        const horizontalWalls = this.#chief.world.getCollection('HorizontalWalls');
        const verticalWalls   = this.#chief.world.getCollection('VerticalWalls');

        var wallH, wallV, lambdaH, lambdaV, collision;

        while(
            (indices.horizontal < horizontalWalls.length && sense.y == 1) || (indices.horizontal >= 0 && sense.y == -1) ||
            (indices.vertical   < verticalWalls.length   && sense.x == 1) || (indices.vertical   >= 0 && sense.x == -1)
        ){

            wallH = horizontalWalls[indices.horizontal + (sense.y == 1 ? 1 : 0)];
            wallV = verticalWalls[  indices.vertical   + (sense.x == 1 ? 1 : 0)];

            lambdaH = wallH ?  CollisionDetector.RayVsHorizontalLine(ray, wallH.posY) : Infinity;
            lambdaV = wallV ?  CollisionDetector.RayVsVerticalLine(ray, wallV.posX)   : Infinity;

            if(lambdaV === lambdaH) break;

            collision = (lambdaH < lambdaV) ? CollisionDetector.RayVsHorizontalWall(ray,wallH) : CollisionDetector.RayVsVerticalWall(ray,wallV);

            if(collision){ 
                ray.collidesAt   = collision;
                ray.lambda       =  Math.min(lambdaH,lambdaV);
                ray.collidesWith = (lambdaH <= lambdaV) ? wallH : wallV;
                break;
            }

            indices.horizontal += (lambdaH <= lambdaV) ? sense.y : 0;
            indices.vertical   += (lambdaH >= lambdaV) ? sense.x : 0;
        };

        return collision ? true : false;
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
}

export default RayCaster;