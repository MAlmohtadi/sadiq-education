import axios from 'axios';
import {
  GET_VIDEOS,
  GET_VIDEOS_ERROR,
  SET_CURRENT_VIDEO,
  LOAD_MORE_VIDEOS,
  LOAD_MORE_VIDEOS_ERROR
} from './types';

const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems`;
let apiKey;
if (process.env.NODE_ENV !== 'production') {
  apiKey = process.env.REACT_APP_API_YOUTUBE_KEY;
} else {
  apiKey = process.env.API_YOUTUBE_KEY;
}

// Get Playlist Videos
export const getVideos = ({ maxResults = 50, playlistId, nextPageToken }) => async dispatch => {
  console.log('API_YOUTUBE_KEY', apiKey)
  try {
    const res = await axios.get(apiUrl, {
      params: {
        part: 'snippet',
        playlistId,
        maxResults,
        pageToken: nextPageToken,
        key: apiKey
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
export const loadMoreVideos = ({ maxResults = 50, playlistId, nextPageToken }) => async dispatch => {

  try {
    const res = await axios.get(apiUrl, {
      params: {
        part: 'snippet',
        playlistId,
        maxResults,
        pageToken: nextPageToken,
        key: apiKey
      }
    });

    dispatch({
      type: LOAD_MORE_VIDEOS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: LOAD_MORE_VIDEOS_ERROR,
      payload: err
    });
  }
}
export const setCurrentVideo = (position) => async dispatch => {
  dispatch({
    type: SET_CURRENT_VIDEO,
    payload: position
  });
}
