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
import {global} from './../styles/global'
import DeviceType from './Orientation/DeviceType'
import {Formik, useField, useFormikContext} from 'formik';
import * as yup from 'yup';

//import DateTimePickerModal from 'react-native-modal-datetime-picker';

import DateTimePicker from '@react-native-community/datetimepicker';

///import { parse, isDate } from "date-fns";
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-simple-toast';
import {API_Links} from '../Api/Api';
import moment from 'moment';

import Customloader from './Customloader';
import {useSelector} from 'react-redux';
import uuid from 'react-native-uuid';

const date = new Date();
const DeviceIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default
const DeviceId = uuid.v4();
import AuthId from './AuthId.style';

export default function ScanBarcode({navigation, onClosecustomeradd}) {
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
                      source={require('./../Images/left-arrow.png')}
                      style={{width: 20, height: 20}}
                    />
                    <Text style={[global.headSvbtn, {color: '#144693'}]}>
                      Search Customer...
                    </Text>
                  </View>
                ) : (
                  <Image
                    source={require('./../Images/left-arrow.png')}
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
             
              </View>

              <View style={[global.commonFlexrow_ct]}>
                
              </View>

              <View
                style={[global.commonFlexrow_ct, global.formverticalSpacing]}>
                
              </View>
            
            </ScrollView>

          </View>

          {loading ? <Customloader /> : null}

        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
