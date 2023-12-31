import { HorizontalWall } from '../types/HorizontalWall.js';
import { VerticalWall }   from '../types/VerticalWall.js';
import { Circle }         from '../types/Circle.js';
import { Ray }            from '../types/Ray.js';
import Vector2D           from './Vector2D.js';

class CollisionDetector {


    public static RayVsVerticalLine(ray : Ray ,line : VerticalWall) : [number,number] | false {
        
        // Input check

        if(typeof ray != 'object' || typeof line != 'object'){
            console.error("Both 'ray' and 'line' parameters must be objects");
            return false;
        }

        if(typeof ray.YIntercept != 'number' || typeof ray.slope != 'number' ){
            console.error("Invalid argument passed as 'ray'");
            return false;
        }

        if(typeof line.startY != 'number' || typeof line.endY != 'number' || typeof line.posX != 'number' || line.startY >= line.endY){
            console.error("Invalid argument passed as 'line'");
            return false;
        }

        // In case ray is fully horizontal and has a slope of zero

        if(Math.abs(ray.slope) == 0){ 

            let theyCollide = (line.startY < ray.YIntercept && ray.YIntercept < line.endY);
            
            return theyCollide ? [line.posX,ray.YIntercept] : false;
        }

        var colinearYValue : number = (ray.slope * line.posX) + ray.YIntercept;

        if(line.startY <= colinearYValue && colinearYValue <= line.endY){

            return [line.posX,colinearYValue];

        }

        return false;
    }  


    public static RayVsHorizontalLine(ray : Ray ,line : HorizontalWall) : [number,number] | false  {
        
        // Input check

        if(typeof ray != 'object' || typeof line != 'object'){
            console.error("Both 'ray' and 'line' parameters must be objects");
            return false;
        }

        if(typeof ray.YIntercept != 'number' || typeof ray.slope != 'number' ){
            console.error("Invalid argument passed as 'ray'");
            return false;
        }

        if(typeof line.startX != 'number' || typeof line.endX != 'number' || typeof line.posY != 'number'){
            console.error("Invalid argument passed as 'line'");
            return false;
        }

        var colinearXValue : number = (line.posY - ray.YIntercept) / ray.slope;

        if(Math.abs(ray.slope) == 0) return false; // Parallel can't collide

        if(line.startX <= colinearXValue && colinearXValue <= line.endX){

            return [colinearXValue,line.posY];

        }

        return false;
    } 

    public static RayVsCircle(ray : any, circle :Circle){

        if(circle.radius <= 0){
            console.error("Circle was defined with a negative or zero radius");
            return false;
        }

        if(typeof ray.YIntercept != 'number' || typeof ray.slope != 'number' ){
            console.error("Invalid argument passed as 'ray'");
            return false;
        }


        let rayOrigin = ray.source.pos ? ray.source.pos  : ray.source.collidesAt;

        let OC = Vector2D.sub(circle.center,rayOrigin);

        let rayDirection = new Vector2D(Math.cos(ray.degree * (Math.PI / 180)),Math.sin(ray.degree * (Math.PI / 180)));

        let OAmag = Vector2D.dot(rayDirection, OC);
        let CAmagSq = OC.magSq() - OAmag * OAmag;  

        let BAmag = Math.sqrt(circle.radius * circle.radius - CAmagSq);

        let distance = OAmag - BAmag;

        if(distance <= 0) return false;
        
        let RayToCircle = rayDirection.scale(distance)  

        let intercept = [ rayOrigin.x + RayToCircle.x, rayOrigin.y + RayToCircle.y ];

        return intercept;
    }
}

export default CollisionDetector;