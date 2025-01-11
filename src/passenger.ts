import { Building } from "./building";

export class Passenger {
    private position: Building
    private destination: Building

    constructor({
        position,
        destination
    }: {
        position: Building,
        destination: Building
    }) {
        this.position = position;
        this.destination = destination;
    }
}