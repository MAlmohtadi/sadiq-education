import React, { useEffect } from 'react';
import { Grid, Typography, CardMedia, Card, CardActionArea, CardContent } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { setCurrentVideo, getVideos } from '../actions/courseActions';

const useStyles = makeStyles(theme => ({
    card: {
        backgroundColor: theme.palette.primary.dark,
        color: '#FFF',
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    media: {
        height: 190,
    },
}));

const VideosList = (props) => {
    let history = useHistory();
    const classes = useStyles();
    const {
        history: {
            location: {
                state: { playlistId, title } = {}
            } = {}
        },
        course: { videos},
        getVideos, setCurrentVideo
    } = props;

    useEffect(() => {
        if (!playlistId) {
            history.push({ pathname: '/courses' })
        } else {
            getVideos({ playlistId });
        }
    }, [])

    const handleClickOnVideo = (position) => {
        setCurrentVideo(position);
        history.push({ pathname: '/videos', state: { playlistId, title } })
    }


    return <Grid container spacing={5} >
        <Grid item xs={12} >
            <Typography variant="h4" component="h1" color="primary" align="center" >الدروس</Typography>
        </Grid>
        {videos && videos.map((item, index) => {
            const { snippet: { position, thumbnails, title } } = item;
            return <Grid item key={index} xs={12} sm={6} lg={4} >
                <Card className={classes.card} onClick={() => handleClickOnVideo(position)}>
                    <CardActionArea>
                        <CardMedia className={classes.media} image={thumbnails.standard ? thumbnails.standard.url : thumbnails.default.url}
                            title={title} />
                        <CardContent>
                            <Typography variant="h6">{title}</Typography>

                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        }
        )}
    </Grid>
}

const mapStateToProps = state => {
    return {
        course: state.courseReducer
    };
}
export default connect(mapStateToProps, { setCurrentVideo, getVideos })(VideosList);