import { Point } from "./point";

export class PointsManager {
    private points: Point[] = [];
    
    constructor(
        private readonly gridRows: number,
        private readonly gridCols: number,
        private readonly cellWidth: number,
        private readonly cellHeight: number
    ) {
        this.generatePoints();
    }

    getPoints(): Point[] {
        return this.points;
    }

    private generatePoints() {
        this.points = [];
        for (let row = 0; row < this.gridRows; row++) {
            for (let col = 0; col < this.gridCols; col++) {
                this.points.push(new Point(
                    col * this.cellWidth,
                    row * this.cellHeight
                ));
            }
        }
    }
} 