import Service from "../../Service.js";
import { Camera, camera } from "../../../utils/Camera.js";

class RGBA extends Service{

    #chief;

    constructor(chief){
        super();
        this.#chief = chief;
    }

    public executeAsSubordinate(info){

        this.renderRectangle(info);
        this.renderHorizontalBorders(info);

    }

    public renderRectangle(info){

        let context     = this.#chief.context;
        let canvasWidth = this.#chief.canvas.width;

        context.fillStyle = `rgba(0,0,0,${info.opacity})`;
        context.fillRect(
            info.leftTop.x,
            info.leftTop.y,
            canvasWidth / camera.rays.length,
            info.size.y
        );

        if(!info.color) return;
        
        context.fillStyle = `rgba(${info.color}, ${info.opacity / (info.distance / 5)}`;
        context.fillRect(
            info.leftTop.x,
            info.leftTop.y, 
            canvasWidth / camera.rays.length,
            info.size.y
        );
    }

    public renderHorizontalBorders(info){

        let context = this.#chief.context;

        context.strokeStyle = `red`;
        context.lineWidth = 30 / info.distance;
        
        context.beginPath();
        context.moveTo( info.leftTop.x,info.leftTop.y);
        context.lineTo( info.leftTop.x + info.size.x, info.leftTop.y);
        context.closePath();
        context.stroke();

        context.beginPath();
        context.moveTo( info.leftTop.x, (info.leftTop.y + info.size.y));
        context.lineTo( info.leftTop.x + info.size.x, (info.leftTop.y + info.size.y));
        context.closePath();
        context.stroke();

    }

}

export default RGBA;