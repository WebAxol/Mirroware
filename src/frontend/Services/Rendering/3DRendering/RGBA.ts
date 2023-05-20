import Service from "../../Service.js";
import { Camera, camera } from "../../../utils/Camera.js";

class RGBA extends Service{

    protected chief;

    constructor(chief){
        super();
        this.chief = chief;
    }

    public executeAsSubordinate(sceneChunk){

        this.renderRectangle(sceneChunk);
        this.renderHorizontalBorders(sceneChunk);

    }

    public renderRectangle(sceneChunk){

        // We take into account the properties of the "item" with which the ray collides to render each column

        let context     = this.chief.context;
        let canvasWidth = this.chief.canvas.width;

        // Black opaque background to avoid transparent walls

        context.fillStyle = `rgba(10,0,0,${sceneChunk.item.opacity})`;
        
        context.fillRect(
            sceneChunk.leftTop.x,
            sceneChunk.leftTop.y,
            canvasWidth / camera.rays.length,
            sceneChunk.size.y
        );

        // Render wall with its color (if it has)

        if(!sceneChunk.item.color) return;

        context.fillStyle = `rgba(${sceneChunk.item.color}, ${sceneChunk.item.opacity / ((sceneChunk.distance * 5) / 15)}`;
        context.fillRect(
            sceneChunk.leftTop.x,
            sceneChunk.leftTop.y, 
            canvasWidth / camera.rays.length,
            sceneChunk.size.y
        );
    }

    public renderHorizontalBorders(sceneChunk){

        let context = this.chief.context;

        context.strokeStyle = `red`;
        context.lineWidth = 30 / sceneChunk.distance;
        
        // Top border

        context.beginPath();
        context.moveTo( sceneChunk.leftTop.x,sceneChunk.leftTop.y);
        context.lineTo( sceneChunk.leftTop.x + sceneChunk.size.x, sceneChunk.leftTop.y);
        context.closePath();
        context.stroke();

        // Bottom border

        context.beginPath();
        context.moveTo( sceneChunk.leftTop.x, (sceneChunk.leftTop.y + sceneChunk.size.y));
        context.lineTo( sceneChunk.leftTop.x + sceneChunk.size.x, (sceneChunk.leftTop.y + sceneChunk.size.y));
        context.closePath();
        context.stroke();

    }

}

export default RGBA;