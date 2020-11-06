import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { ITableIndividualizacionesParameters } from './types';
import { useSearchParamsReducer } from '../../../sharedHooks/tableSearch';
import { ClavesModuloBienes } from '../../../constants/bienes';
import IndividualizacionesResultRow from './models/IndividualizacionesResultRow';
import GenericSearchForm from '../../../sharedComponents/GenericSearchForm';
import GenericTable, {
    IGenericTableColumn,
} from '../../../sharedComponents/GenericTable';
import GenericTextInput from '../../../sharedComponents/GenericTextInput';
import CatalogSelect from '../../../sharedComponents/CatalogSelect';
import GenericSwitch from '../../../sharedComponents/GenericSwitch';
import GenericDatePicker from '../../../sharedComponents/GenericDatePicker';

const COLUMNS: IGenericTableColumn<IndividualizacionesResultRow>[] = [
    { field: 'idFideicomiso', header: 'Fideicomiso' },
    { field: 'cveGarantia', header: 'Id Bien' },
    { field: 'idBien', header: 'Id Detalle Bien' },
    { field: 'idEdificio', header: 'Edificio' },
    { field: 'idDepto', header: 'Num. Unidad' },
    { field: 'precio', header: 'Valor', numeric: true },
    { field: 'status', header: 'Estatus' },
];

const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

const initialState: ITableIndividualizacionesParameters = {
    idFideicomiso: null,
    idDepto: '',
    calleYNumero: '',
    status: '',
    numeroCatastro: null,
    estado: '',
    municipio: '',
    escriturado: false,
    fechaEscritura: null
};

type TableBienProps = {
    data: IndividualizacionesResultRow[];
    onSearch: (parameters: ITableIndividualizacionesParameters) => void;
};

const TableBien: React.FC<TableBienProps> = ({ data, onSearch }) => {
    const classes = useStyles();
    const [state, dispatch] = useSearchParamsReducer<
        ITableIndividualizacionesParameters
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
                                    label="Unidad/Departamento"
                                    value={state.idDepto}
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
                                <GenericTextInput
                                    label="Calle"
                                    value={state.calleYNumero}
                                    dataType="text"
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'calleYNumero',
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <CatalogSelect
                                    label="Estatus"
                                    catalogId={ClavesModuloBienes.Estatus}
                                    useLabelAsValue={true}
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
                        <Grid container spacing={4}>
                            <Grid item xs={3}>
                                <GenericTextInput
                                    label="Numero catastral"
                                    dataType="number"
                                    value={state.numeroCatastro}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'numeroCatastro',
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <GenericTextInput
                                    label="Estado"
                                    value={state.estado}
                                    dataType="text"
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'estado',
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <GenericTextInput
                                    label="Municipio/Poblacion"
                                    value={state.municipio}
                                    dataType="text"
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'municipio',
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={4}>
                            <Grid item xs={3}>
                                <GenericSwitch
                                    label="Transmitido?"
                                    checked={state.escriturado}
                                    onChange={(e, checked) => 
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'escriturado',
                                            value: checked,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <GenericDatePicker
                                    label="Fecha Transmisión"
                                    value={state.fechaEscritura}
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'fechaEscritura',
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
                    title="Individualizaciones"
                    data={data}
                    columns={COLUMNS}
                    multipleSelect={false}
                />
            </Grid>
        </div>
    );
};

export default TableBien;
