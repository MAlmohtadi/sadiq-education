import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['playlistsReducer', 'courseReducer']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleware = [thunk]
const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middleware)))
const persister = persistStore(store)
export { store, persister }
