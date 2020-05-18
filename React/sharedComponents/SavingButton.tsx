import React from 'react';

import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
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

type SavingButtonProps = {
    loading: boolean;
    success: boolean;
    disabled: boolean;
    onClick: () => void;
};

const SavingButton: React.FC<SavingButtonProps> = ({
    loading,
    success,
    disabled,
    onClick,
}) => {
    const classes = useStyles();

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    return (
        <div className={classes.wrapper}>
            <Button
                startIcon={success ? <CheckIcon /> : <SaveIcon />}
                variant="contained"
                color="primary"
                className={buttonClassname}
                disabled={loading || disabled}
                onClick={onClick}
            >
                Guardar
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
