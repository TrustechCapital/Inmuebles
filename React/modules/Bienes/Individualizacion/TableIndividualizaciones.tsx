import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { ITableIndivParameters } from './types';
import { useSearchParamsReducer } from '../../../sharedHooks/tableSearch';
import { ClavesModuloBienes } from '../../../constants/bienes';
import IndividuaResultRow from './models/IndividuaResultRow';
import GenericSearchForm from '../../../sharedComponents/GenericSearchForm';
import GenericTable from '../../../sharedComponents/GenericTable';
import GenericTextInput from '../../../sharedComponents/GenericTextInput';
import CatalogSelect from '../../../sharedComponents/CatalogSelect';

const COLUMNS = [
    { field: 'fadqIdFideicomiso', header: 'Fideicomiso', isKey: true },
    { field: 'fadqIdSubcuenta', header: 'SubFiso' },
    { field: 'fadqTipo', header: 'Id Garantía' },
    { field: 'fadqTipo', header: 'Id Bien' },
    { field: 'fadqIdBien', header: 'Edificio' },
    { field: 'fadqIdDepto', header: 'Num. unidad' },
    { field: 'fadqIdVenta', header: 'Registro Contable' },
    { field: 'fadqNombreComprador', header: 'Moneda' },
    { field: 'fadqSaldo', header: 'Estatus' },
];

const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

const initialState: ITableIndivParameters = {
    idFideicomiso: null,
    idUnidad: null,
    idStatus: null,
};

type Props = {
    data: object[];
    onSelect: (selectedItems: IndividuaResultRow[]) => void;
    onNew: () => void;
    onSearch: (searchParams: ITableIndivParameters) => void;
};

const TableIndividualizaciones: React.FC<Props> = ({
    data,
    onSelect,
    onNew,
    onSearch,
}) => {
    const classes = useStyles();
    const [state, dispatch] = useSearchParamsReducer<ITableIndivParameters>(
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
                                    onChange={(value) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'idFideicomiso',
                                            value: value,
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
                                    label="Número de unidad"
                                    value={state.idUnidad}
                                    onChange={(value) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'idUnidad',
                                            value: value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <CatalogSelect
                                    label="Status"
                                    catalogId={ClavesModuloBienes.Status}
                                    value={state.idStatus}
                                    fullWidth
                                    onChange={(value) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'idStatus',
                                            value: value,
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
                    title="Individualización de Inmuebles"
                    data={data}
                    columns={COLUMNS}
                    onSelect={onSelect}
                    onNew={onNew}
                />
            </Grid>
        </div>
    );
};
export default TableIndividualizaciones;
