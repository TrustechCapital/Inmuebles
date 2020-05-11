import BaseModel, { IModel } from './BaseModel';

class Bien extends BaseModel implements IModel {
    backendModelReference = 'mx.com.inscitech.fiducia.domain.FGarantias';

    fgarIdFideicomiso: number;
    fgarIdSubcuenta: number;
    fgarCveGarantia: number;
    fgarTexGarantia?: string;
    fgarTexComentario?: string;
    fgarCveRevalua?: number;
    fgarImpGarantia?: number;
    fgarImpGarantizad?: number;
    fgarPjePicnorado?: number;
    fgarImpUltValua?: number;
    fgarCvePerValua?: string;
    fgarFecUltValua?: string;
    fgarFecInicio?: string;
    fgarFecFin?: string;
    fgarCveStatus?: string;
    fgarEsGarantia?: number;

    constructor(
        fgarIdFideicomiso: number,
        fgarIdSubcuenta: number,
        fgarCveGarantia: number
    ) {
        super();
        this.fgarIdFideicomiso = fgarIdFideicomiso;
        this.fgarIdSubcuenta = fgarIdSubcuenta;
        this.fgarCveGarantia = fgarCveGarantia;
    }

    getPKValues() {
        return {
            fgarIdFideicomiso: this.fgarIdFideicomiso,
            fgarIdSubcuenta: this.fgarIdSubcuenta,
            fgarCveGarantia: this.fgarCveGarantia,
        };
    }
}

export default Bien;
