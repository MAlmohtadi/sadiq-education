import React from 'react'
import { Typography, Box, AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {

        // position: 'absolute',
        // margin:0,
        // bottom: 0,
        // right: 0,
        // left:0
    },
    icon: {
        margin: theme.spacing(2)
    },
    appBar: {
        backgroundColor: theme.palette.primary.dark,
        bottom: 0,
        top: 'auto',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        color: theme.palette.secondary.dark,
    }
}));

const Footer = (props) => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appBar} >
            <Toolbar>
                <Typography variant="h6" component="h6" color="secondary">التواصل الاجتماعي</Typography>
                <Box >
                    <a className={classes.icon} href="https://www.facebook.com/sadeck.math/" target="_blink">
                        <i className="fa fab fa-facebook-square fa-2x" style={{ color: '#4167b2' }} />
                    </a>
                    <a className={classes.icon} href="https://www.youtube.com/channel/UCA6nCqN5wtga0-5o-jSUc3w" target="_blink">
                        <i className="fa fab fa-youtube fa-2x" style={{ color: 'red' }} />
                    </a>
                </Box>
            </Toolbar>
        </AppBar>
    )
}
export default Footer; 