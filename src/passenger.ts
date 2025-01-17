import { Object2D } from "./object-2d";
import { Point } from "./point";
import { Shape } from "./types";
import { v4 as uuidv4 } from 'uuid';
import { Station } from "./station";

const PASSENGER_SIZE = 10;
const PASSENGER_COLOR = '#f56abc';
const ARRIVAL_THRESHOLD = 2;

export class Passenger extends Object2D {
    private id: string;
    private stationPoint: Point | null = null;
    private destinationPoint: Point;
    private speed: number;

    static size = PASSENGER_SIZE;
    static color = PASSENGER_COLOR;

    constructor(
        private currentPosition: Point,
    ) {
        super(currentPosition.getX(), currentPosition.getY(), Passenger.size, Passenger.size, Passenger.color, Shape.CIRCLE);

        // Random speed between 1 and 5
        this.speed = Math.floor(Math.random() * 5) + 1;

        // Generate a unique ID for the passenger
        this.id = uuidv4();

        // todo: Set random destination point within the board (assuming 800x600 board)
        this.destinationPoint = new Point(
            Math.floor(Math.random() * 800),
            Math.floor(Math.random() * 600)
        );
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

    setStartingStationPoint(point: Point) {
        this.stationPoint = point;
    }

    getStartingStationPoint() {
        return this.stationPoint;
    }

    getDestinationPoint() {
        return this.destinationPoint;
    }

    moveTowardsTarget(tick: number, targetPoint: Point) {
        if (!this.stationPoint || tick % this.speed !== 0) return;

        const targetX = targetPoint.getX();
        const targetY = targetPoint.getY();

        // Move 1px in the direction of the target
        if (this.x < targetX) this.x += 1;
        if (this.x > targetX) this.x -= 1;
        if (this.y < targetY) this.y += 1;
        if (this.y > targetY) this.y -= 1;

        // Update current position
        this.currentPosition = new Point(this.x, this.y);
    }

    hasArrivedAtStation(station: Station): boolean {
        if (!this.stationPoint) return false;
        
        const distance = Math.sqrt(
            Math.pow(this.x - station.getX(), 2) + 
            Math.pow(this.y - station.getY(), 2)
        );

        return distance <= ARRIVAL_THRESHOLD;
    }
}
