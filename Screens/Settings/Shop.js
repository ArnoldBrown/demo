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
  Alert,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import {API_Links} from '../Api/Api';
import uuid from 'react-native-uuid';
import {useSelector, useDispatch} from 'react-redux';

import Customloader from '../Customloader';
import AuthId from '../AuthId.style';

const date = new Date();
const DeviceIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default
const DeviceId = uuid.v4();

export default function Shop({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const findDevicetype = DeviceType();
  const [shopName, setShopname] = useState('');
  const [address, setAddress] = useState('');
  const [telephone, setTelephone] = useState('');
  const [logo, setLogo] = useState('');

  const [shopNameid, setShopnameid] = useState('');
  const [addressId, setAddressid] = useState('');
  const [telephoneId, setTelephoneid] = useState('');

  const [logoId, setLogoid] = useState('');

  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  const [text, onChangeText] = useState('');

  const [id, setId] = useState(1);

  const getToken = useSelector(state => state.loginReducer);

  const {casherId} = getToken;

  const shopVal = useSelector(state => state.shopnameReducer);

  const {groceryName} = shopVal;

  const types = [
    {id: 1, name: 'General'},
    {id: 2, name: 'Resturant'},
    {id: 3, name: 'Hostel'},
  ];

  useEffect(() => {
    var data = new FormData();
    data.append('cashier_id', casherId);
    fetch(
      groceryName === ''
        ? API_Links.BASE_URL + API_Links.VIEW_SHOP_SETTINGS
        : API_Links.SHOP_URL +
            groceryName +
            '/' +
            'api' +
            '/' +
            API_Links.VIEW_SHOP_SETTINGS,
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
      .then(data => {
        setAddress(data.data[0].value);
        setAddressid(data.data[0].id);

        setTelephone(data.data[7].value);
        setTelephoneid(data.data[7].id);

        setLogo(data.data[8].value);
        setLogoid(data.data[8].id);

        setShopname(data.data[9].value);
        setShopnameid(data.data[9].id);

        //  let getAddress= data.data.filter( i => key1.includes(i.name) );
        //  setAddress(getAddress.map((e)=>e.value).toLocaleString())

        //  let getNumber= data.data.filter( i => key2.includes(i.name) );
        //  setTelephone(getNumber.map((e)=>e.value).toLocaleString())

        //  let getLogo= data.data.filter( i => key3.includes(i.name) );
        //  setLogo(getLogo.map((e)=>e.value).toLocaleString())

        //  let getWebname= data.data.filter( i => key4.includes(i.name) );
        //  setShopname(getWebname.map((e)=>e.value).toLocaleString())
      })
      .catch(e => console.log(e));

    return () => {};
  }, []);

  const onSave = () => {
    setLoader(true);

    var data = new FormData();
    data.append('cashier_id', casherId);
    data.append('id', telephoneId, shopNameid, addressId);
    data.append('value', telephone, shopName, address);

    fetch(API_Links.BASE_URL + API_Links.UPDATE_SHOP_SETTINGS, {
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
    })
      .then(response => response.json())

      .then(e => {
        setLoader(false);

        Alert.alert(e.message, '', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      })
      .catch(e => console.log(e));
  };

  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>
      {findDevicetype.isTab === 'Tablet' ? null : (
        <View style={global.commonMobileHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../Images/left-arrow.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>

          <Text style={global.headTitle}>Shop</Text>

          <TouchableOpacity onPress={() => setVisible(prev => !prev)}>
            <Text style={global.commonTextblueH1}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={global.commonLightbg}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            <View style={[global.commonWhitebg, {paddingVertical: 0}]}>
              <View style={[global.commonFlexrow_ct, global.flexLine]}>
                <Text style={global.commonTextblueH1}>Logo</Text>

                <View
                  style={[
                    {
                      height: 81,
                      borderWidth: 1,
                      // width: '45%',
                      width:
                        global.Dimensionwidth > 468
                          ? global.Dimensionwidth / 3.1
                          : global.Dimensionwidth / 1.7,
                      borderColor: '#E7E7E7',
                      justifyContent: 'center',
                      alignItems: 'center',
                      overflow: 'hidden',
                    },
                  ]}>
                  <View style={{width: 100, height: 100}}>
                    <Image
                      source={{uri: API_Links.URL + logo}}
                      style={{width: '100%', height: '100%'}}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </View>

              <View style={[global.commonFlexrow_ct, global.flexLine]}>
                <Text style={global.commonTextblueH1}>Shop name</Text>

                <View
                  style={[
                    global.inputBox,
                    global.commonTwocol,
                    {
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 35,
                      width:
                        global.Dimensionwidth > 468
                          ? global.Dimensionwidth / 3.1
                          : global.Dimensionwidth / 1.7,
                    },
                  ]}>
                  <TextInput
                    style={[
                      global.input,
                      {width: '100%', textAlign: 'right', height: 45},
                    ]}
                    onChangeText={setShopname}
                    placeholder="Name"
                    placeholderTextColor="#D1D1D1"
                    value={shopName}
                  />
                </View>
              </View>
              <View style={[global.commonFlexrow_ct, global.flexLine]}>
                <Text style={global.commonTextblueH1}>Business Type</Text>

                <View
                  style={[
                    global.commonTwocol,
                    {
                      borderRadius: 5,
                      backgroundColor: '#E7E7E7',
                      paddingHorizontal: 5,
                      borderWidth: 0,
                      paddingVertical: 5,
                      width:
                        global.Dimensionwidth > 468
                          ? global.Dimensionwidth / 3.1
                          : global.Dimensionwidth / 1.7,
                    },
                  ]}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {types.map(e => {
                      return (
                        <TouchableOpacity
                          style={
                            e.id === id
                              ? {
                                  backgroundColor: '#fff',
                                  height: 30,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: 4,
                                  width:
                                    global.Dimensionwidth > 468
                                      ? global.Dimensionwidth / 9
                                      : global.Dimensionwidth / 5.3,
                                  shadowColor: '#000',
                                  shadowOffset: {
                                    width: 0,
                                    height: 1,
                                  },
                                  shadowOpacity: 0.2,
                                  shadowRadius: 1.41,
                                  elevation: 2,
                                }
                              : {
                                  height: 30,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  borderRadius: 11,
                                  width:
                                    global.Dimensionwidth > 468
                                      ? global.Dimensionwidth / 9
                                      : global.Dimensionwidth / 5.3,
                                }
                          }
                          onPress={() => setId(e.id)}>
                          <Text style={global.commonTextblack}>{e.name}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>

                  {/* 

                  <TextInput
                    style={[global.input, {width: '100%', paddingRight: 10 ,textAlign:"right"}]}
                    onChangeText={setShopname}
                    placeholder="Name"
                    placeholderTextColor="#D1D1D1"
                    value={shopName}
                  /> */}
                </View>
              </View>

              <View style={[global.commonFlexrow_ct, global.flexLine]}>
                <Text style={global.commonTextblueH1}>Tax ID</Text>

                <View
                  style={[
                    global.inputBox,
                    global.commonTwocol,
                    {
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 35,
                      width:
                        global.Dimensionwidth > 468
                          ? global.Dimensionwidth / 3.1
                          : global.Dimensionwidth / 1.7,
                    },
                  ]}>
                  <TextInput
                    style={[
                      global.input,
                      {width: '100%', height: 45, textAlign: 'right'},
                    ]}
                    onChangeText={onChangeText}
                    placeholderTextColor="#D1D1D1"
                    value={text}
                  />
                </View>
              </View>

              <View style={[global.commonFlexrow_ct, global.flexLine]}>
                <Text style={global.commonTextblueH1}>POS ID</Text>

                <View
                  style={[
                    global.inputBox,
                    global.commonTwocol,
                    {
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 35,
                      width:
                        global.Dimensionwidth > 468
                          ? global.Dimensionwidth / 3.1
                          : global.Dimensionwidth / 1.7,
                    },
                  ]}>
                  <TextInput
                    style={[
                      global.input,
                      {width: '100%', textAlign: 'right', height: 45},
                    ]}
                    onChangeText={onChangeText}
                    placeholderTextColor="#D1D1D1"
                    value={text}
                  />
                </View>
              </View>

              <View
                style={[
                  findDevicetype.isTab === 'Tablet'
                    ? global.commonFlexrow_bt
                    : {flexDirection: 'column'},
                  global.flexLine,
                ]}>
                <View
                  style={[
                    findDevicetype.isTab === 'Tablet'
                      ? global.commonTwocol
                      : {width: '100%'},
                    global.flexRowsec,
                    {marginTop: findDevicetype.isTab === 'Tablet' ? null : 10},
                  ]}>
                  <View
                    style={[
                      // width: '60%'
                      findDevicetype.isTab === 'Tablet'
                        ? {width: '60%'}
                        : {width: '36%'},
                    ]}>
                    <Text style={global.commonTextblueH1}>Branch name</Text>
                  </View>

                  <View
                    style={[
                      global.inputBox,
                      findDevicetype.isTab === 'Tablet'
                        ? {
                            width: '40%',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 35,
                          }
                        : {
                            width: '64%',
                            height: 35,
                          },

                      // {
                      //   width: '40%',
                      //   flexDirection: 'row',
                      //   justifyContent: 'center',
                      //   alignItems: 'center',
                      //   height: 35,

                      // },
                    ]}>
                    <TextInput
                      style={[
                        global.input,
                        {width: '100%', textAlign: 'right', height: 45},
                      ]}
                      onChangeText={onChangeText}
                      placeholderTextColor="#D1D1D1"
                      value={text}
                    />
                  </View>
                </View>
                <View
                  style={[
                    findDevicetype.isTab === 'Tablet'
                      ? global.commonTwocol
                      : {width: '100%'},
                    global.flexRowsec,
                    {marginTop: findDevicetype.isTab === 'Tablet' ? null : 10},
                  ]}>
                  <View
                    style={[
                      // width: '60%'
                      findDevicetype.isTab === 'Tablet'
                        ? {width: '60%'}
                        : {width: '36%'},
                    ]}>
                    <Text
                      style={[
                        global.commonTextblueH1,
                        {
                          textAlign:
                            findDevicetype.isTab === 'Tablet'
                              ? 'right'
                              : 'left',
                          marginRight: 11,
                        },
                      ]}>
                      POS #
                    </Text>
                  </View>
                  {/* <View
                    style={[
                      global.inputBox,

                      {
                        width: '40%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 35,
                      },
                    ]}> */}

                  <View
                    style={[
                      global.inputBox,
                      findDevicetype.isTab === 'Tablet'
                        ? {
                            width: '40%',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 35,
                          }
                        : {
                            width: '64%',
                            height: 35,
                          },

                      // {
                      //   width: '40%',
                      //   flexDirection: 'row',
                      //   justifyContent: 'center',
                      //   alignItems: 'center',
                      //   height: 35,

                      // },
                    ]}>
                    <TextInput
                      style={[global.input, {textAlign: 'right', height: 45}]}
                      onChangeText={onChangeText}
                      placeholderTextColor="#D1D1D1"
                      value={text}
                    />
                  </View>
                </View>
              </View>

              <View
                style={[
                  findDevicetype.isTab === 'Tablet'
                    ? global.commonFlexrow_bt
                    : {flexDirection: 'column'},
                  global.flexLine,
                ]}>
                <View
                  style={[
                    findDevicetype.isTab === 'Tablet'
                      ? global.commonTwocol
                      : {width: '100%'},
                    global.flexRowsec,
                  ]}>
                  <View style={{width: '60%'}}>
                    <Text style={global.commonTextblueH1}>Opening Time</Text>
                  </View>

                  <View style={[global.inputBox, {width: '40%', height: 35}]}>
                    <TextInput
                      style={[global.input, {textAlign: 'right', height: 45}]}
                      onChangeText={onChangeText}
                      placeholderTextColor="#D1D1D1"
                      value={text}
                    />
                  </View>
                </View>

                <View
                  style={[
                    findDevicetype.isTab === 'Tablet'
                      ? global.commonTwocol
                      : {width: '100%'},
                    global.flexRowsec,
                    {marginTop: findDevicetype.isTab === 'Tablet' ? null : 10},
                  ]}>
                  <View style={{width: '60%'}}>
                    <Text
                      style={[
                        global.commonTextblueH1,
                        {
                          textAlign:
                            findDevicetype.isTab === 'Tablet'
                              ? 'right'
                              : 'left',
                          marginRight: 11,
                        },
                      ]}>
                      Closeing Time
                    </Text>
                  </View>

                  <View style={[global.inputBox, {width: '40%', height: 35}]}>
                    <TextInput
                      style={[global.input, {textAlign: 'right', height: 45}]}
                      onChangeText={onChangeText}
                      placeholderTextColor="#D1D1D1"
                      value={text}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View
            style={[global.commonWhitebg, {paddingVertical: 0, marginTop: 22}]}>
            <View
              style={[
                findDevicetype.isTab === 'Tablet'
                  ? global.commonFlexrow_bt
                  : {flexDirection: 'column'},
                global.flexLine,
              ]}>
              <View
                style={[
                  findDevicetype.isTab === 'Tablet'
                    ? global.commonTwocol
                    : {width: '100%'},
                  global.flexRowsec,
                ]}>
                <View style={{width: '60%'}}>
                  <Text style={global.commonTextblueH1}>Tax</Text>
                </View>

                <View style={[global.inputBox, {width: '40%', height: 35}]}>
                  <TextInput
                    style={[global.input, {textAlign: 'right', height: 45}]}
                    onChangeText={onChangeText}
                    placeholder="0%"
                    placeholderTextColor="#D1D1D1"
                    value={text}
                  />
                </View>
              </View>

              <View
                style={[
                  findDevicetype.isTab === 'Tablet'
                    ? global.commonTwocol
                    : {width: '100%'},
                  global.flexRowsec,
                  {marginTop: findDevicetype.isTab === 'Tablet' ? null : 10},
                ]}>
                <View style={[{width: '60%'}]}>
                  <Text
                    style={[
                      global.commonTextblueH1,
                      {
                        textAlign:
                          findDevicetype.isTab === 'Tablet' ? 'right' : 'left',
                        marginRight: 11,
                      },
                    ]}>
                    Service Charge
                  </Text>
                </View>

                <View
                  style={[
                    global.inputBox,
                    {
                      width: '40%',
                      height: 35,
                    },
                  ]}>
                  <TextInput
                    style={[global.input, {textAlign: 'right', height: 45}]}
                    onChangeText={onChangeText}
                    placeholder="0%"
                    placeholderTextColor="#D1D1D1"
                    value={text}
                  />
                </View>
              </View>
            </View>

            <View
              style={[
                global.flexLine,
                global.commonFlexrow_bt,
                {paddingVertical: 15, justifyContent: 'space-between'},
              ]}>
              <Text style={global.commonTextblueH1}>Rounding</Text>

              <TouchableOpacity style={global.flexRowsec}>
                <Text style={global.commonTextblueH1}> No Rounding</Text>
                <Image
                  source={require('../../Images/angleRight.png')}
                  style={global.settingIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={[global.commonWhitebg, {paddingVertical: 0, marginTop: 22}]}>
            <View style={[global.commonFlexrow_ct, global.flexLine]}>
              <Text style={global.commonTextblueH1}>Address Line 1</Text>

              {/* <View
                style={[
                  global.inputBox,
                  global.commonTwocol,
                  {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 35,
                    width:
                    global.Dimensionwidth > 468
                    ? global.Dimensionwidth / 3.1
                    : global.Dimensionwidth / 1.7,
                  },
                ]}>
                <TextInput
                  style={[
                    global.input,
                    {width: '100%',height: 45,textAlign:'right'},
                  ]}
                  onChangeText={setAddress}
                  placeholderTextColor="#D1D1D1"
                  value={address}
                  multiline={true}
                />
              </View> */}
              <View
                style={[
                  global.inputBox,
                  global.commonTwocol,
                  {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 35,
                    width:
                      global.Dimensionwidth > 468
                        ? global.Dimensionwidth / 3.1
                        : global.Dimensionwidth / 1.7,
                  },
                ]}>
                <TextInput
                  style={[
                    global.input,
                    {width: '100%', height: 45, textAlign: 'right'},
                  ]}
                  onChangeText={setAddress}
                  placeholderTextColor="#D1D1D1"
                  value={address}
                />
              </View>
            </View>

            <View style={[global.commonFlexrow_ct, global.flexLine]}>
              <Text style={global.commonTextblueH1}>Address Line 2</Text>

              <View
                style={[
                  global.inputBox,
                  global.commonTwocol,
                  {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 35,
                    width:
                      global.Dimensionwidth > 468
                        ? global.Dimensionwidth / 3.1
                        : global.Dimensionwidth / 1.7,
                  },
                ]}>
                <TextInput
                  style={[
                    global.input,
                    {width: '100%', height: 45, textAlign: 'right'},
                  ]}
                  onChangeText={onChangeText}
                  placeholderTextColor="#D1D1D1"
                  value={text}
                />
              </View>
            </View>

            <View style={[global.commonFlexrow_ct, global.flexLine]}>
              <Text style={global.commonTextblueH1}>Tel</Text>

              <View
                style={[
                  global.inputBox,
                  global.commonTwocol,
                  {
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 35,
                    width:
                      global.Dimensionwidth > 468
                        ? global.Dimensionwidth / 3.1
                        : global.Dimensionwidth / 1.7,
                  },
                ]}>
                <TextInput
                  style={[
                    global.input,
                    {width: '100%', textAlign: 'right', height: 45},
                  ]}
                  onChangeText={setTelephone}
                  placeholderTextColor="#D1D1D1"
                  value={telephone}
                  keyboardType="number-pad"
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {visible ? (
          <View style={{padding: 11}}>
            <TouchableOpacity
              style={global.commonButton}
              onPress={() => onSave()}>
              <Text style={global.btnText1}>Save</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      {loader ? <Customloader /> : null}
    </SafeAreaView>
  );
}
