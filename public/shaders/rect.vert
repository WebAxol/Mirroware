attribute vec3  a_position;
attribute vec4  a_color;
attribute float a_height;

varying vec4  v_color;
varying float v_height;

void main() {
    gl_Position = vec4(a_position, 1.0);
    v_color  = a_color;
    v_height = a_height;
}