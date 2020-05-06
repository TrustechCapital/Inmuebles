import React from 'react';

import { TabsLayout } from '../components/types';
import GenericTabs from '../components/commons/GenericTabs';
import MainAdquirientes from '../components/Adquirientes/MainAdquirientes';
import MainLiberacion from '../components/Liberacion/MainLiberacion';
import MainIndividualizacion from '../components/Individualizacion/MainIndividualizacion';
import MainCargaMasiva from '../components/CargaMasivaInmuebles/MainCargaMasiva';

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
