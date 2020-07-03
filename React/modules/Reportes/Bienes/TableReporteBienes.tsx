import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { ITableReportesParameters } from './types';
import { useSearchParamsReducer } from '../../../sharedHooks/tableSearch';
import IndividualizacionesResultRow from './models/ReportesResultRow';
import GenericSearchForm from '../../../sharedComponents/GenericSearchForm';
import { ClavesModuloBienes } from '../../../constants/bienes';
import GenericTable, {
    IGenericColumn,
} from '../../../sharedComponents/GenericTable';
import GenericSelect from '../../../sharedComponents/GenericSelect';
import { Button } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import GenericTextInput from '../../../sharedComponents/GenericTextInput';
import CatalogSelect from '../../../sharedComponents/CatalogSelect';

// TODO: Usar tipado fuerte en base a generico
const COLUMNS: IGenericColumn[] = [
    { field: 'id', header: 'Id', isKey: true },
    { field: 'idFideicomiso', header: 'Fideicomiso' },
    { field: 'nomFiso', header: 'Nombre Fideicomiso' },
    { field: 'descripInmueble', header: 'Descripcion' },
    { field: 'cveGarantia', header: 'Tipo' },
    { field: 'ultimoAvaluo', header: 'Valor' },
    { field: 'tipoValor', header: 'Tipo de Valor' },
    { field: 'moneda', header: 'Moneda' },
    { field: 'fechaAportacion', header: 'Fecha de Aportacion' },
    { field: 'numCatastro', header: '# Catastro' },
    { field: 'adquiriente', header: 'Aportante' },
    { field: 'estado', header: 'Estado' },
    { field: 'municipio', header: 'Municipio' },
    { field: 'status', header: 'Status' },
];
const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

const initialState: ITableReportesParameters = {
    idFideicomiso: null,
    cveGarantia: '',
    numCatastro: null,
    tipoInmueble: '',
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
                                <CatalogSelect
                                    label="Descripcion del Bien"
                                    catalogId={ClavesModuloBienes.TiposDeBienes}
                                    value={state.cveGarantia}
                                    fullWidth
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'cveGarantia',
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={4}>
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
                                    label="Tipo de bien"
                                    catalogId={ClavesModuloBienes.TiposDeBienes}
                                    value={state.tipoInmueble}
                                    fullWidth
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'tipoInmueble',
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={4}>
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
                        <Grid container spacing={4}>
                            <Grid item xs={3}>
                                <GenericSelect
                                    label="Tipo de Reporte"
                                    onChange={() => {}}
                                    value=""
                                    items={['Reporte de Bienes']}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justify="flex-end">
                            <Button
                                variant="contained"
                                startIcon={<GetAppIcon />}
                                onClick={handlePDF}
                            >
                                Descargar todos los resultados en formato PDF
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
