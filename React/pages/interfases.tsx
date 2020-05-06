import React from 'react';

import { TabsLayout } from '../components/types';
import GenericTabs from '../components/commons/GenericTabs';
import MainInterfases from '../components/Interfases/MainInterfases';

const TABS: Array<TabsLayout> = [
    {
        label: 'Interfases',
        component: MainInterfases,
    },
];

export default function ModuloApertura() {
    return <GenericTabs tabs={TABS} />;
}
