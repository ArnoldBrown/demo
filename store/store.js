// import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
// import thunk from 'redux-thunk';

// const initialState = {};

// const reducer = combineReducers({

//   loginReducer:loginReducer



// });

// const store = createStore(
//   reducer,
//   initialState,
//   compose(applyMiddleware(thunk)),
// );

// export default store;




import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import reducer from './rootreducer';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer ,getStoredState} from 'redux-persist';
//import loginReducer from './../reducer/loginReducer'
//import {Dayendreducer} from '../Reducers /loginReducer';

const persistConfig = {
  key:'root',
  storage: AsyncStorage,
  /// whitelist: [''] // only navigation will be persisted
  //blacklist: ['Dayendreducer'], // navigation will not be persisted
};









const persistedReducer = persistReducer(persistConfig, reducer);
const initialState = {};

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(thunk));
  let persistor = persistStore(store);
  return {store, persistor};
};