import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { ITableBienesParameters } from './types';
import { useSearchParamsReducer } from '../../../sharedHooks/tableSearch';
import { ClavesModuloBienes } from '../../../constants/bienes';
import BienResultRow from './models/BienResultRow';
import GenericSearchForm from '../../../sharedComponents/GenericSearchForm';
import GenericTable, {
    IGenericTableColumn,
} from '../../../sharedComponents/GenericTable';
import GenericTextInput from '../../../sharedComponents/GenericTextInput';
import CatalogSelect from '../../../sharedComponents/CatalogSelect';

const COLUMNS: IGenericTableColumn<BienResultRow>[] = [
    { field: 'idFideicomiso', header: 'Fideicomiso' },
    { field: 'tipoBien', header: 'Tipo de Bien' },
    { field: 'importeBien', header: 'Importe Actualizado', numeric: true },
    {
        field: 'importeBienGarantizado',
        header: 'Importe',
        numeric: true,
    },
    { field: 'claveEstatus', header: 'Estatus' },
];

const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

const initialState: ITableBienesParameters = {
    idFideicomiso: null,
    idSubcuenta: null,
    idTipoBien: null,
};

type TableBienesProps = {
    data: BienResultRow[];
    onSearch: (parameters: ITableBienesParameters) => void;
};

const TableBienes: React.FC<TableBienesProps> = ({ data, onSearch }) => {
    const classes = useStyles();
    const [state, dispatch] = useSearchParamsReducer<ITableBienesParameters>(
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
                                    label="Id Subcuenta"
                                    value={state.idSubcuenta}
                                    dataType="number"
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'idSubcuenta',
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <CatalogSelect
                                    label="Tipo de bien"
                                    catalogId={ClavesModuloBienes.TiposDeBienes}
                                    value={state.idTipoBien}
                                    fullWidth
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'idTipoBien',
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
                    title="Bienes"
                    data={data}
                    columns={COLUMNS}
                    multipleSelect={false}
                />
            </Grid>
        </div>
    );
};

export default TableBienes;
