import { Board } from './board';
import { Game } from './game';

window.addEventListener('load', () => {
    // Get HTML elements needed
    const canvas = document.querySelector<HTMLCanvasElement>('#app')!;
    const ctx = canvas.getContext('2d')!;

    // Board dimensions
    const BOARD_WIDTH = 800;  // Fixed board width
    const BOARD_HEIGHT = 800; // Fixed board height
    const SCALE = 1;

    ctx.translate(0.5, 0.5);

    // Set canvas dimensions and style
    canvas.width = BOARD_WIDTH * SCALE;
    canvas.height = BOARD_HEIGHT * SCALE;
    canvas.style.backgroundColor = '#424242';

    // Create board and game
    const board = new Board(canvas, ctx);
    const game = new Game({ board });

    // Start game loop
    game.start();
});