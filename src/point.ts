export class Point {
    constructor(
        public readonly x: number,
        public readonly y: number
    ) {}

    // Helper method to calculate grid position
    getGridPosition(cellWidth: number, cellHeight: number): { row: number; col: number } {
        return {
            col: Math.round(this.x / cellWidth),
            row: Math.round(this.y / cellHeight)
        };
    }
}