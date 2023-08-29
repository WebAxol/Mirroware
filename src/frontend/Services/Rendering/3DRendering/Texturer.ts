import Service from '../../Service.js';
import textures from '../../../utils/Textures.js'

class TextureDisplayer extends Service{

    protected chief;

    constructor(chief){
        super();
        this.chief = chief; 
    };

    public executeAsSubordinate(info){

        const textureSpan = 2;
        
        let scale  = info.size.y / 1000;
        let height = 1000;
        let roll = ['dirt','netherrack','bricks'];
        
        let pixelNum :number = this.mapTexture(info);
        let percentage :number = pixelNum / textureSpan % 1;
        let texture = textures.getTexture(roll[Math.floor(pixelNum / textureSpan) % 3]);

        let context = this.chief.context;
        let canvasHeight = this.chief.canvas.height;
        
        context.globalAlpha = Math.min(info.item.opacity / (info.distance / 10) / 5, 0.5);
        context.scale(1,scale);
            
        context.drawImage(
            texture,
            (percentage * 390) % 390,
            0,                 
            10,                  
            400,                
            info.leftTop.x,
            ((canvasHeight / 2) / scale) - (height / 2),
            3000 / 300,                 
            height
        );

        context.scale(1, 1 / scale);
    }

    public mapTexture(info) :number{

        let percentage :number = 0;

        if(info.item.getType() === 'HorizontalWall'){

            let wallLength = info.item.endX - info.item.startX;
            percentage = Math.abs(((info.point.x - info.item.startX)));
        }

        else if(info.item.getType() === 'VerticalWall'){

            let wallLength = info.item.endY - info.item.startY;
            percentage = Math.abs((info.point.y - info.item.startY));
        }

        return percentage;
    }

}

export default TextureDisplayer;