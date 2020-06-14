import { TiposCargaMasivaBienes } from '../constants';

class CargaMasivasBienes {
    idFideicomiso: number | null = null;
    tipoCarga: TiposCargaMasivaBienes | null = null;
    file: File | null = null;

    constructor(
        idFideicomiso: number | null,
        tipoCarga: TiposCargaMasivaBienes | null,
        file: File | null
    ) {
        this.idFideicomiso = idFideicomiso;
        this.tipoCarga = tipoCarga;
        this.file = file;
    }
}

export default CargaMasivasBienes;
