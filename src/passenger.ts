import { Object2D } from "./object-2d";
import { Point } from "./point";

export class Passenger extends Object2D {
    constructor(
        private currentPosition: Point,
        private targetPosition?: Point
    ) {
        super(currentPosition.getX(), currentPosition.getY(), 10, 10, '#FFD700');
    }

    getCurrentPosition() {
        return this.currentPosition;
    }

    getTargetPosition() {
        return this.targetPosition;
    }

    setTargetPosition(position: Point) {
        this.targetPosition = position;
    }

    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
    }
}