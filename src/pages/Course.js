import React, { useEffect, useState } from 'react';
import config from '../config/youtubeConfig';
import { Grid, Paper, CircularProgress, GridList, GridListTile, GridListTileBar, Typography, ListSubheader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player';

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
        // justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        borderTop: '2px solid red',
        paddingTop: 10,
        marginTop: 20,
        // width: 500,
        height: 550,
    },
}));

const Container = props => <Grid container {...props} justify='center'  spacing={2} />;
const Item = props => <Grid item {...props} />;

const Course = (props) => {
    const classes = useStyles();
    const [videoList, setVideoList] = useState([])
    const [currentVideo, setCurrentVideo] = useState({ snippet: { position: 0 } })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState();
    const { history: {
        location: {
            state: { playlistId, title }
        }
    } } = props;

    useEffect(() => {
        const { api_key } = config;
        const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${api_key}`;
        fetch(apiUrl)
            .then(result => result.json())
            .then(data => {
                setVideoList(data.items)
                setCurrentVideo(data.items.find(item => item.snippet.position === 0))
                setLoading(false)
            }).catch(err => {
                setLoading(false)
                setError(err)
            })

    }, [])

    const handleClickOnCard = (position) => {
        setCurrentVideo(videoList.find(item => item.snippet.position === position));
    }

    return (
        <div className={classes.root}>
            <Container>
                <Item item xs={12} sm={8} md={10} >
                    <Typography variant="h4" component="h2">
                        {title}
                    </Typography>
                </Item>
                <Item xs={12} sm={8} md={9} style={{ minHeight: '550px', maxHeight: '900px' }}>
                    <Paper className={classes.paper} elevation={5} >
                        {loading ?
                            <CircularProgress className={classes.loading} /> :
                            <ReactPlayer url={`https://www.youtube.com/watch?v=${currentVideo.snippet.resourceId.videoId}`}
                                controls width='100%' height='100%' />
                        }
                    </Paper>
                </Item>
                <Item xs={12} sm={8} md={3}>
                    <Paper className={classes.videoListContainer}>
                        <Typography variant="h6" component="h6" style={{ marginBottom: '20px' }}>
                            Lectures
                        </Typography>
                        <GridList cellHeight={150} cols={1} className={classes.gridList}  onScroll={(data,test) => console.log('scroll', data,test)}>
                            {videoList.map(item => {
                                const { snippet: { position, thumbnails, title } } = item;
                                return <GridListTile key={position}
                                    onClick={() => handleClickOnCard(position)}
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
// <Item item xs={12} sm={8} md={8} style={{ minHeight: '550px', maxHeight: '900px', borderBottom: '2px solid red' }} alignItems='center' justify="center">
// {loading ?
//     <CircularProgress disableShrink /> :
//     <ReactPlayer url={`https://www.youtube.com/watch?v=${currentVideo.snippet.resourceId.videoId}`}
//         controls width='100%' height='100%' />
// }
// </Item>
// {videoList.map(item => {
//     const { snippet: { position, thumbnails, title } } = item;
//     return <GridListTile key={position} onClick={() => handleClickOnCard(position)}
//         className={classes.grid}
//         style={position === currentVideo.snippet.position ? { border: '2px solid red' } : {}} >
//         <img src={(thumbnails.standard && thumbnails.standard.url) || thumbnails.default.url} alt={title} />
//         <GridListTileBar
//             title={title}
//             classes={{
//                 root: classes.titleBar,
//                 title: classes.title,
//             }}

//         />
//     </GridListTile>
// }
// )}
export default Course;