import { Object2D } from "./object-2d";
import { Passenger } from "./passenger";
import { Point } from "./point";
import { Shape } from "./types";
import { v4 as uuidv4 } from 'uuid';

const STATION_SIZE = 18;
const STATION_COLOR = '#007A33'; // bottle green
const STATION_SHAPE = Shape.RECT;

export class Station extends Object2D {
    private id: string;
    private position: Point;
    private passengers: Passenger[] = [];

    static size = STATION_SIZE;
    static color = STATION_COLOR;
    static shape = STATION_SHAPE;

    constructor(position: Point) {
        super(position.getX(), position.getY(), STATION_SIZE, STATION_SIZE, STATION_COLOR, STATION_SHAPE);
        
        this.id = uuidv4();
        this.position = position;
    }

    getId() {
        return this.id;
    }

    getPosition() {
        return this.position;
    }

    drawHitbox(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = 'red';
        ctx.strokeRect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
    }

    draw(ctx: CanvasRenderingContext2D) {
        super.draw(ctx);
        // this.drawHitbox(ctx);
    }

    addPassenger(passenger: Passenger) {
        this.passengers.push(passenger);
    }

    getPassengers() {
        return this.passengers;
    }
} 