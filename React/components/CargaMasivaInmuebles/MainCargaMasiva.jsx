import React from 'react';

import { lighten, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '70%',
        margin: '0 auto'
    },
    rowSpacing: {
        marginBottom: theme.spacing(2)
    },
    dropZone: {
        border: '2px dashed blue',
        padding: '1rem',
        borderColor: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        cursor: 'pointer'
    },
    paper: {
        padding: theme.spacing(2)
    }
}));

export default function MainCargaMasiva() {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Grid container spacing={1} direction="column">
                    <Grid container className={classes.rowSpacing} spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="div">
                                Carga Masiva
                            </Typography>
                        </Grid>
                    </Grid> 
                    <Grid container className={classes.rowSpacing} spacing={4}>
                        <Grid item xs={4}>
                            <TextField id="paramIdFideicomiso" label="Num. Fideicomiso" fullWidth/>
                        </Grid>
                        <Grid item xs={8}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Tipo de carga</FormLabel>
                                <RadioGroup name="tipoCarga" value="individualizacion" row>
                                    <FormControlLabel value="individualizacion" control={<Radio />} label="Individualización Inmuebles" />
                                    <FormControlLabel value="liberacion" control={<Radio />} label="Liberación" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.rowSpacing} spacing={4}>
                        <Grid item xs={2}/>
                        <Grid item xs={8}>
                            <Box className={classes.dropZone}>
                                <Typography variant="body2" component="div">
                                    Arraste el archivo de carga o de click para seleccionar archivo
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-end">
                        <Button variant="contained" color="primary" disabled>Aplicar</Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
