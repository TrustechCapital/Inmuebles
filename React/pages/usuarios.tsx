import React from 'react';

import { TabsLayout } from '../components/types';
import GenericTabs from '../components/commons/GenericTabs';
import MainUsuarios from '../components/Usuarios/MainUsuarios';

const TABS: Array<TabsLayout> = [
    {
        label: 'Usuarios',
        component: MainUsuarios,
    },
];

export default function ModuloApertura() {
    return <GenericTabs tabs={TABS} />;
}
