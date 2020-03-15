import axios from 'axios';
import {
  GET_PLAYlITS,
  GET_PLAYlITS_ERROR
} from './types';
import config from '../config/youtubeConfig';
  const { channel_id } = config;
  let apiKey;
  if (process.env.NODE_ENV !== 'production') {
    apiKey = process.env.REACT_APP_API_YOUTUBE_KEY;
  } else {
    apiKey = process.env.API_YOUTUBE_KEY;
  }
  
// Get Channel Playlists
export const getPlaylists = (maxResults = 50) => async dispatch => { 

  const apiUrl = `https://www.googleapis.com/youtube/v3/playlists`;

  try {
    const res = await axios.get(apiUrl, {
      params: {
        part: 'snippet',
        channelId: channel_id,
        maxResults,
        key: apiKey
      }
    });

    dispatch({
      type: GET_PLAYlITS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_PLAYlITS_ERROR,
      payload: err
    });
  }
};
