import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        errorMessage: {
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.error.main,
            padding: theme.spacing(1.5),
        },
        errorMessageIcon: {
            marginRight: theme.spacing(0.5),
        },
    })
);

type ErrorMessageProps = {
    message: string | null
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
    message
}) => {
    const classes = useStyles();

    if (message == null){
        return null;
    }

    return (
        <div className={classes.errorMessage}>
            <ErrorOutlineIcon
                className={classes.errorMessageIcon}
            />
            {message}
        </div>
    );
};

export default ErrorMessage;