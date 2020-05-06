import React from 'react';

import { TabsLayout } from '../types';
import GenericTabs from '../sharedComponents/GenericTabs';
import MainAdquirientes from '../modules/Adquirientes/MainAdquirientes';
import MainLiberacion from '../modules/Liberacion/MainLiberacion';
import MainIndividualizacion from '../modules/Individualizacion/MainIndividualizacion';
import MainCargaMasiva from '../modules/CargaMasivaInmuebles/MainCargaMasiva';

const TABS: Array<TabsLayout> = [
    {
        label: 'Individualización de Inmuebles',
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
    {
        label: 'Carga Masiva de Inmuebles',
        component: MainCargaMasiva,
    },
];

export default function ModuloApertura() {
    return <GenericTabs tabs={TABS} />;
}
