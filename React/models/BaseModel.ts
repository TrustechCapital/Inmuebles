export interface IModel {
    backendModelReference: string;
    getPKValues: () => object;
}

export default class BaseModel {}
