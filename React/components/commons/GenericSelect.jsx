import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function GenericSelect(props){
    const{labelId,selectId,selected,onChange,label}=props
    const classes = useStyles();

    return(
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
            labelId={labelId}
            id={selectId}
            value={selected}
            onChange={onChange}
            label={label}
            >
                <MenuItem value="">
                    <em>Seleccione uno</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
            </Select>
        </FormControl>
    );
}
GenericSelect.propTypes = {
    labelId: PropTypes.string.isRequired,
    selectId: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    items: PropTypes.object.isRequired
};
export default GenericSelect;