import clsx from 'clsx';

import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { DRAWER_WIDTH } from '../../constants/config';

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
}));

type AppBarProps = {
    menuOpened: boolean;
    onMenuOpen: () => void;
};

const AppBar: React.FC<AppBarProps> = ({ menuOpened, onMenuOpen }) => {
    const classes = useStyles();

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
                <IconButton edge="end" color="inherit">
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </MuiAppBar>
    );
};

export default AppBar;
