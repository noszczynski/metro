import { Point } from "./point";

export class Passenger {
    constructor(
        private currentPosition: Point,
        private targetPosition?: Point
    ) {}

    getCurrentPosition() {
        return this.currentPosition;
    }

    getTargetPosition() {
        return this.targetPosition;
    }

    setTargetPosition(position: Point) {
        this.targetPosition = position;
    }
}