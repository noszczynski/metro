export class Passenger {
    constructor(
        private currentPosition: { row: number; col: number },
        private targetPosition?: { row: number; col: number }
    ) {}

    getCurrentPosition() {
        return this.currentPosition;
    }

    getTargetPosition() {
        return this.targetPosition;
    }

    setTargetPosition(position: { row: number; col: number }) {
        this.targetPosition = position;
    }
}