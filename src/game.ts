import { Board } from "./board";
import { Object2D } from "./object-2d";
import { Passenger } from "./passenger";
import { Point } from "./point";
import { Station } from "./station";
import { Train } from "./train";
import { Shape } from "./types";

const COLLISION_MAX_ATTEMPTS = 100;
const GAME_SPEED = 1;
const BASE_PASSENGER_SPAWN_RATE = 20;
const PASSENGER_SPAWN_RATE = Math.floor(BASE_PASSENGER_SPAWN_RATE / GAME_SPEED);

export class Game {
    // Game properties
    private board: Board;
    private tick: number;

    // Game variables
    private availableStationsToPlace: number;

    // Game objects
    private passengers: Passenger[];
    private stations: Station[];
    private trains: Train[];

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

        this.availableStationsToPlace = 4;

        // Game objects
        this.passengers = [];
        this.stations = [];
        this.stationConnections = [];
        this.trains = [];
        
        this.board.onCanvasClick((x, y) => {
            console.log('Game received canvas click at:', { x, y });
            const point = new Point(x, y);
            
            if (this.canSpawnStation() && this.checkCollision(this.stations, point, Station.size)) {
                this.spawnStation(point);
            }
        });
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

        this.trains.forEach((train) => {
            train.draw(this.board.getCtx());
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

            // Draw the path
            ctx.beginPath();
            ctx.moveTo(x1, y1);

            // Calculate horizontal and vertical distances
            const dx = x2 - x1;
            const dy = y2 - y1;

            if (Math.abs(dx) < 50 || Math.abs(dy) < 50) {
                // Draw direct line if stations are close
                ctx.lineTo(x2, y2);
            } else if (Math.abs(dx) > Math.abs(dy)) {
                // Draw two lines if horizontal distance is greater
                const midX = x1 + dx / 2;
                ctx.lineTo(midX, y1);
                ctx.lineTo(x2, y2);
            } else {
                // Draw three lines for more complex paths
                const midY = y1 + dy / 2;
                ctx.lineTo(x1, midY);
                ctx.lineTo(x2, midY);
                ctx.lineTo(x2, y2);
            }
            
            ctx.stroke();
        });
    }

    checkCollision(objects: Object2D[], point: Point, size: number) {
        // Create temporary object to check collisions
        const tempObject = new Object2D(point.getX(), point.getY(), size, size, '', Shape.RECT);

        // Check boundary collisions with board
        const hasBoundaryCollision = 
            point.getX() < 0 ||
            point.getX() + size >= this.board.getWidth() ||
            point.getY() + size >= this.board.getHeight();

        if (hasBoundaryCollision) return false;

        // Check collisions with other objects
        const hasObjectCollision = objects.some(obj => 
            tempObject.isCollidingWith(obj)
        );

        if (hasObjectCollision) return false;

        return true;
    }

    getNoCollisionPoint(size: number) {
        const objects: Object2D[] = [...this.passengers, ...this.stations];

        let attempts = 0;
        
        while (attempts < COLLISION_MAX_ATTEMPTS) {
            // Generate random x,y coordinates within board boundaries
            const x = Math.floor(Math.random() * (this.board.getWidth() - size));
            const y = Math.floor(Math.random() * (this.board.getHeight() - size));

            if (this.checkCollision(objects, new Point(x, y), size)) {
                return new Point(x, y);
            }

            attempts++;
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
        return this.availableStationsToPlace > 0;
    }

    spawnStation(point: Point) {
        const newStation = new Station(point);
        
        // If there are existing stations, connect the last one to this new one
        if (this.stations.length > 0) {
            const lastStation = this.stations[this.stations.length - 1];
            this.stationConnections.push({
                fromStationId: lastStation.getId(),
                toStationId: newStation.getId(),
            });
        }
        
        this.stations.push(newStation);
        this.availableStationsToPlace--;
    }

    status() {
        console.log({
            stations: this.stations,
            passengers: this.passengers,
        })
    }

    findClosestStation(passenger: Passenger): Station | null {
        if (this.stations.length === 0) return null;

        return this.stations.reduce((closest, station) => {
            if (!closest) return station;

            const currentDistance = Math.sqrt(
                Math.pow(passenger.getX() - station.getX(), 2) + 
                Math.pow(passenger.getY() - station.getY(), 2)
            );

            const closestDistance = Math.sqrt(
                Math.pow(passenger.getX() - closest.getX(), 2) + 
                Math.pow(passenger.getY() - closest.getY(), 2)
            );

            return currentDistance < closestDistance ? station : closest;
        }, null as Station | null);
    }

    removePassenger(passengerId: string) {
        this.passengers = this.passengers.filter(p => p.getId() !== passengerId);
    }

    updatePassengers() {
        this.passengers.forEach(passenger => {
            const startingStation = passenger.getStartingStationPoint();

            if (!startingStation) {
                const closestStation = this.findClosestStation(passenger);

                if (closestStation) {
                    passenger.setStartingStationPoint(closestStation.getId(), closestStation.getPosition());
                }
            } else {
                passenger.moveTowardsTarget(this.tick, startingStation.point);

                if (passenger.hasArrivedAtStation(startingStation.point)) {
                    const destinationStation = this.stations.find(station => station.getId() === startingStation.stationId);

                    destinationStation?.addPassenger(passenger);

                    this.removePassenger(passenger.getId());
                }
            }
        });
    }

    update() {
        this.tick++;

        if (this.canSpawnPassenger()) this.spawnPassenger();

        this.updatePassengers();
    }

    start() {
        this.update();
        this.draw();

        if (this.tick % 1000 === 0) this.status();

        requestAnimationFrame(() => this.start());
    }
}