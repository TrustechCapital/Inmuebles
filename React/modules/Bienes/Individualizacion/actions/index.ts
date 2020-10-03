import Individualizacion from "../../../../models/Individualizacion";
import { CrudActions } from "../../../../sharedComponents/CrudModule";
import IndividualizacionesResultRow from "../models/IndividualizacionesResultRow";
import { individualizacionesApi } from "../services";
import { ITableIndividualizacionesParameters } from "../types";

export default class IndividualizacionesActions extends CrudActions<
    Individualizacion,
    ITableIndividualizacionesParameters,
    IndividualizacionesResultRow,
    typeof individualizacionesApi
> {
    constructor() {
        super(individualizacionesApi);
    }

    async fetchFullModel(
        selectedRow: IndividualizacionesResultRow | null
    ): Promise<Individualizacion | null> {
        if (!selectedRow) {
            return null;
        }

        let fideicomiso = new Individualizacion(
            selectedRow.idFideicomiso,
            selectedRow.idSubcuenta,
            selectedRow.idBien,
            selectedRow.idEdificio,
            selectedRow.idDepto
        );

        return await individualizacionesApi.findByPK(fideicomiso);
    }
}