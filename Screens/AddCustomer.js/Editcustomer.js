import React, {useState, useEffect, useRef} from 'react';
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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
///import { parse, isDate } from "date-fns";
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-simple-toast';
import {API_Links} from '../Api/Api';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';

import Customloader from '../Customloader';

import uuid from 'react-native-uuid';

import {useDispatch, useSelector} from 'react-redux';

import {customereditAction} from '../../action/edituserAction'
import  AuthId  from '../AuthId.style'


import DeviceInfo from 'react-native-device-info';




const date = new Date();
const DeviceIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default
const DeviceId = uuid.v4();

// function parseDateString(value, originalValue) {
//   const parsedDate = isDate(originalValue)
//     ? originalValue
//     : parse(originalValue, "dd-MM-yyyy", new Date());

//   return parsedDate;
// }

export default function Editcustomer({navigation, route}) {

  const shopName = useSelector(state => state.shopnameReducer);
  
  const {groceryName} = shopName;



  const [checkDevicetype, setDevicetype] = React.useState(' ');

  useEffect(() => {
    setDevicetype(DeviceInfo.getDeviceType);
  }, []);




  const [firstName, setfirstName] = React.useState(route.params.first_name ===undefined ? route.params.customerdt.first_name :  route.params.first_name)    ;
  const [lastName, setLastname] = React.useState( route.params.last_name ===undefined ?   route.params.customerdt.last_name : route.params.last_name );
  const [email, setEmail] = React.useState(route.params.email===undefined? route.params.customerdt.email :  route.params.email  );
  const [phoneNumber, setPhonenumber] = React.useState( route.params.phone  === undefined ? route.params.customerdt.phone: route.params.phone  );
  const [phoneCode, setPhonecode] = React.useState(
    route.params.country_code !== undefined ? "+"+  route.params.country_code : "+"+ route.params.customerdt.country_code ,
  );
  const [gender, setGender] = React.useState( route.params.gender ===undefined ?    route.params.customerdt.gender   :route.params.gender );
  const [DOB, setDOB] = React.useState( route.params.dob ===undefined ?    route.params.customerdt.dob :  route.params.dob   );

  const [address, setAddress] = React.useState(
      route.params.entry_street_address ===undefined ? route.params.customerdt.entry_street_address  : route.params.entry_street_address
  );

  //const [country, setCountry] = React.useState( route.params.countries_name === undefined ? route.params.customerdt.countries_name :  route.params.countries_name  );
  //const [state, setState] = React.useState( route.params.zone_name === undefined  ? route.params.customerdt.zone_name : route.params.zone_name );
const [country, setCountry] = "";
  const [state, setState] ="";


  const [countryId, setCountryId] = React.useState(  route.params.entry_country_id === undefined  ? route.params.customerdt.entry_country_id : route.params.entry_country_id );

  const [stateId, setStateId] = React.useState( route.params.entry_zone_id === undefined ?route.params.customerdt.entry_zone_id : route.params.entry_zone_id);



  const [city, setCity] = React.useState(route.params.city  === undefined ?route.params.customerdt.city : route.params.city  );



  const [postalCode, setPostalcode] = React.useState( route.params.postal_code === undefined ? route.params.customerdt.postal_code : route.params.postal_code );




  const [loading, setLoading] = useState(false);

  const [countryList, setCountrylist] = useState([]);
  const [stateList, setStatelist] = useState([]);

  const [isDatePickerVisible, setPickervisible] = useState(false);

  const refRBSheet = useRef();

  const [ctyRef, setCtyref] = useState(true);

  const [sateRef, setStateref] = useState(false);

  const dispatch = useDispatch();

const editstate = useSelector(state => state.edituserReducer)

const{loader}=editstate



  //console.log("route.params.zone_name",route.params.zone_name)

  const findDevicetype = DeviceType();

  const emailValid = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  };

  const sendUserdata = async () => {


dispatch(customereditAction( firstName , lastName ,email  ,phoneNumber  ,phoneCode.slice(1) 
 , gender ,DOB,

 checkDevicetype==="Handset" ? route.params.id  : checkDevicetype==="Tablet" ? route.params.customerdt.id  : null,


 route.params.address_book_id ,countryId ,stateId ,city ,postalCode,address , groceryName



 

  ))






    
  };

  const onsubmit = () => {
    if (firstName.length > 0) {
      ///firname ---//

      if (lastName.length > 0) {
        ////---lasrtname=---///

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
                Toast.showWithGravity('Enter Gender', Toast.SHORT, Toast.TOP);
              }
            } else {
              Toast.showWithGravity(
                'Enter Valid Number',
                Toast.SHORT,
                Toast.TOP,
              );
            }
          } else {
            Toast.showWithGravity('Enter Valid Email', Toast.SHORT, Toast.TOP);
          }
        } else {
          Toast.showWithGravity('Enter Email', Toast.SHORT, Toast.TOP);
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
    fetch( groceryName === '' ? API_Links.BASE_URL + API_Links.GET_COUNTRY : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.GET_COUNTRY, {

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
        'consumer-device-id':AuthId._currDeviceId,
       'consumer-ip':AuthId._currIp ,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(e => {
        setCountrylist(e.data);
      })
      .catch(e => console.log(e));

    return () => {};
  }, []);


      const onchooseState =()=>{
        var data = new FormData();

        data.append('zone_country_id', countryId);
    
        fetch( groceryName === '' ? API_Links.BASE_URL + API_Links.GET_ZONES : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.GET_ZONES, {

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
            'consumer-device-id':AuthId._currDeviceId,
           'consumer-ip':AuthId._currIp ,
            'Content-Type': 'multipart/form-data',
          },
          body: data,
        })
          .then(response => response.json())
          .then(e => {
            setStatelist(e.data);
          })
          .catch(e => console.log(e));

      }
   


  const handleDate = pickeddate => {
    setPickervisible(false);

    let dob = pickeddate;
    let getDOB = moment(dob).format('YYYY-MM-d');
    console.log(getDOB);

    setDOB(getDOB);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={[global.commonBg]}>
          <StatusBar
            backgroundColor="#EFEFEF"
            barStyle="dark-content"></StatusBar>

          <View style={[global.commonHeader, {padding: 18}]}>
            <TouchableOpacity
              onPress={() =>
                
                   navigation.goBack()
              }>
              <Image
                source={require('../../Images/left-arrow.png')}
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>

            <Text style={global.headTitle}>Edit Customer</Text>

            <View></View>
          </View>

          <View style={{flex: 1, padding: 15 ,width:"100%" ,alignItems:"center" ,justifyContent:"center" }}>
            <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle= { {width : global.Dimensionwidth <  468 ? "100%" : 500}}>
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
                <View style={[global.inputBox]}>
                  <TextInput
                    style={[global.input]}
                    placeholder="Email *"
                    onChangeText={setEmail}
                    value={email}
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
                    value={ gender}
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
                    <Text>{DOB}</Text>
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
                <TouchableOpacity
                  style={[global.inputBox, global.commonTwocol]}
                  onPress={() => [
                    refRBSheet.current.open(),
                    setCtyref(true),
                    setStateref(false),
                  ]}>
                  <Text>{country}</Text>

                  {/* <RNPickerSelect
                    style={{
                      placeholder: {color: '#b6b9bd'},
                      inputIOS: {color: '#000'},
                      inputAndroid: {color: '#000'},
                    }}
                    placeholder={{
                      label: 'Select Country *',
                      value: '',
                    }}

                    onValueChange={value => [setCountry(value) ,onchooseState(value) ]}

           value={route.params.countries_name}
           onOpen={()=>route.params.countries_name}

                    items={

                      countryList.map((e)=>{

return (

  {label: e.countries_name, value: e.countries_id }



)




                      })


                    }
                  /> */}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[global.inputBox, global.commonTwocol]}
                  onPress={() => [
                    refRBSheet.current.open(),
                    setCtyref(false),
                    setStateref(true),
                  ]}>
                  {/* <RNPickerSelect
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

                    value={route.params.zone_name}
                    onOpen={()=>route.params.zone_name}

                    items={
stateList.map((e)=>{
return (


  {label: e.zone_name, value:e.zone_id}




)




})



                      
                    }
                  /> */}

                  <Text>{state}</Text>
                </TouchableOpacity>
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

            <View style={{padding: 15}}>
            <TouchableOpacity
              style={[global.commonButton,{width:global.Dimensionwidth/2.4}]}
              onPress={() => onsubmit()}>
              <Text style={global.btnText1}>Save</Text>
            </TouchableOpacity>
          </View>

         
          </View>

        





          {loading ? <Customloader /> : null}

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDate}
            onCancel={() => setPickervisible(false)}
            headerTextIOS="Pick a Date"
          />

          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={true}
            customStyles={{
              wrapper: {
                backgroundColor: 'transparent',
              },
              draggableIcon: {
                backgroundColor: '#000',
              },
            }}>
            <View>
              <ScrollView
                contentContainerStyle={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {ctyRef
                  ? countryList.map(e => {
                      return (
                        <TouchableOpacity
                          onPress={() => [
                            setCountry(e.countries_name),
                            refRBSheet.current.close(),
                            setCountryId(e.countries_id),
                            onchooseState(e.countries_id),
                          ]}
                          style={{padding: 11}}>
                          <Text>{e.countries_name}</Text>
                        </TouchableOpacity>
                      );
                    })
                  : sateRef
                  ? stateList.map(e => {
                      return (
                        <TouchableOpacity
                          onPress={() => [
                            setState(e.zone_name),
                            refRBSheet.current.close(),
                            setStateId(e.zone_id),
                          ]}
                          style={{padding: 11}}>
                          <Text>{e.zone_name}</Text>
                        </TouchableOpacity>
                      );
                    })
                  : null}
              </ScrollView>
            </View>
          </RBSheet>


{loader ?<Customloader/> :null}


        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
