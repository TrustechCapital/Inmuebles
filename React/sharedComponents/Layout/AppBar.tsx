import clsx from 'clsx';

import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { DRAWER_WIDTH } from '../../constants/config';
import { SessionInfoContext } from '../../core/LoginContext';
import { useContext } from 'react';
import DateUtils, { ValidDateFormats } from '../../utils/DateUtils';

const useStyles = makeStyles((theme) => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${DRAWER_WIDTH})`,
        marginLeft: DRAWER_WIDTH,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    grow: {
        flexGrow: 1,
    },
    sessionInfoWrapper: {
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
    },
    sessionInfo: {
        display: 'flex',
        flexFlow: 'column',
    },
}));

type AppBarProps = {
    menuOpened: boolean;
    onMenuOpen: () => void;
};

const AppBar: React.FC<AppBarProps> = ({ menuOpened, onMenuOpen }) => {
    const sessionInfoContext = useContext(SessionInfoContext);
    const classes = useStyles();

    console.log(typeof sessionInfoContext.sessionInfo?.systemDate);

    const userName = sessionInfoContext.sessionInfo
        ? sessionInfoContext.sessionInfo.user.name
        : '';
    const systemDate = sessionInfoContext.sessionInfo
        ? DateUtils.changeFormat(
              sessionInfoContext.sessionInfo?.systemDate.toString(),
              ValidDateFormats.ISO,
              ValidDateFormats.Default
          )
        : '';

    return (
        <MuiAppBar
            position="static"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: menuOpened,
            })}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onMenuOpen}
                    edge="start"
                    className={clsx(
                        classes.menuButton,
                        menuOpened && classes.hide
                    )}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap className={classes.grow}>
                    Banregio
                </Typography>
                <div className={classes.sessionInfoWrapper}>
                    <Typography
                        variant="subtitle2"
                        className={classes.sessionInfo}
                    >
                        {userName}
                        <small>Fecha sistema: {systemDate}</small>
                    </Typography>
                    <IconButton color="inherit">
                        <ExitToAppIcon onClick={sessionInfoContext.onLogout} />
                    </IconButton>
                </div>
            </Toolbar>
        </MuiAppBar>
    );
};

export default AppBar;
