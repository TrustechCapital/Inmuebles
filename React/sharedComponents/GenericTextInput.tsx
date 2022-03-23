import React, { FunctionComponent } from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';

export type GenericInputProps = Pick<
    TextFieldProps,
    | 'defaultValue'
    | 'disabled'
    | 'helperText'
    | 'id'
    | 'name'
    | 'multiline'
    | 'placeholder'
    | 'required'
    | 'rows'
    | 'rowsMax'
    | 'size'
    | 'onChange'
    | 'error'
> & {
    label: string;
    value: any;
    readOnly?: boolean;
    dataType?: 'text' | 'number' | 'money' | 'string';
    adornment?: string;
    fullWidth?: boolean;
};

const GenericTextInput: FunctionComponent<GenericInputProps> = ({
    label = 'Campo',
    value='valor',
    readOnly = false,
    dataType = 'text',
    fullWidth = true,
    adornment,
    defaultValue = '',
    ...textFieldProps
}) => {
    const inputProps = {
        readOnly: readOnly,
        startAdornment: adornment ? (
            <InputAdornment position="start">{adornment}</InputAdornment>
        ) : null,
    };
    
    /*const onChange = useCallback(
        (e: any) => {
            let value = e.target.value;
            if (textFieldProps.onChange) {   

                const newEventData = {
                    ...e,
                    target: {
                        ...e.target,
                        value: value,
                        name: textFieldProps.name
                    }
                }

                textFieldProps.onChange(newEventData);
            }
        },
        [textFieldProps.name, dataType]
    )*/
   // let valoresAceptados = /^[0-9]+$/;


    //let regex = new RegExp("^[a-zA-Z ]+$");
   // let regex = new RegExp("^[0-9]{1,3}$|^[0-9]{1,3}\.[0-9]{1,3}$");
    
    let solonumeros = 0;
    //let numeros="0123456789";

    let valueWithDefault = value; //String.fromCharCode(value) ;
    
    /*if(valueWithDefault!=='' || valueWithDefault!==null){
        for(let i=0; i<valueWithDefault.length-1; i++){
            if (regex.test(String.fromCharCode(valueWithDefault.charAt(i)))){
                solonumeros=1;
            }
        }    
    }*/
    console.log("tipo antes de if:"+dataType);   
    console.log("valor antes de if:"+valueWithDefault);    
    console.log("solonumeroscpd:"+solonumeros);    
    if(valueWithDefault==='' || valueWithDefault===null){
        valueWithDefault=defaultValue;
    }    
    return (
        <FormControl fullWidth>
            <TextField
                fullWidth={fullWidth}
                label={label}
                value={valueWithDefault}
                variant="outlined"
                InputProps={inputProps}
                type={dataType}
                {...textFieldProps}
            />
        </FormControl>
    );      
    /*
    if(dataType === 'money')    {
        if(regex.test(valueWithDefault)){
            if(valueWithDefault==='' || valueWithDefault===null){
                valueWithDefault=defaultValue;
            }
            console.log("valueWithDefault tipo money:"+valueWithDefault);
            try {
                if(valueWithDefault!==null&&valueWithDefault!==''&&valueWithDefault!==undefined){
                    if(dataType === 'money') {
                        valueWithDefault=valueWithDefault;//formatMoney(valueWithDefault);
                    } 
                }   
            } catch(e) {
                console.error("Money error" + e);
            }
        
            console.log("Valor antes de retorno:"+valueWithDefault);    
            console.log("tipo antes de retorno:"+dataType);    
        
            return (
                <FormControl fullWidth>
                    <TextField
                        fullWidth={fullWidth}
                        label={label}
                        value={valueWithDefault}
                        variant="outlined"
                        InputProps={inputProps}
                        type={dataType}
                        {...textFieldProps}
                    />
                </FormControl>
            );    
        }    else{
            return (
                <FormControl fullWidth>
                    <TextField
                        fullWidth={fullWidth}
                        label={label}
                        value={''}
                        variant="outlined"
                        InputProps={inputProps}
                        type={dataType}
                        {...textFieldProps}
                    />
                </FormControl>
            );        
        }
    }else if(dataType === 'text'){
        return (
            <FormControl fullWidth>
                <TextField
                    fullWidth={fullWidth}
                    label={label}
                    value={valueWithDefault}
                    variant="outlined"
                    InputProps={inputProps}
                    type={dataType}
                    {...textFieldProps}
                />
            </FormControl>
        );
    } 
    else{
        return (
            <FormControl fullWidth>
                <TextField
                    fullWidth={fullWidth}
                    label={label}
                    value={''}
                    variant="outlined"
                    InputProps={inputProps}
                    type={dataType}
                    {...textFieldProps}
                />
            </FormControl>
        );        
    }*/
};

export default GenericTextInput;
