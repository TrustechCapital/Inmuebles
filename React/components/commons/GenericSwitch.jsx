import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { deepOrange } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';


const OrangeSwitch = withStyles({
    switchBase: {
      color: deepOrange[300],
      '&$checked': {
        color: deepOrange[500],
      },
      '&$checked + $track': {
        backgroundColor: deepOrange[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

function GenericSwitch(props){
    const {idCampo, onChange, nombreCampo,label} = props;

    return(
        <FormControlLabel control={
            <OrangeSwitch checked={props.activo} onChange={onChange} name={nombreCampo} id={idCampo} />}
        label={label}/>
    );
}
GenericSwitch.propTypes = {
    idCampo: PropTypes.string.isRequired, 
    onChange: PropTypes.func.isRequired, 
    nombreCampo: PropTypes.string.isRequired, 
    activo: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired
};
export default GenericSwitch;