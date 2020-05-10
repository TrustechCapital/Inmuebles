class IndividuaResultRow {
    id?: number;
    idFideicomiso: number;
    idSubcuenta: number;
    idBien: number;
    idEdificio: number;
    idDepto: number;
    precio: number;
    moneda: number;
    notario: string;
    localidadNota: string;
    numEscritura: number;
    folioReal: number;
    fechaTrasladoDominio: any; //Formato Date para TS?
    status: string;
    notario2: string;
    adquiriente: string;
    tercero: string;
    observacion: string;
    escritura: number;
    fecEscritura: any; //FOrmato Date
    fideicomBenefici: number;
    nomPersona: string;
    numLugar: number;
    nomPersona1: string;
    numLugar1: number;
    fidBenSaneamiento: number;
    nomSaneamiento: string;
    numLugarSaneamiento: number;
    nomSaneamiento1: string;
    numLugarSaneamiento1: number;
    fidBenResponsabilidad: number;
    nomResponsabilidad: string;
    numLugarResponsabilidad: number;
    nomResponsabilidad1: string;
    numLugarResponsabilidad1: number;
    fidBenOtorgamiento: number;
    nomOtorgamiento: string;
    numLugarOtorgamiento: number;
    nomOtorgamiento1: string;
    numLugarOtorgamiento1: number;
    transmisionReversion: string;
    parcialTotal: string;
    sujetoRegimen: number;
    tipoInmueble: string;
    nomEnvio: string;
    emailEnvio: string;
    fecFirma: any; //Formato Date
    delegado: string;

    constructor(
        idFideicomiso: number,
        idSubcuenta: number,
        idBien: number,
        idEdificio: number,
        idDepto: number,
        precio: number,
        moneda: number,
        notario: string,
        localidadNota: string,
        numEscritura: number,
        folioReal: number,
        fechaTrasladoDominio: any, //Formato Date para TS?
        status: string,
        notario2: string,
        adquiriente: string,
        tercero: string,
        observacion: string,
        escritura: number,
        fecEscritura: any, //FOrmato Date
        fideicomBenefici: number,
        nomPersona: string,
        numLugar: number,
        nomPersona1: string,
        numLugar1: number,
        fidBenSaneamiento: number,
        nomSaneamiento: string,
        numLugarSaneamiento: number,
        nomSaneamiento1: string,
        numLugarSaneamiento1: number,
        fidBenResponsabilidad: number,
        nomResponsabilidad: string,
        numLugarResponsabilidad: number,
        nomResponsabilidad1: string,
        numLugarResponsabilidad1: number,
        fidBenOtorgamiento: number,
        nomOtorgamiento: string,
        numLugarOtorgamiento: number,
        nomOtorgamiento1: string,
        numLugarOtorgamiento1: number,
        transmisionReversion: string,
        parcialTotal: string,
        sujetoRegimen: number,
        tipoInmueble: string,
        nomEnvio: string,
        emailEnvio: string,
        fecFirma: any, //Formato Date
        delegado: string
    ) {
        this.idFideicomiso = idFideicomiso;
        this.idSubcuenta = idSubcuenta;
        this.idBien = idBien;
        this.idEdificio = idEdificio;
        this.idDepto = idDepto;
        this.precio = precio;
        this.moneda = moneda;
        this.notario = notario;
        this.localidadNota = localidadNota;
        this.numEscritura = numEscritura;
        this.folioReal = folioReal;
        this.fechaTrasladoDominio = fechaTrasladoDominio; //Formato Date para TS?
        this.status = status;
        this.notario2 = notario2;
        this.adquiriente = adquiriente;
        this.tercero = tercero;
        this.observacion = observacion;
        this.escritura = escritura;
        this.fecEscritura = fecEscritura; //FOrmato Date
        this.fideicomBenefici = fideicomBenefici;
        this.nomPersona = nomPersona;
        this.numLugar = numLugar;
        this.nomPersona1 = nomPersona1;
        this.numLugar1 = numLugar1;
        this.fidBenSaneamiento = fidBenSaneamiento;
        this.nomSaneamiento = nomSaneamiento;
        this.numLugarSaneamiento = numLugarSaneamiento;
        this.nomSaneamiento1 = nomSaneamiento1;
        this.numLugarSaneamiento1 = numLugarSaneamiento1;
        this.fidBenResponsabilidad = fidBenResponsabilidad;
        this.nomResponsabilidad = nomResponsabilidad;
        this.numLugarResponsabilidad = numLugarResponsabilidad;
        this.nomResponsabilidad1 = nomResponsabilidad1;
        this.numLugarResponsabilidad1 = numLugarResponsabilidad1;
        this.fidBenOtorgamiento = fidBenOtorgamiento;
        this.nomOtorgamiento = nomOtorgamiento;
        this.numLugarOtorgamiento = numLugarOtorgamiento;
        this.nomOtorgamiento1 = nomOtorgamiento1;
        this.numLugarOtorgamiento1 = numLugarOtorgamiento1;
        this.transmisionReversion = transmisionReversion;
        this.parcialTotal = parcialTotal;
        this.sujetoRegimen = sujetoRegimen;
        this.tipoInmueble = tipoInmueble;
        this.nomEnvio = nomEnvio;
        this.emailEnvio = emailEnvio;
        this.fecFirma = fecFirma; //Formato Date
        this.delegado = delegado;
    }

    public static fromObject(obj: any, index: number): IndividuaResultRow {
        return {
            id: index,
            idFideicomiso: obj.funiIdFideicomiso,
            idSubcuenta: obj.funiIdSubcuenta,
            idBien: obj.funiIdBien,
            idEdificio: obj.funiIdEdificio,
            idDepto: obj.funiIdDepto,
            precio: obj.funiPrecio,
            moneda: obj.funiMoneda,
            notario: obj.funiNotario,
            localidadNota: obj.funiLocalidadNota,
            numEscritura: obj.funiNumEscritura,
            folioReal: obj.funiFolioReal,
            fechaTrasladoDominio: obj.funiFechaTrasladoDominio,
            status: obj.funiStatus,
            notario2: obj.fplNotario,
            adquiriente: obj.fplAdquiriente,
            tercero: obj.fplTercero,
            observacion: obj.fplObservacion,
            escritura: obj.fplEscritura,
            fecEscritura: obj.fplFecEscritura,
            fideicomBenefici: obj.fplFideicomBenefici,
            nomPersona: obj.fplNomPersona,
            numLugar: obj.fplNumLugar,
            nomPersona1: obj.fplNomPersona1,
            numLugar1: obj.fplNumLugar1,
            fidBenSaneamiento: obj.fplFidBensaneamiento,
            nomSaneamiento: obj.fplNomSaneamiento,
            numLugarSaneamiento: obj.fplNumLugarSaneamiento,
            nomSaneamiento1: obj.fplNomSaneamiento1,
            numLugarSaneamiento1: obj.fplNumLugarSaneamiento1,
            fidBenResponsabilidad: obj.fplFidBenResponsabilidad,
            nomResponsabilidad: obj.fplNomResponsabilidad,
            numLugarResponsabilidad: obj.fplNumLugarResponsabilidad,
            nomResponsabilidad1: obj.fplNomResponsabilidad1,
            numLugarResponsabilidad1: obj.fplNumLugarResponsabilidad1,
            fidBenOtorgamiento: obj.fplFidBenOtorgamiento,
            nomOtorgamiento: obj.fplNomOtorgamiento,
            numLugarOtorgamiento: obj.fplNumLugarOtorgamiento,
            nomOtorgamiento1: obj.fplNomOtorgamiento1,
            numLugarOtorgamiento1: obj.fplNumLugarOtorgamiento1,
            transmisionReversion: obj.fplTranmisionReversion,
            parcialTotal: obj.fplParcialTotal,
            sujetoRegimen: obj.fplSujetoRegimen,
            tipoInmueble: obj.fplTipoInmueble,
            nomEnvio: obj.fplNomEnvio,
            emailEnvio: obj.fplEmailEnvio,
            fecFirma: obj.fplFecFirma,
            delegado: obj.fplDelegado,
        };
    }
}
export default IndividuaResultRow;
