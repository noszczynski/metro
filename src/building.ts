import { Passenger } from './passenger';

export class Building {
    private passengers: Passenger[] = [];
    
    constructor(private position: { row: number; col: number }) {}

    startSpawnPassengers(minSpawnTime: number, maxSpawnTime: number) {
        const spawnTime = Math.floor(Math.random() * (maxSpawnTime - minSpawnTime + 1)) + minSpawnTime;

        setTimeout(() => {
            const passenger = new Passenger(this.position);
            this.addPassenger(passenger);
            this.startSpawnPassengers(minSpawnTime, maxSpawnTime);
        }, spawnTime);
    }
    
    getPosition() {
        return this.position;
    }
    
    addPassenger(passenger: Passenger) {
        this.passengers.push(passenger);
    }
    
    getPassengers() {
        return this.passengers;
    }
} 