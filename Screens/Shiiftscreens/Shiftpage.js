import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Touchable,
  Image,
  Modal,
  TextInput,
} from 'react-native';
import {global} from '../../styles/global';

import Shiftdetail from './Shiftdetail';
import Shifthistory from './Shifthistory';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export default function Shiftpage() {
  const Tab = createBottomTabNavigator();

  function MyTabs() {
    return (
      <Tab.Navigator screenOptions={{}}>
        <Tab.Screen name="Shiftdetail" component={Shiftdetail} options={{}}ß />
        <Tab.Screen name="Shifthistory" component={Shifthistory} />
      </Tab.Navigator>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <MyTabs />
    </SafeAreaView>
  );
}
