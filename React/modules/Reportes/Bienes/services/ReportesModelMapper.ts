import { IModelMapper } from '../../../../core/api';
import Individualizacion from '../../../../models/Individualizacion';
import DateUtils from '../../../../utils/DateUtils';

class ReportesModelMapper implements IModelMapper<Individualizacion> {
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

        const individualizacion = new Individualizacion(
            data.funiIdFideicomiso,
            data.funiIdSubcuenta,
            data.funiIdBien,
            data.funiIdEdificio,
            data.funiIdDepto
        );
        Object.assign(individualizacion, {
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
        return individualizacion;
    }

    toObject(individualizacion: Individualizacion, pkOnly: boolean = false) {
        if (pkOnly) {
            return {
                funiIdFideicomiso: individualizacion.idFideicomiso,
                funiIdSubcuenta: individualizacion.idSubcuenta,
                funiIdBien: individualizacion.idBien,
                funiIdEdificio: individualizacion.idEdificio,
                funiIdDept: individualizacion.idDepto,
            };
        }

        const [
            fechaUltimoAvaluo,
            fechaTrasladoDominio,
            fechaReversion,
        ] = DateUtils.fromDates([
            individualizacion.fechaUltimoAvaluo,
            individualizacion.fechaTrasladoDominio,
            individualizacion.fechaReversion,
        ]);

        return {
            funiIdFideicomiso: individualizacion.idFideicomiso,
            funiIdSubcuenta: individualizacion.idSubcuenta,
            funiIdBien: individualizacion.idBien,
            funiIdDepto: individualizacion.idDepto,
            funiTipo: individualizacion.tipo,
            funiNiveles: individualizacion.niveles,
            funiCalleNum: individualizacion.calleYNumero,
            funiNomColonia: individualizacion.nombreColonia,
            funiNomPoblacion: individualizacion.nombrePoblacion,
            funiCodigoPostal: individualizacion.codigoPostal,
            funiNumEstado: individualizacion.numeroEstado,
            funiNumPais: individualizacion.numeroPais,
            funiColindancias: individualizacion.colindancias,
            funiMedidas: individualizacion.medidas,
            funiPrecio: individualizacion.precio,
            funiUltimoAvaluo: individualizacion.ultimoAvaluo,
            funiFechaUltimoAvaluo: fechaUltimoAvaluo,
            funiMoneda: individualizacion.moneda,
            funiNotario: individualizacion.notario,
            funiLocalidadNota: individualizacion.localidadNotaria,
            funiNumEscritura: individualizacion.numeroEscritura,
            funiFolioReal: individualizacion.folioReal,
            funiFechaTrasladoDominio: fechaTrasladoDominio,
            funiStatus: individualizacion.status,
            funiEstacionamiento1: individualizacion.estacionamiento1,
            funiSuperficie1: individualizacion.superficie1,
            funiEstacionamiento2: individualizacion.estacionamiento2,
            funiSuperficie2: individualizacion.superficie2,
            funiEstacionamiento3: individualizacion.estacionamiento3,
            funiSuperficie3: individualizacion.superficie3,
            funiRoofGarden: individualizacion.roofGarden,
            funiRoofSuperficie: individualizacion.roofSuperficie,
            funiSotano: individualizacion.sotano,
            funiSotanoSuperficie: individualizacion.sotanoSuperficie,
            funiIndiviso: individualizacion.indiviso,
            funiPrecioCatastro: individualizacion.precioCatastro,
            funiActo1: individualizacion.acto1,
            funiActo2: individualizacion.acto2,
            funiActo3: individualizacion.acto3,
            funiActo4: individualizacion.acto4,
            funiFechaReversion: fechaReversion,
            funiCveGrahipo: individualizacion.cveGrahipo,
            funiNumHipoteca: individualizacion.numeroHipoteca,
            funiAFavor: individualizacion.aFavor,
        };
    }
}

export default new ReportesModelMapper();
