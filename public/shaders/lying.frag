precision mediump float;

uniform sampler2D sampler;
uniform vec3  u_cameraPosition;
uniform float u_cameraAngle;
uniform float u_time;

varying float v_height; 

// Linear Transformations


vec3 rotateX(vec3 v, float angle){

    mat3 rotationX = mat3(
        1,cos(angle), -sin(angle),
        0,sin(angle), cos(angle),
        0,0,  1
    );

    return rotationX * v;
}


vec3 rotateY(vec3 v, float angle){

    mat3 rotationY = mat3(
        cos(angle),0, -sin(angle),
        0,1.0,0,
        sin(angle),0,  cos(angle)
    );

    return rotationY * v;
}

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

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 rayDirection; 

vec3 tileCoords(vec3 p,float cellSize){
    return  floor(p / cellSize);
}

vec3 voxelCoord(vec3 p, float voxelSize){
    return floor(p / voxelSize) * voxelSize;
}

float voxelDistance(vec3 p, float d, float voxelSize){
    
    vec3 surfacePoint = p + rayDirection * d; 
    
    vec3 currentVoxel = floor(p / voxelSize);
    vec3 surfaceVoxel = floor(surfacePoint / voxelSize);

    // If they are the same voxel, return distance of zero, otherwise, return the original distance

    return (currentVoxel == surfaceVoxel) ? 0.0 : d;
}

float map(vec3 p) {

    p.y -= 5.0;

    Box  b1 = Box(vec3(15.0,10.0,15.0), vec3(2.0,2.0,2.0));
    Box  b2 = Box(vec3(15.0,10.0,0.0), vec3(2.0,2.0,2.0));


    Sphere sp2 = Sphere(vec3(15.0- cos(u_time / 30.0) * 0.0,10.0 - sin(u_time / 30.0) * 5.0,15.0 - sin(u_time / 30.0) * 5.0),20.0);

    float res = 1000.0;

    p.xz += u_time / 10.0;
    vec3 p2 = p;

    p2.z -= 15.0;
    p2 = mod(-abs(p2),30.0);
    
    res = opSmoothUnion(res,sdBox(p2,b1),5.0);
    res = opSmoothUnion(res,sdBox(p2,b2),5.0);

    float size = 1.0;


    p = mod(-1.0 * abs(p),50.0);

    //p = alignToVoxelGrid(p,3.0);

    p = floor(p / size) * size;

    res = opSmoothUnion(res,sdSphere(p, sp2),15.0);

    //res = voxelDistance(p,res,3.0);


    float t = u_time / 5.0;

    return res;
}

void main() {

    // Initial Calculations

    const float znear = 1.0 / tan(radians(50.0));
    vec3 color = vec3(1.0,1.0,1.0);

    vec2 fragCoordPixels = gl_FragCoord.xy;
    vec2 resolution      = vec2(600 * 1,340 * 1);
    vec2 normalizedCoord = (2.0 * fragCoordPixels - resolution) / resolution;
    
    rayDirection  =   vec3(normalizedCoord.xy, znear);

    rayDirection /= length(rayDirection); // Normalized ray direction

    float u_cameraAngle = -u_cameraAngle + radians(90.0);
    
    mat3 rotation = mat3(
        cos(u_cameraAngle),0, -sin(u_cameraAngle),
        0,1.0,0,
        sin(u_cameraAngle),0,  cos(u_cameraAngle)
    );
    
    rayDirection =  rotateY(rayDirection,u_cameraAngle); // Transformed ray direction
    
    // Ceiling/floor Texture Rendering

    float lambda = abs(1.0 / rayDirection.y);

    vec3  textureCoord = u_cameraPosition + (rayDirection * lambda);

    float lightLevel = min(5.0 / pow(lambda,2.0), 1.0);
    
    vec2 texCoord = vec2(textureCoord.x,textureCoord.z);
    vec4 texColor = texture2D(sampler, texCoord);

    vec4 mixed  = mix(texColor, vec4(vec3(255, 180, 0) / 255.0, 0.01),0.1);
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

    for(float i = 0.0; i < 80.0; i++){

        vec3  p = u_cameraPosition + rayDirection * t;

        p.y /= 1.5;

        d = map(p);   

        t += d;

        if (d <= 0.1){
            col = vec3(mod(t/30.0,3.0),mod(t/30.0,2.0),1) / t * 20.2;   
            gl_FragColor = vec4(col, 0.05 *i);
            break;
        }
        if (t > 500.) break;      // early stop if too far
    }

}