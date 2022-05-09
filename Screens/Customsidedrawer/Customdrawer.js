import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  Touchable,
  StatusBar,
} from 'react-native';
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import {useSelector, useDispatch} from 'react-redux';

import {settingsAction} from '../../action/settingsAction';

export function Drawercontent(props) {
 

  const dispatch = useDispatch();

  const findDevicetype = DeviceType();

  const drawerStatus = useSelector(state => state.drawerViewreducer);
  const {drawerResponse} = drawerStatus;

  const getsettingReducer = useSelector(state => state.settingReducer);
  const {appSettings, settingsloader} = getsettingReducer;

  useEffect(() => {
    dispatch(settingsAction());

    return () => {};
  }, []);

    

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: findDevicetype.isTab === 'Tablet' ? '#000' : '#536670',
        // backgroundColor: findDevicetype.isTab === 'Tablet' ? 'white' : 'white',
      }}>
      <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false}
      >

        {/* <DrawerItemList {...props}/> */}



        <View>
          <View style={{padding: 14, flex: 1, alignItems: 'center'}}>
            <TouchableOpacity 
              onPress={() => props.navigation.navigate('Stafflist')}
              style={[
                global.bottomSpacing,
                {justifyContent: 'center', alignItems: 'center' },
              ]}>
            

              <View style={global.draweruserlogo}>
                <Image
                  source={require('../../Images/placeholder.png')}
                  style={{width: '100%', height: '100%'}}
                  resizeMode="cover"
                />
              </View>

              <Text style={global.commonTextwhiteH1}>Admin</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate('Home')}>
              <View style={global.drawerMenus}>
                <Image
                  source={require('../../Images/Drawericon2.png')}
                  style={[global.drawerMenuicon]}
                  resizeMode="contain"
                />

                <Text style={global.commonTextwhiteH1}>Shop</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('Transactionlist')}>
              <View style={global.drawerMenus}>
                <Image
                  source={require('../../Images/Receipt.png')}
                  style={[global.drawerMenuicon]}
                  resizeMode="contain"
                />

                <Text style={global.commonTextwhiteH1}>Bill Management</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('Dashboard')}>
              <View style={global.drawerMenus}>
                <Image
                  source={require('../../Images/Drawericon3.png')}
                  style={[global.drawerMenuicon]}
                  resizeMode="cover"
                />

                <Text style={global.commonTextwhiteH1}>Reports</Text>
              </View>
            </TouchableOpacity>

            {findDevicetype.isTab === 'Tablet' ? (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('InventoryTab')}>
                <View style={global.drawerMenus}>
                  <Image
                    source={require('../../Images/Inventory.png')}
                    style={[global.drawerMenuicon]}
                    resizeMode="cover"
                  />

                  <Text style={global.commonTextwhiteH1}>Inventory</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('InventoryTabMobile')}>
                <View style={global.drawerMenus}>
                  <Image
                    source={require('../../Images/Inventory.png')}
                    style={[global.drawerMenuicon]}
                    resizeMode="cover"
                  />

                  <Text style={global.commonTextwhiteH1}>Inventory</Text>
                </View>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => props.navigation.navigate('Customerlist')}>
              <View style={global.drawerMenus}>
                <Image
                  source={require('../../Images/customer.png')}
                  style={[global.drawerMenuicon]}
                  resizeMode="cover"
                />

                <Text style={global.commonTextwhiteH1}>Customers</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('Manageproducts')}>
              <View style={global.drawerMenus}>
                <Image
                  source={require('../../Images/shopping-cart.png')}
                  style={[global.drawerMenuicon]}
                  resizeMode="cover"
                />

                <Text style={global.commonTextwhiteH1}>Products</Text>
              </View>
            </TouchableOpacity>

            {drawerResponse === '0' || appSettings.pos_drawer !== '1' ? null : (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Shiftdetail')}>
                <View style={global.drawerMenus}>
                  <Image
                    source={require('../../Images/Drawericon1.png')}
                    style={[global.drawerMenuicon]}
                    resizeMode="cover"
                  />

                  <Text style={global.commonTextwhiteH1}>Drawer</Text>
                </View>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => props.navigation.navigate('Unseenorder')}>
              <View style={global.drawerMenus}>
                <Image
                  source={require('../../Images/order.png')}
                  style={[global.drawerMenuicon]}
                  resizeMode="cover"
                />

                <Text style={global.commonTextwhiteH1}>Orders</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('Settings')}>
              <View style={global.drawerMenus}>
                <Image
                  source={require('../../Images/settings.png')}
                  style={[global.drawerMenuicon]}
                />

                <Text style={global.commonTextwhiteH1}>Settings</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}
