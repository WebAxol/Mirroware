import Service from "../../Service.js";
import { camera } from "../../../utils/Camera.js";
class Dimensioner extends Service {
    constructor(chief) {
        super();
        this.chief = chief;
        this.interpolations = 0;
    }
    executeAsSubordinate() {
        const sceneModel = camera.sceneModel;
        for (let l = 0; l >= 0; l--) {
            sceneModel.layers[l].forEach(sceneChunk => { this.computeChunkDetails(sceneChunk); });
        }
    }
    interpolateDetails(start, end, divisor) {
        let incrementalChange = {
            x: (end.x - start.x) / divisor,
            y: (end.y - start.y) / divisor,
            h: (end.h - start.h) / divisor
        };
        return incrementalChange;
    }
    computeChunkDetails(sceneChunk, prevDistance = 0, adjustment = undefined) {
        const cameraDegree = camera.rays[Math.floor((camera.rays.length) / 2)].degree;
        const context = this.chief.context;
        const bruteTotal = camera.rays.length;
        const netTotal = bruteTotal * (this.interpolations + 1);
        const canvasWidth = this.chief.canvas.width;
        const canvasHeight = this.chief.canvas.height;
        const fractionQueue = [];
        let from = sceneChunk.from;
        let to = sceneChunk.to;
        let columns = 50;
        let startCorner = _calculateCorner(from);
        let endCorner = _calculateCorner(to);
        function _calculateCorner(ray, prevDistance = 0, adjustment = NaN) {
            // TODO : calculate distance and adjustment during RayCasting and store them at every ray instead of computing them here
            let index = Math.floor((ray.degree - camera.rays[0].degree) / (camera.rays[camera.rays.length - 1].degree - camera.rays[0].degree) * camera.rays.length);
            let distanceX = Math.abs(Math.abs(ray.collidesAt.x) - Math.abs(ray.source.pos ? ray.source.pos.x : ray.source.collidesAt.x));
            let distanceY = Math.abs(Math.abs(ray.collidesAt.y) - Math.abs(ray.source.pos ? ray.source.pos.y : ray.source.collidesAt.y));
            let distance = Math.hypot(distanceX, distanceY) + prevDistance;
            // Fish-eye effect is fixed with this adjustment to the distance
            adjustment = adjustment || Math.cos(Math.abs((Math.abs(cameraDegree - ray.degree) / 180) * Math.PI));
            let adjustedDistance = distance * adjustment;
            let corner = {
                x: ((canvasWidth * index) / bruteTotal),
                y: (canvasHeight / 2) - (canvasHeight) / adjustedDistance,
                h: (canvasHeight * 2) / adjustedDistance
            };
            return corner;
        }
        sceneChunk.details = {
            start: startCorner,
            columns: columns,
            change: this.interpolateDetails(startCorner, endCorner, columns)
        };
        // Notify Orchestrator and pass chunk for rendering 
        this.chief._onchunkReady(sceneChunk);
    }
}
export default Dimensioner;
