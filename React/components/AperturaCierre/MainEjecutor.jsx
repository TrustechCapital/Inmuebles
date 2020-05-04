import React,{useState} from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import GenericSelect from '../commons/GenericSelect';

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
    const [state, setState] = React.useState({
        plan: '',
    });
    const handleChange = (event) => {
        const name = event.target.name;
        setState({
        ...state,
        [name]: event.target.value,
        });
    };

    return(
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Grid container spacing={1} direction="column">
                    <Grid container className={classes.rowSpacing} spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="div">
                                Ejecutor de Planes
                            </Typography>
                        </Grid>
                    </Grid> 
                    <Grid container className={classes.rowSpacing} direction="column" spacing={4} justify="center" alignItems="center">
                        <Grid item xs={3}>
                            <GenericSelect label='Plan' labelId='Plan' selectId='cmbPlanes' selected={state.plan} onChange={handleChange}  />
                        </Grid>
                    </Grid>
                    <Grid container justify="flex-end">
                        <Button variant="contained" color="primary" >Aceptar</Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
