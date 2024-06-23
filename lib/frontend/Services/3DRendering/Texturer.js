import Service from '../Service.js';
import textures from '../../utils/Textures.js';
import Vector2D from '../../utils/physics/Vector2D.js';
import CONFIG from '../../config.js';
class TextureDisplayer extends Service {
    constructor(chief) {
        super();
        this.chief = chief;
    }
    ;
    executeAsSubordinate() {
        const textureSpan = 2;
        let height = 1000;
        let roll = ['bricks', 'netherrack', 'dirt'];
        const renderStack = this.chief.getStack();
        for (let i = renderStack.length - 1; i >= 0; i--) {
            let imageSize = 32;
            let sceneChunk = renderStack[i];
            let scale = sceneChunk.size.y / 1000;
            let pixelNum;
            if (sceneChunk.item.radius)
                pixelNum = this.mapCylinder(sceneChunk);
            else
                pixelNum = this.mapTexture(sceneChunk);
            let percentage = pixelNum / textureSpan % 1;
            let texture = textures.getTexture(roll[Math.floor(pixelNum / textureSpan) % 1]);
            let context = this.chief.context;
            let canvasHeight = this.chief.canvas.height;
            context.imageSmoothingEnabled = false;
            context.globalAlpha = Math.min(sceneChunk.item.opacity / (sceneChunk.distance / 10) / 5, 0.5);
            context.scale(1, scale);
            context.drawImage(texture, (Math.floor(percentage * imageSize)) % imageSize, 0, 1, imageSize, Math.round(sceneChunk.leftTop.x), Math.round(((canvasHeight / 2) / scale) - (height / 2)), 600 / (CONFIG.resolution / Math.max(CONFIG.blurEffect * 3, 1)), height);
            context.scale(1, 1 / scale);
            this.chief.context.globalAlpha = 1;
        }
    }
    mapCylinder(info) {
        let _angle = Math.ceil(this.chief.world.frame / 1) / 100;
        const direction = new Vector2D(Math.cos(_angle), Math.sin(_angle));
        const centerToPoint = Vector2D.sub(info.point, info.item.center);
        const angle = Vector2D.angleBetween(centerToPoint, direction);
        return angle / 18 * (info.item.radius / 4);
    }
    mapTexture(info) {
        let percentage = 0;
        if (info.item.getType() === 'HorizontalWall') {
            let wallLength = info.item.endX - info.item.startX;
            percentage = Math.abs(((info.point.x - info.item.startX)));
        }
        else if (info.item.getType() === 'VerticalWall') {
            let wallLength = info.item.endY - info.item.startY;
            percentage = Math.abs((info.point.y - info.item.startY));
        }
        return percentage;
    }
}
export default TextureDisplayer;
//# sourceMappingURL=Texturer.js.map