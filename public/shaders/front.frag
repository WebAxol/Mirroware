precision mediump float;

uniform sampler2D sampler;

varying vec2 v_texCoord;
varying vec4 v_color;

void main() {

    vec4 texColor = texture2D(sampler,v_texCoord);

    vec4 mixed    = mix(texColor,v_color,0.5);

    float lightLevel = min(gl_FragCoord.w * 3.0 ,1.0);

    vec4 shaded   = mix(vec4(0,0,0,1),mixed, lightLevel);

    gl_FragColor = shaded;
}
