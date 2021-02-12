// Матрица чисто для поворотов
class Matrix2DRot {
    matrix: Float32Array = new Float32Array([
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
    ]);

    identity(): Matrix2DRot {
        this.matrix[0] = 1.0;
        this.matrix[4] = 0.0;
        this.matrix[8] = 0.0;
        this.matrix[12] = 0.0;
        this.matrix[1] = 0.0;
        this.matrix[5] = 1.0;
        this.matrix[9] = 0.0;
        this.matrix[13] = 0.0;
        this.matrix[2] = 0.0;
        this.matrix[6] = 0.0;
        this.matrix[10] = 1.0;
        this.matrix[14] = 0.0;
        this.matrix[3] = 0.0;
        this.matrix[7] = 0.0;
        this.matrix[11] = 0.0;
        this.matrix[15] = 1.0;

        return this;
    }

    setRotate(angle: number, x: number, y: number, z: number): Matrix2DRot {
        let s, len, rlen, nc, xy, yz, zx, xs, ys, zs;

        angle /= 57.2957795131;
        const e = this.matrix;

        s = Math.sin(angle);
        const c = Math.cos(angle);

        if (0 !== x && 0 === y && 0 === z) {
            // Rotation around X axis
            if (x < 0) {
                s = -s;
            }
            e[0] = 1;
            e[4] = 0;
            e[8] = 0;
            e[12] = 0;
            e[1] = 0;
            e[5] = c;
            e[9] = -s;
            e[13] = 0;
            e[2] = 0;
            e[6] = s;
            e[10] = c;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
        } else if (0 === x && 0 !== y && 0 === z) {
            // Rotation around Y axis
            if (y < 0) {
                s = -s;
            }
            e[0] = c;
            e[4] = 0;
            e[8] = s;
            e[12] = 0;
            e[1] = 0;
            e[5] = 1;
            e[9] = 0;
            e[13] = 0;
            e[2] = -s;
            e[6] = 0;
            e[10] = c;
            e[14] = 0;
            e[3] = 0;
            e[7] = 0;
            e[11] = 0;
            e[15] = 1;
        } else if (0 === x && 0 === y && 0 !== z) {
            // Rotation around Z axis
            if (z < 0) {
                s = -s;
            }
            e[0] = c;
            e[4] = -s;
            e[8] = 0;
            e[12] = 0;
            e[1] = s;
            e[5] = c;
            e[9] = 0;
            e[13] = 0;
            e[2] = 0;
            e[6] = 0;
            e[10] = 1;
            e[14] = 0;
            //e[3] = 0;  e[7] = 0;  e[11] = 0;  e[15] = 1;
        } else {
            // Rotation around another axis
            len = Math.sqrt(x * x + y * y + z * z);
            if (len !== 1) {
                rlen = 1 / len;
                x *= rlen;
                y *= rlen;
                z *= rlen;
            }
            nc = 1 - c;
            xy = x * y;
            yz = y * z;
            zx = z * x;
            xs = x * s;
            ys = y * s;
            zs = z * s;

            e[0] = x * x * nc + c;
            e[1] = xy * nc + zs;
            e[2] = zx * nc - ys;
            e[3] = 0;

            e[4] = xy * nc - zs;
            e[5] = y * y * nc + c;
            e[6] = yz * nc + xs;
            e[7] = 0;

            e[8] = zx * nc + ys;
            e[9] = yz * nc - xs;
            e[10] = z * z * nc + c;
            e[11] = 0;

            e[12] = 0;
            e[13] = 0;
            e[14] = 0;
            e[15] = 1;
        }

        return this;
    }
}

export class Matrix2D {
    matrix: Float32Array = new Float32Array([
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
    ]);

    rotationMatrix: Matrix2DRot | null = null;
    isNeedToCachedMatrix = true;

    // Clear matrix
    identity(): Matrix2D {
        this.matrix[0] = 1.0;
        this.matrix[4] = 0.0;
        this.matrix[8] = 0.0;
        this.matrix[12] = 0.0;
        this.matrix[1] = 0.0;
        this.matrix[5] = 1.0;
        this.matrix[9] = 0.0;
        this.matrix[13] = 0.0;
        this.matrix[2] = 0.0;
        this.matrix[6] = 0.0;
        this.matrix[10] = 1.0;
        this.matrix[14] = 0.0;
        this.matrix[3] = 0.0;
        this.matrix[7] = 0.0;
        this.matrix[11] = 0.0;
        this.matrix[15] = 1.0;

        return this;
    } // Concat 2 matrices

    concat(matrix: Matrix2D | Matrix2DRot): Matrix2D {
        let i, ai0, ai1, ai2, ai3;

        const e = this.matrix;
        const a = this.matrix;
        const b = matrix.matrix;

        for (i = 0; i < 4; i++) {
            ai0 = a[i];
            ai1 = a[i + 4];
            ai2 = a[i + 8];
            ai3 = a[i + 12];
            e[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
            e[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
            e[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
            e[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
        }

        return this;
    } // Translate matrix

    translate(x: number, y: number, z: number): Matrix2D {
        this.matrix[12] +=
            this.matrix[0] * x + this.matrix[4] * y + this.matrix[8] * z;
        this.matrix[13] +=
            this.matrix[1] * x + this.matrix[5] * y + this.matrix[9] * z;
        this.matrix[14] +=
            this.matrix[2] * x + this.matrix[6] * y + this.matrix[10] * z;
        this.matrix[15] +=
            this.matrix[3] * x + this.matrix[7] * y + this.matrix[11] * z;
        return this;
    } // Offset matrix

    pivot(x: number, y: number): Matrix2D {
        this.matrix[12] +=
            this.matrix[0] * x + this.matrix[4] * y + this.matrix[8] * -1;
        this.matrix[13] +=
            this.matrix[1] * x + this.matrix[5] * y + this.matrix[9] * -1;
        this.matrix[14] +=
            this.matrix[2] * x + this.matrix[6] * y + this.matrix[10] * -1;
        this.matrix[15] +=
            this.matrix[3] * x + this.matrix[7] * y + this.matrix[11] * -1;
        return this;
    } // Scale matrix

    scale(scaleX: number, scaleY: number, scaleZ: number): Matrix2D {
        this.matrix[0] *= scaleX;
        this.matrix[4] *= scaleY;
        this.matrix[1] *= scaleX;
        this.matrix[5] *= scaleY;
        this.matrix[2] *= scaleX;
        this.matrix[6] *= scaleY;
        this.matrix[3] *= scaleX;
        this.matrix[7] *= scaleY;

        this.matrix[8] *= scaleZ;
        this.matrix[9] *= scaleZ;
        this.matrix[10] *= scaleZ;
        this.matrix[11] *= scaleZ;

        return this;
    } // Rotate matrix

    rotate(angle: number) {
        if (angle !== 0) {
            this.isNeedToCachedMatrix = true;
        } else {
            return;
        }

        if (this.isNeedToCachedMatrix && this.rotationMatrix === null) {
            this.rotationMatrix = new Matrix2DRot();
        }
        if (this.rotationMatrix) {
            this.rotationMatrix.identity();
            this.rotationMatrix.setRotate(angle, 0, 0, 1);
            this.concat(this.rotationMatrix);
        }
    }

    ortho(
        left: number,
        right: number,
        bottom: number,
        top: number,
        near: number,
        far: number
    ): Matrix2D {
        const lr = 1 / (left - right);
        const bt = 1 / (bottom - top);
        const nf = 1 / (near - far);
        this.matrix[0] = -2 * lr;
        this.matrix[1] = 0;
        this.matrix[2] = 0;
        this.matrix[3] = 0;
        this.matrix[4] = 0;
        this.matrix[5] = -2 * bt;
        this.matrix[6] = 0;
        this.matrix[7] = 0;
        this.matrix[8] = 0;
        this.matrix[9] = 0;
        this.matrix[10] = 2 * nf;
        this.matrix[11] = 0;
        this.matrix[12] = (left + right) * lr;
        this.matrix[13] = (top + bottom) * bt;
        this.matrix[14] = (far + near) * nf;
        this.matrix[15] = 1;
        return this;
    }

    // Уничтожить матрицу
    destroy(): void {
        /*this.matrix = null;
        this.rotationMatrix = null;*/
    }
}
