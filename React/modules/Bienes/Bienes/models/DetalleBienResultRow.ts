class DetalleBienResultRow {
    id: number;

    constructor(id: number) {
        this.id = id;
    }

    public static fromObject(obj: any, index: number): DetalleBienResultRow {
        return {
            id: index,
        };
    }
}
export default DetalleBienResultRow;
