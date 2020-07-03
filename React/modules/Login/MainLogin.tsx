import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { Formik } from 'formik';
import { Typography, Button } from '@material-ui/core';
import GenericForm from '../../sharedComponents/Forms';
import LoginService from '../../services/LoginService';
import SessionService from '../../services/SessionService';

const useStyles = makeStyles((theme) => ({
    root: {
        flexFlow: 'column',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    paper: {
        width: '400px',
        height: '400px',
    },
    header: {
        padding: '1rem',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    body: {
        padding: theme.spacing(2),
        color: theme.palette.common.white,
        display: 'flex',
        flexFlow: 'column',
    },
    button: {
        marginTop: '1rem',
    },
}));

const { FormTextField } = new GenericForm();

const loginInfo = {
    username: '',
    password: '',
};

const Login = (props: { onLogin: () => void }) => {
    const classes = useStyles();

    async function handleLogin(loginData: typeof loginInfo) {
        try {
            const sessionInfo = await LoginService.login(loginData.username);
            SessionService.create(sessionInfo);
            props.onLogin();
        } catch (error) {}
    }

    return (
        <Formik initialValues={loginInfo} onSubmit={handleLogin}>
            {(props) => (
                <form className={classes.root} onSubmit={props.handleSubmit}>
                    <Paper elevation={3} square className={classes.paper}>
                        <Typography variant="h5" className={classes.header}>
                            Login
                        </Typography>
                        <div className={classes.body}>
                            <FormTextField name="username" label="Usuario" />
                            <FormTextField name="password" label="Contraseña" />
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                className={classes.button}
                            >
                                Entrar
                            </Button>
                        </div>
                    </Paper>
                </form>
            )}
        </Formik>
    );
};

export default Login;
