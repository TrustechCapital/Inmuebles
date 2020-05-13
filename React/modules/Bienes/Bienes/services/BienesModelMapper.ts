import { IModelMapper } from '../../../../core/api';
import Bien from '../../../../models/Bien';

class BienModelMapper implements IModelMapper<Bien> {
    fromObject(data: any) {
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
            fechaUltimaValuacion: data.fgarFecUltValua,
            fechaInicio: data.fgarFecInicio,
            fechaFin: data.fgarFecFin,
            estatus: data.fgarCveStatus,
            esGarantia: data.fgarEsGarantia,
        });
        return bien;
    }

    toObject(bien: Bien) {
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
            fgarFecUltValua: bien.fechaUltimaValuacion,
            fgarFecInicio: bien.fechaInicio,
            fgarFecFin: bien.fechaFin,
            fgarCveStatus: bien.estatus,
            fgarEsGarantia: bien.esGarantia,
        };
    }
}

export default new BienModelMapper();
