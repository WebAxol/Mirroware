import Service from "../Service.js";

class SceneRenderer2D extends Service{

    public scale : number
    #context;

    constructor(c){
        super();
        this.#context = c;
        this.scale = 50;
    }

    public execute() {
        
        const horizontalWalls = this.world.getCollection('HorizontalWalls');
        const verticalWalls = this.world.getCollection('VerticalWalls');
        const raySource = this.world.getCollection('RaySources')[0];

        this.#context.fillStyle = 'rgba(0,0,0,0.1)';
        this.#context.fillRect(0,0,3000,1500);

        raySource.rays.forEach(ray => {
            this.renderRay(ray,raySource.pos);
        });

        horizontalWalls.forEach(wall => {
            this.renderHorizontalWall(wall);
        });

        verticalWalls.forEach(wall => {
            this.renderVerticalWall(wall);
        });

    };

    public renderHorizontalWall(wall){

        this.#context.strokeStyle = 'red';
        this.#context.lineWidth = 3;

        if(wall.isMirror) this.#context.strokeStyle = 'lawngreen';

        this.#context.beginPath();
        this.#context.moveTo(wall.startX * this.scale, wall.posY * this.scale);
        this.#context.lineTo(wall.endX * this.scale,  wall.posY * this.scale);
        this.#context.closePath();
        this.#context.stroke();
    }

    public renderVerticalWall(wall){


        this.#context.strokeStyle = 'red';
        this.#context.lineWidth = 3;

        if(wall.isMirror) this.#context.strokeStyle = 'lawngreen';

        this.#context.beginPath();
        this.#context.moveTo(wall.posX * this.scale, wall.startY * this.scale);
        this.#context.lineTo(wall.posX * this.scale, wall.endY * this.scale);
        this.#context.closePath();
        this.#context.stroke();

    }

    public renderRay(ray, source){

        this.#context.strokeStyle = 'white';
        this.#context.lineWidth = 3;

        this.#context.beginPath();
        this.#context.moveTo(source.x * this.scale, source.y * this.scale);
        this.#context.lineTo(ray.collidesAt.x * this.scale,  ray.collidesAt.y * this.scale);
        this.#context.closePath();
        this.#context.stroke();

        if(ray.reflected.getType && ray.reflected.active){
            this.renderRay(ray.reflected, ray.collidesAt);
        }
    }

}

export default SceneRenderer2D;