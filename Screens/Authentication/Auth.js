import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../Login/Login';
import Createaccount from '../Login/Createaccount';
import ForgetPassword from '../Login/ForgetPassword';

const Stack = createStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Createaccount" component={Createaccount} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  );
};

export default Auth;