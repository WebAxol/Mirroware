import { HorizontalWall } from '../../types/HorizontalWall.js';
import { VerticalWall }   from '../../types/VerticalWall.js';
import { Circle }         from '../../types/Circle.js';
import { Ray }            from '../../types/Ray.js';
import Vector2D           from './Vector2D.js';

class CollisionDetector {


    public static RayVsVerticalLine(ray : Ray, x: number) : number | false {
        
        const lambda :number = (x - ray.source.x) / ray.direction.x;

        return lambda > 0 ? lambda : false;

    }


    public static RayVsVerticalWall(ray : Ray ,wall : VerticalWall) : Vector2D | false {

        const lambda :number | false = CollisionDetector.RayVsVerticalLine(ray, wall.posX); 

        if(!lambda) return false;   

        const point :Vector2D = Vector2D.add(ray.source,Vector2D.scale(ray.direction,lambda));

        return (point.y >= wall.startY && point.y <= wall.endY) ? point : false;  
    }  


    public static RayVsHorizontalLine(ray : Ray, y: number) : number | false {
        
        const lambda :number = (y - ray.source.y) / ray.direction.y;

        return lambda > 0 ? lambda : false;

    }


    public static RayVsHorizontalWall(ray : Ray , wall : HorizontalWall) : Vector2D | false  {
        
        const lambda :number | false = CollisionDetector.RayVsHorizontalLine(ray, wall.posY);

        if(!lambda) return false;

        const point :Vector2D = Vector2D.add(ray.source,Vector2D.scale(ray.direction,lambda));
       
        return (point.x >= wall.startX && point.x <= wall.endX) ? point : false;
    } 


    public static RayVsCircle(ray : any, circle :Circle){

        if(circle.radius <= 0)  throw Error("Invalid circle radius: it must be a positive number");
        
        let rayOrigin = ray.source.pos ? ray.source.pos  : ray.source.collidesAt;

        let OC = Vector2D.sub(circle.center,rayOrigin);

        let rayDirection = Vector2D.normalize(ray.direction);

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