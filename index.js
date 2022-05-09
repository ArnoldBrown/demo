/**
 * @format
 */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';

import {AppRegistry, View, Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import configureStore from './store/store';
import {PersistGate} from 'redux-persist/integration/react';
//import NetInfo from "@react-native-community/netinfo";

const {store, persistor} = configureStore();

const Root = () => (
  <Provider store={store}>

    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
