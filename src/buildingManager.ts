import { Building } from './building';

export class BuildingManager {
    private buildings: Building[] = [];

    constructor(private gridRows: number, private gridCols: number) {}

    addBuilding(building: Building): boolean {
        // Check if building is within grid bounds
        const blocks = building.getBlocks();
        const isWithinBounds = blocks.every(block => 
            block.row >= 0 &&
            block.col >= 0 &&
            block.row < this.gridRows - 1 &&
            block.col < this.gridCols - 1
        );

        if (!isWithinBounds) {
            return false;
        }

        // Check for overlaps with existing buildings
        for (const existingBuilding of this.buildings) {
            if (building.overlaps(existingBuilding)) {
                return false;
            }
        }

        this.buildings.push(building);
        return true;
    }

    addBuildings(buildings: Building[]) {
        return buildings.forEach(building => {
            this.addBuilding(building);
        });
    }

    getBuildings(): Building[] {
        return this.buildings;
    }
} 