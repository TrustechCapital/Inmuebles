import React, { useContext } from 'react';

import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import GetAppIcon from '@material-ui/icons/GetApp';
import { GenericTableCallbacksContext } from './context';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight: {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    },
    title: {
        flex: '1 1 100%',
    },
}));

export type ToolbarActionsProps = {
    multipleSelect: boolean;
    numSelected: number;
    onNew?: () => void;
    onDownload?: () => void;
};

const EnhancedTableToolbarActions: React.FC<ToolbarActionsProps> = ({
    multipleSelect,
    numSelected,
    ...props
}) => {
    const { onNew, onView, onModify, onDelete } = useContext(
        GenericTableCallbacksContext
    );

    const onNewHandler = props.onNew || onNew;
    const downloadHandler = props.onDownload;

    return (
        <React.Fragment>
            {numSelected > 0 ? (
                <Tooltip title="Eliminar">
                    <IconButton aria-label="eliminar" onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {numSelected == 1 ? (
                <Tooltip title="Modificar">
                    <IconButton aria-label="modificar" onClick={onModify}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {numSelected == 1 ? (
                <Tooltip title="Consultar">
                    <IconButton aria-label="consultar" onClick={onView}>
                        <FindInPageIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {!multipleSelect || numSelected == 0 ? (
                <Tooltip title="Nuevo">
                    <IconButton
                        aria-label="nuevo"
                        color="primary"
                        onClick={onNewHandler}
                    >
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            ) : null}
            <Tooltip title="Descargar como XLS">
                <IconButton
                    aria-label="descargar"
                    color="primary"
                    onClick={downloadHandler}
                >
                    <GetAppIcon />
                </IconButton>
            </Tooltip>
        </React.Fragment>
    );
};

type TableToolbarProps = {
    title: string;
    numSelected: number;
    multipleSelect: boolean;
    showActions: boolean;
    actionsComponent: any;
    onNew?: () => void;
    onDownload?: () => void;
};

const EnhancedTableToolbar: React.FC<TableToolbarProps> = ({
    title,
    numSelected,
    multipleSelect,
    showActions = true,
    actionsComponent,
    onNew,
    onDownload,
}) => {
    const classes = useStyles();
    const ToolbarActions = actionsComponent || EnhancedTableToolbarActions;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: multipleSelect && numSelected > 0,
            })}
        >
            {multipleSelect && numSelected > 0 ? (
                <Typography
                    className={classes.title}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} seleccionados
                </Typography>
            ) : (
                <Typography
                    className={classes.title}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {title}
                </Typography>
            )}

            {showActions === true ? (
                <ToolbarActions
                    multipleSelect={multipleSelect}
                    numSelected={numSelected}
                    onNew={onNew}
                    onDownload={onDownload}
                />
            ) : null}
        </Toolbar>
    );
};

export default EnhancedTableToolbar;
