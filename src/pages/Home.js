import React from 'react';
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { getPlaylists } from '../actions/playlistsActions'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});
const Home = (props) => {
    let history = useHistory();
    const classes = useStyles();

    const handleClickOnCard = () => {
        history.push({ pathname: '/courses' })
    }

    return <Grid container direction="row"
        justify="space-evenly"
        alignItems="center">
        <Grid>
            <Card className={classes.root}>
                <CardActionArea onClick={handleClickOnCard}>
                    <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="500"
                        image="../assets/SADIQ.jpg"
                        title="Contemplative Reptile"

                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            صادق ذياب
                        </Typography>
                        <Typography variant="h6" color="textSecondary" component="p">
                            رياضيات
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" onClick={handleClickOnCard}>
                        Watch
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    </Grid>
}

const mapStateToProps = state => ({
    playlistsReducer: state.playlistsReducer
})

export default connect(mapStateToProps, { getPlaylists })(Home);