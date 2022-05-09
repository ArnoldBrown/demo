import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Touchable,
  Modal,
  TouchableWithoutFeedback,
  Alert,
  TouchableHighlight,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceInfo from 'react-native-device-info';
import Save from '../Save&Retriew/Save';
import Cartproductdiscount from '../Save&Retriew/Cartproductdiscount';
import {API_Links} from '../Api/Api';
import Customalerts from '../../Alerts/Customalerts';
import {useSelector, useDispatch} from 'react-redux';
import {
  Cartclear,
  cartInc_action,
  cartDec_action,
  cartdeleteSingleproduct,
} from '../../action/Cartatction';

import {cartholdAction, cartholdlistAction} from '../../action/holdAction';
import AsyncStorage from '@react-native-community/async-storage';

import {customerListaction} from '../../action/customerListaction';

import {SwipeListView} from 'react-native-swipe-list-view';
import uuid from 'react-native-uuid';
import {sessionClearaction} from '../../action/sessionAction';
import {purgeStoredState} from 'redux-persist';
import Customloader from '../Customloader';
import DiscountModel from '../Paymentscreens/DiscountModel';
import RNRestart from 'react-native-restart';

import {sessionAction} from '../../action/sessionAction';

import {CartviewAction} from '../../action/Cartatction';

import customClearCart from '../clearCart';

//import BouncyCheckbox from "react-native-bouncy-checkbox";

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import AuthId from '../AuthId.style';

import onPromisetoken from '../customPromisetoken';
import onCreatesession from '../onCreatesession';
import {TextInput} from 'react-native-paper';

const DeviceId = uuid.v4();

export default function Cart({navigation, route}) {
  //const {cartProducts} = route.params;

  const dispatch = useDispatch();
  const getCashid = useSelector(state => state.loginReducer);
  const {casherId} = getCashid;

  const ass = useSelector(state => state.cartReducer);
  const {cartItems, singlecustomerData, onload, cartId} = ass;

  const _holdReducer = useSelector(state => state.holdReducer);
  const {cartHolderdata, cartHoldloader, holdResponse} = _holdReducer;

  const sessionData = useSelector(state => state.sessionReducer);
  const {sessionResponse} = sessionData;

  const shopName = useSelector(state => state.shopnameReducer);
  const {groceryName} = shopName;

  const [amount, setAmount] = useState('');
  const [retriew1, setRetriew1] = useState('');
  const [note, onChangenote] = useState('');

  const [session, setSession] = useState(DeviceId);

  const [dbToken, setDbToken] = useState('');

  const [retriewModel, setretriewModel] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [discountCalcmodel, setdiscountCalcmodel] = useState(false);

  const [variation, setVariation] = useState(false);

  const [checkboxState, setCheckboxState] = React.useState(0);
  ///const [checkboxState2, setCheckboxState2] = React.useState(false);

  var radio_props = [
    {label: 'Guest', value: 0},
    {label: 'Customer', value: 1},
  ];

  let Total = cartItems
    .reduce((a, c) => a + c.final_price * c.customers_basket_quantity, 0)
    .toFixed(2);

  let getDiscountvalue = Total - retriew1;

  const getClear = () => {
    var str1 = amount;

    str1 = str1.substring(0, str1.length - 1);

    setAmount(str1);
    setRetriew1(str1);
  };

  const oncalculateDiscount = amount => {
    if (
      cartItems.reduce(
        (a, c) => a + c.final_price * c.customers_basket_quantity,
        0,
      ) < amount
    ) {
      Alert.alert("Can't discounting", 'Discount more than pricing.', [
        {
          text: 'OK',
          onPress: () => [setAmount(''), setRetriew1('')],
        },
      ]);
    } else {
      if (variation === true) {
        let variationAmount = amount / 100;

        let totalCart = cartItems.reduce(
          (a, c) => a + c.final_price * c.customers_basket_quantity,
          0,
        );

        let ty = variationAmount * totalCart;

        let discountDiff = totalCart - ty;

        let finalDiscount = totalCart - discountDiff;

        setRetriew1(finalDiscount);

        setdiscountCalcmodel(false);
      } else {
        setRetriew1(amount);

        setdiscountCalcmodel(false);
      }
    }
  };

  const onmobileCloseRemark = () => {
    setretriewModel(false);
  };

  const databaseToken = async () => {
    try {
      const _dbToken = await AsyncStorage.getItem('retrievToken');

      if (_dbToken !== null) {
        setDbToken(_dbToken);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onsaveRemark = async () => {
    dispatch(
      cartholdAction(
        casherId,
        dbToken !== '' ? dbToken : sessionResponse,
        note,
        groceryName,
      ),
    );

    await onPromisetoken(
      setretriewModel,
      dispatch,
      CartviewAction,
      dbToken,
      sessionResponse,
      groceryName,
    );
    await onCreatesession(
      dispatch,
      sessionAction,
      session,
      AsyncStorage,
      setDbToken,
      onChangenote,
    );
  };

  const onClosecartmodel = () => {
    setModalVisible1(false);
  };

  const onClearcart = () => {
    Alert.alert('Are you sure ', 'You want to clear all the products?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => [
          customClearCart(
            dbToken,
            sessionResponse,
            dispatch,
            session,
            groceryName,
          ),

          AsyncStorage.removeItem('retrievToken'),
          setDbToken(''),
        ],
      },
    ]);

    // if (cartItems.length === 0) {
    //   Customalerts('Your cart is Empty', 'Add some products to continue ', navigation);
    // } else {

    //   setRetriew1(' ')

    //   dispatch(Cartclear())

    // }
  };

  const oncartIncrement = item => {
    dispatch(cartInc_action(item));
  };

  const oncartDecrement = async item => {
    await dispatch(cartDec_action(item));
  };

  const oncartProductdelete = item => {
    dispatch(cartdeleteSingleproduct(item, groceryName));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      databaseToken();
    });

    return () => {
      unsubscribe;
    };
  }, []);

  

  const renderItem = data => (
    <TouchableHighlight underlayColor={'red'}>
      <View
        style={[
          {
            flexDirection: 'row',
            backgroundColor: '#fff',
            justifyContent: 'space-between',
            padding: 15,
            alignItems: 'center',
          },
          global.flexLine,
        ]}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <View style={{width: 50, height: 50}}>
            <Image
              source={{
                uri:
                  groceryName === ''
                    ? API_Links.URL + data.item.image
                    : API_Links.SHOP_URL + groceryName + '/' + data.item.image,
              }}
              style={{width: '100%', height: '100%'}}
            />
          </View>

          <View
            style={{
              flex: 1,
              marginHorizontal: 8,
              justifyContent: 'space-evenly',
            }}>
            <Text numberOfLines={1} style={global.commonTextblue}>
              {data.item.products_name}
            </Text>

            <Text style={[global.commonText, {marginVertical: 7}]}>
              RM {data.item.final_price}
            </Text>
            <Text style={global.commonText}>{data.item.value}</Text>
          </View>
        </View>

        <View
          style={[
            global.commonFlexrow_bt,
            global.cartCountbox,
            {marginTop: 20},
          ]}>
          <TouchableOpacity
            style={global.counterDec}
            onPress={() => oncartDecrement(data.item)}>
            <Text>-</Text>
          </TouchableOpacity>

          <View style={{borderLeftWidth: 1}}>
            <Text>{data.item.customers_basket_quantity}</Text>
          </View> 



          {/* <TextInput
            style={{backgroundColor:'white',color:'black'}}
            onChangeText={data.item.customers_basket_quantity}
            keyboardType="numeric"
          /> */}

       
          <TouchableOpacity
            style={global.counterInc}
            onPress={() => oncartIncrement(data.item)}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = data => (
    <View style={global.rowBack}>
      <TouchableOpacity
        style={[global.actionButton, global.deleteBtn]}
        onPress={() => oncartProductdelete(data.item)}>
        <Image
          source={require('../../Images/trash.png')}
          style={[global.settingIcon, {tintColor: '#fff'}]}
        />
        <Text style ={{color:'white',paddingTop:5}}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const onSubmitorder = () => {
    if (checkboxState === 1 && singlecustomerData === undefined) {
      Alert.alert('Choose Customer', 'To continue payment', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      navigation.navigate('Pay', {
        finalAmount: getDiscountvalue,

        discount: retriew1,

        checkboxState: checkboxState,
      });
    }
  };

  useEffect(() => {
    dispatch(cartholdlistAction(casherId, groceryName));
    console.log('product add', cartItems);
    return () => {};
  }, []);

  return (
    <SafeAreaView style={global.commonBg}>
      <View style={[global.commonHeader, {padding: 13}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={{width: 25, height: 25}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setdiscountCalcmodel(true)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRightWidth: 1,
            borderRightColor: '#D0D0D0',
            paddingRight: 15,
          }}
          disabled={cartItems.length === 0 ? true : false}>
          <Image
            source={require('../../Images/icons8-price-tag-.png')}
            style={{width: 25, height: 25, marginBottom: 6}}
          />

          <Text style={global.headSvbtn}>Discount</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // disabled={cartHolderdata ===[] ? true:false}
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={() =>
            cartItems.length === 0
              ? navigation.navigate('RetriewList')
              : setretriewModel(true)
          }>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../Images/downloads.png')}
              style={{width: 25, height: 25, marginBottom: 6}}
            />

            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 50,
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 6,
              }}>
              <Text style={global.COLOR_WHITE}>
                {cartHolderdata === undefined
                  ? '0'
                  : cartHolderdata.length === 0
                  ? '0'
                  : cartHolderdata.length}
              </Text>
            </View>
          </View>

          <Text style={global.headSvbtn}>Save & Retrieve</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Customerlistview', {})}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderLeftWidth: 1,
            borderLeftColor: '#D0D0D0',
            paddingLeft: 15,
          }}
          disabled={cartItems.length === 0 ? true : false}>
          <Image
            source={require('../../Images/customer.png')}
            style={{width: 25, height: 25, marginBottom: 6}}
          />
          <Text style={global.headSvbtn}>Customers</Text>
        </TouchableOpacity>
      </View>

      <View style={[{flex: 1}, global.commonLightbg]}>
        <View style={global.commonWhitebg}>
          {singlecustomerData === undefined ? null : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginBottom: 11,
              }}>
              <Text style={global.commonTextblack}>
                {singlecustomerData.entry_firstname}
              </Text>
            </View>
          )}

          <View style={[global.commonFlexrow_bt,{justifyContent:'space-between'}]}>
            <Text style={global.innersecTitle}>Total Amount</Text>

            <Text style={global.innersecTitle}>
              RM{' '}
              {(Math.round(parseFloat(getDiscountvalue) * 100) / 100).toFixed(
                2,
              )}
              {/* {  ( Math.round((parseFloat('44')
                    + parseFloat('0'))*100)/100)} */}
            </Text>
          </View>

          {retriew1 === '' ? (
            <Text></Text>
          ) : (
            <View
              style={[
                global.commonFlexrow_bt,
                {marginTop: 7, marginBottom: 15},
              ]}>
              <Text style={[global.innersecTitle, global.errorText]}>
                Bill Discount
              </Text>

              <Text style={([global.innersecTitle], global.errorText)}>
                {' '}
                {(Math.round(retriew1 * 100) / 100).toFixed(2)}
              </Text>
            </View>
          )}

          <View style={[global.commonFlexrow_ct, global.topSpacing]}>
            <Text style={global.commonText}>RM</Text>

            <Text style={[global.bigOtext_2]}>
              {(Math.round(getDiscountvalue * 100) / 100).toFixed(2)}
            </Text>
          </View>
          <View style={[global.commonFlexrowwe_ct, global.topSpacing]}>
            <RadioForm
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
              radio_props={radio_props}
              initial={0}
              onPress={value => {
                setCheckboxState(value);
              }}
              buttonColor={'#144692'}
              /// buttonInnerColor={'#144692'}
              //butt={'#2196f3'}
              selectedButtonColor={'#144692'}
            />
          </View>

          <TouchableOpacity
            style={[
              cartItems.length === 0
                ? global.commmonDiasbletn
                : global.commonButton,

              {marginTop: 11},
            ]}
            disabled={cartItems.length === 0 ? true : false}
            onPress={() => onSubmitorder()}>
            <Text style={global.btnText1}>Pay</Text>
          </TouchableOpacity>
        </View>

        {/* {cartItems.length === 0 ? null : (
          <View style={{backgroundColor: '#fff', flex: 0.8}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{}}>
              {cartItems.map(e => {
                return (
                  
                );
              })}
            </ScrollView>
          </View>
        )} */}
        <SwipeListView
          // useNativeDriver={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.customers_basket_id}
          data={cartItems}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-73}
          previewRowKey={cartId}
          previewOpenValue={-73}
          previewOpenDelay={1000}
          ///onRowDidOpen={onItemOpen}
        />
      </View>

      <View>
        {cartItems.length === 0 ? null : (
          <TouchableOpacity
            style={[global.commonButton, {backgroundColor: '#fff'}]}
            onPress={() => onClearcart()}>
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../Images/trash.png')}
                style={[global.commomMediumicon, {tintColor: 'red'}]}
              />
              <Text style={global.errorText}> Clear All</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        animationType="none"
        transparent={true}
        visible={discountCalcmodel}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={1}
          onPressOut={() => setdiscountCalcmodel(false)}>
          <DiscountModel
            variation={variation}
            setVariation={setVariation}
            oncalculateDiscount={oncalculateDiscount}
            getClear={getClear}
            amount={amount}
            setAmount={setAmount}
          />
        </TouchableOpacity>
      </Modal>

      {retriewModel ? (
        <Save
          onmobileCloseRemark={onmobileCloseRemark}
          onsaveRemark={onsaveRemark}
          onChangenote={onChangenote}
          note={note}
        />
      ) : null}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible1(!modalVisible1);
        }}>
        <Cartproductdiscount
          onClosecartmodel={onClosecartmodel}
          navigation={navigation}
        />
      </Modal>

      {onload ? <Customloader /> : null}
    </SafeAreaView>
  );
}
