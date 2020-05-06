import React from 'react';

import GenericTabs, { TabsLayout } from '../sharedComponents/GenericTabs';
import MainEjecutor from '../modules/AperturaCierre/MainEjecutor';

const TABS: TabsLayout[] = [
    {
        label: 'Ejecución',
        component: MainEjecutor,
    },
];

export default function ModuloApertura() {
    return <GenericTabs tabs={TABS} />;
}
