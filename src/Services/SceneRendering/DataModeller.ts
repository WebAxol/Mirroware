import LocatorGL          from "../../utils/rendering/LocatorGL.js";
import Vector2D           from "../../utils/physics/Vector2D.js";
import CONFIG             from "../../config.js";
import Service            from "../Service.js";
import { gl }             from "../../setUp/webGL.js";
import { camera }         from "../../utils/scene/Camera.js";
import { Circle }         from "../../types/Circle.js";

type RGBA = [ number, number, number, number ]; 
type Pair<T> = [ T, T ];

interface Cache {
    itemID   : number;
    x        : Pair<number>;
    y        : Pair<number>;
    z        : Pair<number>;
    t        : Pair<number>;
    color    : Pair<RGBA>;
    child    : Cache | undefined;
    stripped : boolean;
}

class DataModeller extends Service{

    public memoryIndex : number = 0;

    // Empty dummy WebGLBuffer instances used before initialization

    private initialized : boolean = false;
    private frontBuffer         :WebGLBuffer  = gl.createBuffer() as WebGLBuffer;
    private frontElementBuffer  :WebGLBuffer  = gl.createBuffer() as WebGLBuffer;
    private lyingBuffer         :WebGLBuffer  = gl.createBuffer() as WebGLBuffer;
    private lyingElementBuffer  :WebGLBuffer  = gl.createBuffer() as WebGLBuffer;

    private cache :Cache;

    constructor( private chief ){
        super();

        const head :any = {};
        const n :number = 14;

        var  node :any = head;

        for(let i = 0; i <= n; i++){
            node.itemID = -1;
            node.color  = [NaN,NaN]; 
            node.x      = [NaN,NaN];
            node.y      = [NaN,NaN]; 
            node.z      = [NaN,NaN];
            node.t      = [NaN,NaN];
            node.child  = undefined
            node.stripped = false;

            if(i == n) continue;

            node.child  = {};
            node = node.child;
        }

        this.cache = head;

        console.log(this.cache);

        this.chief.world.pauseExecution();
    }

    // Real buffers being established after WebGL is initialized

    public init(){

        const locator :LocatorGL = this.chief.locator;

        this.frontBuffer        = locator.getBuffer("ARRAY_BUFFER","frontBuffer");
        this.frontElementBuffer = locator.getBuffer("ELEMENT_ARRAY_BUFFER","frontBuffer");
        this.lyingBuffer        = locator.getBuffer("ARRAY_BUFFER","lyingBuffer");
        this.lyingElementBuffer = locator.getBuffer("ELEMENT_ARRAY_BUFFER","lyingBuffer");

        this.initialized = true;

    }

    public reset() :void {

        this.memoryIndex = 0;

        var cache :Cache | undefined = this.cache;

        while(cache){
            cache.itemID   = -1;
            cache.stripped = true;
            cache = cache.child;
        }
    }

    // Texture mapping functions - return number within [0,1]

    private mapTexture(collidesAt : Vector2D, item : any){

        if(collidesAt == null) return 0;

        if(item.getType() == "Circle") return this.mapCylindricalTexture(collidesAt,item);

        return this.mapLinearTexture(collidesAt,item);
    }

    private mapLinearTexture(collidesAt : Vector2D, wall : any) : number {
        
        let percentage :number = 0;

        if(wall.getType() === 'HorizontalWall'){

            let wallLength = wall.endX - wall.startX;
            percentage = Math.abs(((collidesAt.x - wall.startX)));
        }

        else if(wall.getType() === 'VerticalWall'){

            let wallLength = wall.endY - wall.startY;
            percentage = Math.abs((collidesAt.y - wall.startY));
        }

        return percentage;
    }

    private mapCylindricalTexture(collidesAt : Vector2D, cyl : Circle) : number {

        let _angle = Math.ceil(this.chief.world.frame / 1) / 50;

        const direction = new Vector2D(Math.cos(_angle),Math.sin(_angle));
        const centerToPoint = Vector2D.sub(collidesAt,  cyl.center);
        const angle = Vector2D.angleBetween(centerToPoint,direction);

        //console.log(angle);

        return angle / (Math.PI / (cyl.radius * 2));
    }

    public model( ray : any, angle: number, index : number, ) : void {

        if(!this.initialized) this.init();  // Initialize buffers if not already
   
        const znear      = 1 / Math.tan(camera.FOV * Math.PI / 360);
        const deltaAngle = (camera.FOV / CONFIG.resolution) * (Math.PI / 180) * -1;

        var depth = 0;
        var itemID = -1, nx, ny, nt;
        var mi = Infinity;
        var mf = Infinity;
        var color, darkness;
        
        var lyingSurf    :any[] = [];
        var frontSurf    :any[] = [];
        var lyingElement :any[] = [];
        var frontElement :any[] = [];
        
        var cache :Cache | undefined = this.cache;
        var cut = false, stripped = false;
        var level = -1;

        while(cache){

            itemID = -1;

            if(ray && ray.collidesWith){

                itemID = ray.collidesWith.getID();

                // If the surface is circular (cylindrical), it will be rendered stripe by stripe
                
                stripped = ray.collidesWith.getType() == "Circle";

                depth +=  ray.lambda * Math.cos(Math.abs(angle));
                darkness = Math.pow(1 + (depth * depth / 20), 1); 

                ny = 0.01 + znear / depth;

                nx = Math.tan(angle - deltaAngle) * znear * ((index <= CONFIG.resolution / 2) ? -1 : 1);

                nt = this.mapTexture(ray.collidesAt, ray.collidesWith);

                color = (ray.collidesWith ?  ray.collidesWith.color + `,${ray.collidesWith.opacity}` : "0,0,0,1")
                    .split(',')
                    .map((component, i) => {  return i < 3 ? parseFloat(component) / (255 * darkness) : parseFloat(component); });
            }

            cut = cache.itemID >= 0 && (cut || (cache.itemID !== itemID || index === CONFIG.resolution - 1 || cache.stripped));

            if(cut){
                
                this.memoryIndex++;

                level++;

                let { x, y , z, t } = cache; 
            
                mi = Math.min(mi, Math.max(y[0],1));
                mf = Math.min(mf, Math.max(y[1] ,1));
            
                
                frontSurf = [

                    //          Position              |       Color      |    Texturing
                    //  x           y           z     |  r   g   b   a   | U   V
                    x[0] * z[0] , y[0] * z[0] , z[0] , ...cache.color[0], t[0],0,
                    x[1] * z[1] , y[1] * z[1] , z[1] , ...cache.color[1], t[1],0,
                    x[1] * z[1] ,-y[1] * z[1] , z[1] , ...cache.color[1], t[1],1,
                    x[0] * z[0] ,-y[0] * z[0] , z[0] , ...cache.color[0], t[0],1,
                ]
                
                .concat(frontSurf);

                frontElement = ([
                    0, 1, 2, 
                    0, 3, 2,
                ]
                .map((i) => {  return i + (this.memoryIndex - level) * 4 })
                ).concat(frontElement.map((i) => { return i + 4 }));

                lyingSurf = [
                    //  Ceiling
                    x[0] * z[0] , mi   * z[0] ,z[0],  1,
                    x[1] * z[1] , mf   * z[1] ,z[1],  1,
                    x[1] * z[0] , y[1] * z[0] ,z[0],  1,
                    x[0] * z[1] , y[0] * z[1] ,z[1],  1, 
                    //  Floor
                    x[0] * z[0] ,-y[0] * z[0] ,z[0], -1,
                    x[1] * z[1] ,-y[1] * z[1] ,z[1], -1,
                    x[1] * z[1] ,-mf   * z[1] ,z[1], -1,
                    x[0] * z[0] ,-mi   * z[0] ,z[0], -1,
                ]
                .concat(lyingSurf);

                lyingElement = [
                    0, 1, 2, 
                    0, 3, 2,

                    4, 5, 6,
                    4, 7, 6
                ]
                .map((i) => {  return i + (this.memoryIndex - level) * 8 })
                .concat(lyingElement.map((i) => { return i + 8 }));

                // Set first edge after cut

                cache.itemID = itemID; 
                cache.color[0]  = color; 
                cache.x[0] = x[1]; 
                cache.y[0] = ny;
                cache.z[0] = depth;
                cache.t[0] = nt;    // First texture edge is undefined as it depends on the next item the ray collides with
                cache.stripped = stripped;
            }

            // Initialize first edge when cache is untouched
            
            if(cache.itemID < 0 && ray){
                cache.itemID = itemID;
                cache.color[0] = color;
                cache.color[1] = color;
                cache.x[0]     = nx;
                cache.y[0]     = ny;
                cache.t[0]     = nt;
            } 

            // Update second edge
            
            cache.x[1] = nx;
            cache.y[1] = ny;
            cache.color[1] = color;
            cache.z[1] = depth;
            cache.t[1] = nt;
            
            ray = (ray && ray.reflected && ray.reflected.active) ? ray.reflected : null;

            cache = cache.child;
        }

        // Update buffers

        if(!frontSurf.length) return;

        gl.bindBuffer(gl.ARRAY_BUFFER,this.frontBuffer);
        gl.bufferSubData(
            gl.ARRAY_BUFFER, 
            (this.memoryIndex - level) * 9 * 4 * Float32Array.BYTES_PER_ELEMENT, 
            new Float32Array(frontSurf)
        );

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.frontElementBuffer);
        gl.bufferSubData(
            gl.ELEMENT_ARRAY_BUFFER, 
            (this.memoryIndex - level) * 6 * Uint16Array.BYTES_PER_ELEMENT, 
            new Uint16Array(frontElement)
        );

        gl.bindBuffer(gl.ARRAY_BUFFER,this.lyingBuffer);
        gl.bufferSubData(
            gl.ARRAY_BUFFER, 
            (this.memoryIndex - level) * 8 * 4 * Float32Array.BYTES_PER_ELEMENT, 
            new Float32Array(lyingSurf)
        );

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.lyingElementBuffer);
        gl.bufferSubData(
            gl.ELEMENT_ARRAY_BUFFER, 
            (this.memoryIndex - level) * 12 * Uint16Array.BYTES_PER_ELEMENT, 
            new Uint16Array(lyingElement)
        );
    }
};  

export default DataModeller;