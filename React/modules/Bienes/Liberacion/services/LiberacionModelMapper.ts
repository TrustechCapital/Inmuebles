import { IModelMapper } from '../../../../core/api';
import Liberacion from '../../../../models/Individualizacion';
import DateUtils from '../../../../utils/DateUtils';

class LiberacionModelMapper implements IModelMapper<Liberacion> {
    fromObject(data: any) {
        const [
            funiFechaUltimoAvaluo,
            funiFechaTrasladoDominio,
            funiFechaReversion,
        ] = DateUtils.toDates([
            data.funiFechaUltimoAvaluo,
            data.funiFechaTrasladoDominio,
            data.funiFechaReversion,
        ]);

        const liberacion = new Liberacion(
            data.funiIdFideicomiso,
            data.funiIdSubcuenta,
            data.funiIdBien,
            data.funiIdEdificio,
            data.funiIdDepto
        );
        Object.assign(liberacion, {
            tipo: data.funiTipo,
            niveles: data.funiNiveles,
            calleYNumero: data.funiCalleNum,
            nombreColonia: data.funiNomColonia,
            nombrePoblacion: data.funiNomPoblacion,
            codigoPostal: data.funiCodigoPostal,
            numeroEstado: data.funiNumEstado,
            numeroPais: data.funiNumPais,
            colindancias: data.funiColindancias,
            medidas: data.funiMedidas,
            precio: data.funiPrecio,
            ultimoAvaluo: data.funiUltimoAvaluo,
            fechaUltimoAvaluo: funiFechaUltimoAvaluo,
            moneda: data.funiMoneda,
            notario: data.funiNotario,
            localidadNotaria: data.funiLocalidadNota,
            numeroEscritura: data.funiNumEscritura,
            folioReal: data.funiFolioReal,
            fechaTrasladoDominio: funiFechaTrasladoDominio,
            status: data.funiStatus,
            estacionamiento1: data.funiEstacionamiento1,
            superficie1: data.funiSuperficie1,
            estacionamiento2: data.funiEstacionamiento2,
            superficie2: data.funiSuperficie2,
            estacionamiento3: data.funiEstacionamiento3,
            superficie3: data.funiSuperficie3,
            roofGarden: data.funiRoofGarden,
            roofSuperficie: data.funiRoofSuperficie,
            sotano: data.funiSotano,
            sotanoSuperficie: data.funiSotanoSuperficie,
            indiviso: data.funiIndiviso,
            precioCatastro: data.funiPrecioCatastro,
            acto1: data.funiActo1,
            acto2: data.funiActo2,
            acto3: data.funiActo3,
            acto4: data.funiActo4,
            fechaReversion: funiFechaReversion,
            cveGrahipo: data.funiCveGrahipo,
            numeroHipoteca: data.funiNumHipoteca,
            aFavor: data.funiAFavor,
        });
        return liberacion;
    }

    toObject(liberacion: Liberacion, pkOnly: boolean = false) {
        if (pkOnly) {
            return {
                funiIdFideicomiso: liberacion.idFideicomiso,
                funiIdSubcuenta: liberacion.idSubcuenta,
                funiIdBien: liberacion.idBien,
                funiIdEdificio: liberacion.idEdificio,
                funiIdDept: liberacion.idDepto,
            };
        }

        const [
            fechaUltimoAvaluo,
            fechaTrasladoDominio,
            fechaReversion,
        ] = DateUtils.fromDates([
            liberacion.fechaUltimoAvaluo,
            liberacion.fechaTrasladoDominio,
            liberacion.fechaReversion,
        ]);

        return {
            funiIdFideicomiso: liberacion.idFideicomiso,
            funiIdSubcuenta: liberacion.idSubcuenta,
            funiIdBien: liberacion.idBien,
            funiIdDepto: liberacion.idDepto,
            funiTipo: liberacion.tipo,
            funiNiveles: liberacion.niveles,
            funiCalleNum: liberacion.calleYNumero,
            funiNomColonia: liberacion.nombreColonia,
            funiNomPoblacion: liberacion.nombrePoblacion,
            funiCodigoPostal: liberacion.codigoPostal,
            funiNumEstado: liberacion.numeroEstado,
            funiNumPais: liberacion.numeroPais,
            funiColindancias: liberacion.colindancias,
            funiMedidas: liberacion.medidas,
            funiPrecio: liberacion.precio,
            funiUltimoAvaluo: liberacion.ultimoAvaluo,
            funiFechaUltimoAvaluo: fechaUltimoAvaluo,
            funiMoneda: liberacion.moneda,
            funiNotario: liberacion.notario,
            funiLocalidadNota: liberacion.localidadNotaria,
            funiNumEscritura: liberacion.numeroEscritura,
            funiFolioReal: liberacion.folioReal,
            funiFechaTrasladoDominio: fechaTrasladoDominio,
            funiStatus: liberacion.status,
            funiEstacionamiento1: liberacion.estacionamiento1,
            funiSuperficie1: liberacion.superficie1,
            funiEstacionamiento2: liberacion.estacionamiento2,
            funiSuperficie2: liberacion.superficie2,
            funiEstacionamiento3: liberacion.estacionamiento3,
            funiSuperficie3: liberacion.superficie3,
            funiRoofGarden: liberacion.roofGarden,
            funiRoofSuperficie: liberacion.roofSuperficie,
            funiSotano: liberacion.sotano,
            funiSotanoSuperficie: liberacion.sotanoSuperficie,
            funiIndiviso: liberacion.indiviso,
            funiPrecioCatastro: liberacion.precioCatastro,
            funiActo1: liberacion.acto1,
            funiActo2: liberacion.acto2,
            funiActo3: liberacion.acto3,
            funiActo4: liberacion.acto4,
            funiFechaReversion: fechaReversion,
            funiCveGrahipo: liberacion.cveGrahipo,
            funiNumHipoteca: liberacion.numeroHipoteca,
            funiAFavor: liberacion.aFavor,
        };
    }
}

export default new LiberacionModelMapper();
