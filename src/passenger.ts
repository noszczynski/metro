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
    ) {
        super(currentPosition.getX(), currentPosition.getY(), Passenger.size, Passenger.size, Passenger.color, Shape.CIRCLE);
    }

    getPosition() {
        return this.currentPosition;
    }

    drawHitbox(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
    }

    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        // this.drawHitbox(ctx);
    }
}