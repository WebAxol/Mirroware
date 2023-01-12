import Service from '../Service.js';

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
        this.#context.fillRect(0,0,3000,1500);

        this.#context.fillStyle = 'white';
        this.#context.fillRect(0,0,3000,1500 / 2);

        const raySource = this.world.getCollection('RaySources')[0];
        this.renderScene(raySource);

        //this.#context.fillStyle = 'rgba(255,0,0,1)';
        //this.#context.fillRect(0,750,3000,1);
    }

    // The scene is a histogram of rectangles aligned verically to the middle of the canvas

    public renderScene(source){
 
        const cameraDegree = source.rays[Math.floor((source.rays.length) / 2)].degree;
        const context = this.#context;
        const total   = source.rays.length;
        const canvasWidth  = this.#canvas.width;
        const canvasHeight = this.#canvas.height;

        var index = 0;

        source.rays.forEach((ray , rayIndex) => {
            
            index = rayIndex;

            _calculateVariables(ray);
        });

        // Each fraction is a portion of the total length of the canvas horizontally

        function _calculateVariables(ray, prevDistance = 0, adjustment : any = undefined){

            //console.log(total,index);

            try{
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
            }catch(err){
                console.log(ray.source.pos);
                console.error(err);
            }


        }

        function _renderRectangle(info){

            //context.globalAlpha = info.opacity;
            context.fillStyle = `rgba(0,0,0,${info.opacity})`;
            context.fillRect(
                info.leftTop.x,
                info.leftTop.y,
                canvasWidth / total,
                info.size.y
            );
            context.globalAlpha = 1;

            context.fillStyle = `rgba(${info.color}, ${info.opacity / (info.distance / 10)}`;
            context.fillRect(
                info.leftTop.x,
                info.leftTop.y,
                canvasWidth / total,
                info.size.y
            );
            context.globalAlpha = 1;

            /*

            context.fillStyle = `rgba(255,255,255,${info.distance / 30})`;
            context.fillRect(
                info.leftTop.x,
                info.leftTop.y + info.size.y,
                canvasWidth / total,
                info.size.y
            );  
            */
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