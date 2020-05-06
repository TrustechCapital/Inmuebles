import React from 'react';

import { TabsLayout } from '../types';
import GenericTabs from '../sharedComponents/GenericTabs';
import MainInterfases from '../modules/Interfases/MainInterfases';

const TABS: Array<TabsLayout> = [
    {
        label: 'Interfases',
        component: MainInterfases,
    },
];

export default function ModuloApertura() {
    return <GenericTabs tabs={TABS} />;
}
