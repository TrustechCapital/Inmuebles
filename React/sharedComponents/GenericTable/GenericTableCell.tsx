import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

export default withStyles((theme) => ({
    head: {
        backgroundColor: '#f5f5f5',
        fontWeight: theme.typography.fontWeightBold,
    },
}))(TableCell);
