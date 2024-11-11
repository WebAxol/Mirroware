attribute vec3  a_position;
attribute vec4  a_color;
attribute vec2  a_texCoord;
attribute float a_height;

varying vec4  v_color;
varying float v_height;
varying vec2 v_texCoord;

void main() {

    gl_Position = vec4(a_position,1);

    gl_Position.w = a_position.z;

    v_color  = a_color;
    v_height = a_height;
    
    v_texCoord = a_texCoord;
}