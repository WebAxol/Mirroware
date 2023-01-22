import Service from "../../Service.js";
import { Camera, camera } from "../../../utils/Camera.js";
import textures from "../../../utils/Textures.js";

// TODO: Modularize into finer-grained rendering sub-services

class  SceneRenderer3D extends Service{
    
    #canvas;
    #context;

    constructor(canvas){
        super();

        this.#canvas  = canvas;
        this.#context = canvas.getContext('2d');
    }

    public execute(){

        this.#context.fillStyle = 'rgba(0,0,0,1)';
        this.#context.fillRect(0,0,this.#canvas.width,this.#canvas.height);

        this.#context.fillStyle = 'brown';
        this.#context.fillRect(0,0,this.#canvas.width,this.#canvas.height / 2);

        this.renderScene(camera);

    }

    // The scene is a histogram of rectangles aligned verically to the middle of the canvas

    public renderScene(camera : Camera){
 
        const cameraDegree = camera.rays[Math.floor((camera.rays.length) / 2)].degree;
        const context = this.#context;

        const total   = camera.rays.length;
        const canvasWidth  = this.#canvas.width;
        const canvasHeight = this.#canvas.height;

        var index = 0;

        camera.rays.forEach((ray , rayIndex) => {
            
            index = rayIndex;

            _calculateVariables(ray);
        });

        // Each fraction is a portion of the total length of the canvas horizontally

        function _calculateVariables(ray, prevDistance = 0, adjustment : any = undefined){

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
                _calculateVariables(ray.reflected,distance, adjustment);
            }

            _renderRectangle(info);
            
            _renderHorizontalBorders(info);
        }

        function _renderRGBA(info){

            context.fillStyle = `rgba(${info.color}, ${info.opacity / (info.distance / 5)}`;
            context.fillRect(
                info.leftTop.x,
                info.leftTop.y, 
                canvasWidth / total,
                info.size.y
            );
            context.globalAlpha = 1;

        }

        function _renderTexture(info){

            let scale  = info.size.y / 1000;
            let height = 1000;
            let texture = textures.get('bricks');

            
            context.globalAlpha = info.opacity / (info.distance / 5);
            context.scale(1,scale);
                
            context.drawImage(
                texture,
                (info.leftTop.x / 2) % 400,
                0,                 
                5,                  
                400,                
                info.leftTop.x,
                ((canvasHeight / 2) / scale) - (height / 2),
                15,                 
                height
            );

            context.scale(1, 1 / scale);
        }

        function _renderRectangle(info){

            context.fillStyle = `rgba(0,0,0,${info.opacity})`;
            context.fillRect(
                info.leftTop.x,
                info.leftTop.y,
                canvasWidth / total,
                info.size.y
            );

            _renderTexture(info);

            context.globalAlpha = 1;
        }

        function _renderHorizontalBorders(info){

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
}

export default SceneRenderer3D;