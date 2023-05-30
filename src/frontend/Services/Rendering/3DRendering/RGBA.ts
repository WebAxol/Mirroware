import Service from "../../Service.js";
import { Camera, camera } from "../../../utils/Camera.js";

class RGBA extends Service{

    protected chief;
    protected pause :boolean = false;

    constructor(chief){
        super();
        this.chief = chief;
    }

    public executeAsSubordinate(sceneChunk){

        if(this.pause){
            this.chief.world.pauseExecution();
            return;
        } 

        for(let f = 0; f < sceneChunk.details.columns; f++){

            this.renderRectangle(sceneChunk);
            //this.renderHorizontalBorders(sceneChunk);
            this.incrementalInterpolation(sceneChunk);
        }

        //this.pause = true;
    }

    private incrementalInterpolation(sceneChunk){

        let details = sceneChunk.details;

        details.start.x += details.change.x;
        details.start.y += details.change.y;
        details.start.h += details.change.h;

    }

    public renderRectangle(sceneChunk){

        let context     = this.chief.context;
        let canvasWidth = this.chief.canvas.width;

        // Black opaque background to avoid transparent walls

        context.fillStyle = `rgba(10,0,0,${sceneChunk.item.opacity})`;

        let details = sceneChunk.details.start;
        
        context.fillRect(
            details.x,
            details.y,
            50,
            details.h
        );

        // Render wall with its color (if it has)

        if(!sceneChunk.item.color) return;

        let distance = 5;

        context.fillStyle = `rgba(${sceneChunk.item.color}, ${sceneChunk.item.opacity / ((distance * 5) / 15)}`;
        context.fillRect(
            details.x,
            details.y,
            20,
            details.h
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