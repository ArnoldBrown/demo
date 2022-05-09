import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import {global} from '../styles/global';

import AuthId from './AuthId.style';

import {useSelector, useDispatch} from 'react-redux';

import {Cartclear} from '../action/Cartatction';
import {ScrollView} from 'react-native-gesture-handler';
import {sessionAction} from '../action/sessionAction';

import {API_Links} from '../Screens/Api/Api';
import Customloader from './Customloader';

export default function Balance({navigation, onBalanceclose, route}) {
  const state = useSelector(state => state.currencyReducer);
  const {symbol} = state;

  const sessionData = useSelector(state => state.sessionReducer);
  const {sessionResponse} = sessionData;

  const shopName = useSelector(state => state.shopnameReducer);
  const {groceryName} = shopName;

  const getLanguageids = useSelector(state => state.languageReducer);
  const {languageId} = getLanguageids;

  const [purchaseDetail, setpurchaseDetail] = useState([]);



  let subTotal = purchaseDetail.map(e =>
    e.data
      .reduce((a, c) => a + c.products_price * c.products_quantity, 0)
      .toFixed(2),
  );


  

  let currencyType = purchaseDetail.map(e => e.currency);

  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();

  const onLoadDetail = () => {
    setLoad(true);
    var data = new FormData();

    data.append('order_id', route.params.orderResponse.order_id);
    data.append('customers_id', route.params.orderResponse.customer_id);
    data.append('currency_code', symbol);
    data.append('language_id', languageId);

    fetch(
      groceryName === ''
        ? API_Links.BASE_URL + API_Links.ORDER_DESCRIPTION_ID
        : API_Links.SHOP_URL +
            groceryName +
            '/' +
            'api' +
            '/' +
            API_Links.ORDER_DESCRIPTION_ID,
      {
        method: 'POST',
        headers: {
          'consumer-key': API_Links.CONSUMER_KEY,
          'consumer-secret': API_Links.SECRET_KEY,
          'consumer-nonce':
            AuthId._currDate.getMilliseconds().toString() +
            AuthId._currDate.getTime().toString() +
            '-' +
            Math.floor(Math.random() * 999) +
            1,
          'consumer-device-id': AuthId._currDeviceId,
          'consumer-ip': AuthId._currIp,
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      },
    )
      .then(response => response.json())
      .then(e => {
        setLoad(false);
        setpurchaseDetail(e.data);

       
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

      onLoadDetail();

    });

    return () => {
      unsubscribe;
    };
  }, []);






    function ongenerateSession() {
    return new Promise(resolve => {
      setTimeout(() => {
          
        resolve(
        
        
          dispatch(sessionAction(sessionResponse + Math.random() * 999)),
        );
      }, 230);
    });
  }




const onclearCartpr =  async ()=>{

  dispatch(Cartclear(sessionResponse))

 await ongenerateSession()
 



}








  let getbalanceAmount = route.params.enterAmount;

  let setbalanceAmount = (Math.round(getbalanceAmount * 100) / 100).toFixed(2);

  return (
    <SafeAreaView style={[global.commonBg, {borderRadius: 11}]}>
      <View style={global.commonMobileHeader}>
        <View></View>

        <Text style={global.bigOtext_2}>Change</Text>

        <View></View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, backgroundColor: '#fff', padding: 5}}>
          {load ? null : (
            <View style={{flex: 1}}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={require('../Images/animation_500_ks0bn7a7.gif')}
                  style={{width: 115, height: 115}}
                />
                <View></View>

                <View style={[global.flexRowsec]}>
                  <Text style={{position: 'relative', left: -9, fontSize: 20}}>
                    {symbol}
                  </Text>

                  <Text style={[{textAlign: 'center', fontSize: 40}]}>
                    {setbalanceAmount}
                  </Text>
                </View>
              </View>

              <View style={{backgroundColor: '#fff'}}>
                <View style={[{paddingHorizontal: 15}, {marginTop: 15}]}>
                  <View style={global.commonFlexrow_bt}>
                    <Text style={[{fontSize: 18}, global.COLOR_BLUE]}>
                      Order Id :{route.params.orderResponse.order_id}
                    </Text>
                  </View>
                </View>

                <View style={{paddingHorizontal: 15}}>
                  <View style={[global.commonFlexrow_ct, {marginTop: 11}]}>
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
                  <View>
                    {purchaseDetail.map(e =>
                      e.data.map(e => {
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
                                source={{
                                  uri:
                                    groceryName === ''
                                      ? API_Links.URL + e.image
                                      : API_Links.SHOP_URL +
                                        groceryName +
                                        '/' +
                                        e.image,
                                }}
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
                                {' '}
                                {currencyType}{' '}
                                {(
                                  Math.round(e.final_price * 100) / 100
                                ).toFixed(2)}
                              </Text>
                            </View>
                          </View>
                        );
                      }),
                    )}
                  </View>
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                      marginTop: 11,
                    }}>
                    <View style={{flex: 0.3}}></View>

                    <View
                      style={{flex: global.Dimensionwidth > 468 ? 0.4 : 0.7}}>
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
                            {currencyType}{' '}
                            {purchaseDetail
                              .map(e => e.discount_amount)
                              .toString()}
                            {/* {purchaseDetail[0].discount_amount} */}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
                        <View style={[global.commonFlexrow_bt]}>
                          <Text
                            style={[
                              global.cartFootertext,
                              global.commonTwocol,
                            ]}>
                            Sub-Total
                          </Text>
                          <Text
                            style={[
                              global.cartFootertext,
                              global.commonTwocol,
                              {textAlign: 'right'},
                            ]}>
                            {currencyType} {subTotal}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
                        <View style={[global.commonFlexrow_bt]}>
                          <Text
                            style={[
                              global.cartFootertext,
                              global.commonTwocol,
                            ]}>
                            Tax
                          </Text>
                          <Text
                            style={[
                              global.cartFootertext,
                              global.commonTwocol,
                              {textAlign: 'right'},
                            ]}>
                            {currencyType}{' '}
                            {purchaseDetail.map(e => e.total_tax).toString()}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
                        <View style={[global.commonFlexrow_bt]}>
                          <Text
                            style={[
                              global.cartFootertext,
                              global.commonTwocol,
                            ]}>
                            Shipping
                          </Text>
                          <Text
                            style={[
                              global.commonTextblue,
                              global.commonTwocol,
                              {textAlign: 'right'},
                            ]}>
                            {currencyType}{' '}
                            {purchaseDetail
                              .map(e => e.shipping_cost)
                              .toString()}
                            {/* //{purchaseDetail[0].shipping_cost} */}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
                        <View style={[global.commonFlexrow_bt]}>
                          <Text
                            style={[
                              global.cartFootertext,
                              global.commonTwocol,
                            ]}>
                            Total
                          </Text>
                          <Text
                            style={[
                              global.commonTextblue,
                              global.commonTwocol,
                              {textAlign: 'right'},
                            ]}>
                            {currencyType}{' '}
                            {(
                              Math.round(
                                purchaseDetail
                                  .map(e => e.order_price)
                                  .toString() * 100,
                              ) / 100
                            ).toFixed(2)}
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

                    <View
                      style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
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
            </View>
          )}
        </View>
      </ScrollView>

      <View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 11,
          },
        ]}>
        <TouchableOpacity
          style={[
            global.commonButton,
            {width: 150, marginRight: 11, backgroundColor: 'red'},
          ]}
          onPress={() => [
            navigation.navigate('Home'),
            onclearCartpr()
          ]}>
          <Text style={global.btnText1}>Close</Text>


        </TouchableOpacity>

        <TouchableOpacity style={[global.commonButton, {width: 150}]} onPress={()=>[ onclearCartpr()]}>
          <Text style={global.btnText1}>Print</Text>
        </TouchableOpacity>
      </View>

      {load ? <Customloader /> : null}
    </SafeAreaView>
  );
}
