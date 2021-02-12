export class Vector2D {
    public x: number;
    public y: number;

    constructor();
    constructor(x: number, y: number);
    constructor({ x, y }: { x: number; y: number });
    constructor(p1: unknown = 0, p2: unknown = 0) {
        if (typeof p1 === "object") {
            this.x = (p1 as { x: number })["x"];
            this.y = (p1 as { y: number })["y"];
        } else {
            this.x = p1 as number;
            this.y = p2 as number;
        }
    }

    static distance(p1: Vector2D, p2: Vector2D): number {
        const a = p1.x - p2.x;
        const b = p1.y - p2.y;
        return Math.sqrt(a * a + b * b);
    }

    static angle(p1: Vector2D, p2: Vector2D): number {
        const atan = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        return ((atan * 180) / Math.PI + 90 + 360) % 360;
    }

    static fromAngle(angle: number): Vector2D {
        const vector = new Vector2D();
        vector.x = Math.sin((angle / 180) * Math.PI);
        vector.y = Math.cos((angle / 180) * Math.PI);
        return vector;
    }
}
