import React from 'react';

import { TabsLayout } from '../components/types';
import GenericTabs from '../components/commons/GenericTabs';
import MainBienes from '../components/Bienes/MainBienes';

const TABS: Array<TabsLayout> = [
    {
        label: 'Bienes',
        component: MainBienes,
    },
];

export default function ModuloInmuebles() {
    return <GenericTabs tabs={TABS} />;
}
