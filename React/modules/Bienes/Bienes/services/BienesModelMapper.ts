import { IModelMapper } from '../../../../core/api';
import Bien from '../../../../models/Bien';
import DateUtils from '../../../../utils/DateUtils';

class BienModelMapper implements IModelMapper<Bien> {
    fromObject(data: any) {
        const [
            fechaUltimaValuacion,
            fechaInicio,
            fechaFin,
        ] = DateUtils.toDates([
            data.fgarFecUltValua,
            data.fgarFecInicio,
            data.fgarFecFin,
        ]);

        const bien = new Bien(
            data.fgarIdFideicomiso,
            data.fgarIdSubcuenta,
            data.fgarCveGarantia
        );
        Object.assign(bien, {
            descripcion: data.fgarTexGarantia,
            comentario: data.fgarTexComentario,
            idClaveRevaluacion: data.fgarCveRevalua,
            importeDeGarantia: data.fgarImpGarantia,
            importeDelBien: data.fgarImpGarantizad,
            picnorado: data.fgarPjePicnorado, // TODO: revisar nombre correcto del campo
            importeUltimaValuacion: data.fgarImpUltValua,
            idClavePeriodicidadRevaluacion: data.fgarCvePerValua,
            fechaUltimaValuacion: fechaUltimaValuacion,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin,
            estatus: data.fgarCveStatus,
            esGarantia: Boolean(data.fgarEsGarantia),
            nombreFideicomiso: data.fgarNomFideicomiso,
        });
        return bien;
    }

    toObject(bien: Bien, pkOnly: boolean = false) {
        if (pkOnly) {
            return {
                fgarIdFideicomiso: bien.idFideicomiso,
                fgarIdSubcuenta: bien.idSubcuenta,
                fgarCveGarantia: bien.idTipoBien,
            };
        }

        const [
            fechaUltimaValuacion,
            fechaInicio,
            fechaFin,
        ] = DateUtils.fromDates([
            bien.fechaUltimaValuacion,
            bien.fechaInicio,
            bien.fechaFin,
        ]);

        return {
            fgarIdFideicomiso: bien.idFideicomiso,
            fgarIdSubcuenta: bien.idSubcuenta,
            fgarCveGarantia: bien.idTipoBien,
            fgarTexGarantia: bien.descripcion,
            fgarTexComentario: bien.comentario,
            fgarCveRevalua: bien.idClaveRevaluacion,
            fgarImpGarantia: bien.importeDeGarantia,
            fgarImpGarantizad: bien.importeDelBien,
            fgarPjePicnorado: bien.picnorado,
            fgarImpUltValua: bien.importeUltimaValuacion,
            fgarCvePerValua: bien.idClavePeriodicidadRevaluacion,
            fgarFecUltValua: fechaUltimaValuacion,
            fgarFecInicio: fechaInicio,
            fgarFecFin: fechaFin,
            fgarCveStatus: bien.estatus,
            fgarEsGarantia: bien.esGarantia ? 1 : 0,
            fgarNomFideicomiso : bien.nombreFideicomiso,
        };
    }
}

export default new BienModelMapper();
