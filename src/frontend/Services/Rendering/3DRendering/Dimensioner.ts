import Service from "../../Service.js";
import { Camera, camera } from "../../../utils/Camera.js";

class Dimensioner extends Service{

    protected chief;

    constructor(chief){
        super();
        this.chief = chief;
    }


    public executeAsSubordinate(){
 
        // Too many variables and constants; a clousure is used to avoid declaring them over and over each call: Memory saved

        const cameraDegree = camera.rays[Math.floor((camera.rays.length) / 2)].degree;
        const context = this.chief.context;
        const total   = camera.rays.length;
        const canvasWidth  = this.chief.canvas.width;
        const canvasHeight = this.chief.canvas.height;

        var index :number;

        for(index = 0; index < camera.rays.length; index++) _calculateDimensions(this,camera.rays[index]);
     
        // Each fraction is a portion of the total length of the canvas horizontally

        function _calculateDimensions(service, ray, prevDistance = 0, adjustment : any = undefined){

            let distanceX = Math.abs(Math.abs(ray.collidesAt.x) - Math.abs(ray.source.pos ? ray.source.pos.x : ray.source.collidesAt.x));
            let distanceY = Math.abs(Math.abs(ray.collidesAt.y) - Math.abs(ray.source.pos ? ray.source.pos.y : ray.source.collidesAt.y));
            let distance  = Math.hypot(distanceX,distanceY) + prevDistance;

            // Fish-eye effect is fixed with this adjustment to the distance

            adjustment = adjustment || Math.cos(Math.abs((Math.abs(cameraDegree - ray.degree) / 180) * Math.PI));
            let adjustedDistance = distance * adjustment;

            let leftTop  = { x : ((canvasWidth * index) / total), y : (canvasHeight / 2) - (canvasHeight) / adjustedDistance};
            let size     = { x : canvasWidth / total, y : (canvasHeight * 2) / adjustedDistance};

            let info = {

                // Spatial and dimensional information

                leftTop  : leftTop,
                size     : size,
                distance : distance,

                // Extra information which is required

                color    : ray.collidesWith.color,
                opacity  : ray.collidesWith.opacity
            }

            if(info.opacity < 1 && ray.reflected.getType){
                _calculateDimensions(service,ray.reflected,distance, adjustment);
            }

            service.chief._onvariablesCalculated(info); // Internal event notified to chief module
        }
    }
}

export default Dimensioner;