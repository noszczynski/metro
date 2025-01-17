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
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
            ctx.fill();
        } else {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}