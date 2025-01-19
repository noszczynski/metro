export class IdGenerator {
    currentId: number;
    constructor () {
        this.currentId = 0;
    }

    generate() {
        var givenId = this.currentId;
        this.currentId += 1;
        return givenId;
    }

    reset() {
        this.currentId = 0;
    }

}

export const station_id_generator = new IdGenerator();
export const line_id_generator = new IdGenerator();
