import Service from "../../Service.js";
class RGBA extends Service {
    constructor(chief) {
        super();
        this.pause = false;
        this.chief = chief;
    }
    executeAsSubordinate(sceneChunk) {
        if (this.pause) {
            this.chief.world.pauseExecution();
            return;
        }
        for (let f = 0; f < sceneChunk.details.columns; f++) {
            this.renderRectangle(sceneChunk);
            //this.renderHorizontalBorders(sceneChunk);
            this.incrementalInterpolation(sceneChunk);
        }
        //this.pause = true;
    }
    incrementalInterpolation(sceneChunk) {
        let details = sceneChunk.details;
        details.start.x += details.change.x;
        details.start.y += details.change.y;
        details.start.h += details.change.h;
    }
    renderRectangle(sceneChunk) {
        let context = this.chief.context;
        let canvasWidth = this.chief.canvas.width;
        // Black opaque background to avoid transparent walls
        context.fillStyle = `rgba(10,0,0,${sceneChunk.item.opacity})`;
        let details = sceneChunk.details.start;
        context.fillRect(details.x, details.y, 50, details.h);
        // Render wall with its color (if it has)
        if (!sceneChunk.item.color)
            return;
        let distance = 5;
        context.fillStyle = `rgba(${sceneChunk.item.color}, ${sceneChunk.item.opacity / ((distance * 5) / 15)}`;
        context.fillRect(details.x, details.y, 20, details.h);
    }
    renderHorizontalBorders(sceneChunk) {
        let context = this.chief.context;
        context.strokeStyle = `red`;
        context.lineWidth = 30 / sceneChunk.distance;
        // Top border
        context.beginPath();
        context.moveTo(sceneChunk.leftTop.x, sceneChunk.leftTop.y);
        context.lineTo(sceneChunk.leftTop.x + sceneChunk.size.x, sceneChunk.leftTop.y);
        context.closePath();
        context.stroke();
        // Bottom border
        context.beginPath();
        context.moveTo(sceneChunk.leftTop.x, (sceneChunk.leftTop.y + sceneChunk.size.y));
        context.lineTo(sceneChunk.leftTop.x + sceneChunk.size.x, (sceneChunk.leftTop.y + sceneChunk.size.y));
        context.closePath();
        context.stroke();
    }
}
export default RGBA;
