import useModulePermissions from '../sharedHooks/useModulePersmissions';
import GenericTabs from './GenericTabs';
import { Typography } from '@material-ui/core';

export type ModuleTab = {
    key: string;
    label: string;
    component: React.ReactType;
};

type ModuleTabsProps = {
    tabs: ModuleTab[];
};

export default function (props: ModuleTabsProps) {
    const [canView] = useModulePermissions();

    const visibleTabs = props.tabs.filter((tab) => {
        return canView(tab.key);
    });

    if (visibleTabs.length) {
        return <GenericTabs tabs={visibleTabs} />;
    } else {
        return <Typography>Accesso no autorizado</Typography>;
    }
}
