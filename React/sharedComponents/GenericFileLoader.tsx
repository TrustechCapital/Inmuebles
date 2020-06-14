import React, { useRef } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';

import AttachFileIcon from '@material-ui/icons/AttachFile';
import { SimplifiedOnChangeSignature } from '../types';
import FormHelperText from '@material-ui/core/FormHelperText';
import { humanFileSize } from '../utils/NumberUtils';

function fileToString(file: File) {
    const sizeInMb = humanFileSize(file.size);
    return `${file.name} (${sizeInMb})`;
}

export type GenericFileLoaderProps = Pick<HTMLInputElement, 'name'> &
    Pick<ButtonProps, 'color'> & {
        value: File;
        onChange: SimplifiedOnChangeSignature;
        error?: boolean;
        helperText?: string;
        disabled?: boolean;
    };

const GenericFileLoader: React.FC<GenericFileLoaderProps> = ({
    onChange,
    value,
    name,
    error,
    helperText,
    color = 'default',
}) => {
    const fileInput = useRef<HTMLInputElement>(null);
    const file = value;

    // IMPORTANTE: Esta funcion se utiliza para mantener consistentes los eventos
    // en el sistema (mismos de Material UI)
    function handleChange(e: any) {
        onChange({
            target: {
                value: e.target.files[0],
                name: name, // La propiedad nombre es ocupada por el componente FormDatePickerField
            },
        });
    }

    function handleClick() {
        if (fileInput.current) {
            fileInput.current.click();
        }
    }

    return (
        <>
            <input
                type="file"
                ref={fileInput}
                style={{ display: 'none' }}
                onChange={handleChange}
            />
            <Button
                variant="contained"
                color={color}
                startIcon={<AttachFileIcon />}
                onClick={handleClick}
            >
                {file ? fileToString(file) : 'Seleccione un archivo'}
            </Button>
            <FormHelperText error={error}>{helperText}</FormHelperText>
        </>
    );
};

export default GenericFileLoader;
