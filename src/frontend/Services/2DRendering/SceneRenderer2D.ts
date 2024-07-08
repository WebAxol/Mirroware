import Service  from "../Service.js";
import Vector2D from "../../utils/physics/Vector2D.js";
import { Camera, camera } from "../../utils/scene/Camera.js";

class SceneRenderer2D extends Service{

    public scale : number
    #context;

    constructor(canvas){
        super();
        this.#context = canvas.getContext('2d');
        this.scale = 1.5 * 3;
    }

    public execute() {
        
        const horizontalWalls = this.world.getCollection('HorizontalWalls');
        const verticalWalls   = this.world.getCollection('VerticalWalls');
        const circles         = this.world.getCollection('Circles');

        this.#context.fillStyle = 'rgba(0,0,0,1)';
        this.#context.fillRect(0,0,3000,3000);
        
        //this.renderRay(camera.rays[Math.floor(camera.rays.length / 2)],camera.pos);

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

        if(!camera.castCenter) return;

        const deg = camera.castCenter?.direction.angle() * (180 / Math.PI);

        this.#context.strokeStyle = `rgba(${wall.color},1)`;
        //this.#context.strokeStyle = `lawngreen`;
        this.#context.lineWidth = 1;

        let from = { x : wall.startX || wall.posX, y : wall.posY || wall.startY};
        let to   = { x : wall.endX   || wall.posX, y : wall.posY || wall.endY  };

        from = Vector2D.rotate(from, camera.pos, deg);
        to   = Vector2D.rotate(to,   camera.pos, deg);

        from = Vector2D.sub(Vector2D.sub(from,camera.pos), { x : -10, y : -10 }).scale(this.scale);
        to   = Vector2D.sub(Vector2D.sub(to,  camera.pos), { x : -10, y : -10 }).scale(this.scale);

        this.#context.beginPath();
        this.#context.moveTo(from.x,from.y);
        this.#context.lineTo(to.x,to.y);
        this.#context.closePath();
        this.#context.stroke();
    }

    public renderRay(ray, source){

        if(!camera.castCenter) return;

        const deg = camera.castCenter?.direction.angle() * (180 / Math.PI);

        if(ray.reflected.getType && ray.reflected.active){
            this.renderRay(ray.reflected, ray.collidesAt);
        }

        this.#context.strokeStyle = 'rgba(255,255,255,0.05)'//'white' : 'red';
        this.#context.lineWidth = 1;

        let from = Vector2D.rotate(source, camera.pos, deg);
        let to   = Vector2D.rotate(ray.collidesAt, camera.pos, deg);

        from = Vector2D.sub(Vector2D.sub(from,camera.pos), { x : -10, y : -10 }).scale(this.scale);
        to   = Vector2D.sub(Vector2D.sub(to,  camera.pos), { x : -10, y : -10 }).scale(this.scale);


        this.#context.beginPath();
        this.#context.moveTo(from.x,from.y);
        this.#context.lineTo(to.x,to.y);
        this.#context.closePath();
        this.#context.stroke();

    }

    public renderCircle(circle){

        if(!camera.castCenter) return;

        const deg = camera.castCenter?.direction.angle() * (180 / Math.PI);

        this.#context.strokeStyle = `rgb(${circle.color})`;
        this.#context.lineWidth = 1;

        let center = Vector2D.rotate(circle.center,camera.pos,deg);
        center = Vector2D.sub(Vector2D.sub(center,camera.pos), { x : -10, y : -10 }).scale(this.scale);

        this.#context.beginPath();
        this.#context.arc(center.x, center.y, circle.radius * this.scale, 0, 2 * Math.PI);
        this.#context.stroke();

    }

}

export default SceneRenderer2D;