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
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import {Formik, useField, useFormikContext} from 'formik';
import * as yup from 'yup';

//import DateTimePickerModal from 'react-native-modal-datetime-picker';

import DateTimePicker from '@react-native-community/datetimepicker';

///import { parse, isDate } from "date-fns";
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-simple-toast';
import {API_Links} from '../Api/Api';
import moment from 'moment';

import Customloader from '../Customloader';
import {useSelector} from 'react-redux';
import uuid from 'react-native-uuid';

const date = new Date();
const DeviceIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default
const DeviceId = uuid.v4();
import AuthId from '../AuthId.style';

export default function Addproduct({navigation, onClosecustomeradd}) {
  const shopName = useSelector(state => state.shopnameReducer);

  const {groceryName} = shopName;

  const [firstName, setfirstName] = React.useState('');
  const [lastName, setLastname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [phoneNumber, setPhonenumber] = React.useState('');
  const [phoneCode, setPhonecode] = React.useState('+ 60');
  const [gender, setGender] = React.useState('');
  const [DOB, setDOB] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [country, setCountry] = React.useState(null);
  const [state, setState] = React.useState(null);
  const [city, setCity] = React.useState('');
  const [postalCode, setPostalcode] = React.useState('');
  const [loading, setLoading] = useState(false);

  const [countryList, setCountrylist] = useState([]);
  const [stateList, setStatelist] = useState([]);

  const [isDatePickerVisible, setPickervisible] = useState(false);

  const emailValid = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  const sendUserdata = () => {
    setLoading(true);

    var data = new FormData();

    data.append('customers_firstname', firstName);
    data.append('customers_lastname', lastName);
    data.append('email', email);
    data.append('password', password);
    data.append('customers_telephone', phoneNumber);

    data.append('country_code', phoneCode.slice(1));
    data.append('customers_gender', gender);
    data.append('customers_dob', DOB);
    data.append('customers_address', address);

    data.append('country', country);
    data.append('state', state);
    data.append('city', city);
    data.append('postal_code', postalCode);

    fetch(
      groceryName === ''
        ? API_Links.BASE_URL + API_Links.ADD_CUSTONMER
        : API_Links.SHOP_URL +
            groceryName +
            '/' +
            'api' +
            '/' +
            API_Links.ADD_CUSTONMER,
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
        setLoading(false);
        console.log('e4444', e);

        Alert.alert(e.message, '', [
          {
            text: 'OK',
            onPress: () =>
              global.Dimensionwidth > 468
                ? onClosecustomeradd()
                : navigation.goBack(),
          },
        ]);
      })

      .catch(e => {
        console.log(e);
      });
  };

  const onsubmit = () => {
    if (firstName.length > 0) {
      ///firname ---//

      if (lastName.length > 0) {
        ////---lasrtname=---///

        if (password.length > 0) {
          if (password.length >= 8) {
            if (email.length > 0) {
              if (emailValid(email)) {
                if (phoneNumber.length >= 10) {
                  if (gender.length > 0) {
                    if (DOB.length > 0) {
                      if (address.length > 0) {
                        if (country !== null) {
                          if (state !== null) {
                            if (city.length > 0) {
                              if (postalCode.length > 0) {
                                sendUserdata();
                              } else {
                                Toast.showWithGravity(
                                  'Enter Postal Code',
                                  Toast.SHORT,
                                  Toast.TOP,
                                );
                              }
                            } else {
                              Toast.showWithGravity(
                                'Enter City',
                                Toast.SHORT,
                                Toast.TOP,
                              );
                            }
                          } else {
                            Toast.showWithGravity(
                              'Select State',
                              Toast.SHORT,
                              Toast.TOP,
                            );
                          }
                        } else {
                          Toast.showWithGravity(
                            'Select Country',
                            Toast.SHORT,
                            Toast.TOP,
                          );
                        }
                      } else {
                        Toast.showWithGravity(
                          'Enter Address',
                          Toast.SHORT,
                          Toast.TOP,
                        );
                      }
                    } else {
                      Toast.showWithGravity(
                        'Enter Date of Birth',
                        Toast.SHORT,
                        Toast.TOP,
                      );
                    }
                  } else {
                    Toast.showWithGravity(
                      'Enter Gender',
                      Toast.SHORT,
                      Toast.TOP,
                    );
                  }
                } else {
                  Toast.showWithGravity(
                    'Enter Valid Number',
                    Toast.SHORT,
                    Toast.TOP,
                  );
                }
              } else {
                Toast.showWithGravity(
                  'Enter Valid Email',
                  Toast.SHORT,
                  Toast.TOP,
                );
              }
            } else {
              Toast.showWithGravity('Enter Email', Toast.SHORT, Toast.TOP);
            }
          } else {
            Toast.showWithGravity(
              'Password must have atleast 8 characters',
              Toast.SHORT,
              Toast.TOP,
            );
          }

          // if (password.length> 8) {

          //   Toast.showWithGravity('Too Short Password', Toast.SHORT, Toast.TOP);
          // }

          // if (email.length > 0) {
          //   if (emailValid(email)) {
          //   } else {
          //     Toast.showWithGravity('Enter valid email', Toast.SHORT, Toast.TOP);
          //   }
          // }
        } else {
          Toast.showWithGravity('Enter Password', Toast.SHORT, Toast.TOP);
        }
      }

      ////end lastname
      else {
        //emdlastname
        Toast.showWithGravity('Enter Last name', Toast.SHORT, Toast.TOP);
      }
    } ///endfirname
    else {
      ///end firname
      Toast.showWithGravity('Enter Your Name', Toast.SHORT, Toast.TOP);
    }
  };

  useEffect(() => {
    fetch(
      groceryName === ''
        ? API_Links.BASE_URL + API_Links.GET_COUNTRY
        : API_Links.SHOP_URL +
            groceryName +
            '/' +
            'api' +
            '/' +
            API_Links.GET_COUNTRY,
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
      },
    )
      .then(response => response.json())
      .then(e => {
        setCountrylist(e.data);
      })
      .catch(e => console.log(e));

    return () => {};
  }, []);

  const onchooseState = id => {
    var data = new FormData();

    data.append('zone_country_id', id);

    fetch(
      groceryName === ''
        ? API_Links.BASE_URL + API_Links.GET_ZONES
        : API_Links.SHOP_URL +
            groceryName +
            '/' +
            'api' +
            '/' +
            API_Links.GET_ZONES,
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
        setStatelist(e.data);
      })
      .catch(e => console.log(e));
  };

  const handleDate = pickeddate => {
    setPickervisible(false);

    let dob = pickeddate.timestamp;
    let getDOB = moment(dob).format('YYYY-MM-d');
    ///console.log(getDOB)

    setDOB(getDOB);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={[global.commonBg, global.Dimensionwidth > 468 ? ({marginTop:80,marginBottom:80,borderRadius:20}) : ({marginTop:0,marginBottom:0,borderRadius:0}) , {borderRadius: 11}]}>
          <StatusBar
            backgroundColor="#EFEFEF"
            barStyle="dark-content"></StatusBar>

          <View
            style={[
              global.commonHeader,
              {
                position: 'relative',
                padding: 20,
                justifyContent: 'space-between',
                flexDirection: 'row',
              },
            ]}>
            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                {global.Dimensionwidth > 468 ? (
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../Images/left-arrow.png')}
                      style={{width: 20, height: 20}}
                    />
                    <Text style={[global.headSvbtn, {color: '#144693'}]}>
                      Search Customer...
                    </Text>
                  </View>
                ) : (
                  <Image
                    source={require('../../Images/left-arrow.png')}
                    style={{width: 20, height: 20}}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View style={{flex: 1, alignSelf: 'center'}}>
              <Text
                style={[
                  global.headTitle,
                  global.Dimensionwidth > 468
                    ? {fontSize: 19.5}
                    : {fontSize: 15.5},
                  {textAlign: 'center'},
                ]}>
                Add Customer
              </Text>
            </View>

            <View style={{flex: 1}}>
              <TouchableOpacity onPress={() => onsubmit()}>
                <Text
                  style={[
                    global.headTitle,
                    global.Dimensionwidth > 468
                      ? {fontSize: 19.5}
                      : {fontSize: 15.5},
                    {textAlign: 'right', color: '#144693'},
                  ]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              padding: 15,
              maxWidth: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{width: 555, maxWidth: '100%'}}>
              <View
                style={[global.commonFlexrow_ct, global.formverticalSpacing]}>
                <View style={[global.inputBox, global.commonTwocol]}>
                  <TextInput
                    placeholder="FirstName *"
                    style={[global.input]}
                    onChangeText={setfirstName}
                    value={firstName}
                  />
                </View>

                <View style={[global.inputBox, global.commonTwocol]}>
                  <TextInput
                    style={[global.input]}
                    placeholder="LastName *"
                    onChangeText={setLastname}
                    value={lastName}
                  />
                </View>
              </View>

              <View style={[global.commonFlexrow_ct]}>
                <View style={[global.inputBox, global.commonTwocol]}>
                  <TextInput
                    style={[global.input]}
                    placeholder="Email *"
                    onChangeText={setEmail}
                    value={email}
                  />
                </View>

                <View style={[global.inputBox, global.commonTwocol]}>
                  <TextInput
                    style={[global.input]}
                    placeholder="Password *"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                  />
                </View>
              </View>

              <View
                style={[global.commonFlexrow_ct, global.formverticalSpacing]}>
                <View
                  style={{
                    flex: 0.1,
                    backgroundColor: '#fff',
                    height: 45,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 6,
                    borderColor: '#b6b9bd',
                    borderWidth: 1,
                    borderRightWidth: 0,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                  }}>
                  <TextInput
                    style={[global.input]}
                    keyboardType="number-pad"
                    onChangeText={setPhonecode}
                    value={`${phoneCode}`}
                  />
                </View>

                <View
                  style={[
                    global.inputBox,
                    {
                      flex: 0.9,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    },
                  ]}>
                  <TextInput
                    style={[global.input]}
                    placeholder="Phone Number *"
                    keyboardType="number-pad"
                    onChangeText={setPhonenumber}
                    value={phoneNumber}
                  />
                </View>
              </View>
              <View style={[global.commonFlexrow_ct]}>
                <View style={[global.inputBox, global.commonTwocol]}>
                  <RNPickerSelect
                    style={{
                      placeholder: {color: '#b6b9bd'},
                      inputIOS: {color: '#000'},
                      inputAndroid: {color: '#000'},
                    }}
                    placeholder={{
                      label: ' Choose Gender *',
                      value: '',
                    }}
                    onValueChange={value => [
                      //setGh(value),
                      setGender(value),
                    ]}
                    items={[
                      {label: 'Male', value: 'Male'},
                      {label: 'Female', value: 'Female'},
                    ]}
                  />
                </View>

                <TouchableOpacity
                  style={[global.inputBox, global.commonTwocol]}
                  onPress={() => setPickervisible(true)}>
                  {DOB === '' ? (
                    <Text style={{color: '#DBDBDC'}}>Date of Birth</Text>
                  ) : (
                    <Text style={{color: '#000'}}>{DOB}</Text>
                  )}
                </TouchableOpacity>
              </View>

              <View
                style={[global.commonFlexrow_ct, global.formverticalSpacing]}>
                <View style={[global.inputBox]}>
                  <TextInput
                    style={[global.input]}
                    placeholder="Address *"
                    multiline={true}
                    onChangeText={setAddress}
                    value={address}
                  />
                </View>

                {/* <View style={[global.inputBox ,global.commonTwocol]}>
                      <RNPickerSelect
                        style={{
                          placeholder: {color: '#b6b9bd'},
                          inputIOS: {color: '#000'},
                          inputAndroid: {color: '#000'},
                        }}
                        placeholder={{
                          label: 'Gender',
                          value: '',
                        }}
                        onValueChange={value => [
                          //setGh(value),
                          
                        ]}
                       
                        items={[
                          {label: 'Male', value:'Male'},
                          {label: 'Female', value: 'Female'},
                          
                        ]}
                      />

                      
                    </View> */}
              </View>

              <View style={[global.commonFlexrow_ct]}>
                <View style={[global.inputBox, global.commonTwocol]}>
                  <RNPickerSelect
                    style={{
                      placeholder: {color: '#b6b9bd'},
                      inputIOS: {color: '#000'},
                      inputAndroid: {color: '#000'},
                    }}
                    placeholder={{
                      label: 'Select Country *',
                      value: '',
                    }}
                    onValueChange={value => [
                      setCountry(value),
                      onchooseState(value),
                    ]}
                    items={countryList.map(e => {
                      return {label: e.countries_name, value: e.countries_id};
                    })}
                  />
                </View>

                <View style={[global.inputBox, global.commonTwocol]}>
                  <RNPickerSelect
                    style={{
                      placeholder: {color: '#b6b9bd'},
                      inputIOS: {color: '#000'},
                      inputAndroid: {color: '#000'},
                    }}
                    placeholder={{
                      label: 'Select State *',
                      value: '',
                    }}
                    onValueChange={value => [setState(value)]}
                    items={stateList.map(e => {
                      return {label: e.zone_name, value: e.zone_id};
                    })}
                  />
                </View>
              </View>

              <View
                style={[global.commonFlexrow_ct, global.formverticalSpacing]}>
                <View style={[global.inputBox, global.commonTwocol]}>
                  <TextInput
                    style={[global.input]}
                    placeholder="City *"
                    onChangeText={setCity}
                    value={city}
                  />
                </View>

                <View style={[global.inputBox, global.commonTwocol]}>
                  <TextInput
                    style={[global.input]}
                    placeholder="Postal Code * "
                    onChangeText={setPostalcode}
                    value={postalCode}
                    keyboardType="number-pad"
                  />
                </View>
              </View>
            </ScrollView>

            {/* <View style={{padding: 15}}>
              <TouchableOpacity
                style={[
                  global.commonButton,
                  {width: global.Dimensionwidth / 2.1},
                ]}
                onPress={() => onsubmit()}>
                <Text style={global.btnText1}>Save</Text>
              </TouchableOpacity>
            </View> */}
          </View>

          {loading ? <Customloader /> : null}

          {/* <DateTimePickerModal
            isVisible={isDatePickerVisible}

            mode="date"

             onConfirm={handleDate} 

            onCancel={()=>setPickervisible(false)}


            headerTextIOS="Pick a Date"
          /> */}

          {isDatePickerVisible ? (
            <DateTimePicker
              mode="date"
              onChange={e => handleDate(e.nativeEvent)}
              onTouchCancel={() => setPickervisible(false)}
              display="default"
              // value={new Date()}
              value={new Date()}
            />
          ) : null}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
