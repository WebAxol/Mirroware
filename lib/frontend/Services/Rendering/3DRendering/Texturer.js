import Service from '../../Service.js';
import textures from '../../../utils/Textures.js';
class TextureDisplayer extends Service {
    constructor(chief) {
        super();
        this.chief = chief;
    }
    ;
    executeAsSubordinate(info) {
        let scale = info.size.y / 1000;
        let height = 1000;
        let texture = textures.getTexture('bricks');
        let percentage = this.mapTexture(info);
        let context = this.chief.context;
        let canvasHeight = this.chief.canvas.height;
        context.globalAlpha = info.item.opacity / (info.distance / 10) / 5;
        context.scale(1, scale);
        context.drawImage(texture, (percentage * 400) % 390, 0, 10, 400, info.leftTop.x, ((canvasHeight / 2) / scale) - (height / 2), 3000 / 300, height);
        context.scale(1, 1 / scale);
    }
    mapTexture(info) {
        let percentage = 0;
        if (info.item.getType() === 'HorizontalWall') {
            let wallLength = info.item.endX - info.item.startX;
            percentage = Math.abs(((info.point.x - info.item.startX) / (wallLength / 5)) % 1);
        }
        else if (info.item.getType() === 'VerticalWall') {
            let wallLength = info.item.endY - info.item.startY;
            percentage = Math.abs((info.point.y - info.item.startY) / (wallLength / 5) % 1);
        }
        return percentage;
    }
}
export default TextureDisplayer;
//# sourceMappingURL=Texturer.js.map