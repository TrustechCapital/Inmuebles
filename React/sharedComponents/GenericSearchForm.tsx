import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    heading: {
        marginLeft: '.5rem',
    },
    details: {
        alignItems: 'center',
    },
    searchButton: {
        marginLeft: '.5rem',
    },
});

type Props = {
    defaultExpanded?: boolean;
    onSearch: () => void;
    onClear: () => void;
};

const GenericSearchForm: FunctionComponent<Props> = ({
    children,
    onClear,
    onSearch,
    defaultExpanded = false,
}) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ExpansionPanel defaultExpanded={defaultExpanded} elevation={3}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        alignItems="center"
                    >
                        <SearchIcon fontSize="small" />
                        <Typography
                            variant="subtitle1"
                            className={classes.heading}
                        >
                            Parametros de busqueda
                        </Typography>
                    </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.details}>
                    {children}
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                    <Grid container justify="flex-end">
                        <Button
                            variant="contained"
                            startIcon={<ClearAllIcon />}
                            onClick={onClear}
                        >
                            Limpiar
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<SearchIcon />}
                            onClick={onSearch}
                            className={classes.searchButton}
                        >
                            Buscar
                        </Button>
                    </Grid>
                </ExpansionPanelActions>
            </ExpansionPanel>
        </div>
    );
};

export default GenericSearchForm;
