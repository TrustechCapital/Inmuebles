import React from 'react';

import { TabsLayout } from '../types';
import GenericTabs from '../sharedComponents/GenericTabs';
import MainEjecutor from '../modules/AperturaCierre/MainEjecutor';

const TABS: Array<TabsLayout> = [
    {
        label: 'Ejecución',
        component: MainEjecutor,
    },
];

export default function ModuloApertura() {
    return <GenericTabs tabs={TABS} />;
}
