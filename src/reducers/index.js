
import { combineReducers } from 'redux';
import playlistsReducer from './playlistsReducer';
import courseReducer from './courseReducer';


export default combineReducers({
    playlistsReducer,
    courseReducer
});