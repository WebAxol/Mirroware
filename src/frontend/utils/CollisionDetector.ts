class CollisionDetector {

    public static RayVsHorizontalLine(ray : any ,line : any) : any {
        
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

        // "ray.b" stands for the y value of the intesection point with the Y axis

        var colinearXValue : number = (line.posY - ray.YIntercept) / ray.slope;

        console.log('ray:',ray, ' colinear: ',colinearXValue, 'wall', line);

        if(line.startX <= colinearXValue && colinearXValue <= line.endX){

            return [colinearXValue,line.posY];

        }

        return false;
    }  

}

export default CollisionDetector;