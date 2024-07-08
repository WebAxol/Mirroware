import LocatorGL          from "../../utils/rendering/LocatorGL.js";
import CONFIG             from "../../config.js";
import Service            from "../Service.js";
import { gl }             from "../../setUp/webGL.js";
import { camera }         from "../../utils/scene/Camera.js";

class DataModeller extends Service{

    private chief;

    constructor(chief){
        super();
        this.chief = chief;
    }

    model( ray : any, angle: number, index : number, ){

        const resolution = CONFIG.resolution;

        if(index >= resolution) console.warn(`WARNING: ray index '${index}' exceeds resolution '${resolution}'`);

        const locator :LocatorGL   = this.chief.locator;

        const frontBuffer        :WebGLBuffer = locator.getBuffer("ARRAY_BUFFER","frontBuffer");
        const frontElementBuffer :WebGLBuffer = locator.getBuffer("ELEMENT_ARRAY_BUFFER","frontBuffer");
        const lyingBuffer        :WebGLBuffer = locator.getBuffer("ARRAY_BUFFER","lyingBuffer");
        const lyingElementBuffer :WebGLBuffer = locator.getBuffer("ELEMENT_ARRAY_BUFFER","lyingBuffer");

        
        const znear      = 1 / Math.tan(camera.FOV * Math.PI / 360);
        const deltaAngle = (camera.FOV / CONFIG.resolution) * (Math.PI / 180) * -1;

        var distance = 0, height;
        var xi, xf, yi, yf, color, darkness;
        var lyingSurf, frontSurf;
        var lyingElement, frontElement;

        while(ray && ray.active){

            distance +=  ray.lambda * Math.cos(Math.abs(angle));
            darkness = 1 + (distance / 10) + (Math.abs(CONFIG.resolution / 2 - index) / 100); 

            height = 0.01 + znear / distance;

            xi = Math.tan(angle)              * znear * ((index <= CONFIG.resolution / 2) ? -1 : 1);
            xf = Math.tan(angle + deltaAngle) * znear * ((index <= CONFIG.resolution / 2) ? -1 : 1);
            yi = height;
            yf = -yi;

            color =  (ray.collidesWith && ray.collidesWith.color) ?  ray.collidesWith.color : "0,0,0";
            color = color.split(',').map((component) => { return parseInt(component) / (255 * darkness) })


            frontSurf = new Float32Array([
                xi,yi, ...color,
                xf,yi, ...color,
                xf,yf, ...color,
                xi,yf, ...color,
            ]);

            gl.bindBuffer(gl.ARRAY_BUFFER,frontBuffer);
            gl.bufferSubData(
                gl.ARRAY_BUFFER, 
                index * 5 * 4 * Float32Array.BYTES_PER_ELEMENT, 
                frontSurf
            );

            frontElement = new Uint16Array([
                0, 1, 2, 
                0, 3, 2
            ].map((i) => {  return i + index * 4 }));

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,frontElementBuffer);
            gl.bufferSubData(
                gl.ELEMENT_ARRAY_BUFFER, 
                index * 6 * Uint16Array.BYTES_PER_ELEMENT, 
                frontElement
            );
                   
            lyingSurf = new Float32Array([
                //  Ceiling
                xi,1 , 1,
                xf,1 , 1,
                xf,yi, 1,
                xi,yi, 1, 
                //  Floor
                xi,yf,-1,
                xf,yf,-1,
                xf,-1,-1,
                xi,-1,-1,
            ]);

            gl.bindBuffer(gl.ARRAY_BUFFER,lyingBuffer);
            gl.bufferSubData(
                gl.ARRAY_BUFFER, 
                index * 8 * 3 * Float32Array.BYTES_PER_ELEMENT, 
                lyingSurf
            );

            lyingElement = new Uint16Array([
                0, 1, 2, 
                0, 3, 2,

                4, 5, 6,
                4, 7, 6
            ].map((i) => {  return i + index * 8 }));

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,lyingElementBuffer);
            gl.bufferSubData(
                gl.ELEMENT_ARRAY_BUFFER, 
                index * 12 * Uint16Array.BYTES_PER_ELEMENT, 
                lyingElement
            );
            
        
            ray = null;

            // For testing, debugging and inspection only

            //if(typeof callback == 'function' && callback.length == 1) callback({frontSurf,frontElement,lyingSurf,lyingElement});
        }
    }

    mapWallTexture(){}
    mapCircleTexture(){}

};  

export default DataModeller;