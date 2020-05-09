import React, { FunctionComponent, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import GenericSearchForm from '../../../sharedComponents/GenericSearchForm';
import GenericTable from '../../../sharedComponents/GenericTable';
import GenericTextInput from '../../../sharedComponents/GenericTextInput';
import CatalogSelect from '../../../sharedComponents/CatalogSelect';

const COLUMNS = [
    { field: 'id', header: 'Id', isKey: true },
    { field: 'idFideicomiso', header: 'Fideicomiso' },
    { field: 'tipoBien', header: 'Tipo de Bien' },
    { field: 'importeBienFormateado', header: 'Importe', numeric: true },
    {
        field: 'importeBienGarantizadoYFormateado',
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

interface TableBienesState {
    idFideicomiso: number | null;
    idSubcuenta: string;
    idTipoBien: number | null;
}

const initialState: TableBienesState = {
    idFideicomiso: null,
    idSubcuenta: '',
    idTipoBien: null,
};

type TableBienesActions = {
    type: 'field';
    fieldName: string;
    value: string | number | null;
};

function searchParamsReducer(
    state: TableBienesState,
    action: TableBienesActions
) {
    switch (action.type) {
        case 'field':
            return {
                ...state,
                [action.fieldName]: action.value,
            };
        default:
            return state;
    }
}

type Props = {
    data: object[];
    onSelect: (value: number | null) => void;
    onNew: () => void;
    onSearch: (searchParams: any) => void;
};

const TableBienes: FunctionComponent<Props> = ({
    data,
    onSelect,
    onNew,
    onSearch,
}) => {
    const classes = useStyles();
    const [state, dispatch] = useReducer(searchParamsReducer, initialState);

    const handleSearch = () => {
        onSearch({
            params: state,
        });
    };

    const handleClearSearch = () => {};

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
                    onClear={handleClearSearch}
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
                                    catalogId={38}
                                    value={state.idTipoBien}
                                    fullWidth
                                    onChange={(value) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'idTipoBien',
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
                    title="Bienes"
                    data={data}
                    columns={COLUMNS}
                    onSelect={onSelect}
                    onNew={onNew}
                />
            </Grid>
        </div>
    );
};

export default TableBienes;
