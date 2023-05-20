import Service from '../../../Service.js';
import textures from '../../../../utils/Textures.js';
class TextureDisplayer extends Service {
    constructor(chief) {
        super();
        this.chief = chief;
    }
    ;
    executeAsSubordinate(info) {
        let scale = info.size.y / 1000;
        let height = 1000;
        let texture = textures.get('bricks');
        // TODO: Fix reference-chain antipattern: too many "chief" references chained
        let context = this.chief.chief.context;
        let canvasHeight = this.chief.chief.canvas.height;
        context.globalAlpha = info.opacity / (info.distance / 5) / 5;
        context.scale(1, scale);
        context.drawImage(texture, (info.leftTop.x / 2) % 400, 0, 5, 400, info.leftTop.x, ((canvasHeight / 2) / scale) - (height / 2), 15, height);
        context.scale(1, 1 / scale);
    }
}
export default TextureDisplayer;
