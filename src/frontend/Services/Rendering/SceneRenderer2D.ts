import Service from "../Service.js";

class SceneRenderer2D extends Service{

    public scale : number
    #context;

    constructor(canvas){
        super();
        this.#context = canvas.getContext('2d');
        this.scale = 100;
    }

    public execute() {
        
        const horizontalWalls = this.world.getCollection('HorizontalWalls');
        const verticalWalls = this.world.getCollection('VerticalWalls');
        const raySource = this.world.getCollection('RaySources')[0];

        this.#context.fillStyle = 'rgba(0,0,0,1)';
        this.#context.fillRect(0,0,3000,3000);

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

        this.#context.strokeStyle = `rgba(${wall.color},1)`;
        this.#context.lineWidth = 15;

        this.#context.beginPath();
        this.#context.moveTo(wall.startX * this.scale, wall.posY * this.scale);
        this.#context.lineTo(wall.endX * this.scale,  wall.posY * this.scale);
        this.#context.closePath();
        this.#context.stroke();
    }

    public renderVerticalWall(wall){


        this.#context.strokeStyle =  `rgba(${wall.color},1)`;
        this.#context.lineWidth = 15;

        this.#context.beginPath();
        this.#context.moveTo(wall.posX * this.scale, wall.startY * this.scale);
        this.#context.lineTo(wall.posX * this.scale, wall.endY * this.scale);
        this.#context.closePath();
        this.#context.stroke();

    }

    public renderRay(ray, source){

        if(ray.reflected.getType && ray.reflected.active){
            this.renderRay(ray.reflected, ray.collidesAt);
        }

        this.#context.strokeStyle = ray.level <= 1 ? 'white' : 'red';
        this.#context.lineWidth = 1;

        this.#context.beginPath();
        this.#context.moveTo(source.x * this.scale, source.y * this.scale);
        this.#context.lineTo(ray.collidesAt.x * this.scale,  ray.collidesAt.y * this.scale);
        this.#context.closePath();
        this.#context.stroke();

    }

}

export default SceneRenderer2D;