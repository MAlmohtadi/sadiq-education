import React, { Fragment } from 'react';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { getPlaylists } from '../actions/playlistsActions'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },
    card: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.light,
    },
    actionCard: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.light,
    }
}));

const Home = (props) => {
    let history = useHistory();
    const classes = useStyles();

    const handleClickOnCard = () => {
        history.push({ pathname: '/courses' })
    }

    return (<Fragment>
        <Grid container direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
        >
            <Grid item xs={8} sm={6}>
                <Typography variant="v1" component="h1" color="primary" style={{ textAlign: 'center' }}>الموقع الرسمي للأستاذ صادق ذياب</Typography>
            </Grid>
            <Grid xs={8} sm={6}>
                <Card className={classes.root} onClick={handleClickOnCard}>
                    <CardActionArea >
                        <CardMedia
                            component="img"
                            alt="صادق دياب"
                            height="auto"
                            image="../assets/SADIQ.jpg"
                            title="صادق دياب"
                        />
                        <CardContent className={classes.card}>
                            <Typography gutterBottom variant="h5" component="h2">
                                صادق ذياب
                        </Typography>
                            <Typography variant="h6" component="p">
                                رياضيات
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.actionCard}>
                        <Button color="secondary">
                            مشاهدة الفيديوهات
                    </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    </Fragment>)
}

const mapStateToProps = state => ({
    playlistsReducer: state.playlistsReducer
})

export default connect(mapStateToProps, { getPlaylists })(Home);