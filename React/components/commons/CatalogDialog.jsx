import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {OPERACIONES_CATALOGO} from '../../constantes.js';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    }
}));
const Transition=React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function getTitle(operacionCatalogo, nombreCatalogo){
    switch(operacionCatalogo){
        case OPERACIONES_CATALOGO.ALTA:
            return `Alta de ${nombreCatalogo}`;
        case OPERACIONES_CATALOGO.MODIFICACION:
            return `Modificación de ${nombreCatalogo}`;
        case OPERACIONES_CATALOGO.CONSULTA:
            return `Consulta de ${nombreCatalogo}`;
    }
}
function CatalogDialog(props){

    const {operacionCatalogo, nombreCatalogo, subtitle, onCancel, onAccept} = props;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(props.opened);
    }, [props])
    
    const classes = useStyles();

    let title = getTitle(operacionCatalogo, nombreCatalogo);
    
    return(
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        maxWidth='md'
        onClose={onCancel}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                {subtitle}
            </DialogContentText>
            <form className={classes.root} noValidate autoComplete="off">
                {props.children}
            </form>
        </DialogContent>
        <DialogActions>
            <Button onClick={onCancel} color="primary">
                Cancelar
            </Button>
            <Button onClick={onAccept} color="primary">
                Aceptar
            </Button>
        </DialogActions>
    </Dialog>
    );
}
CatalogDialog.propTypes = {
    operacionCatalogo: PropTypes.string.isRequired, 
    nombreCatalogo: PropTypes.string.isRequired, 
    subtitle: PropTypes.string.isRequired, 
    onCancel:PropTypes.func.isRequired, 
    onAccept: PropTypes.func.isRequired,
    opened: PropTypes.bool.isRequired,
    children: PropTypes.element.isRequired
};
export default CatalogDialog;