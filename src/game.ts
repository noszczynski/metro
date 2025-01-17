import { Board } from "./board";
import { Passenger } from "./passenger";
import { Point } from "./point";
import { Station } from "./station";

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

    canSpawnPassenger() {
        return this.tick % 100 === 0;
    }

    spawnPassenger() {
        const padding = Passenger.size;

        const point = new Point(
            padding + Math.floor(Math.random() * (this.board.getWidth() - padding * 2)),
            padding + Math.floor(Math.random() * (this.board.getHeight() - padding * 2))
        );

        this.passengers.push(new Passenger(point));
    }

    canSpawnStation() {
        return this.tick % 450 === 0;
    }

    spawnStation() {
        const padding = Station.size;

        const point = new Point(
            padding + Math.floor(Math.random() * (this.board.getWidth() - padding * 2)),
            padding + Math.floor(Math.random() * (this.board.getHeight() - padding * 2))
        );

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