import { Board } from "./board";
import { Object2D } from "./object-2d";
import { Passenger } from "./passenger";
import { Point } from "./point";
import { Station } from "./station";
import { Shape } from "./types";

export class Game {
    private board: Board;
    private tick: number;

    private passengers: Passenger[];
    private stations: Station[];

    constructor({
        board,
    }: {
        board: Board;
    }) {
        // Game properties
        this.board = board;
        this.tick = 0;

        // Game objects
        this.passengers = [];
        this.stations = [];
    }

    draw() {
        console.log('Drawing game...');
        this.board.draw();

        this.passengers.forEach((passenger) => {
            passenger.draw(this.board.getCtx());
        });

        this.stations.forEach((station) => {
            station.draw(this.board.getCtx());
        });
    }

    getNoCollisionPoint(size: number) {
        const objects: Object2D[] = [...this.passengers, ...this.stations];

        let attempts = 0;
        
        while (attempts < 2) {
            // Generate random x,y coordinates within board boundaries
            const x = Math.floor(Math.random() * (this.board.getWidth() - size));
            const y = Math.floor(Math.random() * (this.board.getHeight() - size));

            console.log(x, y, size, this.board.getWidth(), this.board.getHeight());
            
            // Create temporary object to check collisions
            const tempObject = new Object2D(x, y, size, size, '', Shape.RECT);

            // Check boundary collisions with board
            const hasBoundaryCollision = 
                x < 0 ||
                x + size >= this.board.getWidth() ||
                y + size >= this.board.getHeight();

            if (hasBoundaryCollision) {
                attempts++;
                continue;
            }

            // Check collisions with other objects
            const hasObjectCollision = objects.some(obj => 
                tempObject.isCollidingWith(obj)
            );

            if (hasObjectCollision) {
                attempts++;
                continue;
            }

            return new Point(x, y);
        }

        throw new Error('No non-colliding point found after 100 attempts');
    }

    canSpawnPassenger() {
        return this.tick % 10 === 0;
    }

    spawnPassenger() {
        const point = this.getNoCollisionPoint(Passenger.size);
        this.passengers.push(new Passenger(point));
    }

    canSpawnStation() {
        return this.tick % 35 === 0;
    }

    spawnStation() {
        const point = this.getNoCollisionPoint(Station.size);
        this.stations.push(new Station(point));
    }

    update() {
        this.tick++;

        if (this.canSpawnPassenger()) this.spawnPassenger();
        if (this.canSpawnStation()) this.spawnStation();
    }

    start() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.start());
    }
}