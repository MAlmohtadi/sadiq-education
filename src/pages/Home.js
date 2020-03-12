import React, { useEffect, useState } from 'react';
import config from '../config/youtubeConfig';
import CourseCard from '../components/CoursesCard';
import { Grid } from '@material-ui/core';
import { useHistory } from "react-router-dom";

const Home = (props) => {
    let history = useHistory();

    const [playlists, setPlaylists] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        const { api_key, channel_id } = config;
        const apiUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${channel_id}&maxResults=50&key=${api_key}`;
        fetch(apiUrl)
            .then(result => result.json())
            .then(data => {
                setPlaylists(data.items)
                setLoading(false)
            }).catch(err => {
                setLoading(false)
                setError(err)
            })

    }, [])

    const handleClickOnCard = (playlistId) => {
        history.push({ pathname: '/course', state: { playlistId } })
    }

    return <Grid container direction="row"
        justify="space-evenly"
        alignItems="center">
        {(loading ? Array.from(new Array(3)) : playlists).map((item, index) => {

            return <CourseCard item={item} key={index} onClick={handleClickOnCard} />
        })}
    </Grid>
}
export default Home;