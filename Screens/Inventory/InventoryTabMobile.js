import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import InventoryMain from './InventoryMain';
import StockIn from './StockIn';
import StockOut from './StockOut';
import AdjustStock from './AdjustStock';
import CheckStock from './CheckStock';

const Tab = createBottomTabNavigator();

export default function InventoryTabMobile({navigation, route}) {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: '#fafafa',
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Stock Movement"
        component={InventoryMain}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../Images/google-docs.png')}
                resizeMode="contain"
                style={{
                  width: 22,
                  height: 30,
                  tintColor: focused ? '#144693' : '#757575',
                }}
              />
              <Text style={styles.handsettabno}>Movement</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="StockIn"
        component={StockIn}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../Images/ready-stockccc.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 30,
                  tintColor: focused ? '#144693' : '#757575',
                }}
              />
              <Text style={styles.handsettabno}>Stock-In</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="StockOut"
        component={StockOut}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../Images/ready-stockccpng.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 30,
                  tintColor: focused ? '#144693' : '#757575',
                }}
              />
              <Text style={styles.handsettabno}>Stock-Out</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="AdjustStock"
        component={AdjustStock}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../Images/document-adjustment.ccpng.png')}
                resizeMode="contain"
                style={{
                  width: 22,
                  height: 30,
                  tintColor: focused ? '#144693' : '#757575',
                }}
              />
              <Text style={styles.handsettabno}>AdjustStock</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CheckStock"
        component={CheckStock}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../Images/add-filecc.png')}
                resizeMode="contain"
                style={{
                  width: 24,
                  height: 30,
                  tintColor: focused ? '#144693' : '#757575',
                }}
              />
              <Text style={styles.handsettabno}>CheckStock</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  handsettabno:{
      fontSize:11
  }
});
