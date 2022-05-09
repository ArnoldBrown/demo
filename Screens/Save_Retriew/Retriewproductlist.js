import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  StatusBar,
  Image,
  TouchableOpacity,
  Touchable,
  ScrollView,
  Alert,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceInfo from 'react-native-device-info';
import {useSelector, useDispatch} from 'react-redux';

import {
  cartholdDetailaction,
  cartholdretrievAction,
  cartholdlistAction,
} from '../../action/holdAction';






import {API_Links} from '../Api/Api';
import Customloader from '../Customloader';
import {CartviewAction} from '../../action/Cartatction';
import AsyncStorage from '@react-native-community/async-storage';

export default function Retriewproductlist({
  navigation,
  route,
  onretriewListTab,
  cashierIds,
  selected,
  onRetrievs,
}) {
  const [checkDevicetype, setDevicetype] = React.useState(' ');

  useEffect(() => {
    setDevicetype(DeviceInfo.getDeviceType);
  }, []);

  const dispatch = useDispatch();



  const _cartReducer = useSelector(state => state.cartReducer);

  const { cartItems} =
  _cartReducer;


  const _holdReducer = useSelector(state => state.holdReducer);

  const { cartholderDetail  ,cartHoldloader} =
    _holdReducer;

    const shopName = useSelector(state => state.shopnameReducer);
  
    const {groceryName} = shopName;
  



  // console.log("bin9309r2r",cartholderDetail.length)

  const getToken = useSelector(state => state.loginReducer);
  const {casherId} = getToken;

  useEffect(() => {
    global.Dimensionwidth < 468
      ? dispatch(
          cartholdDetailaction(route.params.cashier_id, route.params.hold_id ,groceryName),
        )
      : dispatch(cartholdDetailaction(cashierIds, selected ,groceryName) );

    return () => {};
  }, []);

  const onRetriev = async () => {
    if (cartItems.length > 0) {
      Alert.alert('Already a list has retrieve', 'please complete it', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      global.Dimensionwidth < 468
        ? await dispatch(
            cartholdretrievAction(
              route.params.cashier_id,
              route.params.hold_id,
              navigation,
              groceryName
            ),
          )
        : await dispatch(
            cartholdretrievAction(
              cashierIds,
              selected,
              navigation,
              groceryName
            ),
          );

        AsyncStorage.setItem(
        'retrievToken',
        cartholderDetail[0].session_id,
      ).then(() => {
        dispatch(CartviewAction(cartholderDetail[0].session_id ,groceryName));
      })(dispatch(cartholdlistAction(casherId ,groceryName)));
    }
  };

  return (
    <SafeAreaView style={global.commonBg}>
      {global.Dimensionwidth < 468 ?  (
        <View style={global.commonMobileHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../Images/closeicon.png')}
              style={{width: 35, height: 35}}
            />
          </TouchableOpacity>

          <Text style={global.headTitle}>Save & Retrieve</Text>

          <Text></Text>
        </View>
      ) : null}
      {cartholderDetail !== undefined && cartholderDetail.length > 0 ? (
        <View style={{flex: 1}}>
          <View
            style={[
              global.commonWhitebg,
              {borderBottomWidth: 1, borderBottomColor: '#DADADA'},
            ]}>
            <TouchableWithoutFeedback>
              <View>
                <View style={[global.commonFlexrow_bt]}>
                  <View style={{flex: 1}}>
                    <Text style={[global.commonTextblue, {marginBottom: 11}]}>
                      Sub Total{' '}
                    </Text>
                  </View>

                  <View style={{flex: 1}}>
                    <Text
                      style={[
                        global.commonTextblueH1,
                        {marginBottom: 11, textAlign: 'right', fontSize: 22},
                      ]}
                      numberOfLines={1}>
                      {
                        (cartholderDetail.reduce(
                          (a, c) =>
                            a + c.final_price * c.customers_basket_quantity,
                          0,
                        ).toFixed(2)
                      )}

                      
                    </Text>
                  </View>
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                  <Text style={{fontSize:18,color:'#144693'}}>RM</Text>
                  <Text style={[{fontSize: 44}]}>
                  {
                        (cartholderDetail.reduce(
                          (a, c) =>
                            a + c.final_price * c.customers_basket_quantity,
                          0,
                        ).toFixed(2)
                      )}

                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View
            style={[{paddingVertical: 0, flex: 1, backgroundColor: '#eeee'}]}>
            <View style={[global.commonWhitebg, {paddingVertical: 0}]}>
              <ScrollView>
                {cartholderDetail.map(e => {
                  return (
                    <View
                      style={[global.flexRowsec, global.flexLine]}
                      key={e.customers_basket_id}>
                      <View style={{width: 50, height: 50, borderRadius: 3}}>
                        <Image
                          source={{uri:  groceryName === ""  ?  API_Links.URL + e.image   :API_Links.SHOP_URL+ groceryName +"/"+ e.image  }}
                          style={{width: null, height: null, flex: 1}}
                          resizeMode="cover"
                        />
                      </View>

                      <View style={{paddingHorizontal: 11}}>
                        <Text numberOfLines={4} style={global.commonTextblue}>
                          {e.products_name}
                        </Text>
                        <Text style={[global.commonText, {marginTop: 6}]}>
                          {e.final_price + ' X ' + e.customers_basket_quantity}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      ) : null}

      {cartholderDetail !== undefined && cartholderDetail.length > 0 ? (
        <View
          style={[
            global.commonWhitebg,
            {flex: 0.1, justifyContent: 'center', padding: 6},
          ]}>
          <TouchableOpacity
            style={global.commonButton}
            onPress={() => onRetriev()}>
            <Text style={global.btnText1}>Retrieve</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {cartHoldloader ? <Customloader /> : null}
      
    </SafeAreaView>
  );
}
