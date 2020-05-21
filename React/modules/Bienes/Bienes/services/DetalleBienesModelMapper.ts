import { IModelMapper } from '../../../../core/api';
import DetalleBien from '../../../../models/DetalleBien';
import DateUtils from '../../../../utils/DateUtils';

class BienModelMapper implements IModelMapper<DetalleBien> {
    fromObject(data: any) {
        const [fechaUltimaValuacion, fechaVencimiento] = DateUtils.toDates([
            data.forsFecUltValua,
            data.forsFecVencimiento,
        ]);

        const model = new DetalleBien(
            data.fgrsIdFideicomiso,
            data.fgrsIdSubcuenta,
            data.forsCveTipoBien,
            data.forsIdGarantia,
            data.forsCveTipoGarantia
        );

        Object.assign(model, {
            identificacion: data.forsIdentificacion,
            descripcion: data.forsTextoDescrip,
            comentario: data.forsTexComentario,
            importeDelBien: data.forsImpBien,
            idMoneda: data.forsMoneda,
            idRevaluacion: data.forsCveRevalua,
            idClavePeriodicidadRevaluacion: data.forsCvePerValua,
            importeUltimaValuacion: data.forsImpUltValua,
            fechaUltimaValuacion: fechaUltimaValuacion,
            fechaVencimiento: fechaVencimiento,
            numeroEscritura: data.forsNumEscritura,
            numeroNotario: data.forsNumNotario,
            claveEstatus: data.forsCveStatus,
            idRegimen: data.forsRegimen,
        });
        return model;
    }

    toObject(model: DetalleBien, pkOnly: boolean = false) {
        if (pkOnly) {
            return {
                fgrsIdFideicomiso: model.idFideicomiso,
                fgrsIdSubcuenta: model.idSubcuenta,
                forsCveTipoBien: model.idTipoBien,
                forsIdGarantia: model.idDetalleBien,
                forsCveTipoGarantia: model.idTipoDetalleBien,
            };
        }

        const [fechaUltimaValuacion, fechaVencimiento] = DateUtils.fromDates([
            model.fechaUltimaValuacion,
            model.fechaVencimiento,
        ]);

        return {
            forsIdentificacion: model.identificacion,
            forsTextoDescrip: model.descripcion,
            forsTexComentario: model.comentario,
            forsImpBien: model.importeDelBien,
            forsMoneda: model.idMoneda,
            forsCveRevalua: model.idRevaluacion,
            forsCvePerValua: model.idClavePeriodicidadRevaluacion,
            forsImpUltValua: model.importeUltimaValuacion,
            forsFecUltValua: fechaUltimaValuacion,
            forsFecVencimiento: fechaVencimiento,
            forsNumEscritura: model.numeroEscritura,
            forsNumNotario: model.numeroNotario,
            forsCveStatus: model.claveEstatus,
            forsRegimen: model.idRegimen,
        };
    }
}

export default new BienModelMapper();
