import Service from '../../Service.js';
import textures from '../../../utils/Textures.js';
import Vector2D from '../../../utils/Vector2D.js';
class TextureDisplayer extends Service {
    constructor(chief) {
        super();
        this.chief = chief;
    }
    ;
    executeAsSubordinate() {
        const textureSpan = 2;
        let height = 1000;
        let roll = ['bricks', 'bricks'];
        const renderStack = this.chief.getStack();
        for (let i = renderStack.length - 1; i >= 0; i--) {
            let sceneChunk = renderStack[i];
            let scale = sceneChunk.size.y / 1000;
            let pixelNum;
            if (sceneChunk.item.radius)
                pixelNum = this.mapCylinder(sceneChunk);
            else
                pixelNum = this.mapTexture(sceneChunk);
            let percentage = pixelNum / textureSpan % 1;
            let texture = textures.getTexture(roll[Math.floor(pixelNum / textureSpan) % 2]);
            let context = this.chief.context;
            let canvasHeight = this.chief.canvas.height;
            context.globalAlpha = Math.min(sceneChunk.item.opacity / (sceneChunk.distance / 10) / 5, 0.5);
            context.scale(1, scale);
            context.drawImage(texture, (percentage * 390) % 390, 0, 10, 400, sceneChunk.leftTop.x, ((canvasHeight / 2) / scale) - (height / 2), 3000 / 300, height);
            context.scale(1, 1 / scale);
            this.chief.context.globalAlpha = 1;
        }
    }
    mapCylinder(info) {
        const direction = new Vector2D(Math.cos(this.chief.world.frame / 100), Math.sin(this.chief.world.frame / 100));
        const centerToPoint = Vector2D.sub(info.point, info.item.center);
        const angle = Vector2D.angleBetween(centerToPoint, direction);
        return angle / 18 * (info.item.radius / 3);
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