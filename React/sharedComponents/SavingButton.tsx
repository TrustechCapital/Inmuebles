import React from 'react';

import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button, { ButtonProps } from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    })
);

type SavingButtonProps = Pick<ButtonProps, 'type' | 'startIcon'> & {
    loading: boolean;
    success: boolean;
    disabled: boolean;
    onClick?: () => void;
};

const SavingButton: React.FC<SavingButtonProps> = ({
    loading,
    success,
    disabled,
    onClick,
    children = 'Guardar',
    startIcon = <SaveIcon />,
    ...other
}) => {
    const classes = useStyles();

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    return (
        <div className={classes.wrapper}>
            <Button
                startIcon={success ? <CheckIcon /> : startIcon}
                variant="contained"
                color="primary"
                className={buttonClassname}
                disabled={loading || disabled}
                onClick={onClick}
                {...other}
            >
                {children}
            </Button>
            {loading && (
                <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                />
            )}
        </div>
    );
};

export default SavingButton;
