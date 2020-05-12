import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GenericSelect from '../../../sharedComponents/GenericSelect';
import GenericDatePicker from '../../../sharedComponents/GenericDatePicker';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '70%',
        margin: '0 auto',
    },
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
    },
}));

export default function MainCargaMasiva() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Grid container spacing={1} direction="column">
                    <Grid container className={classes.rowSpacing} spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="div">
                                Reporte de Bienes
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.rowSpacing} spacing={4}>
                        <Grid item xs={2} />
                        <Grid item xs={4}>
                            <GenericDatePicker
                                label="Fecha"
                                onChange={() => {}}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <GenericSelect
                                label="Tipo de Reporte"
                                labelId="Plan"
                                selectId="cmbPlanes"
                                onChange={() => {}}
                                value=""
                                items={[]}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-end">
                        <Button variant="contained" color="primary">
                            Generar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
