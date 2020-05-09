import GenericTabs from '../sharedComponents/GenericTabs';
import MainEjecutor from '../modules/AperturaCierre/MainEjecutor';

const TABS = [
    {
        label: 'Ejecución',
        component: MainEjecutor,
    },
];

export default function ModuloApertura() {
    return <GenericTabs tabs={TABS} />;
}
