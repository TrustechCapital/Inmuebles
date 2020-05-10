import React from 'react';
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
} from '../../../sharedComponents/GenericTable';
import DetalleBienResultRow from './models/DetalleBienResultRow';

const useStyles = makeStyles((theme) => ({
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
}));

const COLUMNS_DETALLE_BIENES: IGenericColumn[] = [
    { field: 'id', header: 'Id', isKey: true },
    { field: 'fgrsIdFideicomiso', header: 'Fideicomiso' },
    { field: 'forsCveTipoBien', header: 'Clasificacion' },
    {
        field: 'forsImpUltValua',
        header: 'Importe Ult. Valuación',
        numeric: true,
    },
    { field: 'forsTextoDescrip', header: 'Descripción' },
];

type ActionsProps = {
    onNew: () => void;
};

const ActionsDetalleBienes: React.FC<ActionsProps> = (props) => {
    const bienesSeleccionados = 1;

    return (
        <React.Fragment>
            {bienesSeleccionados > 0 ? (
                <Tooltip title="Salida de bien">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {bienesSeleccionados == 1 ? (
                <Tooltip title="Reevaluación">
                    <IconButton>
                        <MonetizationOnIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {bienesSeleccionados == 1 ? (
                <Tooltip title="Modificar">
                    <IconButton>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {bienesSeleccionados == 1 ? (
                <Tooltip title="Consultar">
                    <IconButton>
                        <FindInPageIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {bienesSeleccionados == 1 ? (
                <Tooltip title="Registro de bien">
                    <IconButton onClick={props.onNew}>
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
    onNew: () => void;
    onSelect: (selectedItems: DetalleBienResultRow[]) => void;
};

const TableDetalleBienes: React.FC<Props> = ({
    data,
    showActionsHeader,
    onNew,
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
                    onNew={onNew}
                    onSelect={onSelect}
                    additionalActionsComponent={ActionsDetalleBienes}
                />
            </Grid>
        </div>
    );
};

export default TableDetalleBienes;
