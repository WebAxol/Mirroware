import Service from "./Service.js";
class RayProcessor extends Service {
    constructor() {
        super();
    }
    execute() {
        try {
            this.calculateRayProperties();
            return true;
        }
        catch (err) {
            this.world.pauseExecution();
            console.error(err);
            return false;
        }
    }
    calculateRaySlope(ray) {
        let degrees = ((ray.degree / 180) * Math.PI);
        ray.slope = Math.sin(degrees) / Math.cos(degrees);
    }
    calculateRayYIntercept(pos, ray) {
        ray.YIntercept = pos.y - (ray.slope * pos.x);
    }
    calculateRayProperties() {
        const raySources = this.world.getCollection('RaySources');
        raySources.forEach(raySource => {
            let rays = raySource.rays;
            rays.forEach(ray => {
                this.calculateRaySlope(ray);
                this.calculateRayYIntercept(raySource.pos, ray);
            });
        });
        return true;
    }
    ;
}
export default RayProcessor;
