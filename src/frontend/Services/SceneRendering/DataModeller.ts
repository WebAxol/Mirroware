import LocatorGL          from "../../utils/rendering/LocatorGL.js";
import CONFIG             from "../../config.js";
import Service            from "../Service.js";
import { gl }             from "../../setUp/webGL.js";
import { camera }         from "../../utils/scene/Camera.js";

interface Cache {
    itemID   : number;
    xi       : number;
    yi       : number;
    xf       : number;
    yf       : number;
    colori   : string;
    colorf   : string;
    child    : Cache | undefined;
    stripped : boolean;
}

class DataModeller extends Service{

    private chief;
    public memoryIndex : number = 0;

    // Empty dummy WebGLBuffer instances used before initialization

    private initialized : boolean = false;

    private frontBuffer         :WebGLBuffer  = gl.createBuffer() as WebGLBuffer;
    private frontElementBuffer  :WebGLBuffer  = gl.createBuffer() as WebGLBuffer;
    private lyingBuffer         :WebGLBuffer  = gl.createBuffer() as WebGLBuffer;
    private lyingElementBuffer  :WebGLBuffer  = gl.createBuffer() as WebGLBuffer;

    private cache :Cache;

    constructor(chief){
        super();
        this.chief = chief;

        const head :any = {};
        var  node :any = head;

        for(let i = 0; i <= 4; i++){
            node.itemID = -1; 
            node.colori = ''; 
            node.colorf = ""; 
            node.xi     = NaN;
            node.yi     = NaN; 
            node.xf     = 0; 
            node.yf     = 0; 
            node.child  = undefined
            node.stripped = false;

            if(i == 1) continue;

            node.child  = {};
            node = node.child;
        }

        this.cache = head;
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

    public reset(){

        this.memoryIndex = 0;

        var cache :Cache | undefined = this.cache;

        while(cache){
            cache.itemID   = -1;
            cache.stripped = true;
            cache = cache.child;
        }
    }

    public model( ray : any, angle: number, index : number, ){

        if(!this.initialized) this.init();  // Initialize buffers if not already
   
        const znear      = 1 / Math.tan(camera.FOV * Math.PI / 360);
        const deltaAngle = (camera.FOV / CONFIG.resolution) * (Math.PI / 180) * -1;

        var depth = 0;
        var itemID = -1, nx, ny;
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

                stripped = ray.collidesWith.getType() == "Circle";

                depth +=  ray.lambda * Math.cos(Math.abs(angle));
                darkness = Math.pow(1 + (depth * depth / 5), 1); 

                //darkness *= darkness;

                ny = 0.01 + znear / depth;

                nx = Math.tan(angle - deltaAngle) * znear * ((index <= CONFIG.resolution / 2) ? -1 : 1);

                color = (ray.collidesWith ?  ray.collidesWith.color + `,${ray.collidesWith.opacity}` : "0,0,0,1")
                    .split(',')
                    .map((component, i) => {  return i < 3 ? parseFloat(component) / (255 * darkness) : parseFloat(component); });
            }

            cut = cache.itemID >= 0 && (cut || (cache.itemID !== itemID || index === CONFIG.resolution - 1 || cache.stripped));

            if(cut){
                
                this.memoryIndex++;

                level++;

                let { xi, yi, xf, yf } = cache; 

            
                mi = Math.min(mi, Math.max(yi,1));
                mf = Math.min(mf, Math.max(yf,1));` `

                frontSurf = [
                    xi, yi, 0.001 * level, ...cache.colori,
                    xf, yf, 0.001 * level, ...cache.colorf,
                    xf,-yf, 0.001 * level, ...cache.colorf,
                    xi,-yi, 0.001 * level, ...cache.colori,
                ]
                .concat(frontSurf);

                frontElement = ([
                    0, 1, 2, 
                    0, 3, 2
                ]
                .map((i) => {  return i + (this.memoryIndex - level) * 4 })
                ).concat(frontElement.map((i) => { return i + 4 }));

                lyingSurf = [
                    //  Ceiling
                    xi,mi,  0.001 * level, 1,
                    xf,mf,  0.001 * level, 1,
                    xf,yf,  0.001 * level, 1,
                    xi,yi,  0.001 * level, 1, 
                    //  Floor
                    xi,-yi, 0.001 * level, -1,
                    xf,-yf, 0.001 * level, -1,
                    xf,-mf, 0.001 * level, -1,
                    xi,-mi, 0.001 * level, -1,
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

                cache.itemID = itemID; 
                cache.colori = color; 
                cache.xi = xf; 
                cache.yi = ny;
                cache.stripped = stripped;
            }
            
            if(cache.itemID < 0 && ray){
                cache.itemID = itemID;
                cache.colori = color;
                cache.colorf = color;
                cache.xi     = nx;
                cache.yi     = ny;
            } 
                
            cache.xf     = nx;
            cache.yf     = ny;
            cache.colorf = color;

            ray = (ray && ray.reflected && ray.reflected.active) ? ray.reflected : null;

            cache = cache.child;
        }

        // Allocate inside buffers

        if(!frontSurf.length) return;

        gl.bindBuffer(gl.ARRAY_BUFFER,this.frontBuffer);
        gl.bufferSubData(
            gl.ARRAY_BUFFER, 
            (this.memoryIndex - level) * 7 * 4 * Float32Array.BYTES_PER_ELEMENT, 
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

    mapWallTexture(){}
    mapCircleTexture(){}

};  

export default DataModeller;