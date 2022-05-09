import React, {useState, useEffect} from 'react';
import {global} from '../../styles/global';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import {languageAction} from '../../action/languageAction';
import {currencyAction} from '../../action/currencyAction';
import AuthId from '../AuthId.style';

import {
  Platform,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Touchable,
  Dimensions,
  ScrollView,
  Image,
  StatusBar,
  Alert,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

import {useDispatch, useSelector} from 'react-redux';

import {loginAction} from '../../action/loginAction';

import {shopnameAction, shopnameClear} from '../../action/shopnameAction';

import {guestAction} from '../../action/guestAction';

import Customloader from '../Customloader';

import uuid from 'react-native-uuid';

const date = new Date();

const cIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default

const cDid = uuid.v4();

export default function Login({navigation}) {
  //const [shopName, onChangeshopName] = React.useState('');

  const [email, onChangeEmail] = React.useState('');

  const [password, onChangePassword] = React.useState('');

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//

  const getTokenss = useSelector(state => state.shopnameReducer);

  const {groceryName} = getTokenss;

  const onLoading = () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(setLoading(false));
      }, 1000);
    });
  };

  const onLogin = async () => {
    try {
      setLoading(true);

      dispatch(loginAction(email, password, date, cIp, cDid, groceryName));

      await onLoading();
    } catch (e) {
      // setLoading(false)
      console.log('Error', e);
    }
  };

  useEffect(() => {
    dispatch(currencyAction(groceryName));

    dispatch(languageAction(groceryName));

    dispatch(guestAction(groceryName));

    return () => {};
  }, []);

  const onChangeshopName = e => {
    dispatch(shopnameAction(e));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={global.commonBg}>
          <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>

          <View style={global.commonMobileHeader}>
            <View></View>

            <View></View>
            {/* <TouchableOpacity>
          <Text style={global.appColor}>Help? </Text>
        </TouchableOpacity> */}
          </View>

          <View
            style={{
              backgroundColor: '#F1F6FA',
              flexGrow: 1,

              paddingVertical: 30,
              width: '100%',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: windowWidth > 480 ? windowWidth / 2 : '100%',
                paddingHorizontal: 15,
                flex: 1,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                  overflow: 'hidden',
                }}>
                <Image
                  source={require('../../Images/Logo.png')}
                  style={{width: 100, height: 100}}
                />
              </View>

              <Text></Text>

              <View style={[global.inputBox, global.bottomSpacing]}>
                <TextInput
                  style={global.input}
                  onChangeText={e => onChangeshopName(e)}
                  //onChangeText={text => _filterUser(text)}
                  /// value={shopName}

                  placeholder="Shop Name"
                />
              </View>

              <View style={[global.inputBox, global.bottomSpacing]}>
                <TextInput
                  style={global.input}
                  onChangeText={onChangeEmail}
                  value={email}
                  placeholder="Email"
                />
              </View>

              <View style={[global.inputBox, global.bottomSpacing]}>
                <TextInput
                  style={global.input}
                  onChangeText={onChangePassword}
                  value={password}
                  placeholder="Passowrd"
                  secureTextEntry={true}
                />
              </View>

              <TouchableOpacity
                onPress={() => onLogin()}
                disabled={email === '' || password === ''}>
                <View
                  style={
                    email === '' || password === ''
                      ? global.commmonDiasbletn
                      : global.commonButton
                  }>
                  <Text style={global.btnText1}>Sign In</Text>

                  {loading ? (
                    <ActivityIndicator
                      style={{marginLeft: 11}}
                      color={'#fff'}
                      size={'small'}
                    />
                  ) : null}
                </View>
              </TouchableOpacity>

              {/* <View
              style={{
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgetPassword')}>
                <Text style={global.appColor}>Forget Password ?</Text>
              </TouchableOpacity>
            </View> */}

              {/* <View>
              <View
                style={[
                  global.commonFlexrow_ct,
                  {marginTop: 30, marginBottom: 11},
                ]}>
                <View style={[global.commonTwocol, {width: '40%'}]}>
                  <View
                    style={{
                      width: '100%',
                      height: 2,
                      backgroundColor: '#E7E7E7',
                    }}></View>
                </View>

                <View style={{paddingHorizontal: 15, width: '20%'}}>
                  <Text style={[global.commonTextH1, {textAlign: 'center'}]}>
                    OR
                  </Text>
                </View>

                <View style={[global.commonTwocol, {width: '40%'}]}>
                  <View
                    style={{
                      width: '100%',
                      height: 2,
                      backgroundColor: '#E7E7E7',
                    }}></View>
                </View>
              </View>

              <TouchableOpacity
                style={[global.commonButton, global.topSpacing]}>
                <Text style={[{textAlign: 'center'}, global.btnText1]}>
                  Facebook
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[global.commonWhitebtn, global.topSpacing]}>
                <View style={global.flexRowsec}>
                  <Image
                    source={require('../../Images/goggleIcon.png')}
                    style={[global.settingIcon, {marginRight: 11}]}
                  />

                  <Text style={[{textAlign: 'center'}, global.btnText2]}>
                    Sign In
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[global.commonWhitebtn, global.topSpacing]}>
                <View style={global.flexRowsec}>
                  <Image
                    source={require('../../Images/apple.png')}
                    style={[global.settingIcon, {marginRight: 11}]}
                  />
                  <Text
                    style={[
                      {textAlign: 'center'},
                      global.btnText2,
                      {color: '#000'},
                    ]}>
                    Sign in with Apple
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  global.transparentButton,
                  global.topSpacing,
                  {borderColor: 'red'},
                ]}
                onPress={() => navigation.navigate('Createaccount')}>
                <Text
                  style={[
                    {textAlign: 'center'},
                    global.btnText2,
                    global.errorText,
                  ]}>
                  Sign Up for Free
                </Text>
              </TouchableOpacity>
            </View> */}
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
