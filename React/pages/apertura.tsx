import React from 'react';

import { TabsLayout } from '../components/types';
import GenericTabs from '../components/commons/GenericTabs';
import MainEjecutor from '../components/AperturaCierre/MainEjecutor';

const TABS: Array<TabsLayout> = [
    {
        label: 'Ejecución',
        component: MainEjecutor,
    },
];

export default function ModuloApertura() {
    return <GenericTabs tabs={TABS} />;
}
