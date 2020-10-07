import MainLiberacion from '../modules/Bienes/Liberacion/MainLiberacion';
import MainIndividualizacion from '../modules/Bienes/Individualizacion/MainIndividualizacion';
import MainCargaMasiva from '../modules/Bienes/CargaMasivaInmuebles/MainCargaMasiva';
import MainBienes from '../modules/Bienes/Bienes/MainBienes';
import { BIENES_MODULE } from '../constants/moduleMappings';
import ModuleTabs from '../sharedComponents/ModuleTabs';

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
        label: 'Liberaciones',
        component: MainLiberacion,
    },
];

export default function ModuleBienes() {
    console.log('variable:', process.env.NEXT_PUBLIC_API_BASE_URL)
    return <ModuleTabs tabs={TABS} />;
}
