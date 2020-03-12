import React from 'react';
import Typography from '@material-ui/core/Typography'
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import { CardMedia, CardContent, Card, CardActionArea } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    card: {
        width: 300,
        margin: theme.spacing(3),
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.primary.contrastText,
    },
    media: {
        height: 190,
    },
    text:{
        color: theme.palette.primary.contrastText,
    }
}));

const CourseCard = ({ item, onClick }) => {
    const classes = useStyles();
    return (

        <Card className={classes.card} onClick={() => onClick(item.id)}>
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
                            <Typography className={classes.text} variant="body2">
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