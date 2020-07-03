import BaseModel from './BaseModel';

class Individualizacion extends BaseModel {
    backendModelReference = 'mx.com.inscitech.fiducia.domain.FUnidades';

    idFideicomiso: number | null = null;
    idSubcuenta: number | null = null;
    idBien: string | null = null;
    idEdificio: string | null = null;
    idDepto: string | null = null;
    tipo: string | null = null;
    niveles: number | null = null;
    calleYNumero: string | null = null;
    nombreColonia: string | null = null;
    nombrePoblacion: string | null = null;
    codigoPostal: string | null = null;
    numeroEstado: number | null = null;
    numeroPais: number | null = null;
    colindancias: string | null = null;
    medidas: string | null = null;
    precio: number | null = null;
    ultimoAvaluo: number | null = null;
    fechaUltimoAvaluo: Date | null = null;
    moneda: number | null = null;
    notario: number | null = null;
    localidadNotaria: string | null = null;
    numeroEscritura: string | null = null;
    folioReal: string | null = null;
    fechaTrasladoDominio: Date | null = null;
    status: string | null = null;
    estacionamiento1: string | null = null;
    superficie1: string | null = null;
    estacionamiento2: string | null = null;
    superficie2: string | null = null;
    estacionamiento3: string | null = null;
    superficie3: string | null = null;
    roofGarden: string | null = null;
    roofSuperficie: string | null = null;
    sotano: string | null = null;
    sotanoSuperficie: string | null = null;
    indiviso: number | null = null;
    precioCatastro: number | null = null;
    acto1: string | null = null;
    acto2: string | null = null;
    acto3: string | null = null;
    acto4: string | null = null;
    fechaReversion: Date | null = null;
    cveGrahipo: number | null = null;
    numeroHipoteca: string | null = null;
    aFavor: string | null = null;

    constructor(
        idFideicomiso: number | null,
        idSubcuenta: number | null,
        idBien: string | null,
        idEdificio: string | null,
        idDepto: string | null
    ) {
        super();
        this.idFideicomiso = idFideicomiso;
        this.idSubcuenta = idSubcuenta;
        this.idBien = idBien;
        this.idEdificio = idEdificio;
        this.idDepto = idDepto;
    }

    getPKValues() {
        return {
            idFideicomiso: this.idFideicomiso,
            idSubcuenta: this.idSubcuenta,
            idBien: this.idBien,
            idEdificio: this.idEdificio,
            idDepto: this.idDepto,
        };
    }
}

export default Individualizacion;
