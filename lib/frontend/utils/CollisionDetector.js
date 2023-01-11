class CollisionDetector {
    static RayVsVerticalLine(ray, line) {
        // Input check
        if (typeof ray != 'object' || typeof line != 'object') {
            console.error("Both 'ray' and 'line' parameters must be objects");
            return false;
        }
        if (typeof ray.YIntercept != 'number' || typeof ray.slope != 'number') {
            console.error("Invalid argument passed as 'ray'");
            return false;
        }
        if (typeof line.startY != 'number' || typeof line.endY != 'number' || typeof line.posX != 'number') {
            console.error("Invalid argument passed as 'line'");
            return false;
        }
        // In case ray is fully horizontal and has a slope of zero
        if (ray.degree == 0 || ray.degree == 360) {
            let theyCollide = (line.startY <= ray.YIntercept && ray.YIntercept <= line.endY);
            return theyCollide ? [line.posX, ray.YIntercept] : false;
        }
        var colinearYValue = (ray.slope * line.posX) + ray.YIntercept;
        //console.log(colinearYValue,line.startY,line.endY);
        if (line.startY <= colinearYValue && colinearYValue <= line.endY) {
            return [line.posX, colinearYValue];
        }
        return false;
    }
    static RayVsHorizontalLine(ray, line) {
        // Input check
        if (typeof ray != 'object' || typeof line != 'object') {
            console.error("Both 'ray' and 'line' parameters must be objects");
            console.warn(line);
            return false;
        }
        if (typeof ray.YIntercept != 'number' || typeof ray.slope != 'number') {
            console.error("Invalid argument passed as 'ray'");
            return false;
        }
        if (typeof line.startX != 'number' || typeof line.endX != 'number' || typeof line.posY != 'number') {
            console.error("Invalid argument passed as 'line'");
            return false;
        }
        var colinearXValue = (line.posY - ray.YIntercept) / ray.slope;
        if (line.startX <= colinearXValue && colinearXValue <= line.endX) {
            return [colinearXValue, line.posY];
        }
        return false;
    }
}
export default CollisionDetector;
