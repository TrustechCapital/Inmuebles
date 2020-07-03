import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { ITableUsuariosParameters } from './types';
import { useSearchParamsReducer } from '../../../sharedHooks/tableSearch';
import { ClavesModuloUsuarios } from '../../../constants/usuarios';
import UsuariosResultRow from './models/UsuariosResultRow';
import GenericSearchForm from '../../../sharedComponents/GenericSearchForm';
import GenericTable, {
    IGenericColumn,
} from '../../../sharedComponents/GenericTable';
import GenericTextInput from '../../../sharedComponents/GenericTextInput';
import CatalogSelect from '../../../sharedComponents/CatalogSelect';

// TODO: Usar tipado fuerte en base a generico
const COLUMNS: IGenericColumn[] = [
    { field: 'id', header: 'Id', isKey: true },
    { field: 'numeroUsuario', header: 'No.' },
    { field: 'nombrePersonalUsuario', header: 'Nombre' },
    { field: 'nombreUsuariosUsuario', header: 'OID' },
    { field: 'nombrePuesto', header: 'Perfil Cliente' },
    { field: 'claveStatusUsuario', header: 'Estatus' },
];

const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

const initialState: ITableUsuariosParameters = {
    nombreUsuario: null,
    numeroUsuario: null,
    perfilCliente: null,
    status: null,
};

type TableUsuariosProps = {
    data: UsuariosResultRow[];
    onSearch: (parameters: ITableUsuariosParameters) => void;
};

const TableUsuarios: React.FC<TableUsuariosProps> = ({ data, onSearch }) => {
    const classes = useStyles();
    const [state, dispatch] = useSearchParamsReducer<ITableUsuariosParameters>(
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
                                <CatalogSelect
                                    label="Nombre"
                                    catalogId={
                                        ClavesModuloUsuarios.TiposDeUsuario //TODO: LOS NOMBRES SE CARGAN DE BD
                                    }
                                    value={state.numeroUsuario}
                                    fullWidth
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'numeroUsuario',
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
                                    label="Usuario OID"
                                    value={state.nombreUsuario}
                                    dataType="text"
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'nombreUsuario',
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <CatalogSelect
                                    label="Perfil"
                                    catalogId={
                                        ClavesModuloUsuarios.TiposDeUsuario //TODO: LOS PERFILES SE CARGAN DE BD
                                    }
                                    value={state.perfilCliente}
                                    fullWidth
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'perfilCliente',
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
                                    catalogId={
                                        ClavesModuloUsuarios.StatusDeUsuario
                                    }
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
                    title="Usuarios"
                    data={data}
                    columns={COLUMNS}
                    multipleSelect={false}
                />
            </Grid>
        </div>
    );
};

export default TableUsuarios;
