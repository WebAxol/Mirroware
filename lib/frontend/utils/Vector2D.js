class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    static add(v1, v2) {
        return new Vector2D(v1.x + v2.x, v1.y + v2.y);
    }
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    static sub(v1, v2) {
        return new Vector2D(v1.x - v2.x, v1.y - v2.y);
    }
    div(v) {
        this.x /= v.x;
        this.y /= v.y;
        return this;
    }
    static div(v1, v2) {
        return new Vector2D(v1.x / v2.x, v1.y / v2.y);
    }
    mult(v) {
        this.x *= v.x;
        this.y *= v.y;
        return this;
    }
    static mult(v1, v2) {
        return new Vector2D(v1.x * v2.x, v1.y * v2.y);
    }
    dot(v) {
        return (this.x * v.x) + (this.y * v.y);
    }
    static dot(v1, v2) {
        return (v1.x * v2.x) + (v1.y * v2.y);
    }
    magSq() {
        return (this.x * this.x) + (this.y * this.y);
    }
    static magSq(v) {
        return (v.x * v.x) + (v.y * v.y);
    }
    mag() {
        return Math.sqrt(this.magSq());
    }
    static mag(v) {
        return Math.sqrt(Vector2D.magSq(v));
    }
    scale(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }
    static scale(v, s) {
        return { x: v.x * s, y: v.y * s };
    }
    normalize() {
        let mag = this.mag();
        this.x /= mag;
        this.y /= mag;
        return this;
    }
    static normalize(v) {
        let mag = this.mag(v);
        return { x: v.x / mag, y: v.y / mag };
    }
    static between(v1, v2, percentil) {
        return new Vector2D(v1.x + (v2.x - v1.x) * percentil, v1.y + (v2.y - v1.y) * percentil);
    }
    static perpendicular(v) {
        return new Vector2D(-1 * v.y, -1 * v.x);
    }
    static angleBetween(v1, v2) {
        return Math.acos(Vector2D.dot(v1, v2) / (v1.mag() * v2.mag())) * (180 / Math.PI);
    }
}
export default Vector2D;
//# sourceMappingURL=Vector2D.js.map