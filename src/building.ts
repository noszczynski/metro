export type BlockPosition = {
    row: number;
    col: number;
};

export class Building {
    private position: BlockPosition;

    constructor(position: BlockPosition) {
        this.position = position;
    }

    overlaps(other: Building): boolean {
        return this.position.row === other.position.row && 
               this.position.col === other.position.col;
    }

    getPosition(): BlockPosition {
        return { ...this.position };
    }
} 