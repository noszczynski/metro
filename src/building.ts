export type BlockPosition = {
    row: number;
    col: number;
};

export class Building {
    private blocks: BlockPosition[] = [];

    constructor(blocks: BlockPosition[]) {
        if (blocks.length === 0) {
            throw new Error('Building must have at least one block');
        }
        
        // Validate that blocks are connected
        if (!this.areBlocksConnected(blocks)) {
            throw new Error('All blocks must be connected');
        }

        this.blocks = blocks;
    }

    private areBlocksConnected(blocks: BlockPosition[]): boolean {
        if (blocks.length === 1) return true;

        const isAdjacent = (b1: BlockPosition, b2: BlockPosition): boolean => {
            return (
                (Math.abs(b1.row - b2.row) === 1 && b1.col === b2.col) ||
                (Math.abs(b1.col - b2.col) === 1 && b1.row === b2.row)
            );
        };

        const visited = new Set<string>();
        const toVisit = [blocks[0]];
        
        while (toVisit.length > 0) {
            const current = toVisit.pop()!;
            const key = `${current.row},${current.col}`;
            
            if (!visited.has(key)) {
                visited.add(key);
                
                for (const block of blocks) {
                    const blockKey = `${block.row},${block.col}`;
                    if (!visited.has(blockKey) && isAdjacent(current, block)) {
                        toVisit.push(block);
                    }
                }
            }
        }

        return visited.size === blocks.length;
    }

    overlaps(other: Building): boolean {
        return this.blocks.some(block1 => 
            other.blocks.some(block2 => 
                block1.row === block2.row && block1.col === block2.col
            )
        );
    }

    getBlocks(): BlockPosition[] {
        return [...this.blocks];
    }
} 