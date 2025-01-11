import { Building } from './building';

export class BuildingManager {
    private buildings: Building[] = [];

    constructor(private gridRows: number, private gridCols: number) {}

    addBuilding(building: Building): boolean {
        // Check if building is within grid bounds
        const position = building.getPosition();
        const isWithinBounds = 
            position.row >= 0 &&
            position.col >= 0 &&
            position.row < this.gridRows - 1 &&
            position.col < this.gridCols - 1;

        if (!isWithinBounds) {
            return false;
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