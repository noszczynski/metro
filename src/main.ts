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
import { Point } from './point';

// Create points manager after the grid spacing calculations
const pointsManager = new PointsManager(GRID_ROWS, GRID_COLS, CELL_WIDTH, CELL_HEIGHT);
const buildingManager = new BuildingManager(GRID_ROWS, GRID_COLS);

// Add timer constants
const MIN_PASSENGER_SPAWN_TIME = 200 as const;
const MAX_PASSENGER_SPAWN_TIME = 10000 as const;
const MAX_BUILDINGS = 24 as const;

// Add some initial buildings (you can modify these or add UI controls later)
const coordinates = Array.from(
  { length: GRID_ROWS }, 
  (_, row) => Array.from({ length: GRID_COLS }, (_, col) => ({ row, col }))
);

const buildings = coordinates.flatMap(row => {
  return row.map(coordinate => {
    return new Building(new Point(coordinate.col, coordinate.row));
  });
})

for (let i = 0; i < (GRID_ROWS * GRID_COLS) - MAX_BUILDINGS; i++) {
  const randomIndex = Math.floor(Math.random() * buildings.length);
  buildings.splice(randomIndex, 1);
}

buildingManager.addBuildings(buildings);

function spawnPassengers() {
    const buildings = buildingManager.getBuildings();

    buildings.forEach(building => {
        building.startSpawnPassengers(MIN_PASSENGER_SPAWN_TIME, MAX_PASSENGER_SPAWN_TIME);
    });
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Always center the board
    offsetX = (canvas.width - BOARD_WIDTH) / 2;
    offsetY = (canvas.height - BOARD_HEIGHT) / 2;
}

// Add click handler after resizeCanvas function
function handleCanvasClick(event: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left - offsetX;
    const clickY = event.clientY - rect.top - offsetY;

    // Check if click is within any building
    const buildings = buildingManager.getBuildings();

    for (const building of buildings) {
        const position = building.getPosition();
        const x = position.col * CELL_WIDTH + BUILDING_PADDING;
        const y = position.row * CELL_HEIGHT + BUILDING_PADDING;
        const width = CELL_WIDTH - (BUILDING_PADDING * 2);
        const height = CELL_HEIGHT - (BUILDING_PADDING * 2);

        if (clickX >= x && clickX <= x + width &&
            clickY >= y && clickY <= y + height) {

            // Log building info and passengers
            console.group(`Building at (${position.row}, ${position.col})`);
            console.log('Total passengers:', building.getPassengers().length);
            console.log('Passengers:', building.getPassengers());
            console.groupEnd();

            break;
        }
    }
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
            ctx.moveTo(point.col, point.row);
            ctx.lineTo(rightPoint.col, rightPoint.row);
            ctx.stroke();
        }
        
        if (row < GRID_ROWS - 1) { // Connect down
            const downPoint = points[((row + 1) * GRID_COLS) + col];
            ctx.beginPath();
            ctx.moveTo(point.col, point.row);
            ctx.lineTo(downPoint.col, downPoint.row);
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
        ctx.roundRect(x, y, width, height, 4);
        ctx.fillStyle = '#4444ff';
        ctx.fill();
        
        // Draw passenger count
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const passengerCount = building.getPassengers().length;
        const text = `${passengerCount}`;
        ctx.fillText(text, x + width/2, y + height/2);
    });
    
    ctx.restore();
}

// Initialize
window.addEventListener('resize', resizeCanvas);

// Initial setup
resizeCanvas();

// Start passenger generation
spawnPassengers();

function startGameLoop() {
    drawBoard();
    requestAnimationFrame(startGameLoop);
}

startGameLoop();

function handleCanvasClick(event: MouseEvent) {
    // Get click coordinates relative to canvas
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left - offsetX;
    const clickY = event.clientY - rect.top - offsetY;

    // Check each building to see if it was clicked
    buildingManager.getBuildings().forEach(building => {
        const position = building.getPosition();
        const x = position.col * CELL_WIDTH + BUILDING_PADDING;
        const y = position.row * CELL_HEIGHT + BUILDING_PADDING;
        const width = CELL_WIDTH - (BUILDING_PADDING * 2);
        const height = CELL_HEIGHT - (BUILDING_PADDING * 2);

        // Check if click is within building bounds
        if (
            clickX >= x &&
            clickX <= x + width &&
            clickY >= y &&
            clickY <= y + height
        ) {
            console.log('Building clicked:', {
                position: building.getPosition(),
                passengers: building.getPassengers(),
                coordinates: {
                    x,
                    y,
                    width,
                    height
                }
            });
        }
    });
}

// Add this line after window.addEventListener('resize', resizeCanvas);
canvas.addEventListener('click', handleCanvasClick);