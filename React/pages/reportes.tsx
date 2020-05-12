import GenericTabs from '../sharedComponents/GenericTabs';
import MainReportesBienes from '../modules/Reportes/Bienes/MainReportesBienes';

const TABS = [
    {
        label: 'Reporte Bienes',
        component: MainReportesBienes,
    },
];

export default function ModuloApertura() {
    return <GenericTabs tabs={TABS} />;
}
