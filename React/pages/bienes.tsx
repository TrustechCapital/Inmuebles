import GenericTabs from '../sharedComponents/GenericTabs';
import MainAdquirientes from '../modules/Bienes/Adquirientes/MainAdquirientes';
import MainLiberacion from '../modules/Bienes/Liberacion/MainLiberacion';
import MainIndividualizacion from '../modules/Bienes/Individualizacion/MainIndividualizacion';
import MainCargaMasiva from '../modules/Bienes/CargaMasivaInmuebles/MainCargaMasiva';
import MainBienes from '../modules/Bienes/Bienes/MainBienes';

const TABS = [
    {
        label: 'Bienes',
        component: MainBienes,
    },
    {
        label: 'Carga Masiva de Bienes',
        component: MainCargaMasiva,
    },
    {
        label: 'Individualización de Bienes',
        component: MainIndividualizacion,
    },
    {
        label: 'Adquirientes',
        component: MainAdquirientes,
    },
    {
        label: 'Liberaciones',
        component: MainLiberacion,
    },
];

export default function ModuloApertura() {
    return <GenericTabs tabs={TABS} />;
}
