import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';


import Layout from '../components/Layout';
import GenericTabPanel from '../components/commons/GenericTabPanel';
import MainEjecutor from '../components/AperturaCierre/MainEjecutor';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabsContentWrapper: {
    display: 'flex',
    justifyContent: 'center',
    width: '80%',
    '& > div' : {
        width: '100%'
    }
  }
}));

export default function ModuloApertura() {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Layout>
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    className={classes.tabs}
                >
                    <Tab label="Ejecución"/>
                </Tabs>
                <div className={classes.tabsContentWrapper}>
                    <GenericTabPanel value={value} index={0}>
                        <MainEjecutor/>
                    </GenericTabPanel>
                </div>
            </div>
        </Layout>
    );
};;