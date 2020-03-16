import React from 'react'
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";


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
    appBar: {
        backgroundColor: theme.palette.primary.dark,
        // backgroundColor: '#006064'
    }

}));

const Navbar = (props) => {
    const classes = useStyles();
    let history = useHistory();

    return (<AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <Typography variant="h6" className={classes.title}>SADIQ DIAB</Typography>
            <Button color="inherit" onClick={() => { history.push({ pathname: '/' }) }}>الرئيسية</Button>
            <Button color="inherit" onClick={() => { history.push({ pathname: '/courses' }) }}>المواد</Button>
        </Toolbar>
    </AppBar>)
}
export default Navbar; 