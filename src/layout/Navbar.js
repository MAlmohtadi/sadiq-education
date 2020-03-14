import React from 'react'
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBar:{
        backgroundColor: '#006064'
    }

}));

const Navbar = () => {
    const classes = useStyles();
    return (<AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <Typography variant="h6" className={classes.title}>SADIQ DIAB</Typography>
            <Button color="inherit">Welcome</Button>
        </Toolbar>
    </AppBar>)
}
export default Navbar; 