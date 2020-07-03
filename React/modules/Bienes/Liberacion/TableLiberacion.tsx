import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { ITableLiberacionesParameters } from './types';
import { useSearchParamsReducer } from '../../../sharedHooks/tableSearch';
import { ClavesModuloBienes } from '../../../constants/bienes';
import LiberacionesResultRow from './models/LiberacionResultRow';
import GenericSearchForm from '../../../sharedComponents/GenericSearchForm';
import GenericTable, {
    IGenericColumn,
} from '../../../sharedComponents/GenericTable';
import GenericTextInput from '../../../sharedComponents/GenericTextInput';
import CatalogSelect from '../../../sharedComponents/CatalogSelect';

// TODO: Usar tipado fuerte en base a generico
const COLUMNS: IGenericColumn[] = [
    { field: 'id', header: 'Id', isKey: true },
    { field: 'idFideicomiso', header: 'Fideicomiso' },
    { field: 'idSubcuenta', header: 'Sub Fideicomiso' },
    { field: 'idBien', header: 'Num Inmueble' },
    { field: 'idEdificio', header: 'Edificio' },
    { field: 'idDepto', header: 'Num. Unidad' },
    { field: 'precio', header: 'Registro Contable' },
    { field: 'moneda', header: 'Moneda' },
    { field: 'status', header: 'Status' },
];

const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

const initialState: ITableLiberacionesParameters = {
    idFideicomiso: null,
    idDepto: '',
    status: '',
};

type TableBienesProps = {
    data: LiberacionesResultRow[];
    onSearch: (parameters: ITableLiberacionesParameters) => void;
};

const TableBienes: React.FC<TableBienesProps> = ({ data, onSearch }) => {
    const classes = useStyles();
    const [state, dispatch] = useSearchParamsReducer<
        ITableLiberacionesParameters
    >(initialState);

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
                                    label="Id Fideicomiso"
                                    value={state.idFideicomiso}
                                    dataType="number"
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'idFideicomiso',
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={9}>
                                <Grid container alignItems="center">
                                    <span></span>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={3}>
                                <GenericTextInput
                                    label="Num Unidad"
                                    value={state.idDepto}
                                    dataType="number"
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'idDepto',
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <CatalogSelect
                                    label="Status"
                                    catalogId={ClavesModuloBienes.Estatus}
                                    value={state.status}
                                    fullWidth
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'status',
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
                    title="Liberaciones"
                    data={data}
                    columns={COLUMNS}
                    multipleSelect={false}
                />
            </Grid>
        </div>
    );
};

export default TableBienes;
