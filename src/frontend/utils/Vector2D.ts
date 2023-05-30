class Vector2D {

    public x :number;
    public y :number;

    constructor(x, y){
        this.x = x;
        this.y = y;
        return this;
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
        return { x : v.x * s , y : v.y * s }
    }

    public normalize(){

        let mag = this.mag();

        this.x /= mag; 
        this.y /= mag;

        return this;
    }

    public static normalize(v :Vector2D){
        let mag = this.mag(v);

        return { x : v.x / mag, y : v.y / mag }
    }
}

export default Vector2D;