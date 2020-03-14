import React, { useEffect } from 'react';
import {
    Grid, Paper, CircularProgress,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { getVideos, loadMoreVideos } from '../actions/courseActions';
import Lectures from '../components/Lectures';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '100%',
    }
}));

const Container = props => <Grid container {...props} justify='center' spacing={2} />;
const Item = props => <Grid item {...props} />;

const Course = (props) => {
    const classes = useStyles();
    const {
        history: {
            location: {
                state: { playlistId, title }
            }
        },
        course: { currentVideo, loading, nextPageToken },
        getVideos, loadMoreVideos } = props;

    useEffect(() => {
        getVideos({ playlistId });
    }, [])


    const loadMore = () => {
        console.log('scroll')
        if (nextPageToken) {
            loadMoreVideos({ playlistId, nextPageToken });
        }

    }
    return (
        <div className={classes.root}>
            <Container>
                <Item item xs={12} sm={12} md={10} >
                    <Typography variant="h4" component="h2">
                        {title}
                    </Typography>
                </Item>
                <Item xs={12} sm={12} md={9} style={{ minHeight: '450px', maxHeight: '900px' }}>
                    <Paper className={classes.paper} elevation={5} >
                        {loading ?
                            <CircularProgress className={classes.loading} /> :
                            <ReactPlayer url={`https://www.youtube.com/watch?v=${currentVideo.snippet.resourceId.videoId}`}
                                controls width='100%' height='100%' />
                        }
                    </Paper>
                </Item>
                <Item xs={12} sm={12} md={3}>
                    <Lectures loadMore={loadMore} />
                </Item>
            </Container>
        </div>)
}

const mapStateToProps = state => ({
    course: state.courseReducer
})
export default connect(mapStateToProps, { getVideos, loadMoreVideos })(Course);