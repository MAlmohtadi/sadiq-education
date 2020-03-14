import axios from 'axios';
import {
  GET_PLAYlITS,
  GET_PLAYlITS_ERROR
} from './types';
import config from '../config/youtubeConfig';
  const { channel_id } = config;
  const api_key = process.env.API_KEY || config.api_key;
  
// Get Channel Playlists
export const getPlaylists = (maxResults = 50) => async dispatch => { 

  const apiUrl = `https://www.googleapis.com/youtube/v3/playlists`;

  try {
    const res = await axios.get(apiUrl, {
      params: {
        part: 'snippet',
        channelId: channel_id,
        maxResults,
        key: api_key
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
