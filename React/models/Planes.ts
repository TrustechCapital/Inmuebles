class Planes {
    nombrePlan: string;
    constructor(nombrePlan: string) {
        this.nombrePlan = nombrePlan;
    }
    public static fromObject(obj: any, index: number): Planes {
        return {
            nombrePlan: obj.plaCveFaseProd,
        };
    }
}
export default Planes;
