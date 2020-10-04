import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { ITablePolizaParameters } from './types';
import { useSearchParamsReducer } from '../../../sharedHooks/tableSearch';
import PolizaResultRow from './models/PolizaResultRow';
import GenericSearchForm from '../../../sharedComponents/GenericSearchForm';
import GenericTable, {
    IGenericColumn,
} from '../../../sharedComponents/GenericTable';
import GenericTextInput from '../../../sharedComponents/GenericTextInput';

// TODO: Usar tipado fuerte en base a generico
const COLUMNS: IGenericColumn[] = [
    { field: 'id', header: 'Id', isKey: true },
    { field: 'fecha', header: 'Fecha' },
    { field: 'idFideicomiso', header: 'Num. Fideicomiso' },
    { field: 'nombreFideicomiso', header: 'Nom. Fideicomiso' },
    { field: 'descripcionMovimiento', header: 'Descripcion' },
    { field: 'numeroTransaccion', header: 'Num. transaccion' }
];
const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

const initialState: ITablePolizaParameters = {
    Anio: null,
    Mes: null,
    Dia: null,
};

type TableBienProps = {
    data: PolizaResultRow[];
    onSearch: (parameters: ITablePolizaParameters) => void;
};

const TebleReporteBienes: React.FC<TableBienProps> = ({ data, onSearch }) => {
    const classes = useStyles();
    const [state, dispatch] = useSearchParamsReducer<ITablePolizaParameters>(
        initialState
    );

    const handleSearch = () => {
        onSearch(state);
    };

    return (
        <div>
            <Grid
                container
                spacing={1}
                direction="column"
                className={classes.rowSpacing}
            >
                <GenericSearchForm
                    onSearch={handleSearch}
                    onClear={() =>
                        dispatch({
                            type: 'clear',
                            initialState: initialState,
                        })
                    }
                >
                    <Grid container spacing={1} direction="column">
                        <Grid
                            container
                            className={classes.rowSpacing}
                            spacing={4}
                        >
                            <Grid item xs={3}>
                                <GenericTextInput
                                    label="Dia"
                                    value={state.Dia}
                                    dataType="number"
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'Dia',
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <GenericTextInput
                                    label="Mes"
                                    value={state.Mes}
                                    dataType="number"
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'Mes',
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <GenericTextInput
                                    label="Año"
                                    value={state.Anio}
                                    dataType="number"
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'Anio',
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </GenericSearchForm>
            </Grid>
            <Grid container spacing={1}>
                <GenericTable
                    title="Poliza Contable"
                    data={data}
                    columns={COLUMNS}
                    multipleSelect={false}
                />
            </Grid>
        </div>
    );
};

export default TebleReporteBienes;
