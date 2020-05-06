import React from 'react';

import { TabsLayout } from '../types';
import GenericTabs from '../sharedComponents/GenericTabs';
import MainBienes from '../modules/Bienes/MainBienes';

const TABS: Array<TabsLayout> = [
    {
        label: 'Bienes',
        component: MainBienes,
    },
];

export default function ModuloInmuebles() {
    return <GenericTabs tabs={TABS} />;
}
