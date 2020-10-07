import MainUsuarios from '../modules/Seguridad/Usuarios/MainUsuarios';
import ModuleTabs from '../sharedComponents/ModuleTabs';
import { SEGURIDAD_MODULE } from '../constants/moduleMappings';

const TABS = [
    {
        key: SEGURIDAD_MODULE.USUARIOS,
        label: 'Usuarios',
        component: MainUsuarios,
    },
];

export default function ModuleSeguridad() {
    return <ModuleTabs tabs={TABS} />;
}
