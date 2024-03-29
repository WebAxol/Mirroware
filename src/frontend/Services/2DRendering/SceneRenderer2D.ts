import Service from "../Service.js";
import { Camera, camera } from "../../utils/Camera.js";

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
        const verticalWalls   = this.world.getCollection('VerticalWalls');
        const circles         = this.world.getCollection('Circles');

        this.#context.fillStyle = 'rgba(0,0,0,1)';
        this.#context.fillRect(0,0,3000,3000);
        
        this.renderRay(camera.rays[Math.floor(camera.rays.length / 2)],camera.pos);

        /*  
        camera.rays.forEach(ray => {
            this.renderRay(ray,camera.pos);
        });
        */
        horizontalWalls.forEach(wall => {
            this.renderWall(wall);
        });

        verticalWalls.forEach(wall => {
            this.renderWall(wall);
        });

        circles.forEach(circle => {
            this.renderCircle(circle);
        });

    };

    public renderWall(wall){

        this.#context.strokeStyle = `rgba(${wall.color},1)`;
        this.#context.lineWidth = 15;

        this.#context.beginPath();
        this.#context.moveTo((wall.startX || wall.posX) * this.scale, (wall.posY || wall.startY) * this.scale);
        this.#context.lineTo((wall.endX   || wall.posX) * this.scale, (wall.posY || wall.endY  ) * this.scale);
        this.#context.closePath();
        this.#context.stroke();
    }

    public renderRay(ray, source){


        if(ray.reflected.getType && ray.reflected.active){
            this.renderRay(ray.reflected, ray.collidesAt);
        }

        this.#context.strokeStyle = ray.level <= 1 ? 'white' : 'red';
        this.#context.lineWidth = 10;

        this.#context.beginPath();
        this.#context.moveTo(source.x * this.scale, source.y * this.scale);
        this.#context.lineTo(ray.collidesAt.x * this.scale,  ray.collidesAt.y * this.scale);
        this.#context.closePath();
        this.#context.stroke();

    }

    public renderCircle(circle){
    
        this.#context.strokeStyle = `rgb(${circle.color})`;
        this.#context.lineWidth = 10;

        this.#context.beginPath();
        this.#context.arc(circle.center.x * this.scale, circle.center.y * this.scale, circle.radius * this.scale, 0, 2 * Math.PI);
        this.#context.stroke();

    }

}

export default SceneRenderer2D;