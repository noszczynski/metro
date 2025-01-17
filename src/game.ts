import { Board } from "./board";
import { Object2D } from "./object-2d";
import { Passenger } from "./passenger";
import { Point } from "./point";
import { Station } from "./station";
import { Shape } from "./types";

const COLLISION_MAX_ATTEMPTS = 100;
const GAME_SPEED = 1;
const BASE_PASSENGER_SPAWN_RATE = 20;
const BASE_STATION_SPAWN_RATE = 200;
const PASSENGER_SPAWN_RATE = Math.floor(BASE_PASSENGER_SPAWN_RATE / GAME_SPEED);
const STATION_SPAWN_RATE = Math.floor(BASE_STATION_SPAWN_RATE / GAME_SPEED);

export class Game {
    private board: Board;
    private tick: number;

    private passengers: Passenger[];
    private stations: Station[];

    private stationConnections: {
        fromStationId: string;
        toStationId: string;
    }[];

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
        this.stationConnections = [];
    }

    draw() {
        console.log('Drawing game...');
        this.board.draw();

        this.drawStationConnections();

        this.passengers.forEach((passenger) => {
            passenger.draw(this.board.getCtx());
        });

        this.stations.forEach((station) => {
            station.draw(this.board.getCtx());
        });
    }

    drawStationConnections() {
        const ctx = this.board.getCtx();
        ctx.strokeStyle = '#FFFFFF'; // White lines
        ctx.lineWidth = 2;

        this.stationConnections.forEach(connection => {
            const fromStation = this.stations.find(s => s.getId() === connection.fromStationId);
            const toStation = this.stations.find(s => s.getId() === connection.toStationId);

            if (!fromStation || !toStation) return;

            // Get center points of stations
            const x1 = fromStation.getX() + Station.size / 2;
            const y1 = fromStation.getY() + Station.size / 2;
            const x2 = toStation.getX() + Station.size / 2;
            const y2 = toStation.getY() + Station.size / 2;

            // Draw line
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        });
    }

    getNoCollisionPoint(size: number) {
        const objects: Object2D[] = [...this.passengers, ...this.stations];

        let attempts = 0;
        
        while (attempts < COLLISION_MAX_ATTEMPTS) {
            // Generate random x,y coordinates within board boundaries
            const x = Math.floor(Math.random() * (this.board.getWidth() - size));
            const y = Math.floor(Math.random() * (this.board.getHeight() - size));
            
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
        return this.tick % PASSENGER_SPAWN_RATE === 0;
    }

    spawnPassenger() {
        const point = this.getNoCollisionPoint(Passenger.size);
        this.passengers.push(new Passenger(point));
    }

    canSpawnStation() {
        return this.tick % STATION_SPAWN_RATE === 0;
    }

    spawnStation() {
        const point = this.getNoCollisionPoint(Station.size);
        this.stations.push(new Station(point));
    }

    update() {
        this.tick++;

        if (this.canSpawnPassenger()) this.spawnPassenger();
        if (this.canSpawnStation()) this.spawnStation();

        if (this.stations.length === 2) {
            this.stationConnections.push({
                fromStationId: this.stations[0].getId(),
                toStationId: this.stations[1].getId(),
            });
        }
    }

    start() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.start());
    }
}