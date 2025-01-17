import { Board } from "./board";
import { Passenger } from "./passenger";
import { Point } from "./point";

export class Game {
    private board: Board;
    private passengers: Passenger[];
    private tick: number;

    constructor({
        board,
    }: {
        board: Board;
    }) {
        this.board = board;
        this.passengers = [];
        this.tick = 0;
    }

    draw() {
        console.log('Drawing game...');
        this.board.draw();

        this.passengers.forEach((passenger) => {
            passenger.draw(this.board.getCtx());
        });
    }

    update() {
        this.tick++;

        if (this.tick % 100 === 0) {
            // Add padding from borders equal to passenger size
            const padding = Passenger.size;
            
            const point = new Point(
                padding + Math.floor(Math.random() * (this.board.getWidth() - padding * 2)),
                padding + Math.floor(Math.random() * (this.board.getHeight() - padding * 2))
            );

            this.passengers.push(new Passenger(point));
        }
    }

    start() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.start());
    }
}