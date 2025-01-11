export class Point {
    constructor(
        public readonly col: number,
        public readonly row: number
    ) {}

    // Helper method to calculate grid position
    getGridPosition(cellWidth: number, cellHeight: number): { row: number; col: number } {
        return {
            col: Math.round(this.col / cellWidth),
            row: Math.round(this.row / cellHeight)
        };
    }
}