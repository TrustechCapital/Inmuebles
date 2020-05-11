import React from 'react';

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

type ToolbarActionsProps = {
    numSelected: number;
    onNew?: () => void;
    onView?: () => void;
};

const EnhancedTableToolbarActions: React.FC<ToolbarActionsProps> = ({
    numSelected,
    onNew,
    onView,
}) => {
    return (
        <React.Fragment>
            {numSelected > 0 ? (
                <Tooltip title="Eliminar">
                    <IconButton aria-label="eliminar">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : null}

            {numSelected == 1 ? (
                <Tooltip title="Modificar">
                    <IconButton aria-label="modificar">
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

            {numSelected == 0 ? (
                <Tooltip title="Nuevo">
                    <IconButton
                        aria-label="nuevo"
                        color="primary"
                        onClick={onNew}
                    >
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            ) : null}
        </React.Fragment>
    );
};

type TableToolbarProps = {
    title: string;
    numSelected: number;
    showActions: boolean;
    actionsComponent: any;
    toolbarActionsProps: any;
};

const EnhancedTableToolbar: React.FC<TableToolbarProps> = ({
    title,
    numSelected,
    showActions = true,
    actionsComponent,
    toolbarActionsProps = {},
}) => {
    const classes = useStyles();
    const ToolbarActions = actionsComponent || EnhancedTableToolbarActions;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
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
                    numSelected={numSelected}
                    {...toolbarActionsProps}
                />
            ) : null}
        </Toolbar>
    );
};

export default EnhancedTableToolbar;
