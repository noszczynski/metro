const canvas = document.querySelector<HTMLCanvasElement>('#app')!;
const ctx = canvas.getContext('2d')!;

// Board dimensions
const BOARD_WIDTH = 800;  // Fixed board width
const BOARD_HEIGHT = 600; // Fixed board height

// Simplify the offset variables to just center the board
let offsetX = 0;
let offsetY = 0;

// Add these constants after the board dimensions
const GRID_ROWS = 12;     // Number of rows in the grid
const GRID_COLS = 16;     // Number of columns in the grid
const BUILDING_PADDING = 4;  // Pixels of padding around each building block

// Calculate grid spacing
const CELL_WIDTH = BOARD_WIDTH / (GRID_COLS - 1);
const CELL_HEIGHT = BOARD_HEIGHT / (GRID_ROWS - 1);

import { PointsManager } from './points';
import { BuildingManager } from './buildingManager';
import { Building } from './building';

// Create points manager after the grid spacing calculations
const pointsManager = new PointsManager(GRID_ROWS, GRID_COLS, CELL_WIDTH, CELL_HEIGHT);
const buildingManager = new BuildingManager(GRID_ROWS, GRID_COLS);

// Add some initial buildings (you can modify these or add UI controls later)
const coordinates = Array.from({ length: GRID_ROWS }, (_, row) => Array.from({ length: GRID_COLS }, (_, col) => ({ row, col })));
const buildings = coordinates.flatMap(row => {
  return row.map(coordinate => {
    return new Building(coordinate);
  });
});
buildingManager.addBuildings(buildings);

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Always center the board
    offsetX = (canvas.width - BOARD_WIDTH) / 2;
    offsetY = (canvas.height - BOARD_HEIGHT) / 2;
    
    drawBoard();
}

function drawBoard() {
    // Clear the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the game board
    ctx.fillStyle = '#424242'; // Dark gray
    ctx.fillRect(offsetX, offsetY, BOARD_WIDTH, BOARD_HEIGHT);
    
    ctx.save();
    ctx.translate(offsetX, offsetY);
    
    // Update to use pointsManager
    const points = pointsManager.getPoints();
    
    // Draw grid lines (streets)
    ctx.strokeStyle = '#666666';
    ctx.lineWidth = 1;
    
    points.forEach((point) => {
        // Use Point class's getGridPosition method
        const { row, col } = point.getGridPosition(CELL_WIDTH, CELL_HEIGHT);
        
        // Connect to adjacent points (if they exist)
        if (col < GRID_COLS - 1) { // Connect right
            const rightPoint = points[(row * GRID_COLS) + col + 1];
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(rightPoint.x, rightPoint.y);
            ctx.stroke();
        }
        
        if (row < GRID_ROWS - 1) { // Connect down
            const downPoint = points[((row + 1) * GRID_COLS) + col];
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(downPoint.x, downPoint.y);
            ctx.stroke();
        }
    });

    // Draw buildings
    buildingManager.getBuildings().forEach(building => {
        const position = building.getPosition();
        const x = position.col * CELL_WIDTH + BUILDING_PADDING;
        const y = position.row * CELL_HEIGHT + BUILDING_PADDING;
        const width = CELL_WIDTH - (BUILDING_PADDING * 2);
        const height = CELL_HEIGHT - (BUILDING_PADDING * 2);
        
        // Draw building block with rounded corners
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, 4);  // 4px border radius
        ctx.fill();
        
        // Add position text
        ctx.fillStyle = '#ffffff';  // White text
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const text = `${position.row},${position.col}`;
        ctx.fillText(text, x + width/2, y + height/2);
        
        // Reset fill style for next building
        ctx.fillStyle = '#4444ff';
    });
    
    ctx.restore();
}

// Initialize
window.addEventListener('resize', resizeCanvas);

// Initial setup
resizeCanvas();
