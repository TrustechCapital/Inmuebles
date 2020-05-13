export interface IModel {
    backendModelReference: string;
    getPKValues: () => Object;
}

export default class BaseModel implements IModel {
    backendModelReference = '';

    getPKValues() {
        return {};
    }

    hasSamePkAs(model: IModel) {
        return (
            JSON.stringify(this.getPKValues()) ===
            JSON.stringify(model.getPKValues())
        );
    }
}
