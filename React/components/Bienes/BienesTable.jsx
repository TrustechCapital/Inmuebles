import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';

import GenericSearchForm from  '../commons/GenericSearchForm';
import GenericTable from '../commons/GenericTable';
import FIXTURE_GARANTIAS from '../../fixtures/garantias';

const COLUMNS = [
    { field: 'fgarIdFideicomiso', header: 'Fideicomiso', isKey: true},
    { field: 'fgarCveGarantia2', header: 'Tipo de Bien'},
    { field: 'fgarImpGarantiaFormatted', header: 'Importe', numeric: true},
    { field: 'fgarImpGarantizadFormatted', header: 'Importe Garantizado', numeric: true},
    { field: 'fgarCveStatus', header: 'Estatus'}
];

const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2)
    } 
}));

export default function BienesTabla (props) {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={1} direction="column" className={classes.rowSpacing}>
                <GenericSearchForm>
                    <Grid container spacing={1} direction="column">
                        <Grid container className={classes.rowSpacing} spacing={4}>
                            <Grid item xs={3}>
                                <TextField id="paramIdFideicomiso" label="Id Fideicomiso" fullWidth/>
                            </Grid>
                            <Grid container xs={9} alignItems="center">
                                <Container></Container>
                            </Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={2}>
                                <TextField id="paramSubfiso" label="Id Subcuenta" fullWidth/>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="tipoBien">Tipo de Bien</InputLabel>
                                    <Select labelId="tipoBien" displayEmpty>
                                        <MenuItem value=""></MenuItem>
                                        <MenuItem value={1}>Tipo 1</MenuItem>
                                        <MenuItem value={2}>Tipo 2</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={7}>
                                <TextField id="paramDescripcion" label="Descripcion" fullWidth/>
                            </Grid>
                        </Grid>
                    </Grid>
                </GenericSearchForm>
            </Grid>
            <Grid container spacing={1}>
                <GenericTable title='Bienes' data={FIXTURE_GARANTIAS.data} columns={COLUMNS} onSelect={props.onSelect}/>
            </Grid>
        </div>
    );
}