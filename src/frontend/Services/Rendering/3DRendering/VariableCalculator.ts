import Service from "../../Service.js";
import { Camera, camera } from "../../../utils/Camera.js";

class VariableCalculator extends Service{

    #chief;

    constructor(chief){
        super();
        this.#chief = chief;
    }

    // The scene is a histogram of rectangles aligned verically to the middle of the canvas

    public executeAsSubordinate(){
 
        const cameraDegree = camera.rays[Math.floor((camera.rays.length) / 2)].degree;
        const context = this.#chief.context;

        const total   = camera.rays.length;
        const canvasWidth  = this.#chief.canvas.width;
        const canvasHeight = this.#chief.canvas.height;

        var index = 0;

        camera.rays.forEach((ray , rayIndex) => {
            
            index = rayIndex;

            _calculateVariables(this,ray);
        });

        // Each fraction is a portion of the total length of the canvas horizontally

        function _calculateVariables(service, ray, prevDistance = 0, adjustment : any = undefined){

            let distanceX = Math.abs(Math.abs(ray.collidesAt.x) - Math.abs(ray.source.pos ? ray.source.pos.x : ray.source.collidesAt.x));
            let distanceY = Math.abs(Math.abs(ray.collidesAt.y) - Math.abs(ray.source.pos ? ray.source.pos.y : ray.source.collidesAt.y));
            let distance  = Math.hypot(distanceX,distanceY) + prevDistance;

            adjustment = adjustment || Math.cos(Math.abs((Math.abs(cameraDegree - ray.degree) / 180) * Math.PI));
        
            let adjustedDistance = distance * adjustment;

            let leftTop  = { x : ((canvasWidth * index) / total), y : (canvasHeight / 2) - (canvasHeight) / adjustedDistance};
            let size     = { x : canvasWidth / total, y : (canvasHeight * 2) / adjustedDistance};
            let info = {
                leftTop  : leftTop,
                size     : size,
                distance : distance,
                color    : ray.collidesWith.color,
                opacity  : ray.collidesWith.opacity
            }

            if(info.opacity < 1 && ray.reflected.getType){
                _calculateVariables(service,ray.reflected,distance, adjustment);
            }

            service.#chief._onvariablesCalculated(info); // Internal event notified to chief module
        }
    }
}

export default VariableCalculator;