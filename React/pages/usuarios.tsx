import React from 'react';

import { TabsLayout } from '../types';
import GenericTabs from '../sharedComponents/GenericTabs';
import MainUsuarios from '../modules/Usuarios/MainUsuarios';

const TABS: Array<TabsLayout> = [
    {
        label: 'Usuarios',
        component: MainUsuarios,
    },
];

export default function ModuloApertura() {
    return <GenericTabs tabs={TABS} />;
}
