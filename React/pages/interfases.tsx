import MainPolizaContable from '../modules/Interfases/PolizaContable/MainPolizaContable';
import { INTERFASES_MODULE } from '../constants/moduleMappings';
import ModuleTabs from '../sharedComponents/ModuleTabs';

const TABS = [
    {
        key: INTERFASES_MODULE.INTERFASES,
        label: 'Poliza Contable',
        component: MainPolizaContable,
    },
];

export default function () {
    return <ModuleTabs tabs={TABS} />;
}
