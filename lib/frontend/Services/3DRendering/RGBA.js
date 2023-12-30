import Service from "../Service.js";
import CONFIG from '../../config.js';
class RGBA extends Service {
    constructor(chief) {
        super();
        this.chief = chief;
    }
    executeAsSubordinate() {
        const renderStack = this.chief.getStack();
        for (let i = renderStack.length - 1; i >= 0; i--) {
            let sceneChunk = renderStack[i];
            this.renderRectangle(sceneChunk);
        }
    }
    renderRectangle(sceneChunk) {
        let context = this.chief.context;
        let canvasWidth = this.chief.canvas.width;
        context.fillStyle = `rgba(${CONFIG.fogColor || "0,0,0"},${sceneChunk.item.opacity})`;
        context.fillRect(sceneChunk.leftTop.x, sceneChunk.leftTop.y, sceneChunk.size.x, sceneChunk.size.y);
        if (!sceneChunk.item.color)
            return;
        let distance = sceneChunk.distance <= 0 ? 0.01 : sceneChunk.distance;
        context.fillStyle = `rgba(${sceneChunk.item.color}, ${sceneChunk.item.opacity / (((distance) * 5) / 15)}`;
        context.fillRect(sceneChunk.leftTop.x, sceneChunk.leftTop.y, sceneChunk.size.x * Math.max(CONFIG.blurEffect * 4, 1), sceneChunk.size.y);
    }
    renderHorizontalBorders(sceneChunk) {
        let context = this.chief.context;
        context.strokeStyle = `red`;
        context.lineWidth = Math.min(30 / sceneChunk.distance, 5);
        context.beginPath();
        context.moveTo(sceneChunk.leftTop.x, sceneChunk.leftTop.y);
        context.lineTo(sceneChunk.leftTop.x + sceneChunk.size.x, sceneChunk.leftTop.y);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(sceneChunk.leftTop.x, (sceneChunk.leftTop.y + sceneChunk.size.y));
        context.lineTo(sceneChunk.leftTop.x + sceneChunk.size.x, (sceneChunk.leftTop.y + sceneChunk.size.y));
        context.closePath();
        context.stroke();
    }
}
export default RGBA;
//# sourceMappingURL=RGBA.js.map