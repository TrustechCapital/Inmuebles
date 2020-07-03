import GenericTabs from '../sharedComponents/GenericTabs';
import MainAdquirientes from '../modules/Bienes/Adquirientes/MainAdquirientes';
import MainLiberacion from '../modules/Bienes/Liberacion/MainLiberacion';
import MainIndividualizacion from '../modules/Bienes/Individualizacion/MainIndividualizacion';
import MainCargaMasiva from '../modules/Bienes/CargaMasivaInmuebles/MainCargaMasiva';
import MainBienes from '../modules/Bienes/Bienes/MainBienes';
import useModulePermissions from '../sharedHooks/useModulePersmissions';
import { BIENES_MODULE } from '../constants/moduleMappings';

const TABS = [
    {
        key: BIENES_MODULE.BIENES,
        label: 'Bienes',
        component: MainBienes,
    },
    {
        key: BIENES_MODULE.CARGA_MASIVA,
        label: 'Carga Masiva de Bienes',
        component: MainCargaMasiva,
    },
    {
        key: BIENES_MODULE.INDIVIDUALIZACION,
        label: 'Individualización de Bienes',
        component: MainIndividualizacion,
    },
    {
        key: BIENES_MODULE.ADQUIRIENTES,
        label: 'Adquirientes',
        component: MainAdquirientes,
    },
    {
        key: BIENES_MODULE.ADQUIRIENTES,
        label: 'Liberaciones',
        component: MainLiberacion,
    },
];

export default function ModuloApertura() {
    const [canView] = useModulePermissions();

    const tabs = TABS.filter((tab) => {
        return canView(tab.key);
    });

    return <GenericTabs tabs={tabs} />;
}
