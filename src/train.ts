import { Object2D } from "./object-2d";
import { Passenger } from "./passenger";
import { Point } from "./point";
import { Shape } from "./types";

export class Train extends Object2D {
    private position: Point;
    private speed: number;
    private capacity: number;
    private passengers: Passenger[];

    constructor(position: Point, capacity: number = 10) {
        super(position.getX(), position.getY(), 10, 10, '#0F0000', Shape.RECT);
        
        this.position = position;
        this.speed = 0;
        this.capacity = capacity;
        this.passengers = [];
    }

    getPosition() {
        return this.position;
    }

    getSpeed() {
        return this.speed;
    }

    getCapacity() {
        return this.capacity;
    }

    getPassengers() {
        return this.passengers;
    }

    addPassengers(passengers: Passenger[]) {
        this.passengers.push(...passengers);
    }

    removePassengers(passengerIds: string[]) {
        this.passengers = this.passengers.filter(p => !passengerIds.includes(p.getId()));
    }

    getPassengerCount() {
        return this.passengers.length;
    }
}
