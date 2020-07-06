import { IModelMapper } from '../../../../core/api';
import Movimientos from '../../../../models/Movimientos';

class PolizaModelMapper implements IModelMapper<Movimientos> {
    fromObject(data: any) {
        const poliza = new Movimientos(
            data.movAnoMovto,
            data.movMesMovto,
            data.movDiaMovto,
            data.movNumContrato,
            data.movSubContrato,
            data.movFolioOpera,
            data.movNumModulo,
            data.movNumTransac
        );
        Object.assign(poliza, {
            numUsuario: data.movNumUsuario,
            descMovto: data.movDescMovto,
            hrTransac: data.movHrTransac,
            minTransac: data.movMinTransac,
            impMovto: data.movImpMovto,
            cveTipoMerca: data.movCveTipoMerca,
            numInstrume: data.movNumInstrume,
            numSecEmis: data.movNumSecEmis,
            numTitulos: data.movNumTitulos,
            cveImpreEdo: data.movCveImpreEdo,
            cveEntSal: data.movCveEntSal,
            anioAlta: data.movAnoAltaReg,
            mesAlta: data.movMesAltaReg,
            diaAlta: data.movDiaAltaReg,
            anioMod: data.movAnoUltMod,
            mesMod: data.movMesUltMod,
            diaMod: data.movDiaUltMod,
            cveStatusMovto: data.movCveStMovto,
            cveAcumEdcta: data.movCveAcumEdcta,
        });
        return poliza;
    }

    toObject(poliza: Movimientos, pkOnly: boolean = false) {
        if (pkOnly) {
            return {
                movAnoMovto: poliza.movAnoMovto,
                movMesMovto: poliza.movMesMovto,
                movDiaMovto: poliza.movDiaMovto,
                movNumContrato: poliza.movNumContrato,
                movSubContrato: poliza.movSubContrato,
                movFolioOpera: poliza.movFolioOpera,
                movNumModulo: poliza.movNumModulo,
                movNumTransac: poliza.movNumTransac,
            };
        }
        return {
            movAnoMovto: poliza.movAnoMovto,
            movMesMovto: poliza.movMesMovto,
            movDiaMovto: poliza.movDiaMovto,
            movNumContrato: poliza.movNumContrato,
            movSubContrato: poliza.movSubContrato,
            movFolioOpera: poliza.movFolioOpera,
            movNumModulo: poliza.movNumModulo,
            movNumTransac: poliza.movNumTransac,
            movNumUsuario: poliza.movNumUsuario,
            movDescMovto: poliza.movDescMovto,
            movHrTransac: poliza.movHrTransac,
            movMinTransac: poliza.movMinTransac,
            movImpMovto: poliza.movImpMovto,
            movCveTipoMerca: poliza.movCveTipoMerca,
            movNumInstrume: poliza.movNumInstrume,
            movNumSecEmis: poliza.movNumSecEmis,
            movNumTitulos: poliza.movNumTitulos,
            movCveImpreEdo: poliza.movCveImpreEdo,
            movCveEntSal: poliza.movCveEntSal,
            movAnoAltaReg: poliza.movAnoAltaReg,
            movMesAltaReg: poliza.movMesAltaReg,
            movDiaAltaReg: poliza.movDiaAltaReg,
            movAnoUltMod: poliza.movAnoUltMod,
            movMesUltMod: poliza.movMesUltMod,
            movDiaUltMod: poliza.movDiaUltMod,
            movCveStMovto: poliza.movCveStMovto,
            movCveAcumEdcta: poliza.movCveAcumEdcta,
        };
    }
}

export default new PolizaModelMapper();
