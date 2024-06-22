import Vector2D from './Vector2D.js';
class CollisionDetector {
    static RayVsVerticalWall(ray, wall) {
        const lambda = (wall.posX - ray.source.x) / ray.direction.x;
        if (lambda <= 0)
            return false;
        const point = Vector2D.add(ray.source, Vector2D.scale(ray.direction, lambda));
        return (point.y >= wall.startY && point.y <= wall.endY) ? point : false;
    }
    static RayVsHorizontalWall(ray, wall) {
        const lambda = (wall.posY - ray.source.y) / ray.direction.y;
        if (lambda <= 0)
            return false;
        const point = Vector2D.add(ray.source, Vector2D.scale(ray.direction, lambda));
        return (point.x >= wall.startX && point.x <= wall.endX) ? point : false;
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
        let rayDirection = Vector2D.normalize(ray.direction);
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