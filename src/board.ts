export class Board {
    constructor(
        private canvas: HTMLCanvasElement,
        private ctx: CanvasRenderingContext2D,
    ) {}

    draw() {
        // Clear the entire canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw the game board
        this.ctx.fillStyle = '#424242'; // Dark gray
        
        this.ctx.save();
        this.ctx.translate(10, 10);
        
        this.ctx.restore();
    }

    update() {
        // TODO: Implement update logic
    }
}