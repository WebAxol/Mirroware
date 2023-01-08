class CollisionDetector {
    static RayVsHorizontalLine(ray, line) {
        // Input check
        if (typeof ray != 'object' || typeof line != 'object') {
            console.error("Both 'ray' and 'line' parameters must be objects");
            return false;
        }
        if (typeof ray.b != 'number' || typeof ray.slope != 'number') {
            console.error("Invalid argument passed as 'ray'");
            return false;
        }
        if (typeof line.startX != 'number' || typeof line.startY != 'number' || typeof line.posY != 'number') {
            console.error("Invalid argument passed as 'line'");
            return false;
        }
        // "ray.b" stands for the y value of the intesection point with the Y axis
        var colinearXValue = (line.posY - ray.b) / ray.slope;
        console.log('ray:', ray, ' colinear: ', colinearXValue);
        if (line.startX <= colinearXValue && colinearXValue <= line.endX) {
            return [colinearXValue, line.posY];
        }
        return false;
    }
}
export default CollisionDetector;
