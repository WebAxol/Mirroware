 precision mediump float;

uniform vec3  u_cameraPosition;
uniform float u_cameraAngle;

varying float v_height;

void main() {

    const float znear = 1.0 / tan(radians(50.0));
    vec3 color = vec3(1.0,1.0,1.0);

    vec2 fragCoordPixels = gl_FragCoord.xy;
    vec2 resolution      = vec2(600,340);
    vec2 normalizedCoord = (2.0 * fragCoordPixels - resolution) / resolution;
    vec3 rayDirection  =   vec3(normalizedCoord.xy, znear);

    rayDirection /= length(rayDirection); // Normalized ray direction

    float lambda = abs(1.0 / rayDirection.y);

    float u_cameraAngle = -u_cameraAngle + radians(90.0);
    
    mat3 rotation = mat3(
        cos(u_cameraAngle),0, -sin(u_cameraAngle),
        0,1.0,0,
        sin(u_cameraAngle),0,  cos(u_cameraAngle)
    );
    
    rayDirection = rotation * rayDirection;
    
    vec3  textureCoord = u_cameraPosition + (rayDirection * lambda);

    if(mod(textureCoord.z * 1.0,2.0) > 1.0 && mod(textureCoord.x * 1.0,2.0) > 1.0) color = vec3(0.0,0.0,0.0);
    if(mod(textureCoord.z * 1.0,2.0) < 1.0 && mod(textureCoord.x * 1.0,2.0) < 1.0) color = vec3(0.0,0.0,0.0);
    
    color /= lambda / 2.0;

    if(v_height > 0.0) gl_FragColor = vec4(0,0.2,0.5, 0);
    
    else gl_FragColor = vec4(color, 0.9);
    
}