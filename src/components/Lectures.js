import React from 'react';
import { connect } from 'react-redux';
import { Paper, Typography, GridList, GridListTile, GridListTileBar, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { setCurrentVideo, getVideos } from '../actions/courseActions';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const useStyles = makeStyles(theme => ({
    videoListContainer: {
        padding: theme.spacing(2),
        display: 'flex',
        flexWrap: 'wrap',
        overflow: 'hidden',
        backgroundColor: theme.palette.primary.light,
        // backgroundColor: '#009688',
        color:'#e0f2f1'

    },
    gridList: {
        borderTop: '2px solid #e0f2f1',
        paddingTop: 10,
        marginTop: 20,
        height: 600,
        [theme.breakpoints.down('sm')]: {
            direction: 'row',
            flexWrap: 'nowrap',
            height: 'auto',
        },
    },
}));

const Lectures = props => {
    const classes = useStyles();
    const {
        course: { videos, currentVideo, pageInfo },
        setCurrentVideo, loadMore
    } = props;

    const handleClickOnVideo = (position) => {
        setCurrentVideo(position);
    }
    
    return (<Paper className={classes.videoListContainer}>
        <Box justifyItems='space-between' flexDirection='row' style={{ marginBottom: '20px' }}>
            <Typography variant="h6" component="h6" > دروس </Typography>
            {currentVideo && <Typography variant="h6" component="h6" >
            {pageInfo.totalResults}/{currentVideo.snippet.position + 1||0} 
            </Typography>
            }
        </Box>
        <GridList cols={isWidthUp('md', props.width) ? 1 : 3} className={classes.gridList} onScroll={loadMore}>
            {videos && videos.map(item => {
                const { snippet: { position, thumbnails, title } } = item;
                return <GridListTile key={position} 
                    onClick={() => handleClickOnVideo(position)}
                    style={position === currentVideo.snippet.position
                        ? { border: '2px solid #e0f2f1' } : {}} >
                    <img src={(thumbnails.standard && thumbnails.standard.url) || thumbnails.default.url} alt={title} />
                    <GridListTileBar
                        title={title}
                    />
                </GridListTile>
            })}
        </GridList>
    </Paper>)
}

const mapStateToProps = state => ({
    course: state.courseReducer
})
export default connect(mapStateToProps, { setCurrentVideo, getVideos })(withWidth()(Lectures));