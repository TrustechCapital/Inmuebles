import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import Tooltip from '@material-ui/core/Tooltip';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

import GenericTable, {
    IGenericColumn,
    GenericToolbarActionsProps,
} from '../../../sharedComponents/GenericTable';
import DetalleBienResultRow from './models/DetalleBienResultRow';
import { DetalleBienesTableCallbacksContext } from './context';

const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

// TODO: Usar tipado fuerte en base a generico
const COLUMNS_DETALLE_BIENES: IGenericColumn[] = [
    { field: 'id', header: 'Id', isKey: true },
    { field: 'idFideicomiso', header: 'Fideicomiso' },
    { field: 'tipoBien', header: 'Clasificacion' },
    {
        field: 'importeUltimaValuacionFormateado',
        header: 'Importe Ult. Valuación',
        numeric: true,
    },
    { field: 'descripcion', header: 'Descripción' },
];

type ActionsDetalleBienes = GenericToolbarActionsProps;

const ActionsDetalleBienes: React.FC<ActionsDetalleBienes> = ({
    numSelected,
}) => {
    const { onNew, onView, onModify, onRevaluacion } = useContext(
        DetalleBienesTableCallbacksContext
    );

    return (
        <React.Fragment>
            {numSelected > 0 ? (
                <Tooltip title="Salida de bien">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {numSelected == 1 ? (
                <Tooltip title="Reevaluación">
                    <IconButton onClick={onRevaluacion}>
                        <MonetizationOnIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {numSelected == 1 ? (
                <Tooltip title="Modificar">
                    <IconButton onClick={onModify}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {numSelected == 1 ? (
                <Tooltip title="Consultar">
                    <IconButton onClick={onView}>
                        <FindInPageIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {numSelected === 0 ? (
                <Tooltip title="Registro de bien">
                    <IconButton onClick={onNew}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            ) : null}
        </React.Fragment>
    );
};

type Props = {
    data: DetalleBienResultRow[];
    showActionsHeader: boolean;
    onSelect: (selectedItems: DetalleBienResultRow[]) => void;
};

const TableDetalleBienes: React.FC<Props> = ({
    data,
    showActionsHeader,
    onSelect,
}) => {
    const classes = useStyles();

    return (
        <div>
            <Grid
                container
                spacing={1}
                direction="column"
                className={classes.rowSpacing}
            >
                <GenericTable
                    title="Detalle de bienes"
                    data={data}
                    columns={COLUMNS_DETALLE_BIENES}
                    showActionsHeader={showActionsHeader}
                    additionalActionsComponent={ActionsDetalleBienes}
                    onSelect={onSelect}
                />
            </Grid>
        </div>
    );
};

export default TableDetalleBienes;
