import React, { useEffect } from 'react';
import {
    Grid, Paper, CircularProgress, GridList,
    GridListTile, GridListTileBar, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { getVideos, setCurrentVideo } from '../actions/courseActions';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '100%',
    },
    videoListContainer: {
        padding: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        borderTop: '2px solid red',
        paddingTop: 10,
        marginTop: 20,
        height: 550,
    },
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
        course: { videos, currentVideo, loading },
        getVideos, setCurrentVideo } = props;

    useEffect(() => {
        getVideos({ playlistId });
    }, [])

    const handleClickOnVideo = (position) => {
        setCurrentVideo(position);
    }

    return (
        <div className={classes.root}>
            <Container>
                <Item item xs={12} sm={12} md={10} >
                    <Typography variant="h4" component="h2">
                        {title}
                    </Typography>
                </Item>
                <Item xs={12} sm={12} md={9} style={{ minHeight: '550px', maxHeight: '900px' }}>
                    <Paper className={classes.paper} elevation={5} >
                        {loading ?
                            <CircularProgress className={classes.loading} /> :
                            <ReactPlayer url={`https://www.youtube.com/watch?v=${currentVideo.snippet.resourceId.videoId}`}
                                controls width='100%' height='100%' />
                        }
                    </Paper>
                </Item>
                <Item xs={12} sm={12} md={3}>
                    <Paper className={classes.videoListContainer}>
                        <Typography variant="h6" component="h6" style={{ marginBottom: '20px' }}>
                            Lectures
                        </Typography>
                        <GridList cellHeight={150} cols={1} className={classes.gridList}>
                            {videos.map(item => {
                                const { snippet: { position, thumbnails, title } } = item;
                                return <GridListTile key={position}
                                    onClick={() => handleClickOnVideo(position)}
                                    style={position === currentVideo.snippet.position
                                        ? { border: '2px solid red' } : {}} >
                                    <img src={(thumbnails.standard && thumbnails.standard.url) || thumbnails.default.url} alt={title} />
                                    <GridListTileBar
                                        title={title}
                                    />
                                </GridListTile>
                            })}
                        </GridList>
                    </Paper>

                </Item>
            </Container>
        </div>)
}

const mapStateToProps = state => ({
    course: state.courseReducer
})
export default connect(mapStateToProps, { getVideos, setCurrentVideo })(Course);