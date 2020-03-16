import React from 'react'
import { Grid, Paper, Typography, Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.dark,
    },
    icon: {
        margin: theme.spacing(2)
    }

}));

const Footer = (props) => {
    const classes = useStyles();
    // let history = useHistory();

    return (
        <Paper className={classes.root}>
            <Typography variant="h6" component="h6" color="secondary">التواصل الاجتماعي</Typography>
            <Box >
                <a className={classes.icon} classehref="https://www.facebook.com/sadeck.math/" target="_blink"><i className="fa fab fa-facebook-square fa-2x" style={{ color: '#4167b2' }} /></a>
                <a className={classes.icon} href="https://www.youtube.com/channel/UCA6nCqN5wtga0-5o-jSUc3w" target="_blink"><i className="fa fab fa-youtube fa-2x" style={{ color: 'red' }} /></a>
            </Box>
        </Paper>
    )
}
export default Footer; 