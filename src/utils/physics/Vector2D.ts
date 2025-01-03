class Vector2D {

    public x :number;
    public y :number;

    constructor(x,y){
        this.x = x;
        this.y = y;
        return this;
    }

    static copy(v : Vector2D){
        return new Vector2D(v.x,v.y);
    }

    public add(v :Vector2D){
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    public static add(v1,v2){
        return new Vector2D(v1.x + v2.x , v1.y + v2.y);
    }

    public sub(v :Vector2D){
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    public static sub(v1,v2){
        return new Vector2D(v1.x - v2.x ,v1.y - v2.y );
    }

    public div(v :Vector2D){
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }

    public static div(v1,v2){
        return new Vector2D(v1.x / v2.x ,v1.y / v2.y );
    }

    public mult(v :Vector2D){
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }

    public static mult(v1,v2){
        return new Vector2D(v1.x * v2.x ,v1.y * v2.y );
    }

    public abs(){
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }

    public static abs(v){
        return new Vector2D(Math.abs(v.x),Math.abs(v.y));
    }

    public dot(v :Vector2D){
        return (this.x * v.x) + (this.y * v.y);
    }

    public static dot(v1,v2){
        return (v1.x * v2.x) +  (v1.y * v2.y);
    }

    public magSq(){
        return (this.x * this.x) + (this.y * this.y);
    }

    public static magSq(v :Vector2D){
        return (v.x * v.x) + (v.y * v.y);
    }

    public mag(){
        return Math.sqrt(this.magSq());
    }

    public static mag(v :Vector2D){
        return Math.sqrt(Vector2D.magSq(v));
    }

    public scale(s){
        this.x *= s;
        this.y *= s;
        return this;
    }

    public static scale(v,s){
        return new Vector2D( v.x * s , v.y * s )
    }

    public normalize(){

        let mag = this.mag();

        this.x /= mag; 
        this.y /= mag;

        return this;
    }

    public angle(){
        let angle =  Math.atan2( this.y , this.x );

        if (angle < 0) {
            angle += 2 * Math.PI;
        }
        return angle;
    }

    public static rotate(v, center, deg :number){

        deg *= Math.PI / 180;

        v = Vector2D.sub(v,center);

        return Vector2D.add({
            x : v.dot({ x : Math.cos(deg), y : -Math.sin(deg) }), 
            y : v.dot({ x : Math.sin(deg), y :  Math.cos(deg) })
        }, center);   
    }

    public complexRotate(w : number[]){

        const temp = this.x;

        this.x = this.x * w[0] - this.y * w[1];
        this.y = temp   * w[1] + this.y * w[0];

        return this;
    }

    public static complexRotate(v, w : number[]){

       return new Vector2D(v.x * w[0] - v.y * w[1], v.x * w[1] + v.y * w[0]); 
    };

    public static normalize(v){

        let mag = Vector2D.mag(v);

        return new Vector2D(v.x / mag, v.y / mag )
    }

    public static between(v1,v2,percentil){
        return new Vector2D( v1.x + (v2.x - v1.x) * percentil, v1.y + (v2.y - v1.y) * percentil);
    }

    public static perpendicular(v :Vector2D){

        return new Vector2D(-1 * v.y, -1 * v.x);
    }

    public static angleBetween(v1 : Vector2D, v2: Vector2D){
    
        let normalizedDotProduct = Vector2D.dot(v1,v2) / (v1.mag() * v2.mag());

        return Math.acos(Math.min(normalizedDotProduct, 1));
    }
}

export default Vector2D;