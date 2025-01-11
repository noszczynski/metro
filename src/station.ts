import { Point } from './point';

export class Station {
    private position: Point;

    constructor(position: Point) {
        this.position = position;
    }

    getPosition(): Point {
        return this.position;
    }
} 