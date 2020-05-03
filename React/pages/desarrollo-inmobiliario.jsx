import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Layout from '../components/Layout';
import GenericTabPanel from '../components/commons/GenericTabPanel';
import MainAdquirientes from '../components/Adquirientes/MainAdquirientes';

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
    width: '80%'
  }
}));

export default function ModuloInmuebles() {
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
                    <Tab label="Individualización de Inmuebles"/>
                    <Tab label="Adquirientes"/>
                    <Tab label="Liberaciones"/>
                    <Tab label="Carga Masiva de Inmuebles"/>
                </Tabs>
                <div className={classes.tabsContentWrapper}>
                    <GenericTabPanel value={value} index={0}>
                        Individualización de Inmuebles
                    </GenericTabPanel>
                    <GenericTabPanel value={value} index={1}>
                        <MainAdquirientes/>
                    </GenericTabPanel>
                    <GenericTabPanel value={value} index={2}>
                        Liberaciones
                    </GenericTabPanel>
                    <GenericTabPanel value={value} index={3}>
                        Carga Masiva de Inmuebles
                    </GenericTabPanel>
                </div>
            </div>
        </Layout>
    );
};;