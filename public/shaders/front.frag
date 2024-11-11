precision mediump float;

uniform sampler2D sampler;

varying vec2 v_texCoord;
varying vec4 v_color;

void main() {

    vec4 texColor = texture2D(sampler,v_texCoord);
    gl_FragColor = mix(texColor,v_color,0.8);
}