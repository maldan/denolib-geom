export default class Rectangle {
    public left: number = 0;
    public right: number = 0;
    public top: number = 0;
    public bottom: number = 0;

    constructor();
    constructor({ left, top, right, bottom }: { left: number; top: number; right: number; bottom: number });
    constructor(left: number, top: number, right: number, bottom: number);
    constructor(left: unknown = 0, top: unknown = 0, right: unknown = 0, bottom: unknown = 0) {
        if (typeof left === "object") {
            this.left = left['left'];
            this.right = left['right'];
            this.top = left['top'];
            this.bottom = left['bottom'];
        } else {
            this.left = left as number;
            this.right = right as number;
            this.top = top as number;
            this.bottom = bottom as number;
        }
    }

    // Check if point between to point
    private between(min: number, p: number, max: number): boolean {
        if (min < max) {
            if (p > min && p < max) {
                return true;
            }
        }
        if (min > max) {
            if (p > max && p < min) {
                return true;
            }
        }
        return p === min || p === max;
    };

    // Check point collision
    intersectPoint(x: number, y: number): boolean {
        return this.between(this.left, x, this.right) && this.between(this.top, y, this.bottom);
    };

    // Check rectangle collision
    intersectRectangle(rect: Rectangle, isReversed: boolean = false): boolean {
        if (isReversed) {
            return !(rect.left > this.right ||
                rect.right < this.left ||
                rect.top > this.bottom ||
                rect.bottom < this.top);
        }
        return !(rect.left > this.right ||
            rect.right < this.left ||
            rect.top < this.bottom ||
            rect.bottom > this.top);
    };

    get x(): number {
        return this.left;
    }

    set x(value: number) {
        const tmpRight = this.right - this.left;
        this.left = value;
        this.right = tmpRight + value;
    }

    get y(): number {
        return this.top;
    }

    set y(value: number) {
        const tmpBottom = this.bottom - this.top;
        this.top = value;
        this.bottom = tmpBottom + value;
    }

    get width(): number {
        return Math.sqrt((this.left - this.right) * (this.left - this.right));
    }

    get height(): number {
        return Math.sqrt((this.bottom - this.top) * (this.bottom - this.top));
    }
}