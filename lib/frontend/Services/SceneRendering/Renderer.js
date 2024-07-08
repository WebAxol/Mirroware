import Service from "../Service.js";
import { gl } from "../../setUp/webGL.js";
import CONFIG from "../../config.js";
import { camera } from "../../utils/scene/Camera.js";
class Renderer extends Service {
    constructor(chief) {
        super();
        this.chief = chief;
    }
    execute() {
        if (!camera || !camera.castCenter || !camera.castEdge)
            return;
        const locator = this.chief.locator;
        const frontBuffer = locator.getBuffer("ARRAY_BUFFER", "frontBuffer");
        const frontElementBuffer = locator.getBuffer("ELEMENT_ARRAY_BUFFER", "frontBuffer");
        const lyingBuffer = locator.getBuffer("ARRAY_BUFFER", "lyingBuffer");
        const lyingElementBuffer = locator.getBuffer("ELEMENT_ARRAY_BUFFER", "lyingBuffer");
        const frontProgram = locator.getProgram('front');
        const lyingProgram = locator.getProgram('lying');
        const a_color = gl.getAttribLocation(frontProgram, 'a_color');
        const a_position = gl.getAttribLocation(frontProgram, 'a_position');
        const a_height = gl.getAttribLocation(frontProgram, 'a_height');
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(frontProgram);
        gl.bindBuffer(gl.ARRAY_BUFFER, frontBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, frontElementBuffer);
        gl.enableVertexAttribArray(a_position);
        gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.enableVertexAttribArray(a_color);
        gl.vertexAttribPointer(a_color, 3, gl.FLOAT, false, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
        gl.drawElements(gl.TRIANGLES, 3 * CONFIG.resolution * 2, gl.UNSIGNED_SHORT, 3 * 0 * Uint16Array.BYTES_PER_ELEMENT);
        gl.useProgram(lyingProgram);
        gl.bindBuffer(gl.ARRAY_BUFFER, lyingBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lyingElementBuffer);
        gl.disableVertexAttribArray(a_color);
        gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.enableVertexAttribArray(a_height);
        gl.vertexAttribPointer(a_height, 1, gl.FLOAT, false, 3 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
        const cameraPositionUniform = gl.getUniformLocation(lyingProgram, 'u_cameraPosition');
        gl.uniform3f(cameraPositionUniform, camera.pos.x, 0, camera.pos.y);
        const cameraAngleUniform = gl.getUniformLocation(lyingProgram, 'u_cameraAngle');
        gl.uniform1f(cameraAngleUniform, camera.castCenter?.direction.angle());
        gl.drawElements(gl.TRIANGLES, 3 * CONFIG.resolution * 4, gl.UNSIGNED_SHORT, 3 * 0 * Uint16Array.BYTES_PER_ELEMENT);
        gl.disableVertexAttribArray(a_height);
    }
    ;
}
;
export default Renderer;
//# sourceMappingURL=Renderer.js.map