import Service from "../../Service.js";
import { Camera, camera } from "../../../utils/Camera.js";
import { SceneChunk } from "../../../utils/SceneModel.js";
import { Ray } from "../../../setUp/agentTypes.js";

class Dimensioner extends Service{

    protected chief;
    public interpolations :number;

    constructor(chief){
        super();
        this.chief = chief;
        this.interpolations = 0;
    }

    public executeAsSubordinate(){
 
        const sceneModel = camera.sceneModel;

        for(let l = sceneModel.layers.length - 1; l >= 0; l--){

            sceneModel[l].forEach(sceneChunk => {
                this.calculateChunkDimensions(sceneChunk);
            });
        }
    }

    public calculateChunkDimensions(sceneChunk :SceneChunk, prevDistance = 0, adjustment = undefined){

        const cameraDegree = camera.rays[Math.floor((camera.rays.length) / 2)].degree;
        const context = this.chief.context;
        const bruteTotal    = camera.rays.length;
        const netTotal = bruteTotal * (this.interpolations + 1); 
        const canvasWidth  = this.chief.canvas.width;
        const canvasHeight = this.chief.canvas.height;
        const fractionQueue = [];

        let from :Ray = sceneChunk.from;
        let to   :Ray = sceneChunk.to;

        function calculateRayDetails(ray, prevDistance :number = 0, adjustment :number = 1){

            let index     = Math.floor(ray.degree / camera.rays[camera.rays.length - 1].degree) * camera.rays.length;
            let distanceX = Math.abs(Math.abs(ray.collidesAt.x) - Math.abs(ray.source.pos ? ray.source.pos.x : ray.source.collidesAt.x));
            let distanceY = Math.abs(Math.abs(ray.collidesAt.y) - Math.abs(ray.source.pos ? ray.source.pos.y : ray.source.collidesAt.y));
            let distance  = Math.hypot(distanceX,distanceY) + prevDistance;

            // Fish-eye effect is fixed with this adjustment to the distance

            adjustment = adjustment || Math.cos(Math.abs((Math.abs(cameraDegree - ray.degree) / 180) * Math.PI));
            let adjustedDistance = distance * adjustment;

            let rayDetails = {
                leftTop : { x : ((canvasWidth * index) / bruteTotal), y : (canvasHeight / 2) - (canvasHeight) / adjustedDistance},
                size    : { x : canvasWidth / netTotal, y : (canvasHeight * 2) / adjustedDistance }
            }

            return rayDetails;
        }

        sceneChunk.details = {

            initial : {
                leftTop : {}
            },
            change : {
                leftTop : {}
            },

            columns : NaN
        };
    }

    public interpolateDetails(detailA,detailB){
        
    }

}

export default Dimensioner;