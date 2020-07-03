import MainReportesBienes from '../modules/Reportes/Bienes/MainReportesBienes';
import ModuleTabs from '../sharedComponents/ModuleTabs';
import { REPORTES_MODULE } from '../constants/moduleMappings';

const TABS = [
    {
        key: REPORTES_MODULE.REPORTE_BIENES,
        label: 'Reporte Bienes',
        component: MainReportesBienes,
    },
];

export default function () {
    return <ModuleTabs tabs={TABS} />;
}
