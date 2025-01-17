import { Board } from "./board";

export class Game {
    private board: Board;

    constructor({
        board,
    }: {
        board: Board;
    }) {
        this.board = board;
    }

    draw() {
        console.log('Drawing game...');
        this.board.draw();
    }

    update() {
        // TODO: Implement update logic
    }

    start() {
        this.draw();
        requestAnimationFrame(() => this.start());
    }
}