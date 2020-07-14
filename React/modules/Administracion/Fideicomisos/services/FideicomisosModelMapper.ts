import { IModelMapper } from '../../../../core/api';
import Fideicomiso from '../../../../models/Fideicomiso';

class FideicomisoModelMapper implements IModelMapper<Fideicomiso> {
    fromObject(data: any) {
        const fideicomiso = new Fideicomiso(
            data.ctoNumContrato,
            data.ctoNomContrato
        );

        Object.assign(fideicomiso, {
            claveEstatus: data.ctoCveStContrat,
        });
        return fideicomiso;
    }

    toObject(fideicomiso: Fideicomiso, pkOnly: boolean = false) {
        if (pkOnly) {
            return {
                ctoNumContrato: fideicomiso.id,
            };
        }

        return {
            ctoNumContrato: fideicomiso.id,
            ctoNomContrato: fideicomiso.nombre,
            ctoCveStContrat: fideicomiso.claveEstatus,
        };
    }
}

export default new FideicomisoModelMapper();
