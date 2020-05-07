import React, { useState, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';

import GenericSearchForm from '../../sharedComponents/GenericSearchForm';
import GenericTable from '../../sharedComponents/GenericTable';
import GenericTextInput from '../../sharedComponents/GenericTextInput';

import FIXTURE_GARANTIAS from '../../fixtures/garantias';

const COLUMNS = [
    { field: 'id', header: 'Id', isKey: true },
    { field: 'idFideicomiso', header: 'Fideicomiso' },
    { field: 'claveGarantia', header: 'Tipo de Bien' },
    { field: 'importeGarantiaFormateado', header: 'Importe', numeric: true },
    {
        field: 'importeGarantiaGarantizadoYFormateado',
        header: 'Importe Garantizado',
        numeric: true,
    },
    { field: 'claveEstatus', header: 'Estatus' },
];

const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

function searchParamsReducer(state, action) {
    switch (action.type) {
        case 'change':
            return {
                ...state,
                [action.field]: action.value,
            };
    }
}

const initialState = {
    idFideicomiso: '',
    idSubcuenta: '',
    claveGarantia: '',
};

export default function TableGarantias(props) {
    const { data, onSelect, onNew, onSearch } = props;
    const classes = useStyles();
    const [state, dispatch] = useReducer(searchParamsReducer, initialState);

    const handleSearch = () => {
        onSearch({
            params: state,
        });
    };

    return (
        <div>
            <Grid
                container
                spacing={1}
                direction="column"
                className={classes.rowSpacing}
            >
                <GenericSearchForm onSearch={handleSearch}>
                    <Grid container spacing={1} direction="column">
                        <Grid
                            container
                            className={classes.rowSpacing}
                            spacing={4}
                        >
                            <Grid item xs={3}>
                                <GenericTextInput
                                    label="Id Fideicomiso"
                                    value={state.idFideicomiso}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'change',
                                            field: 'idFideicomiso',
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid container xs={9} alignItems="center">
                                <Container></Container>
                            </Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={2}>
                                <GenericTextInput
                                    label="Id Subcuenta"
                                    value={state.idSubcuenta}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'change',
                                            field: 'idSubcuenta',
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="tipoBien">
                                        Tipo de Bien
                                    </InputLabel>
                                    <Select labelId="tipoBien" displayEmpty>
                                        <MenuItem value=""></MenuItem>
                                        <MenuItem value={1}>Tipo 1</MenuItem>
                                        <MenuItem value={2}>Tipo 2</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                </GenericSearchForm>
            </Grid>
            <Grid container spacing={1}>
                <GenericTable
                    title="Garantias"
                    data={data}
                    columns={COLUMNS}
                    onSelect={onSelect}
                    onNew={onNew}
                />
            </Grid>
        </div>
    );
}
