import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { ITableFideicomisosParameters } from './types';
import { useSearchParamsReducer } from '../../../sharedHooks/tableSearch';
import FideicomisoResultRow from './models/FideicomisoResultRow';
import GenericSearchForm from '../../../sharedComponents/GenericSearchForm';
import GenericTable, {
    IGenericTableColumn,
} from '../../../sharedComponents/GenericTable';
import GenericTextInput from '../../../sharedComponents/GenericTextInput';

const COLUMNS: IGenericTableColumn<FideicomisoResultRow>[] = [
    { field: 'idFideicomiso', header: 'Id Fideicomiso', isKey: true },
    { field: 'nombreFideicomiso', header: 'Nombre' },
];

const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

const initialState: ITableFideicomisosParameters = {
    idFideicomiso: null,
    nombreFideicomiso: null,
};

type TableBienesProps = {
    data: FideicomisoResultRow[];
    onSearch: (parameters: ITableFideicomisosParameters) => void;
};

const TableBienes: React.FC<TableBienesProps> = ({ data, onSearch }) => {
    const classes = useStyles();
    const [state, dispatch] = useSearchParamsReducer<
        ITableFideicomisosParameters
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
                                <GenericTextInput
                                    label="Nombre Fideicomiso"
                                    value={state.nombreFideicomiso}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'nombreFideicomiso',
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
                    title="Fideicomisos"
                    data={data}
                    columns={COLUMNS}
                    multipleSelect={false}
                />
            </Grid>
        </div>
    );
};

export default TableBienes;
