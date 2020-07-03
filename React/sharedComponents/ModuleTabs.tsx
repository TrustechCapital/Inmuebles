import useModulePermissions from '../sharedHooks/useModulePersmissions';
import GenericTabs from './GenericTabs';

type ModuleTab = {
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

    return <GenericTabs tabs={visibleTabs} />;
}
