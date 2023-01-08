import Service from "./Service.js";
class Rays extends Service {
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
    calculateRayProperties() {
        const rays = this.world.getCollection('Rays');
        rays.forEach(ray => {
            let degrees = ((ray.degree / 180) * Math.PI);
            ray.slope = Math.sin(degrees) / Math.cos(degrees);
        });
        return true;
    }
    ;
}
export default Rays;
