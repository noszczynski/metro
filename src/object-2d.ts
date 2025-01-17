export class Object2D {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public color: string,
    ) {}

    draw(ctx: CanvasRenderingContext2D, type: 'circle' | 'rect' = 'circle') {
        ctx.fillStyle = this.color;

        if (type === 'circle') {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
            ctx.fill();
        } else {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}