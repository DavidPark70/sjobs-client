import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        maxWidth: '500px',
        marginBottom: '30px'
    },
    innerCard: {
        margin: '10px'
    },
    cardTitle: {
        marginBottom: '10px'
    }
});