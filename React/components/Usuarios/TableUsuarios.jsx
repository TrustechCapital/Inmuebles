import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import GenericSearchForm from  '../commons/GenericSearchForm';
import GenericTable from '../commons/GenericTable';

const COLUMNS = [
    { field: 'usuNumUsuario', header: 'No.', isKey: true},
    { field: 'usuNomUsuario', header: 'Nombre'},
    { field: 'usuNomUsuario', header: 'OID'},
    { field: 'usuPerfilInterno', header: 'Perfil'},
    { field: 'usuCveStUsuario', header: 'Estatus'}
];

const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2)
    } 
}));

export default function TableAdquirientes (props) {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={1} direction="column" className={classes.rowSpacing}>
                <GenericSearchForm>
                    <Grid container spacing={1} direction="column">
                        <Grid container className={classes.rowSpacing} spacing={4}>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="tipoBien">Nombre</InputLabel>
                                    <Select labelId="tipoBien" displayEmpty/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="paramIdFideicomiso" label="Usuario OID" fullWidth/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="tipoBien">Perfil</InputLabel>
                                    <Select labelId="tipoBien" displayEmpty/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="tipoBien">Estatus</InputLabel>
                                    <Select labelId="tipoBien" displayEmpty/>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </GenericSearchForm>
            </Grid>
            <Grid container spacing={1}>
                <GenericTable title='Adquirientes' data={[]} columns={COLUMNS} onSelect={props.onSelect} onNew={props.onNew}/>
            </Grid>
        </div>
    );
}