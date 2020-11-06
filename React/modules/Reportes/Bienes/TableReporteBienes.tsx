import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { ITableReportesParameters } from './types';
import { useSearchParamsReducer } from '../../../sharedHooks/tableSearch';
import IndividualizacionesResultRow from './models/ReportesResultRow';
import GenericSearchForm from '../../../sharedComponents/GenericSearchForm';
import { ClavesModuloBienes } from '../../../constants/bienes';
import GenericTable, {
    IGenericTableColumn,
} from '../../../sharedComponents/GenericTable';
import { Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import GenericTextInput from '../../../sharedComponents/GenericTextInput';
import CatalogSelect from '../../../sharedComponents/CatalogSelect';
import ReportesResultRow from './models/ReportesResultRow';

const COLUMNS: IGenericTableColumn<ReportesResultRow>[] = [
    { field: 'idFideicomiso', header: 'Fideicomiso' },
    { field: 'nomFiso', header: 'Nombre Fideicomiso' },
    { field: 'descripInmueble', header: 'Descripcion' },
    { field: 'descripcionTipoBien', header: 'Tipo' },
    { field: 'ultimoAvaluo', header: 'Valor', numeric: true },
    { field: 'fechaAportacion', header: 'Fecha de Aportación' },
    { field: 'numCatastro', header: '# Catastro' },
    { field: 'adquiriente', header: 'Adquiriente' },
    { field: 'estado', header: 'Estado' },
    { field: 'municipio', header: 'Municipio' },
    { field: 'status', header: 'Estatus' },
];
const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

const initialState: ITableReportesParameters = {
    idFideicomiso: null,
    idTipoBien: null,
    numCatastro: null,
    status: '',
};

type TableBienProps = {
    data: IndividualizacionesResultRow[];
    onSearch: (parameters: ITableReportesParameters) => void;
    onPDF: (parameters: ITableReportesParameters) => void;
};

const TebleReporteBienes: React.FC<TableBienProps> = ({
    data,
    onSearch,
    onPDF,
}) => {
    const classes = useStyles();
    const [state, dispatch] = useSearchParamsReducer<ITableReportesParameters>(
        initialState
    );

    const handleSearch = () => {
        onSearch(state);
    };
    const handlePDF = () => {
        onPDF(state);
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
                                    label="Fideicomiso"
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
                            <Grid item xs={3}>
                                <GenericTextInput
                                    label="Numero de Catastro"
                                    value={state.numCatastro}
                                    dataType="number"
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'numCatastro',
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <CatalogSelect
                                    label="Estatus"
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
                        <Grid container justify="flex-end">
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<GetAppIcon />}
                                onClick={handlePDF}
                            >
                                Descargar en PDF
                            </Button>
                        </Grid>
                    </Grid>
                </GenericSearchForm>
            </Grid>
            <Grid container spacing={1}>
                <GenericTable
                    title="Reporte de Bienes"
                    data={data}
                    columns={COLUMNS}
                    multipleSelect={false}
                />
            </Grid>
        </div>
    );
};

export default TebleReporteBienes;
