import React, { ReactType, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    tabsContentWrapper: {
        display: 'flex',
        justifyContent: 'center',
        width: '80%',
        '& > div': {
            width: '100%',
        },
    },
}));

export type TabsLayout = {
    label: string;
    component: React.ReactType;
};

type Props = {
    tabs: Array<TabsLayout>;
};

const ModuloInmuebles = ({ tabs }: Props) => {
    const classes = useStyles();

    const [value, setValue] = useState(0);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    const tabLabels = tabs.map((tab: TabsLayout) => {
        return <Tab key={tab.label} label={tab.label} />;
    });

    const tabPanels = tabs.map((tab: TabsLayout, index: number) => {
        const Component: ReactType = tab.component;
        return (
            <div key={tab.label} role="tabpanel" hidden={value !== index}>
                {value === index && <Component />}
            </div>
        );
    });

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                className={classes.tabs}
            >
                {tabLabels}
            </Tabs>
            <div className={classes.tabsContentWrapper}>
                <Box p={3}>{tabPanels}</Box>
            </div>
        </div>
    );
};

export default ModuloInmuebles;
