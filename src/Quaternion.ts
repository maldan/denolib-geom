export default class Quaternion {
    public x: number = 0;
    public y: number = 0;
    public z: number = 0;
    public w: number = 0;

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    identity(): Quaternion {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 1;
        return this;
    }

    fromEuler(x: number, y: number, z: number): Quaternion {
        const halfToRad = 0.5 * Math.PI / 180.0;
        x *= halfToRad;
        y *= halfToRad;
        z *= halfToRad;

        const sx = Math.sin(x);
        const cx = Math.cos(x);
        const sy = Math.sin(y);
        const cy = Math.cos(y);
        const sz = Math.sin(z);
        const cz = Math.cos(z);

        this.x = sx * cy * cz - cx * sy * sz;
        this.y = cx * sy * cz + sx * cy * sz;
        this.z = cx * cy * sz - sx * sy * cz;
        this.w = cx * cy * cz + sx * sy * sz;

        return this;
    };

    multiply(q: Quaternion): Quaternion {
        const ax = this.x, ay = this.y, az = this.z, aw = this.w;
        const bx = q.x, by = q.y, bz = q.z, bw = q.w;

        this.x = ax * bw + aw * bx + ay * bz - az * by;
        this.y = ay * bw + aw * by + az * bx - ax * bz;
        this.z = az * bw + aw * bz + ax * by - ay * bx;
        this.w = aw * bw - ax * bx - ay * by - az * bz;
        return this;
    }

    rotateX(angle: number): Quaternion {
        let rad = angle * Math.PI / 180;
        rad *= 0.5;

        const ax = this.x, ay = this.y, az = this.z, aw = this.w;
        const bx = Math.sin(rad), bw = Math.cos(rad);

        this.x = ax * bw + aw * bx;
        this.y = ay * bw + az * bx;
        this.z = az * bw - ay * bx;
        this.w = aw * bw - ax * bx;
        return this;
    };

    rotateY(angle: number): Quaternion {
        let rad = angle * Math.PI / 180;
        rad *= 0.5;

        const ax = this.x, ay = this.y, az = this.z, aw = this.w;
        const by = Math.sin(rad), bw = Math.cos(rad);

        this.x = ax * bw - az * by;
        this.y = ay * bw + aw * by;
        this.z = az * bw + ax * by;
        this.w = aw * bw - ay * by;
        return this;
    };

    rotateZ(angle: number): Quaternion {
        let rad = angle * Math.PI / 180;
        rad *= 0.5;

        const ax = this.x, ay = this.y, az = this.z, aw = this.w;
        const bz = Math.sin(rad), bw = Math.cos(rad);

        this.x = ax * bw + ay * bz;
        this.y = ay * bw - ax * bz;
        this.z = az * bw + aw * bz;
        this.w = aw * bw - az * bz;
        return this;
    };
}