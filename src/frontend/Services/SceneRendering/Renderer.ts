import Service            from "../Service.js";
import { gl }             from "../../setUp/webGL.js";
import LocatorGL          from "../../utils/rendering/LocatorGL.js";
import CONFIG             from "../../config.js";
import { camera }         from "../../utils/scene/Camera.js";
import Vector2D           from "../../utils/physics/Vector2D.js";


class Renderer extends Service {

    private chief;
    private initialized :boolean = false;

    private frontBuffer         :WebGLBuffer  = gl.createBuffer()  as WebGLBuffer;
    private frontElementBuffer  :WebGLBuffer  = gl.createBuffer()  as WebGLBuffer;
    private lyingBuffer         :WebGLBuffer  = gl.createBuffer()  as WebGLBuffer;
    private lyingElementBuffer  :WebGLBuffer  = gl.createBuffer()  as WebGLBuffer;
    private frontProgram        :WebGLProgram = gl.createProgram() as WebGLProgram;
    private lyingProgram        :WebGLProgram = gl.createProgram() as WebGLProgram;

    constructor(chief){
        super();
        this.chief = chief;
    }

    init(){

        const locator :LocatorGL = this.chief.locator;

        this.frontBuffer        = locator.getBuffer("ARRAY_BUFFER","frontBuffer");
        this.frontElementBuffer = locator.getBuffer("ELEMENT_ARRAY_BUFFER","frontBuffer");
        this.lyingBuffer        = locator.getBuffer("ARRAY_BUFFER","lyingBuffer");
        this.lyingElementBuffer = locator.getBuffer("ELEMENT_ARRAY_BUFFER","lyingBuffer");
        this.frontProgram       = locator.getProgram('front');
        this.lyingProgram       = locator.getProgram('lying');

        this.initialized = true;

    }
    
    render(amount : number){
        
        amount++;

        if(!camera || !camera.castCenter || !camera.castEdge) return;
        
        if(!this.initialized) this.init();


        const a_color    :number = gl.getAttribLocation(this.frontProgram, 'a_color');
        const a_position :number = gl.getAttribLocation(this.frontProgram, 'a_position');
        const a_height   :number = gl.getAttribLocation(this.frontProgram, 'a_height');

        
        gl.clearColor(0.0, 0.0, 0.0, 0.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    

        // Lying surfaces

        gl.useProgram(this.lyingProgram);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.lyingBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.lyingElementBuffer);

        gl.disableVertexAttribArray(a_color);

        gl.enableVertexAttribArray(a_position);

        gl.vertexAttribPointer(
            a_position, 
            3, 
            gl.FLOAT, 
            false, 
            4 * Float32Array.BYTES_PER_ELEMENT, 
            0
        );

        gl.enableVertexAttribArray(a_height);
        
        gl.vertexAttribPointer(
            a_height, 
            1, 
            gl.FLOAT, 
            false, 
            4 * Float32Array.BYTES_PER_ELEMENT, 
            3 * Float32Array.BYTES_PER_ELEMENT
        );

        // Uniforms

        const cameraPositionUniform = gl.getUniformLocation(this.lyingProgram, 'u_cameraPosition');
        gl.uniform3f(
            cameraPositionUniform, 
            camera.pos.x,
            0,
            camera.pos.y
        );

        const cameraAngleUniform = gl.getUniformLocation(this.lyingProgram, 'u_cameraAngle');
        gl.uniform1f(
            cameraAngleUniform,
            camera.castCenter.direction.angle() 
        )    

        // Draw

        gl.drawElements(
            gl.TRIANGLES, 
            3 * amount * 4, 
            gl.UNSIGNED_SHORT, 
            3 * 0 * Uint16Array.BYTES_PER_ELEMENT
        );
    
        gl.disableVertexAttribArray(a_height);

        // Front surfaces

        gl.useProgram(this.frontProgram);

        gl.bindBuffer(gl.ARRAY_BUFFER,this.frontBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,this.frontElementBuffer);    
        
        gl.vertexAttribPointer(
            a_position, 
            3, 
            gl.FLOAT, 
            false, 
            7 * Float32Array.BYTES_PER_ELEMENT, 
            0
        );

        gl.enableVertexAttribArray(a_color);

        gl.vertexAttribPointer(
            a_color, 
            4, 
            gl.FLOAT, 
            false, 
            7 * Float32Array.BYTES_PER_ELEMENT, 
            3 * Float32Array.BYTES_PER_ELEMENT
        );
    
        gl.drawElements(
            gl.TRIANGLES, 
            3 * amount * 2, 
            gl.UNSIGNED_SHORT, 
            3 * 0 * Uint16Array.BYTES_PER_ELEMENT
        );
    };
        
};

export default Renderer;