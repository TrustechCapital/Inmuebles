import { Api } from '../../../../core/api';
import CargaMasivasBienes from '../models/CargaMasivaBienes';

const CARGAS_MASSIVAS_PROCESSOR =
    'mx.gob.nafin.fiduciario.business.upload.processors.CargaMasivaBienesImpl';

class CargaMasivaBienesApi extends Api {
    constructor() {
        super({});
    }

    async aplicaCargaMasiva(
        datosCargaMasiva: CargaMasivasBienes
    ): Promise<void> {
        const { file, ...other } = datosCargaMasiva;
        await this.uploadFilesWithProcessor(
            [file as File],
            CARGAS_MASSIVAS_PROCESSOR,
            other
        );
    }
}

export const cargaMasivaBienesApi = new CargaMasivaBienesApi();
