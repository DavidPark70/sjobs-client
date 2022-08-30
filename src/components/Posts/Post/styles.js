import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
    media: {
        height: 0,
        paddingTop: '56.25%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
    },
    border: {
        border: 'solid',
    },
    fullHeightCard: {
        height: '100%',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
    },
    overlay: {
        color: 'rgba(0, 0, 0, 0.54)',
        padding: '0 16px'
    },
    overlay2: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        color: 'white',
    },
    subtitle: {
        padding: '0 16px'
    },
    grid: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    title: {
        padding: '16px',
    },
    cardActions: {
        padding: '8px 16px 8px 16px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    cardAction: {
        display: 'block',
        textAlign: 'initial',
    },
});