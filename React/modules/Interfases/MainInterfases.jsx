import React, { useState } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import GenericDatePicker from '../../sharedComponents/GenericDatePicker';
import GenericTextInput from '../../sharedComponents/GenericTextInput';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '70%',
        margin: '0 auto',
    },
    rowSpacing: {
        marginBottom: theme.spacing(2),
    },
    dropZone: {
        border: '2px dashed blue',
        padding: '1rem',
        borderColor: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        cursor: 'pointer',
    },
    paper: {
        padding: theme.spacing(2),
    },
}));

export default function MainCargaMasiva() {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = useState(new Date('2020-04-20'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Grid container spacing={1} direction="column">
                    <Grid container className={classes.rowSpacing} spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="div">
                                Poliza Contable
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        className={classes.rowSpacing}
                        direction="column"
                        spacing={4}
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={3}>
                            <GenericDatePicker
                                idSelector="txtFechaValor"
                                labelSelector="Fecha Valor"
                                required={true}
                                selectedDate={selectedDate}
                                onChange={handleDateChange}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl component="fieldset">
                                <GenericTextInput
                                    label="Nombre de Archivo"
                                    idCampo="txtNomArch"
                                    required={true}
                                    value=""
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-end">
                        <Button variant="contained" color="primary" disabled>
                            Aceptar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
