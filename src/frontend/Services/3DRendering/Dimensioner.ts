import Service from "../Service.js";
import { Camera, camera } from "../../utils/Camera.js";
import { SceneChunk } from "../../types/SceneChunk.js"
import Vector2D from '../../utils/Vector2D.js';
import CONFIG from "../../config.js";

class Dimensioner extends Service{

    protected chief;
    public interpolations :number;

    constructor(chief){
        super();
        this.chief = chief;
        this.interpolations = 0;
    }


    public executeAsSubordinate(){

        // Too many variables and constants; a clousure is used to avoid declaring them over and over each call: Memory saved

        const context :CanvasRenderingContext2D = this.chief.context;

        const cameraDegree :number = camera.rays[Math.floor((camera.rays.length) / 2)].degree;
        const bruteTotal   :number = camera.rays.length;
        const netTotal     :number = bruteTotal * (this.interpolations + 1); 
        const canvasWidth  :number = this.chief.canvas.width;
        const canvasHeight :number = this.chief.canvas.height;

        // We call 'fraction' to every individual rectangle computed, and we call 'sceneChuck' to every group of fractions that include two rectangles in between which interpolation has occurred
        // We'll store the information of pre-calculated fractions so that when the data from the adjacent ray is calculated, interpolation can be performed to compute sceneChunks
        
        var index :number;

        for(index = 0; index < camera.rays.length; index++) _calculateDimensions(this,camera.rays[index]);
    
        // Each fraction is a portion of the bruteTotal length of the canvas horizontally

        function _calculateDimensions(service, ray, prevDistance = 0, adjustment : any = undefined){

            if(!ray.collidesWith) return;

            let distanceX = Math.abs(ray.collidesAt.x - (ray.source.pos ? ray.source.pos.x : ray.source.collidesAt.x));
            let distanceY = Math.abs(ray.collidesAt.y - (ray.source.pos ? ray.source.pos.y : ray.source.collidesAt.y));
            let distance  = Math.hypot(distanceX,distanceY) + prevDistance;

            // Fish-eye effect is fixed with this adjustment to the distance

            adjustment = adjustment || Math.cos(Math.abs((Math.abs(cameraDegree - ray.degree) / 180) * Math.PI));
            let adjustedDistance = distance * adjustment// + Math.min((Math.sin(((Math.ceil(service.chief.world.frame / 5) / 5) + (index / 20)) / 1) * (distance / 10)), 10);

        
            let leftTop  = { x : ((canvasWidth * index) / bruteTotal), y : (canvasHeight / 2) - (canvasHeight) / adjustedDistance};
            let size     = { x : canvasWidth / netTotal, y : (canvasHeight * 2) / adjustedDistance};

            // Create sceneChunck to render

            // Adjust light and darkness levels

            let flashLightBrightness = !CONFIG.fog ? 1 : Math.pow(((index - (camera.rays.length / 2))/ 10 ),2) / CONFIG.lightLevel;
    
            let sceneChunck = service.chief.world.createAgent('SceneChunk',{
                info : {
                    leftTop  : leftTop,
                    size     : size,
                    distance : distance * Math.max(flashLightBrightness, 1),

                    // Information of item with which ray collided

                    point    : ray.collidesAt,
                    item     : ray.collidesWith
                }
            });

            service.chief.addChunk(sceneChunck);

            if(sceneChunck.item.opacity < 1 && ray.reflected.getType){
                _calculateDimensions(service,ray.reflected,distance, adjustment);
            }
        }
    }
}

export default Dimensioner;