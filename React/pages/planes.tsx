import GenericTabs from '../sharedComponents/GenericTabs';
import MainAperturaCierre from '../modules/Planes/AperturaCierre/MainAperturaCierre';

const TABS = [
    {
        label: 'Apertura/Cierre',
        component: MainAperturaCierre,
    },
];

export default function () {
    return <GenericTabs tabs={TABS} />;
}
