import LocatorGL          from "../../utils/rendering/LocatorGL.js";
import CONFIG             from "../../config.js";
import Service            from "../Service.js";
import { gl }             from "../../setUp/webGL.js";
import { camera }         from "../../utils/scene/Camera.js";

class DataModeller extends Service{

    private chief;
    public memoryIndex : number = 0;

    // Empty dummy WebGLBuffer instances used before initialization

    private initialized : boolean = false;

    private frontBuffer         :WebGLBuffer  = gl.createBuffer() as WebGLBuffer;
    private frontElementBuffer  :WebGLBuffer  = gl.createBuffer() as WebGLBuffer;
    private lyingBuffer         :WebGLBuffer  = gl.createBuffer() as WebGLBuffer;
    private lyingElementBuffer  :WebGLBuffer  = gl.createBuffer() as WebGLBuffer;

    constructor(chief){
        super();
        this.chief = chief;
    }

    // Real buffers being established after WebGL is initialized

    public reset(){
        this.memoryIndex = 0;
    }

    public init(){

        const locator :LocatorGL = this.chief.locator;

        this.frontBuffer        = locator.getBuffer("ARRAY_BUFFER","frontBuffer");
        this.frontElementBuffer = locator.getBuffer("ELEMENT_ARRAY_BUFFER","frontBuffer");
        this.lyingBuffer        = locator.getBuffer("ARRAY_BUFFER","lyingBuffer");
        this.lyingElementBuffer = locator.getBuffer("ELEMENT_ARRAY_BUFFER","lyingBuffer");

        this.initialized = true;

    }

    public model( ray : any, angle: number, index : number, ){

        if(!this.initialized) this.init();  // Initialize buffers if not already

        const resolution = CONFIG.resolution;        
        const znear      = 1 / Math.tan(camera.FOV * Math.PI / 360);
        const deltaAngle = (camera.FOV / CONFIG.resolution) * (Math.PI / 180) * -1;

        var depth = 0, height;
        var xi, xf, yi, yf, my;
        var color, darkness;
        
        var lyingSurf    :number[] = [];
        var frontSurf    :number[] = [];
        var lyingElement :number[] = [];
        var frontElement :number[] = [];

         while(true){

            depth +=  ray.lambda * Math.cos(Math.abs(angle));
            darkness = 1 + (depth / 10) + (Math.abs(CONFIG.resolution / 2 - index) / 100); 

            height = 0.01 + znear / depth;

            my = yi !== undefined ? yi : 1;

            xi = Math.tan(angle)              * znear * ((index <= CONFIG.resolution / 2) ? -1 : 1);
            xf = Math.tan(angle + deltaAngle) * znear * ((index <= CONFIG.resolution / 2) ? -1 : 1);
            yi =   height + (0 / depth);
            yf = - height + (0 / depth);

            color = ray.collidesWith ?  ray.collidesWith.color + `,${ray.collidesWith.opacity}` : "0,0,0,1";
            color = color.split(',').map((component, i) => { 

                if(i !== 3) return parseFloat(component) / (255 * darkness) 

                return parseFloat(component);
            });

            frontSurf = [
                xi,yi, 0.1 * ray.level, ...color,
                xf,yi, 0.1 * ray.level, ...color,
                xf,yf, 0.1 * ray.level, ...color,
                xi,yf, 0.1 * ray.level, ...color,
            ]
            .concat(frontSurf);

            frontElement = [
                0, 1, 2, 
                0, 3, 2
            ]
            .map((i) => {  return i + this.memoryIndex * 4 })
            .concat(frontElement.map((i) => { return i + 4} ));

            lyingSurf = [
                //  Ceiling
                xi,my, 0.1 * ray.level, 1,
                xf,my, 0.1 * ray.level, 1,
                xf,yi, 0.1 * ray.level, 1,
                xi,yi, 0.1 * ray.level, 1, 
                //  Floor
                xi,yf, 0.1 * ray.level, -1,
                xf,yf, 0.1 * ray.level, -1,
                xf,-my,0.1 * ray.level, -1,
                xi,-my,0.1 * ray.level, -1,
            ]
            .concat(lyingSurf);


            lyingElement = [
                0, 1, 2, 
                0, 3, 2,

                4, 5, 6,
                4, 7, 6
            ]
            .map((i) => {  return i + this.memoryIndex * 8 })
            .concat(lyingElement.map((i) => { return i + 8}) );

            // Allocate inside buffers

            if(!ray.reflected || !ray.reflected.active) break;

            ray = ray.reflected;

        }

        gl.bindBuffer(gl.ARRAY_BUFFER,this.frontBuffer);
        gl.bufferSubData(
            gl.ARRAY_BUFFER, 
            this.memoryIndex * 7 * 4 * Float32Array.BYTES_PER_ELEMENT, 
            new Float32Array(frontSurf)
        );

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.frontElementBuffer);
        gl.bufferSubData(
            gl.ELEMENT_ARRAY_BUFFER, 
            this.memoryIndex * 6 * Uint16Array.BYTES_PER_ELEMENT, 
            new Uint16Array(frontElement)
        );

        gl.bindBuffer(gl.ARRAY_BUFFER,this.lyingBuffer);
        gl.bufferSubData(
            gl.ARRAY_BUFFER, 
            this.memoryIndex * 8 * 4 * Float32Array.BYTES_PER_ELEMENT, 
            new Float32Array(lyingSurf)
        );

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.lyingElementBuffer);
        gl.bufferSubData(
            gl.ELEMENT_ARRAY_BUFFER, 
            this.memoryIndex * 12 * Uint16Array.BYTES_PER_ELEMENT, 
            new Uint16Array(lyingElement)
        );

        this.memoryIndex += ray.level; 
    }

    mapWallTexture(){}
    mapCircleTexture(){}

};  

export default DataModeller;