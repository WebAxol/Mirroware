import Service            from "../Service.js";
import { gl }             from "../../setUp/webGL.js";
import LocatorGL          from "../../utils/rendering/LocatorGL.js";
import CONFIG             from "../../config.js";
import { camera }         from "../../utils/scene/Camera.js";
import Vector2D           from "../../utils/physics/Vector2D.js";


class Renderer extends Service {

    private chief;

    constructor(chief){
        super();
        this.chief = chief;
    }
    
    execute(){

        if(!camera || !camera.castCenter || !camera.castEdge) return;

        const locator :LocatorGL   = this.chief.locator;

        const frontBuffer        :WebGLBuffer = locator.getBuffer("ARRAY_BUFFER","frontBuffer");
        const frontElementBuffer :WebGLBuffer = locator.getBuffer("ELEMENT_ARRAY_BUFFER","frontBuffer");
        const lyingBuffer        :WebGLBuffer = locator.getBuffer("ARRAY_BUFFER","lyingBuffer");
        const lyingElementBuffer :WebGLBuffer = locator.getBuffer("ELEMENT_ARRAY_BUFFER","lyingBuffer");

        const frontProgram : WebGLProgram = locator.getProgram('front');
        const lyingProgram : WebGLProgram = locator.getProgram('lying');

        const a_color    :number = gl.getAttribLocation(frontProgram, 'a_color');
        const a_position :number = gl.getAttribLocation(frontProgram, 'a_position');
        const a_height   :number = gl.getAttribLocation(frontProgram, 'a_height');


        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    
        gl.useProgram(frontProgram);

        gl.bindBuffer(gl.ARRAY_BUFFER,frontBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,frontElementBuffer);

        gl.enableVertexAttribArray(a_position);
    
        gl.vertexAttribPointer(
            a_position, 
            2, 
            gl.FLOAT, 
            false, 
            5 * Float32Array.BYTES_PER_ELEMENT, 
            0
        );

        gl.enableVertexAttribArray(a_color);

        gl.vertexAttribPointer(
            a_color, 
            3, 
            gl.FLOAT, 
            false, 
            5 * Float32Array.BYTES_PER_ELEMENT, 
            2 * Float32Array.BYTES_PER_ELEMENT
        );

        gl.drawElements(
            gl.TRIANGLES, 
            3 * CONFIG.resolution * 2, 
            gl.UNSIGNED_SHORT, 
            3 * 0 * Uint16Array.BYTES_PER_ELEMENT
        );
    
        // Lying surfaces

        gl.useProgram(lyingProgram);

        gl.bindBuffer(gl.ARRAY_BUFFER,lyingBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,lyingElementBuffer);

        gl.disableVertexAttribArray(a_color);

        gl.vertexAttribPointer(
            a_position, 
            2, 
            gl.FLOAT, 
            false, 
            3 * Float32Array.BYTES_PER_ELEMENT, 
            0
        );

        gl.enableVertexAttribArray(a_height);
        
        gl.vertexAttribPointer(
            a_height, 
            1, 
            gl.FLOAT, 
            false, 
            3 * Float32Array.BYTES_PER_ELEMENT, 
            2 * Float32Array.BYTES_PER_ELEMENT
        );

        // Uniforms

        const cameraPositionUniform = gl.getUniformLocation(lyingProgram, 'u_cameraPosition');
        gl.uniform3f(
            cameraPositionUniform, 
            camera.pos.x,
            0,
            camera.pos.y
        );

        const cameraAngleUniform = gl.getUniformLocation(lyingProgram, 'u_cameraAngle');
        gl.uniform1f(
            cameraAngleUniform,
            camera.castCenter?.direction.angle() 
        )    

        // Draw
        
        gl.drawElements(
            gl.TRIANGLES, 
            3 * CONFIG.resolution * 4, 
            gl.UNSIGNED_SHORT, 
            3 * 0 * Uint16Array.BYTES_PER_ELEMENT
        );

        gl.disableVertexAttribArray(a_height);

    };
        
};

export default Renderer;