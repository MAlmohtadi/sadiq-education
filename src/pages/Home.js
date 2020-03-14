import React, { useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import { Grid } from '@material-ui/core';
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
        history.push({ pathname: '/course', state: { playlistId: id, title } })
    }

    return <Grid container direction="row"
        justify="space-evenly"
        alignItems="center">
        {(loading ? Array.from(new Array(3))
            : playlists).map((item, index) => <CourseCard
                item={item} key={index} onClick={handleClickOnCard} />)}
    </Grid>
}

const mapStateToProps = state => ({
    playlistsReducer: state.playlistsReducer
})
export default connect(mapStateToProps, { getPlaylists })(Home);