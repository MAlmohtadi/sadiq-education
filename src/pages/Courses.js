import React, { useEffect } from 'react';
import CourseCard from '../components/CourseCard';
import { Grid, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { getPlaylists } from '../actions/playlistsActions'
import { connect } from 'react-redux';


const Courses = (props) => {
    let history = useHistory();
    const { getPlaylists, playlistsReducer: { playlists, loading } } = props;
    useEffect(() => {
        loading && getPlaylists();
    },
        // eslint-disable-next-line 
        [loading])

    const handleClickOnCard = ({ id, snippet: { title } }) => {
        history.push({ pathname: '/course-videos', state: { playlistId: id, title } })
    }

    return <Grid container spacing={4}>
        <Grid item xs={12} >
            <Typography variant="h" component="h1" color="primary" align="center" >قوائم التشغيل</Typography>
        </Grid>
        {playlists.map((item, index) =>
            <Grid item xs={12} sm={6} lg={4}>
                <CourseCard item={item} key={index} onClick={handleClickOnCard} />
            </Grid>
        )}

    </Grid>

}

const mapStateToProps = state => ({
    playlistsReducer: state.playlistsReducer
})
export default connect(mapStateToProps, { getPlaylists })(Courses);