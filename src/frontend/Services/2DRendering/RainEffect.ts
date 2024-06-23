import Service from "../Service.js";
import Vector2D from '../../utils/physics/Vector2D.js';

class RainEffect extends Service {

    private context :CanvasRenderingContext2D | null;
    private rainDrops :any[];
    private direction :Vector2D;

    constructor(canvas :HTMLCanvasElement){
    
        super();    
        this.context  = canvas.getContext('2d');
        this.direction = new Vector2D(-1,2).normalize();
        this.rainDrops = []; 

        this.generateDrops();

    }

    private generateDrops(){

        for(let i = 0; i < 100; i++){

            let drop = {
                pos   : new Vector2D(Math.random() * 3000, Math.random() * 1700),
                size  : Math.random() * 50,
                speed : 50 + Math.random() * 3
            };

            this.rainDrops.push(drop);
        }

    }

    private render(drop :any){

        if(this.context === null) return;

        console.log(drop);


        this.context.beginPath();

        this.context.strokeStyle = 'rgba(0,0,0,0.5)';
        this.context.lineWidth   =  drop.size / 10;

        this.context.moveTo(drop.pos.x,drop.pos.y)
        this.context.lineTo(drop.pos.x  + this.direction.x * drop.size , drop.pos.y + this.direction.y * drop.size );
        this.context.stroke();

        this.context.closePath();
    }

    private update(drop :any){

        drop.pos.add(Vector2D.scale(this.direction, drop.speed));

        if(drop.pos.x <= 0) drop.pos.x = 3000;
        if(drop.pos.y >= 1700) drop.pos.y = 0;

    }

    public execute(){

        this.context?.clearRect(0,0,3000,1700);

        this.rainDrops.forEach((drop) => {
       
            this.update(drop);
            this.render(drop);

        });

    }

}

export default RainEffect;