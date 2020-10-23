import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { ITableUsuariosParameters } from './types';
import { useSearchParamsReducer } from '../../../sharedHooks/tableSearch';
import { ClavesModuloUsuarios } from '../../../constants/usuarios';
import UsuariosResultRow from './models/UsuariosResultRow';
import GenericSearchForm from '../../../sharedComponents/GenericSearchForm';
import GenericTable, {
    IGenericTableColumn,
} from '../../../sharedComponents/GenericTable';
import GenericTextInput from '../../../sharedComponents/GenericTextInput';
import CatalogSelect from '../../../sharedComponents/CatalogSelect';

const COLUMNS: IGenericTableColumn<UsuariosResultRow>[] = [
    { field: 'idUsuario', header: 'Id' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'email', header: 'Correo' }
];

const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

const initialState: ITableUsuariosParameters = {
    nombreUsuario: null,
    idUsuario: null,
    idPerfil: null,
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
                            <Grid item xs={6}>
                                <GenericTextInput
                                    label="Nombre"
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
                            <Grid item xs={4}>
                                <GenericTextInput
                                    label="Usuario OID"
                                    value={state.idUsuario}
                                    dataType="text"
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'idUsuario',
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={4}>  
                            <Grid item xs={3}>
                                <CatalogSelect
                                    label="Perfil"
                                    catalogId={
                                        ClavesModuloUsuarios.TiposDeUsuario //TODO: LOS PERFILES SE CARGAN DE BD
                                    }
                                    value={state.idPerfil}
                                    fullWidth
                                    onChange={(e) =>
                                        dispatch({
                                            type: 'field',
                                            fieldName: 'idPerfil',
                                            value: e.target.value,
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <CatalogSelect
                                    label="Estatus"
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
