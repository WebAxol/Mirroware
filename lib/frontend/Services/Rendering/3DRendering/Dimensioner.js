import Service from "../../Service.js";
import { camera } from "../../../utils/Camera.js";
import CONFIG from "../../../config.js";
class Dimensioner extends Service {
    constructor(chief) {
        super();
        this.chief = chief;
        this.interpolations = 0;
    }
    executeAsSubordinate() {
        const context = this.chief.context;
        const cameraDegree = camera.rays[Math.floor((camera.rays.length) / 2)].degree;
        const bruteTotal = camera.rays.length;
        const netTotal = bruteTotal * (this.interpolations + 1);
        const canvasWidth = this.chief.canvas.width;
        const canvasHeight = this.chief.canvas.height;
        var index;
        for (index = 0; index < camera.rays.length; index++)
            _calculateDimensions(this, camera.rays[index]);
        function _calculateDimensions(service, ray, prevDistance = 0, adjustment = undefined) {
            if (!ray.collidesWith)
                return;
            let distanceX = Math.abs(ray.collidesAt.x - (ray.source.pos ? ray.source.pos.x : ray.source.collidesAt.x));
            let distanceY = Math.abs(ray.collidesAt.y - (ray.source.pos ? ray.source.pos.y : ray.source.collidesAt.y));
            let distance = Math.hypot(distanceX, distanceY) + prevDistance;
            adjustment = adjustment || Math.cos(Math.abs((Math.abs(cameraDegree - ray.degree) / 180) * Math.PI));
            let adjustedDistance = distance * adjustment;
            let leftTop = { x: ((canvasWidth * index) / bruteTotal), y: (canvasHeight / 2) - (canvasHeight) / adjustedDistance };
            let size = { x: canvasWidth / netTotal, y: (canvasHeight * 2) / adjustedDistance };
            let flashLightBrightness = !CONFIG.fog ? 1 : Math.pow(((index - (camera.rays.length / 2)) / 10), 2) / CONFIG.lightLevel;
            let sceneChunck = service.chief.world.createAgent('SceneChunk', {
                info: {
                    leftTop: leftTop,
                    size: size,
                    distance: distance * Math.max(flashLightBrightness, 1),
                    point: ray.collidesAt,
                    item: ray.collidesWith
                }
            });
            service.chief.addChunk(sceneChunck);
            if (sceneChunck.item.opacity < 1 && ray.reflected.getType) {
                _calculateDimensions(service, ray.reflected, distance, adjustment);
            }
        }
    }
}
export default Dimensioner;
//# sourceMappingURL=Dimensioner.js.map