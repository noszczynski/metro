import { Object2D } from "./object-2d";
import { Point } from "./point";
import { Shape } from "./types";
import { v4 as uuidv4 } from 'uuid';

const PASSENGER_SIZE = 10;
const PASSENGER_COLOR = '#f56abc';

export class Passenger extends Object2D {
    private id: string;

    static size = PASSENGER_SIZE;
    static color = PASSENGER_COLOR;

    constructor(
        private currentPosition: Point,
    ) {
        super(currentPosition.getX(), currentPosition.getY(), Passenger.size, Passenger.size, Passenger.color, Shape.CIRCLE);

        this.id = uuidv4();
    }

    getId() {
        return this.id;
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