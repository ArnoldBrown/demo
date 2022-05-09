import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Touchable,
  Image,
  StatusBar,
  Switch,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import DeviceInfo from 'react-native-device-info';
import {useSelector, useDispatch} from 'react-redux';
import {cancelBillaction} from '../../action/cancelBillaction';
import Customloader from '../Customloader';
import  AuthId  from '../AuthId.style'

import {API_Links} from '../Api/Api';

export default function Billdescriptions({
  navigation,
  route,
  viewBill,
  orderId,
  posorderDate,
  poscustomerName,
  posorderPrice,
  posorderStatus,
  onCancelbill,

  currencyType,
  totalTax,
  shippingCost,
  discountAmt,
}) {
  //  const getMerchantdetails = useSelector(state => state.merchantloginDetails);
  const getToken = useSelector(state => state.loginReducer);
  const {casherId} = getToken;

  const billReducer = useSelector(state => state.cancelBillreducer);
  const {loader} = billReducer;

  const getCurrencycodes = useSelector(state => state.currencyReducer);
  const {currencyCode, symbol} = getCurrencycodes;

  const shopName = useSelector(state => state.shopnameReducer);
  
  const {groceryName} = shopName;


 


  const [checkDevicetype, setDevicetype] = React.useState(' ');

  useEffect(() => {
    setDevicetype(DeviceInfo.getDeviceType);
  }, []);

  const dispatch = useDispatch();

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [text, onChangeText] = useState('');

  const findDevicetype = DeviceType();


  
  
  ///let Total=  (Math.round (route.params.viewBill.reduce((a, c) => a + c.products_price * c.products_quantity, 0)*100/100).toFixed(2)) 




  const oncancelBillmobile = () => {
    dispatch(
      cancelBillaction(
        casherId,
        checkDevicetype === 'Tablet'
          ? orderId
          : checkDevicetype === 'Handset'
          ? route.params.orders_id
          : null,
        navigation,groceryName
      ),
    );
  };

  // let Total =
  //   global.Dimensionwidth < 468
  //     ? Math.round(
  //         (route.params.viewBill.reduce(
  //           (a, c) => a + c.products_price * c.products_quantity,
  //           0,
  //         ) *
  //           100) /
  //           100,
  //       ).toFixed(2)
  //     : Math.round(
  //         (viewBill.reduce(
  //           (a, c) => a + c.products_price * c.products_quantity,
  //           0,
  //         ) *
  //           100) /
  //           100,
  //       ).toFixed(2);


 




  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>
      {findDevicetype.isTab === 'Tablet' ? null : (
        <View style={[global.commonHeader, {padding: 15}]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../Images/left-arrow.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>

          <Text style={global.headTitle}>Descriptions</Text>

          <Text></Text>
        </View>
      )}

      <View
        style={[
          global.commonBg,
          {
            borderLeftWidth: findDevicetype.isTab === 'Tablet' ? 1 : null,
            borderLeftColor: '#DADADA',
          },
        ]}>
        <View style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{backgroundColor: '#fff'}}>
              <View style={{padding: 15}}>
                <View style={global.commonFlexrow_bt}>
                  <Text style={[{fontSize: 22}, global.COLOR_BLUE]}>
                    Order Id :{' '}
                    {checkDevicetype === 'Tablet'
                      ? orderId
                      : checkDevicetype === 'Handset'
                      ? route.params.orders_id
                      : null}
                  </Text>
                  <Text style={[{fontSize: 22}, global.COLOR_BLUE]}>
                    {global.Dimensionwidth > 468
                      ? currencyType
                      : route.params.currency_type} {checkDevicetype === 'Handset'
                      ? (
                        (Math.round(route.params.order_price).toFixed(2)))
                      : checkDevicetype === 'Tablet'
                      ?  (Math.round(posorderPrice).toFixed(2) )
                      : null}

                    
                  </Text>
                </View>

                <View style={{marginTop: 11}}>
                  <Text style={[global.commonText]}>
                    {checkDevicetype === 'Tablet'
                      ? posorderDate
                      : checkDevicetype === 'Handset'
                      ? route.params.date_purchased
                      : null}
                  </Text>

                  <Text style={[global.commonText]}>
                    {/* Cashier:{route.params.cashier}  */}
                  </Text>
                  <Text style={[global.commonText]}>
                    Cashier :
                    {checkDevicetype === 'Tablet'
                      ? poscustomerName
                      : checkDevicetype === 'Handset'
                      ? route.params.cashier
                      : null}
                  </Text>
                  <Text></Text>

                  {global.Dimensionwidth > 468 ? null : route.params
                      .orders_status === 'Pending' ? null : (
                    <Text style={{color: 'red'}}>
                      Voided by : {route.params.cashier}{' '}
                    </Text>
                  )}
                </View>
              </View>

              {global.Dimensionwidth > 468 ? (
                <View
                  style={{
                    backgroundColor: '#F2F2F2',
                    padding: 11,
                    width: '100%',
                    marginBottom: 11,
                  }}></View>
              ) : null}

              <View style={{paddingHorizontal: 15}}>
                <View style={[global.commonFlexrow_ct, {marginTop: 15}]}>
                  <View
                    style={{
                      height: 1,
                      flex: global.Dimensionwidth > 468 ? 0.5 : 0.3,
                      backgroundColor: '#E7E7E7',
                    }}></View>
                  <View style={{flex: 0.3}}>
                    <Text
                      style={[global.commonTextblack, {textAlign: 'center'}]}>
                      Description
                    </Text>
                  </View>

                  <View
                    style={{
                      height: 1,
                      flex: global.Dimensionwidth > 468 ? 0.5 : 0.3,

                      backgroundColor: '#E7E7E7',
                    }}></View>
                </View>
                {global.Dimensionwidth < 468
                  ? route.params.viewBill.map(e => {
                      return (
                        <View
                          style={[
                            global.commonFlexrow_bt,
                            {
                              paddingVertical: 14,
                              borderBottomWidth: 1,
                              borderBottomColor: '#E7E7E7',
                            },
                          ]}>
                          <View
                            style={{
                              height: 50,
                              width: 50,
                              borderRadius: 5,
                              overflow: 'hidden',
                            }}>
                            <Image
                               source={{uri: groceryName === "" ? API_Links.URL + e.image : API_Links.SHOP_URL+groceryName  +  "/" + e.image}}
                              style={{width: '100%', height: '100%'}}
                              resizeMode="cover"
                            />
                          </View>

                          <View
                            style={{
                              flex: 0.6,
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              numberOfLines={1}
                              style={[global.H1, global.COLOR_BLUE]}
                              ellipsizeMode="tail">
                              {e.products_name}
                            </Text>
                            <Text
                              numberOfLines={1}
                              style={[global.H1, global.COLOR_NORMAL]}>
                              Qty: {e.products_quantity}
                            </Text>
                          </View>

                          <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                            <Text style={[global.H1, global.COLOR_BLUE]}>
                              {' '}
                              {route.params.currency_type}{' '}

                              {(e.products_price * e.products_quantity).toFixed(2)}
                              


                            </Text>
                          </View>
                        </View>
                      );
                    })
                  : viewBill.map(e => {
                      return (
                        <View
                          style={[
                            global.commonFlexrow_bt,
                            {
                              paddingVertical: 14,
                              borderBottomWidth: 2,
                              borderBottomColor: '#E7E7E7',
                            },
                          ]}>
                          <View
                            style={{
                              height: 60,
                              width: 70,
                              backgroundColor: 'red',
                              borderRadius: 3,
                              overflow: 'hidden',
                            }}>
                            <Image
                              source={{uri: groceryName === "" ? API_Links.URL + e.image : API_Links.SHOP_URL+groceryName  +  "/" + e.image}}
                              style={{width: '100%', height: '100%'}}
                              resizeMode="cover"
                            />
                          </View>

                          <View
                            style={{
                              flex: 0.6,
                              justifyContent: 'space-between',
                              paddingHorizontal: 11,
                            }}>
                            <Text
                              numberOfLines={1}
                              style={[global.H1, global.COLOR_BLUE]}
                              ellipsizeMode="tail">
                              {e.products_name}
                            </Text>
                            <Text
                              numberOfLines={1}
                              style={[global.H1, global.COLOR_NORMAL]}>
                              Qty: {e.products_quantity}
                            </Text>
                          </View>

                          <View style={{flex: 0.4, alignItems: 'flex-end'}}>
                            <Text style={[global.H1, global.COLOR_BLUE]}>
                              {}
                              {currencyType}{' '}
{/* //{(Math.round(posorderPrice).toFixed(2) )} */}
{}
                              {(e.products_price * e.products_quantity).toFixed(2)}

                              {/* //{e.products_price * e.products_quantity} */}


                            </Text>

                          </View>
                        </View>
                      );
                    })}

                <View
                  style={{
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    marginTop: 11,
                  }}>
                  <View style={{flex: 0.3}}></View>

                  <View style={{flex: global.Dimensionwidth > 468 ? 0.4 : 0.7}}>
                    <View
                      style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
                      <View style={[global.commonFlexrow_bt]}>
                        <Text style={[{color: 'red'}, global.commonTwocol]}>
                          Discount
                        </Text>
                        <Text
                          style={[
                            {color: 'red'},
                            global.commonTwocol,
                            {textAlign: 'right'},
                          ]}>
                          {' '}
                          {global.Dimensionwidth > 468
                            ? currencyType
                            : route.params.currency_type}{' '}
                          {global.Dimensionwidth > 468
                            ? discountAmt
                            : route.params.discount_amount}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
                      <View style={[global.commonFlexrow_bt]}>
                        <Text
                          style={[global.cartFootertext, global.commonTwocol]}>
                          Sub-Total
                        </Text>
                        <Text
                          style={[
                            global.cartFootertext,
                            global.commonTwocol,
                            {textAlign: 'right'},
                          ]}>


                    
                          {global.Dimensionwidth > 468
                            ? currencyType
                            : route.params.currency_type} {global.Dimensionwidth > 468    ?  viewBill
    .reduce((a, c) => a + c.products_price * c.products_quantity, 0)
    .toFixed(2) :route.params.viewBill
    .reduce((a, c) => a + c.products_price * c.products_quantity, 0)
    .toFixed(2)   }







                          {/* {(
                            
                          Math.round(route.params.order_price * 100) / 100
                        ).toFixed(2) */}
                        
                        



                          
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
                      <View style={[global.commonFlexrow_bt]}>
                        <Text
                          style={[global.cartFootertext, global.commonTwocol]}>
                          Tax
                        </Text>
                        <Text
                          style={[
                            global.cartFootertext,
                            global.commonTwocol,
                            {textAlign: 'right'},
                          ]}>
                          {' '}
                          {global.Dimensionwidth > 468
                            ? currencyType
                            : route.params.currency_type}{' '}
                          {global.Dimensionwidth > 468
                            ? totalTax
                            : route.params.total_tax}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
                      <View style={[global.commonFlexrow_bt]}>
                        <Text
                          style={[global.cartFootertext, global.commonTwocol]}>
                          Shipping
                        </Text>
                        <Text
                          style={[
                            global.commonTextblue,
                            global.commonTwocol,
                            {textAlign: 'right'},
                          ]}>
                          {' '}
                          {global.Dimensionwidth > 468
                            ? currencyType
                            : route.params.currency_type}{' '}
                          {global.Dimensionwidth > 468
                            ? shippingCost
                            : route.params.shipping_cost}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
                      <View style={[global.commonFlexrow_bt]}>
                        <Text
                          style={[global.cartFootertext, global.commonTwocol]}>
                          Total
                        </Text>
                        <Text
                          style={[
                            global.commonTextblue,
                            global.commonTwocol,
                            {textAlign: 'right'},
                          ]}>
                          {global.Dimensionwidth > 468
                            ? currencyType
                            : route.params.currency_type} {global.Dimensionwidth > 468

                              //  (Math.round(retriew1 * 100) / 100).toFixed(2)
                              ?   (Math.round(posorderPrice).toFixed(2) )
                             
                              :  (Math.round( route.params.order_price )).toFixed(2)
                             }


{/* 
                          {global.Dimensionwidth > 468  ? posorderPrice 
                          
                           
                            :    Math.round(route.params.order_price * 100) / 100
                              .toFixed(2)

                          }
                             */}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* <View style={[global.commonFlexrow_ct, {marginTop: 15}]}>
                  <View
                    style={{
                      height: 2,
                      flex: 0.3,
                      backgroundColor: '#E7E7E7',
                    }}></View>
                  <View style={{flex: 0.4}}>
                    <Text
                      style={[global.commonTextblack, {textAlign: 'center'}]}>
                      Payment
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 2,
                      flex: 0.3,
                      backgroundColor: '#E7E7E7',
                    }}></View>
                </View> */}

                  <View style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
                    <View></View>

                    {/* <View style={[global.commonFlexrow_bt, {width: '70%'}]}>
                  <Text
                    style={[
                      global.commonTextblue,
                      global.commonTwocol,
                      {textAlign: 'right'},
                    ]}>
                    Delivery{' '}
                  </Text>
                  <Text style={[global.commonTextblue, global]}>8229.00</Text>
                </View> */}
                  </View>

                  {/* <View style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
                  <View></View>

                  <View style={[global.commonFlexrow_bt, {width: '70%'}]}>
                    <Text
                      style={[
                        global.commonTextblue,
                        global.commonTwocol,
                        {textAlign: 'right'},
                      ]}>
                      Total Payment{' '}
                    </Text>
                    <Text style={[global.commonTextblue, global]}>89.00</Text>
                  </View>
                </View> */}

                  {/* <View style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
                  <View></View>

                  <View style={[global.commonFlexrow_bt, {width: '70%'}]}>
                    <Text
                      style={[
                        global.commonTextblue,
                        global.commonTwocol,
                        {textAlign: 'right'},
                      ]}>
                      Change{' '}
                    </Text>
                    <Text style={[global.commonTextblue, global]}>89.00</Text>
                  </View>
                </View> */}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={[global.commonWhitebg, {justifyContent: 'flex-end'}]}>
          <View style={global.commonFlexrow_bt}>
            <TouchableOpacity
              onPress={() =>
                checkDevicetype === 'Tablet'
                  ? onCancelbill()
                  : oncancelBillmobile()
              }
              style={[
                global.commonButton,
                {backgroundColor: 'red'},
                global.commonTwocol,
                {
                  opacity:
                    checkDevicetype === 'Tablet'
                      ? posorderStatus !== 'Pending'
                        ? 0.3
                        : 1
                      : checkDevicetype === 'Handset'
                      ? route.params.orders_status !== 'Pending'
                        ? 0.5
                        : 1
                      : null,
                },
              ]}
              disabled={
                checkDevicetype === 'Tablet'
                  ? posorderStatus !== 'Pending'
                  : checkDevicetype === 'Handset'
                  ? route.params.orders_status !== 'Pending'
                  : null
              }>
              <Text style={global.btnText1}> Cancel Bill </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[global.commonButton, global.commonTwocol]}>
              <Text style={global.btnText1}>Re-Print</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {loader ? <Customloader /> : null}
    </SafeAreaView>
  );
}
