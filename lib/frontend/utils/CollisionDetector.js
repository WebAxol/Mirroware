import Vector2D from './Vector2D.js';
class CollisionDetector {
    static RayVsVerticalLine(ray, line) {
        if (typeof ray != 'object' || typeof line != 'object') {
            console.error("Both 'ray' and 'line' parameters must be objects");
            return false;
        }
        if (typeof ray.YIntercept != 'number' || typeof ray.slope != 'number') {
            console.error("Invalid argument passed as 'ray'");
            return false;
        }
        if (typeof line.startY != 'number' || typeof line.endY != 'number' || typeof line.posX != 'number' || line.startY >= line.endY) {
            console.error("Invalid argument passed as 'line'");
            return false;
        }
        if (Math.abs(ray.slope) == 0) {
            let theyCollide = (line.startY < ray.YIntercept && ray.YIntercept < line.endY);
            return theyCollide ? [line.posX, ray.YIntercept] : false;
        }
        var colinearYValue = (ray.slope * line.posX) + ray.YIntercept;
        if (line.startY <= colinearYValue && colinearYValue <= line.endY) {
            return [line.posX, colinearYValue];
        }
        return false;
    }
    static RayVsHorizontalLine(ray, line) {
        if (typeof ray != 'object' || typeof line != 'object') {
            console.error("Both 'ray' and 'line' parameters must be objects");
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
        if (Math.abs(ray.slope) == 0)
            return false;
        if (line.startX <= colinearXValue && colinearXValue <= line.endX) {
            return [colinearXValue, line.posY];
        }
        return false;
    }
    static RayVsCircle(ray, circle) {
        if (circle.radius <= 0) {
            console.error("Circle was defined with a negative or zero radius");
            return false;
        }
        if (typeof ray.YIntercept != 'number' || typeof ray.slope != 'number') {
            console.error("Invalid argument passed as 'ray'");
            return false;
        }
        let rayOrigin = ray.source.pos ? ray.source.pos : ray.source.collidesAt;
        let OC = Vector2D.sub(circle.center, rayOrigin);
        let rayDirection = new Vector2D(Math.cos(ray.degree * (Math.PI / 180)), Math.sin(ray.degree * (Math.PI / 180)));
        let OAmag = Vector2D.dot(rayDirection, OC);
        let CAmagSq = OC.magSq() - OAmag * OAmag;
        let BAmag = Math.sqrt(circle.radius * circle.radius - CAmagSq);
        let distance = OAmag - BAmag;
        if (distance <= 0)
            return false;
        let RayToCircle = rayDirection.scale(distance);
        let intercept = [rayOrigin.x + RayToCircle.x, rayOrigin.y + RayToCircle.y];
        return intercept;
    }
}
export default CollisionDetector;
//# sourceMappingURL=CollisionDetector.js.map