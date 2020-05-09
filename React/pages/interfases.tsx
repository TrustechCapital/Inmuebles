import GenericTabs from '../sharedComponents/GenericTabs';
import MainInterfases from '../modules/Interfases/MainInterfases';

const TABS = [
    {
        label: 'Interfases',
        component: MainInterfases,
    },
];

export default function ModuloApertura() {
    return <GenericTabs tabs={TABS} />;
}
