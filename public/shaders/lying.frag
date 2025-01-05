precision mediump float;

uniform sampler2D sampler;
uniform vec3  u_cameraPosition;
uniform float u_cameraAngle;
uniform float u_time;

varying float v_height; 

// Primitives

struct Box {
    vec3 pos;
    vec3 dim;
};

struct Sphere {
    vec3  pos;
    float radius;
};

// Distance Functions

float sdSphere(vec3 p, Sphere spr){
    return length(abs(p - spr.pos)) - spr.radius;
}

float sdBox( vec3 p, Box b ){

    vec3 q = abs(p - b.pos) - b.dim;
    return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
}

// RayMarching Operators

float opUnion( float d1, float d2 )
{
    return min(d1,d2);
}
float opSubtraction( float d1, float d2 )
{
    return max(-d1,d2);
}
float opIntersection( float d1, float d2 )
{
    return max(d1,d2);
}
float opXor(float d1, float d2 )
{
    return max(min(d1,d2),-max(d1,d2));
}

float opSmoothUnion( float d1, float d2, float k )
{
    float h = clamp( 0.5 + 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) - k*h*(1.0-h);
}

float opSmoothSubtraction( float d1, float d2, float k )
{
    float h = clamp( 0.5 - 0.5*(d2+d1)/k, 0.0, 1.0 );
    return mix( d2, -d1, h ) + k*h*(1.0-h);
}

float opSmoothIntersection( float d1, float d2, float k )
{
    float h = clamp( 0.5 - 0.5*(d2-d1)/k, 0.0, 1.0 );
    return mix( d2, d1, h ) + k*h*(1.0-h);
}

// Ray Marching scene setup



float map(vec3 p) {
    
    Sphere sp1 = Sphere(vec3(5.0- sin(0.0) * (10.0 - sin(u_time) * 2.0),7.0,5.0- cos(0.0) * (10.0 - cos(u_time) * 2.0)),2.0);
    Sphere sp2 = Sphere(vec3(5.0- sin(0.0) * (20.0 - sin(u_time) * 5.0),7.0,5.0- cos(0.0) * (20.0 - cos(u_time) * 5.0)),2.0);
    Box     b1 = Box(vec3(5.0,7.0,5.0), vec3(2.0,2.0,2.0));

    //p = mod(-abs(p) ,20.0);

    return sdBox(p, b1);  
   
}

void main() {

    // Initial Calculations

    const float znear = 1.0 / tan(radians(50.0));
    vec3 color = vec3(1.0,1.0,1.0);

    vec2 fragCoordPixels = gl_FragCoord.xy;
    vec2 resolution      = vec2(600 * 5,340 * 5);
    vec2 normalizedCoord = (2.0 * fragCoordPixels - resolution) / resolution;
    vec3 rayDirection  =   vec3(normalizedCoord.xy, znear);

    rayDirection /= length(rayDirection); // Normalized ray direction

    float u_cameraAngle = -u_cameraAngle + radians(90.0);
    
    mat3 rotation = mat3(
        cos(u_cameraAngle),0, -sin(u_cameraAngle),
        0,1.0,0,
        sin(u_cameraAngle),0,  cos(u_cameraAngle)
    );
    
    rayDirection = rotation * rayDirection; // Transformed ray direction
    
    // Ceiling/floor Texture Rendering

    float lambda = abs(1.0 / rayDirection.y);

    vec3  textureCoord = u_cameraPosition + (rayDirection * lambda);

    float lightLevel = min(5.0 / pow(lambda,2.0), 1.0);
    
    vec2 texCoord = vec2(textureCoord.x,textureCoord.z);
    vec4 texColor = texture2D(sampler, texCoord);

    vec4 mixed  = mix(texColor, vec4(vec3(255, 180, 0) / 255.0, 0.01),0.5);
    vec4 shaded = mix(vec4(0,0,0,1), mixed, lightLevel);

    shaded.w = 0.99;

    if(v_height > 0.0) gl_FragColor = vec4(0,0.2,0.5, 0);

    else{ 
        gl_FragColor = shaded;
        return;
    }
    // Background Ambientation (RayMarching)

    vec3 col;
    float t = 0.0;
    float d;

    for(int i = 0; i < 80; i++){

        vec3  p = u_cameraPosition + rayDirection * t; 

        p.y /= 1.5;

        d = map(p);   

        t += d;

        if (d < .001){
            col = vec3(2,2,2) * t * .02;   
            gl_FragColor = vec4(col, 1);
            break;
        }
        if (t > 200.) break;      // early stop if too far
    }

}