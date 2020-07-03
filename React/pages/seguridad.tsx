import GenericTabs from '../sharedComponents/GenericTabs';
import MainUsuarios from '../modules/Seguridad/Usuarios/MainUsuarios';

const TABS = [
    {
        label: 'Usuarios',
        component: MainUsuarios,
    },
];

export default function () {
    return <GenericTabs tabs={TABS} />;
}
