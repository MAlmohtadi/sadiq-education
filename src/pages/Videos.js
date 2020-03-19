import React, { useEffect } from 'react';
import {
    Grid, Paper, CircularProgress,
    Typography,
} from '@material-ui/core';
import { useHistory } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { getVideos, setCurrentVideo } from '../actions/courseActions';
import Lectures from '../components/Lectures';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.primary.dark,
        padding: theme.spacing(1),
        borderRadius: 5
    },
    paper: {
        textAlign: 'center',
        backgroundColor: theme.palette.primary.light,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    player: {
        minHeight: 540, maxHeight: '900px',
        backgroundColor: theme.palette.primary.secondary,
    },
    loader: {
        color: theme.palette.text.dark
    }

}));

const Container = props => <Grid container {...props} justify='center' spacing={2} />;
const Item = props => <Grid item {...props} />;

const Videos = (props) => {
    const classes = useStyles();
    let history = useHistory();
    const {
        history: {
            location: {
                state: { playlistId, title } = {}
            } = {}
        },
        course: { currentVideo, loading },
        getVideos } = props;

    if (!playlistId) {
        history.push({ pathname: '/courses' })
    }

    useEffect(() => {
        getVideos({ playlistId });
    }, [])

    return (
        <div className={classes.root}>
            <Container>
                <Item item xs={12} sm={12} md={10}  >
                    <Typography variant="h4" component="h2" color="secondary" style={{ textAlign: 'center' }}>
                        {title}
                    </Typography>
                </Item>

                <Item xs={9} sm={12} md={9} className={classes.player}>

                    <Paper className={classes.paper} elevation={5} >
                        {
                            loading ?
                                <CircularProgress size={80} className={classes.loader} color='secondary' /> :
                                <ReactPlayer url={`https://www.youtube.com/watch?v=${currentVideo.snippet.resourceId.videoId}`}
                                    controls width='100%' height='100%' />
                        }
                    </Paper>
                </Item>
                <Item xs={12} sm={12} md={3}>
                    <Lectures />
                </Item>
            </Container>
        </div>)
}

// <Box display="flex" justifyContent='space-around' justifyItems="space-around" >
// <Button color="secondary" size="large" onClick={() => { history.goBack() }}>السابق</Button>
// <Button color="secondary" size="large" onClick={() => { history.goBack() }}>التالي</Button>
// </Box>
const mapStateToProps = state => ({
    course: state.courseReducer
})
export default connect(mapStateToProps, { getVideos, setCurrentVideo })(Videos);