import React, { useEffect, useState } from 'react';
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
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { global } from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import { useSelector, useDispatch } from 'react-redux';

import { settingsAction } from '../../action/settingsAction';

export function Drawercontent(props) {


  const dispatch = useDispatch();

  const findDevicetype = DeviceType();

  const drawerStatus = useSelector(state => state.drawerViewreducer);
  const { drawerResponse } = drawerStatus;

  const getsettingReducer = useSelector(state => state.settingReducer);
  const { appSettings, settingsloader } = getsettingReducer;
  const [drawerIndex, setDrawerindex] = useState(1);

  useEffect(() => {
    dispatch(settingsAction());
    return () => { };
  }, []);

  const onFocustab = id => {
    setDrawerindex(id);

    // if (id === 1) {
    //   setTabone(true);
    //   setTabtwo(false);
    //   setTabthree(false);
    //   setTabfour(false);
    // }

    // if (id === 2) {
    //   setTabtwo(true);
    //   setTabthree(false);
    //   setTabfour(false);
    // }

    // if (id === 3) {
    //   setTabthree(true);
    //   setTabfour(false);
    //   setTabtwo(false);
    // }
    // if (id === 4) {
    //   setTabfour(true);
    //   setTabthree(false);
    // }
  };



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
          <View style={{ padding: 14, flex: 1, alignItems: 'center' }}>

            <TouchableOpacity
              onPress={() => [onFocustab(1), props.navigation.navigate('Stafflist')]}
              // onPress={() => props.navigation.navigate('Stafflist')}
              style={[
                global.bottomSpacing,
                { justifyContent: 'center', alignItems: 'center' },
              ]}>


              <View style={global.draweruserlogo}>
                <Image
                  source={require('../../Images/placeholder.png')}
                  // style={{ width: '100%', height: '100%' }}
                  style={[drawerIndex === 1 ? global.commonTextwhiteH1Green : global
                  .commonTextwhiteH1, {width : '100%', height : '100%'}]}
                  resizeMode="cover"
                />
              </View>
             
              <Text style={
                            drawerIndex === 1
                              ? global.commonTextwhiteH1Green
                              : global.commonTextwhiteH1
                          }>Admin</Text>
            {/* <Text style={global.commonTextwhiteH1}>Admin</Text> */}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => [onFocustab(2), props.navigation.navigate('Home')]}
            // onPress={() => props.navigation.navigate('Home')}
            >
              <View style={global.drawerMenus}>
                <Image
                  source={require('../../Images/Drawericon2.png')}
                  // style={[global.drawerMenuicon]}
                  style={
                    drawerIndex === 2
                      ? global.drawerMenuiconGreen
                      : global.drawerMenuicon
                  }
                  resizeMode="contain"
                />

                {/* <Text style={global.commonTextwhiteH1}>Shop</Text> */}
                <Text style={
                            drawerIndex === 2
                              ? global.commonTextwhiteH1Green
                              : global.commonTextwhiteH1
                          }>Shop</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
             // onPress={() => props.navigation.navigate('Transactionlist')}
              onPress={() => [onFocustab(3), props.navigation.navigate('Transactionlist')]}
              >
              <View style={global.drawerMenus}>
                <Image
                  source={require('../../Images/Receipt.png')}
                  // style={[global.drawerMenuicon]}
                  style={
                    drawerIndex === 3
                      ? global.drawerMenuiconGreen
                      : global.drawerMenuicon
                  }
                  resizeMode="contain"
                />

                {/* <Text style={global.commonTextwhiteH1}>Bill Management</Text> */}
                <Text style={
                            drawerIndex === 3
                              ? global.commonTextwhiteH1Green
                              : global.commonTextwhiteH1
                          }>Bill Management</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
             // onPress={() => props.navigation.navigate('Dashboard')}
              onPress={() => [onFocustab(4), props.navigation.navigate('Dashboard')]}
              >
              <View style={global.drawerMenus}>
                <Image
                  source={require('../../Images/Drawericon3.png')}
                  // style={[global.drawerMenuicon]}
                  style={
                    drawerIndex === 4
                      ? global.drawerMenuiconGreen
                      : global.drawerMenuicon
                  }
                  resizeMode="cover"
                />

                {/* <Text style={global.commonTextwhiteH1}>Reports</Text> */}
                <Text style={
                            drawerIndex === 4
                              ? global.commonTextwhiteH1Green
                              : global.commonTextwhiteH1
                          }>Reports</Text>
              </View>
            </TouchableOpacity>

            {findDevicetype.isTab === 'Tablet' ? (
              <TouchableOpacity
               // onPress={() => props.navigation.navigate('InventoryTab')}
               onPress={() => [onFocustab(5), props.navigation.navigate('InventoryTab')]}
                >
                <View style={global.drawerMenus}>
                  <Image
                    source={require('../../Images/Inventory.png')}
                    // style={[global.drawerMenuicon]}
                    style={
                      drawerIndex === 5
                        ? global.drawerMenuiconGreen
                        : global.drawerMenuicon
                    }
                    resizeMode="cover"
                  />

                  {/* <Text style={global.commonTextwhiteH1}>Inventory</Text> */}
                  <Text style={
                            drawerIndex === 5
                              ? global.commonTextwhiteH1Green
                              : global.commonTextwhiteH1
                          }>Inventory</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                //onPress={() => props.navigation.navigate('InventoryTabMobile')}
                onPress={() => [onFocustab(5), props.navigation.navigate('InventoryTabMobile')]}
                >
                <View style={global.drawerMenus}>
                  <Image
                    source={require('../../Images/Inventory.png')}
                    // style={[global.drawerMenuicon]}
                    style={
                      drawerIndex === 5
                        ? global.drawerMenuiconGreen
                        : global.drawerMenuicon
                    }
                    resizeMode="cover"
                  />

                  {/* <Text style={global.commonTextwhiteH1}>Inventory</Text> */}
                  <Text style={
                            drawerIndex === 5
                              ? global.commonTextwhiteH1Green
                              : global.commonTextwhiteH1
                          }>Inventory</Text>
                </View>
              </TouchableOpacity>
            )}

            <TouchableOpacity
             // onPress={() => props.navigation.navigate('Customerlist')}
              onPress={() => [onFocustab(6), props.navigation.navigate('Customerlist')]}
              >
              <View style={global.drawerMenus}>
                <Image
                  source={require('../../Images/customer.png')}
                  // style={[global.drawerMenuicon]}
                  style={
                    drawerIndex === 6
                      ? global.drawerMenuiconGreen
                      : global.drawerMenuicon
                  }
                  resizeMode="cover"
                />

                {/* <Text style={global.commonTextwhiteH1}>Customers</Text> */}
                <Text style={
                            drawerIndex === 6
                              ? global.commonTextwhiteH1Green
                              : global.commonTextwhiteH1
                          }>Customers</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              //onPress={() => props.navigation.navigate('Manageproducts')}
              onPress={() => [onFocustab(7), props.navigation.navigate('Manageproducts')]}
              >
              <View style={global.drawerMenus}>
                <Image
                  source={require('../../Images/shopping-cart.png')}
                  // style={[global.drawerMenuicon]}
                  style={
                    drawerIndex === 7
                      ? global.drawerMenuiconGreen
                      : global.drawerMenuicon
                  }
                  resizeMode="cover"
                />

                {/* <Text style={global.commonTextwhiteH1}>Products</Text> */}
                <Text style={
                            drawerIndex === 7
                              ? global.commonTextwhiteH1Green
                              : global.commonTextwhiteH1
                          }>Products</Text>
              </View>
            </TouchableOpacity>

            {drawerResponse === '0' || appSettings.pos_drawer !== '1' ? null : (
              <TouchableOpacity
               // onPress={() => props.navigation.navigate('Shiftdetail')}
                onPress={() => [onFocustab(8), props.navigation.navigate('Shiftdetail')]}
                >
                <View style={global.drawerMenus}>
                  <Image
                    source={require('../../Images/Drawericon1.png')}
                    // style={[global.drawerMenuicon]}
                    style={
                      drawerIndex === 8
                        ? global.drawerMenuiconGreen
                        : global.drawerMenuicon
                    }
                    resizeMode="cover"
                  />

                  {/* <Text style={global.commonTextwhiteH1}>Drawer</Text> */}
                  <Text style={
                            drawerIndex === 8
                              ? global.commonTextwhiteH1Green
                              : global.commonTextwhiteH1
                          }>Drawer</Text>
                </View>
              </TouchableOpacity>
            )}

            <TouchableOpacity
            //  onPress={() => props.navigation.navigate('Unseenorder')}
              onPress={() => [onFocustab(9), props.navigation.navigate('Unseenorder')]}
              >
              <View style={global.drawerMenus}>
                <Image
                  source={require('../../Images/order.png')}
                  // style={[global.drawerMenuicon]}
                  style={
                    drawerIndex === 9
                      ? global.drawerMenuiconGreen
                      : global.drawerMenuicon
                  }
                  resizeMode="cover"
                />

                {/* <Text style={global.commonTextwhiteH1}>Orders</Text> */}
                <Text style={
                            drawerIndex === 9
                              ? global.commonTextwhiteH1Green
                              : global.commonTextwhiteH1
                          }>Orders</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
             // onPress={() => props.navigation.navigate('Settings')}
             onPress={() => [onFocustab(10), props.navigation.navigate('Settings')]}
              >
              <View style={global.drawerMenus}>
                <Image
                  source={require('../../Images/settings.png')}
                  // style={[global.drawerMenuicon]}
                  style={
                    drawerIndex === 10
                      ? global.drawerMenuiconGreen
                      : global.drawerMenuicon
                  }
                />

                {/* <Text style={global.commonTextwhiteH1}>Settings</Text> */}
                <Text style={
                            drawerIndex === 10
                              ? global.commonTextwhiteH1Green
                              : global.commonTextwhiteH1
                          }>Settings</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}
