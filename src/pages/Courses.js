import React, { useEffect, Fragment } from 'react';
import CourseCard from '../components/CourseCard';
import { Grid, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { getPlaylists } from '../actions/playlistsActions'
import { connect } from 'react-redux';

const Home = (props) => {
    let history = useHistory();

    const { getPlaylists, playlistsReducer: { playlists, loading } } = props;
    useEffect(() => {
        loading && getPlaylists();
    }, [])

    const handleClickOnCard = ({ id, snippet: { title } }) => {
        history.push({ pathname: '/videos', state: { playlistId: id, title } })
    }

    return <Fragment>
        <Typography variant="h" component="h1" color="primary" align="center" >قوائم التشغيل</Typography>
        <Grid container direction="row"
            justify="space-evenly"
            alignItems="center">
            {(loading ? Array.from(new Array(3))
                : playlists).map((item, index) => <CourseCard
                    item={item} key={index} onClick={handleClickOnCard} />)}

        </Grid>
    </Fragment>
}

const mapStateToProps = state => ({
    playlistsReducer: state.playlistsReducer
})
export default connect(mapStateToProps, { getPlaylists })(Home);