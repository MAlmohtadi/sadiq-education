import React from 'react';
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia, CardContent, Card, CardActionArea } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        width: 300,
        margin: theme.spacing(3),
        backgroundColor: '#26a69a',
        color: '#b3e5fc',
    },
    media: {
        height: 190,
    },
    text: {
        color:'white',
    }
}));

const CourseCard = ({ item, onClick }) => {
    const classes = useStyles();
    return (
        <Card className={classes.card} onClick={() => onClick(item)}>
            <CardActionArea >
                {!item ? (
                    <Skeleton animation="wave" variant="rect" className={classes.media} />
                ) : (
                        <CardMedia
                            className={classes.media}
                            image={item.snippet.thumbnails.standard.url}
                            title={item.snippet.title}
                        />
                    )}

                <CardContent>
                    {!item ? (
                        <React.Fragment>
                            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={10} width="80%" />
                        </React.Fragment>
                    ) : (
                            <Typography className={classes.text} variant="h5">
                                {
                                    item.snippet.title
                                }
                            </Typography>
                        )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CourseCard; 