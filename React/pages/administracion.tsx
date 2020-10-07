//import MainFideicomisos from '../modules/Administracion/Fideicomisos/MainFideicomisos';
import ModuleTabs from '../sharedComponents/ModuleTabs';
import { ADMINISTRACION_MODULE } from '../constants/moduleMappings';
import MainFideicomisos from '../modules/Administracion/Fideicomisos/MainFideicomisos';

const TABS = [
    {
        key: ADMINISTRACION_MODULE.FIDEICOMISOS,
        label: 'Fideicomisos',
        component: MainFideicomisos,
    },
];

export default function ModuleAdministracion() {
    return <ModuleTabs tabs={TABS} />;
}
