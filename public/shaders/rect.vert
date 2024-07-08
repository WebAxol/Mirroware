attribute vec2  a_position;
attribute vec3  a_color;
attribute float a_height;

varying vec3 v_color;
varying float v_height;

void main() {
    gl_Position = vec4(a_position, 0, 1.0);
    v_color  = a_color;
    v_height = a_height;
}