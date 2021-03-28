import {
  GET_VIDEOS,
  GET_VIDEOS_ERROR,
  SET_CURRENT_VIDEO,
  LOAD_MORE_VIDEOS
} from '../actions/types';

const initialState = {
  videos: [],
  pageInfo: { totalResults: 0 },
  currentVideo: { snippet: { resourceId: {} } },
  filtered: null,
  error: null,
  loading: true
};

 // eslint-disable-next-line 
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOS:
      return {
        ...state,
        videos: action.payload.items,
        currentVideo: action.payload.items[0],
        pageInfo: action.payload.pageInfo,
        nextPageToken: action.payload.nextPageToken,
        loading: false
      };
    case LOAD_MORE_VIDEOS:
      let keys = {};
      state.videos.map(item => keys[item.id] = item.id)
      const filterMoreVideo = action.payload.items.filter(item => keys[item.id] === undefined)
      return {
        ...state,
        videos: [...state.videos, ...filterMoreVideo],
        pageInfo: action.payload.pageInfo,
        nextPageToken: action.payload.nextPageToken,
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
