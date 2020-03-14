import {
  GET_PLAYlITS,
  GET_PLAYlITS_ERROR

} from '../actions/types';

const initialState = {
  playlists: [],
  pageInfo: null,
  nextPageToken: undefined,
  filtered: null,
  error: null,
  loading: true
};


export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PLAYlITS:
      return {
        ...state,
        playlists: action.payload.items,
        pageInfo: action.payload.pageInfo,
        nextPageToken: action.payload.nextPageToken,
        loading: false
      };
    case GET_PLAYlITS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
