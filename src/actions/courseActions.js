import axios from 'axios';
import {
  GET_VIDEOS,
  GET_VIDEOS_ERROR,
  SET_CURRENT_VIDEO
} from './types';
import config from '../config/youtubeConfig';

// Get Playlist Videos
export const getVideos = ({ maxResults = 50, playlistId }) => async dispatch => {
  const { api_key } = config;

  const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems`;

  try {
    const res = await axios.get(apiUrl, {
      params: {
        part: 'snippet',
        playlistId,
        maxResults,
        key: api_key
      }
    });

    dispatch({
      type: GET_VIDEOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_VIDEOS_ERROR,
      payload: err
    });
  }
};

export const setCurrentVideo = (position) => async dispatch => {
  dispatch({
    type: SET_CURRENT_VIDEO,
    payload: position
  });
}
