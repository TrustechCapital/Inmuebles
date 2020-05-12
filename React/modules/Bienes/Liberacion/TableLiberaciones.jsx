import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import GenericSearchForm from '../../../sharedComponents/GenericSearchForm';
import GenericTable from '../../../sharedComponents/GenericTable';

const COLUMNS = [
    { field: 'fadqIdFideicomiso', header: 'Fideicomiso', isKey: true },
    { field: 'fadqIdSubcuenta', header: 'SubCuenta' },
    { field: 'fadqTipo', header: 'Bien' },
    { field: 'fadqIdBien', header: 'Adquiriente' },
    { field: 'fadqIdDepto', header: 'Notario' },
    { field: 'fadqIdVenta', header: 'Valor de la Operación' },
    { field: 'fadqSaldo', header: 'Estatus' },
];

const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

export default function TableGarantias(props) {
    const classes = useStyles();

    return (
        <div>
            <Grid
                container
                spacing={1}
                direction="column"
                className={classes.rowSpacing}
            >
                <GenericSearchForm>
                    <Grid container spacing={1} direction="column">
                        <Grid
                            container
                            className={classes.rowSpacing}
                            spacing={4}
                        >
                            <Grid item xs={4}>
                                <TextField
                                    id="paramIdFideicomiso"
                                    label="Num. Fideicomiso"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    id="paramIdFideicomiso"
                                    label="Num. Unidad"
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="tipoBien">
                                        Estatus
                                    </InputLabel>
                                    <Select labelId="tipoBien" displayEmpty />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </GenericSearchForm>
            </Grid>
            <Grid container spacing={1}>
                <GenericTable
                    title="Liberaciones"
                    data={[]}
                    columns={COLUMNS}
                    onSelect={props.onSelect}
                    onNew={props.onNew}
                />
            </Grid>
        </div>
    );
}
