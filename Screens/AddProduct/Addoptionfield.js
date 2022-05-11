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
  Switch,
  Modal,
  Alert,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import {API_Links} from '../Api/Api';
import uuid from 'react-native-uuid';
import RBSheet from 'react-native-raw-bottom-sheet';
import Customloader from '../Customloader';
import {useDispatch, useSelector} from 'react-redux';
import  AuthId  from '../AuthId.style'



export default function AddOptionfield({navigation, onClosestep6, route}) {



  const shopName = useSelector(state => state.shopnameReducer);
  const {groceryName} = shopName;






  const refRBSheet = useRef();

  const [type1, setType1] = useState(false);
  const [type2, setType2] = useState(false);
  const [number, onChangeNumber] = React.useState(null);

  const [optionNamearray, setoptionNamearray] = useState([]);

  const [optionValuearray, setoptionValuearray] = useState([]);

  const [optionValue, setoptionValue] = useState('');
  const [optionName, setoptionName] = useState('');

  const [optionValueid, setoptionValueid] = useState('');
  const [optionNameid, setoptionNameid] = useState('');

  const [loader, setLoader] = useState(false);

  const [prefix, setPrefix] = useState('+');

  const getOptionValuelists = id => {
    var data = new FormData();

    data.append('option_id', id);

    fetch( groceryName === ""  ?  API_Links.BASE_URL + API_Links.GET_OPT_VALUE : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.GET_OPT_VALUE , {
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

      .then(data => {
        setLoader(false);
        if (data.success === '1') {
          setoptionValuearray(data.data);
          setoptionValue(data.data[0].options_values_name);
          setoptionValueid(
            data.data[0].products_options_values_descriptions_id,
          );
        } else {
          setoptionValuearray([]);
        }
      })

      .catch(e => console.log(e));
  };

  const getOptionNamelists = () => {
    setLoader(true);

    fetch( groceryName === "" ?  API_Links.BASE_URL + API_Links.GET_OPT_NAME : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.GET_OPT_NAME, {
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

      .then(data => {
        if (data.success === '1') {
          setoptionNamearray(data.data);

          setoptionName(data.data[0].options_name);

          setoptionNameid(data.data[0].products_options_id);

          let firstIndexid = data.data[0].products_options_id;

          getOptionValuelists(firstIndexid);
        } else {
          setoptionNamearray([]);
        }
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getOptionNamelists();
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const FastGxsxlob = id => {
    setoptionNameid(id);

    getOptionValuelists(id);
  };

  const FastGxsxlobss = id => {
    setoptionValueid(id);
  };

  const submitOptionvalue = () => {
    setLoader(true);
    var data = new FormData();

    if (route.params.paramKey !== 'Add Additional Option') {
      data.append('products_id', route.params.paramKeyid);
      data.append('products_options_id', optionNameid);
      data.append('products_options_values_id', optionValueid);
      data.append('is_default', 1);
    } else {
      data.append('products_id', route.params.paramKeyid);
      data.append('products_options_id', optionNameid);
      data.append('products_options_values_id', optionValueid);
      data.append('options_values_price', number);
      data.append('price_prefix', prefix);
    }

    fetch(
      route.params.paramKey !== 'Add Additional Option'
        ? groceryName === ""  ? API_Links.BASE_URL + API_Links.ADD_OPT_VALUE : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.ADD_OPT_VALUE
        : groceryName === ""  ? API_Links.BASE_URL + API_Links.ADD_ADDITIONAL_OPTIONS : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.ADD_ADDITIONAL_OPTIONS,
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
          'consumer-device-id':AuthId._currDeviceId,
         'consumer-ip':AuthId._currIp ,
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      },
    )
      .then(response => response.json())

      .then(data => {
        setLoader(false);

        Alert.alert(data.message, '', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      })
      .catch(e => console.log(e));
  };

  return (
    <SafeAreaView style={[global.commonBg, {borderRadius: 13}]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>

      <View style={global.commonMobileHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}> {route.params.paramKey}</Text>

        <Text style={global.appColor}></Text>
      </View>

      <View
        style={{
          padding: 11,
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 1,
              width: global.Dimensionwidth > 468 ? 500 : '100%',
            }}>
            <View
              style={[
                global.commonFlexrow_ct,
                global.bottomSpacing,
                {marginVertical: 20},
              ]}>
              <View style={{width: '30%'}}>
                <Text style={global.commonTextblack}>Option name</Text>
              </View>

              <TouchableOpacity
                style={[global.inputBox, global.colscreen3]}
                onPress={() => [
                  refRBSheet.current.open(),
                  setType1(true),
                  setType2(false),
                ]}>
                <Text>{optionName}</Text>
              </TouchableOpacity>
            </View>

            <View style={[global.commonFlexrow_ct, global.bottomSpacing]}>
              <View style={{width: '30%'}}>
                <Text style={global.commonTextblack}>Option Value</Text>
              </View>

              <TouchableOpacity
                style={[global.inputBox, global.colscreen3]}
                onPress={() => [
                  refRBSheet.current.open(),
                  setType1(false),
                  setType2(true),
                ]}>
                <Text>{optionValue}</Text>
              </TouchableOpacity>
            </View>
            {route.params.paramKey === 'Add Additional Option' ? (
              <View style={[global.commonFlexrow_ct, global.bottomSpacing]}>
                <View style={{width: '30%'}}>
                  <Text style={global.commonTextblack}>Price</Text>
                </View>

                <View
                  style={{
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    height: 45,
                    borderRadius: 4,
                    paddingHorizontal: 9,

                    justifyContent: 'center',
                    borderColor: '#b6b9bd',
                    borderTopRightRadius: 0,
                    borderRightWidth: 0,
                    borderBottomRightRadius: 0,
                    width: '15%',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text>{prefix}</Text>

                    <View>
                      <TouchableOpacity onPress={() => setPrefix('+')}>
                        <Image
                          source={require('../../Images/upArrow.png')}
                          style={{width: 15, height: 15}}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => setPrefix('-')}>
                        <Image
                          source={require('../../Images/downArrow.png')}
                          style={{width: 15, height: 15}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <TextInput
                  style={[
                    global.inputBox,
                    {
                      width: '55%',
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    },
                  ]}
                  onChangeText={onChangeNumber}
                  value={number}
                  placeholder="Enter Amount"
                  keyboardType="decimal-pad"
                />
              </View>
            ) : null}
          </View>

          <View style={{flex: 0.2}}>
            <TouchableOpacity
              style={global.commonButton}
              onPress={() => submitOptionvalue()}>
              <Text style={global.btnText1}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: '#0000004f',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        {type1 ? (
          <ScrollView contentContainerStyle={{padding: 12}}>
            {optionNamearray.map(e => {
              return (
                <TouchableOpacity
                  key={e.products_options_id}
                  onPress={() => [
                    FastGxsxlob(e.products_options_id),
                    setoptionName(e.options_name),
                    refRBSheet.current.close()
                  ]}
                  style={{padding: 11}}>
                  <Text style={[global.commonTextH1, {textAlign: 'center'}]}>
                    {' '}
                    {e.options_name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : type2 ? (
          <ScrollView contentContainerStyle={{padding: 12}}>
            {optionValuearray.map(e => {
              return (
                <TouchableOpacity
                  key={e.products_options_values_id}
                  onPress={() => [
                    FastGxsxlobss(e.products_options_values_id),
                    setoptionValue(e.options_values_name),
                    refRBSheet.current.close()
                  ]}
                  style={{padding: 11}}>
                  <Text style={[global.commonTextH1, {textAlign: 'center'}]}>
                    {e.options_values_name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : null}
      </RBSheet>

      {loader ? <Customloader /> : null}
    </SafeAreaView>
  );
}
