import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import InventoryMain from './InventoryMain';
import StockIn from './StockIn';
import StockOut from './StockOut';
import AdjustStock from './AdjustStock';
import CheckStock from './CheckStock';





const Tab = createBottomTabNavigator();

export default function InventoryTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          textTransform: 'none',
        },
        activeTintColor: '#144693',
        inactiveTintColor: '#757575',
        style: {
          backgroundColor: '#fafafa',
          borderTopWidth: 1,
          borderTopColor: '#DADADA',
        },
      }}
    >
      
      <Tab.Screen
        name="Stock Movement"
        component={InventoryMain}
        options={{
          tabBarLabel: ({focused}) =>
            focused ? (
              <Text style={styles.focusedMenu}>Stock Movement</Text>
            ) : (
              <Text style={styles.unfocusedMenu}>Stock Movement</Text>
            ),

          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                style={styles.menuIcon}
                source={require('../../Images/document.png')}
              />
            ) : (
              <Image
                style={styles.menuIcon}
                source={require('../../Images/documentone.png')}
              />
            ),
        }}
      />
      <Tab.Screen
        name="StockIn"
        component={StockIn}
        options={{
          tabBarLabel: ({focused}) =>
            focused ? (
              <Text style={styles.focusedMenu}>Stock-In</Text>
            ) : (
              <Text style={styles.unfocusedMenu}>Stock-In</Text>
            ),

          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                style={styles.menuIcon}
                source={require('../../Images/ready-stock.png')}
              />
            ) : (
              <Image
                style={styles.menuIcon}
                source={require('../../Images/ready-stockone.png')}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Stock-Out"
        component={StockOut}
        options={{
          tabBarLabel: ({focused}) =>
            focused ? (
              <Text style={styles.focusedMenu}>Stock-Out</Text>
            ) : (
              <Text style={styles.unfocusedMenu}>Stock-Out</Text>
            ),

          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                style={styles.menuIcon}
                source={require('../../Images/out-of-stock.png')}
              />
            ) : (
              <Image
                style={styles.menuIcon}
                source={require('../../Images/out-of-stockone.png')}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Adjust Stock"
        component={AdjustStock}
        options={{
          tabBarLabel: ({focused}) =>
            focused ? (
              <Text style={styles.focusedMenu}>Adjust Stock</Text>
            ) : (
              <Text style={styles.unfocusedMenu}>Adjust Stock</Text>
            ),

          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                style={styles.menuIcon}
                source={require('../../Images/document-adjustment.png')}
              />
            ) : (
              <Image
                style={styles.menuIcon}
                source={require('../../Images/document-adjustmentone.png')}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Check Stock"
        component={CheckStock}
        options={{
          tabBarLabel: ({focused}) =>
            focused ? (
              <Text style={styles.focusedMenu}>Check Stock</Text>
            ) : (
              <Text style={styles.unfocusedMenu}>Check Stock</Text>
            ),

          tabBarIcon: ({focused}) =>
            focused ? (
              <Image
                style={styles.menuIcon}
                source={require('../../Images/add-fileone.png')}
              />
            ) : (
              <Image
                style={styles.menuIcon}
                source={require('../../Images/add-file.png')}
              />
            ),
        }}
      /> 
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  menuIcon: {
    width: 40,
    height: 35,
  },

  groupicon: {width: 29, height: 29},
  focusedMenu: {
    color: '#144693',
    position: 'relative',
    top: 4,
    left: 15,
  },
  unfocusedMenu: {
    color: '#757575',
    position: 'relative',
    top: 4,
    left: 15,
  },
});
