import MainAperturaCierre from '../modules/Planes/AperturaCierre/MainAperturaCierre';
import ModuleTabs from '../sharedComponents/ModuleTabs';
import { PLANES_MODULE } from '../constants/moduleMappings';

const TABS = [
    {
        key: PLANES_MODULE.APERTURA_CIERRE,
        label: 'Apertura/Cierre',
        component: MainAperturaCierre,
    },
];

export default function () {
    return <ModuleTabs tabs={TABS} />;
}
