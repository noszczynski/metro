export class Board {
    private width: number;
    private height: number;

    constructor(
        private canvas: HTMLCanvasElement,
        private ctx: CanvasRenderingContext2D,
    ) {
        this.width = canvas.width;
        this.height = canvas.height;
    }

    getCtx() {
        return this.ctx;
    }

    draw() {
        // Clear the entire canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw the game board
        this.ctx.fillStyle = '#424242'; // Dark gray

        this.ctx.save();
        this.ctx.translate(10, 10);
        
        this.ctx.restore();
    }

    update() {
        // TODO: Implement update logic
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    getSize() {
        return {
            width: this.width,
            height: this.height,
        };
    }
}