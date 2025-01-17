import { Point } from "./point";
import { Shape } from "./types";

export class Object2D {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public color: string,
        public shape: Shape,
    ) {}

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;

        if (this.shape === Shape.CIRCLE) {
            const centerX = this.x + this.width / 2;
            const centerY = this.y + this.height / 2;
            const radius = Math.min(this.width, this.height) / 2;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
            ctx.fill();
        } else {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getBoundaries(): {
        lt: Point;
        rt: Point;
        rb: Point;
        lb: Point;
    } {
        return {
            lt: new Point(this.x, this.y),
            rt: new Point(this.x + this.width, this.y),
            rb: new Point(this.x + this.width, this.y + this.height),
            lb: new Point(this.x, this.y + this.height),
        };
    }

    isCollidingWith(object: Object2D): boolean {
        return (
            // check collision of right side of this object with left side of object
            this.getX() < object.getX() + object.getWidth() &&
            // check collision of left side of this object with right side of object
            this.getX() + this.getWidth() > object.getX() &&
            // check collision of bottom side of this object with top side of object
            this.getY() < object.getY() + object.getHeight() &&
            // check collision of top side of this object with bottom side of object
            this.getY() + this.getHeight() > object.getY()
          )
    }
}