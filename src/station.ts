import { Object2D } from "./object-2d";
import { Point } from "./point";
import { Shape } from "./types";

const STATION_SIZE = 35;
const STATION_COLOR = '#007A33'; // bottle green
const STATION_SHAPE = Shape.RECT;

export class Station extends Object2D {
    static size = STATION_SIZE;
    static color = STATION_COLOR;
    static shape = STATION_SHAPE;

    constructor(position: Point) {
        super(position.getX(), position.getY(), STATION_SIZE, STATION_SIZE, STATION_COLOR, STATION_SHAPE);
    }
} 