import { Object2D } from "./object-2d";
import { Point } from "./point";
import { Shape } from "./types";

const PASSENGER_SIZE = 10;
const PASSENGER_COLOR = '#f56abc';

export class Passenger extends Object2D {
    static size = PASSENGER_SIZE;
    static color = PASSENGER_COLOR;

    constructor(
        private currentPosition: Point,
        private targetPosition?: Point
    ) {
        super(currentPosition.getX(), currentPosition.getY(), Passenger.size, Passenger.size, Passenger.color, Shape.CIRCLE);
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