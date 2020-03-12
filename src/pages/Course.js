import React, { useEffect, useState } from 'react';
import config from '../config/youtubeConfig';
import { Grid, Paper, CircularProgress, GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        margin: theme.spacing(2),
    },
    gridList: {
        flexWrap: 'nowrap',
        padding: theme.spacing(2),
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.contrastText,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
    },
    grid: {
        cursor: 'pointer',
        maxWidth: 350,
    },
    selected: {
        color: theme.palette.action.selected,
        backgroundColor: theme.palette.action.selected,
    }
}));

const Course = (props) => {
    const classes = useStyles();
    const [videoList, setVideoList] = useState([])
    const [currentVideo, setCurrentVideo] = useState({ snippet: { position: 0 } })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState();

    useEffect(() => {
        const { api_key } = config;
        const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${props.history.location.state.playlistId}&maxResults=50&key=${api_key}`;
        fetch(apiUrl)
            .then(result => result.json())
            .then(data => {
                setVideoList(data.items)
                setCurrentVideo(data.items[0])
                setLoading(false)
            }).catch(err => {
                setLoading(false)
                setError(err)
            })

    }, [props.history])

    const handleClickOnCard = (position) => {
        setCurrentVideo(videoList.find(item => item.snippet.position === position));
    }

    return (
        <Paper className={classes.paper}>
            <Grid container direction='row' justify="space-around">
                <Grid container item xs={12} style={{ minHeight: '480px', maxHeight: '750px' }} alignItems='center' justify="center">
                    {loading ?
                        (
                            <CircularProgress disableShrink />
                        )
                        :
                        (
                            <ReactPlayer url={`https://www.youtube.com/watch?v=${currentVideo.snippet.resourceId.videoId}`} controls width='100%' height='100%' />
                        )}
                </Grid>
                <Grid container item xs={12} >
                    <div className={classes.root}>
                        <GridList className={classes.gridList}>
                            {videoList.map(item => {
                                const { snippet: { position, thumbnails, title } } = item;
                                return <GridListTile key={position} onClick={() => handleClickOnCard(position)}
                                    className={classes.grid}
                                    style={position === currentVideo.snippet.position ? { border: '2px solid red' } : {}} >
                                    <img src={(thumbnails.standard && thumbnails.standard.url) || thumbnails.default.url} alt={title} />
                                    <GridListTileBar
                                        title={title}
                                        classes={{
                                            root: classes.titleBar,
                                            title: classes.title,
                                        }}

                                    />
                                </GridListTile>
                            }
                            )}
                        </GridList>
                    </div>

                </Grid>
            </Grid>
        </Paper>)
}

export default Course;