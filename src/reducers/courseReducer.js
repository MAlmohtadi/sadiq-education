import {
  GET_VIDEOS,
  GET_VIDEOS_ERROR,
  SET_CURRENT_VIDEO

} from '../actions/types';

const initialState = {
  videos: [],
  pageInfo: null,
  filtered: null,
  error: null,
  loading: true
};


export default (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOS:
      return {
        ...state,
        videos: action.payload.items,
        currentVideo: action.payload.items[0],
        pageInfo: action.payload.pageInfo,
        loading: false
      };
    case GET_VIDEOS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case SET_CURRENT_VIDEO:
      return {
        ...state,
        currentVideo: state.videos.find(item => item.snippet.position === action.payload)
      };
    default:
      return state;
  }
};
