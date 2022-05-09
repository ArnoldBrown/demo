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
  FlatList,
  Alert,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';

import {useSelector, useDispatch} from 'react-redux';

import PaymentType from '../Paymentscreens/PaymentType';

import uuid from 'react-native-uuid';
import Customloader from '../Customloader';
import {API_Links} from '../Api/Api';
import  AuthId  from '../AuthId.style'


const date = new Date();
const DeviceIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default
const DeviceId = uuid.v4();

export default function Paymentsetting({navigation}) {
  //--------  Redux-Hook --------//

  const getLanguageids = useSelector(state => state.languageReducer);
  const {languageId} = getLanguageids;

  const shopName = useSelector(state => state.shopnameReducer);
  const {groceryName} = shopName;




  //--------  Redux-Hook --------//

  const [isEnabled, setIsEnabled] = useState(false);
  const [text, onChangeText] = useState('');
  const [list, setList] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const findDevicetype = DeviceType();


  const getPaymentLists = () => {
    setLoader(true);
    var data = new FormData();
    data.append('language_id', languageId);
    fetch( groceryName===""  ?  API_Links.BASE_URL + API_Links.GET_PAYMENT_LISTS : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.GET_PAYMENT_LISTS, {
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
          setList(data.data);
        } else {
          setList([]);
        }
      })

      .catch(e => {
        console.log(e);
      });
  };

  const onupdatePaymentTypes = (id, status) => {
    setLoader(true);

    var data = new FormData();
    data.append('payment_methods_id', id);
    data.append('status', status === 1 ? 2 : 1);
    fetch( groceryName==="" ?    API_Links.BASE_URL + API_Links.UPDATE_POS_PAY_STATUS :API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.UPDATE_POS_PAY_STATUS, {
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
        setLoader(false);

        getPaymentLists();
      });
  };
  useEffect(() => {
    getPaymentLists();

    return () => {};
  }, []);

  const renderItem = ({item ,index}) => (
    <TouchableOpacity
      style={[
        global.commonFlexrow_ct,
        {borderBottomWidth:index === list.length - 1? 0 :1 , borderColor: '#DADADA'},
        {paddingHorizontal: 15, paddingVertical:10},
      ]}
      onPress={() =>
        onupdatePaymentTypes(item.payment_methods_id, item.status)
      }>
      <View style={global.flexRowsec}>
        <Image
          source={{uri:  groceryName === ""  ?  API_Links.URL+item.image  :API_Links.SHOP_URL+ groceryName+"/"+item.image}}
          style={[global.cashCalcicon, {marginRight: 11, tintColor: '#144692'}]}
        />

        <Text style={[global.payTabmenu,{fontSize:18}]}>{item.name}</Text>
      </View>

      {/* 

              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={()=>toggleSwitch(e.payment_methods_id)}
                value={isEnabled}
              /> */}

      {item.status === 2 ? (
        <View
          style={{
            width: 55,
            height: 32,
            backgroundColor: '#eee',
            padding: 11,
            borderRadius: 50,
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 27,
              height: 27,
              borderRadius: 50,
              backgroundColor: '#fff',
              position: 'relative',
              left: -8,
            }}></View>
        </View>
      ) : (
        <View
          style={[
            {
              width: 55,
              height: 32,
              backgroundColor: 'green',
              padding: 11,
              borderRadius: 50,
              justifyContent: 'center',
            },
          ]}>
          <View
            style={{
              width: 23,
              height: 23,
              borderRadius: 50,
              backgroundColor: '#f4f3f4',
              position: 'relative',
              right: -16,
            }}></View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>
      {findDevicetype.isTab === 'Tablet' ? null : (
        <View style={global.commonMobileHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../Images/left-arrow.png')}
              style={{width: 20, height: 20}}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text style={global.headTitle}>Payment</Text>

          <View
            style={[
              global.flexRowsec,
              {justifyContent: 'space-between'},
            ]}></View>
        </View>
      )}

      <View style={global.commonLightbg}>
        {/* <View style={{flexDirection:findDevicetype.isTab==="Tablet" ? "row":"column" ,alignItems:"center" ,justifyContent:"center"}}>

<View  style={{marginRight:15}} >
<Text style={global.commonTextblue}>Quick Cash Payment</Text>


</View>

<ScrollView  horizontal showsHorizontalScrollIndicator={false} style={findDevicetype.isTab==="Tablet"? null :{marginTop:11 }}>


<View style={{borderWidth:2 ,borderColor:"#DEDFE1" ,width:80 ,paddingHorizontal:11 ,marginRight:10  ,paddingVertical:10}}>

   <Text >20</Text> 
</View>

<View style={{borderWidth:2 ,borderColor:"#DEDFE1"  ,width:80 ,paddingHorizontal:11 ,marginRight:10 ,paddingVertical:10}}>

   <Text >50</Text> 
</View>



<View style={{borderWidth:2 ,borderColor:"#DEDFE1" ,width:80 ,paddingHorizontal:11 ,marginRight:10  ,paddingVertical:10}}>

   <Text >500</Text> 
</View>


<View style={{borderWidth:2 ,borderColor:"#DEDFE1"  ,width:80 ,paddingHorizontal:11 ,marginRight:10 ,paddingVertical:10}}>

   <Text >100</Text> 
</View>


<View style={{borderWidth:2 ,borderColor:"#DEDFE1",width:80 ,paddingHorizontal:11 ,marginRight:10 ,paddingVertical:10}}>

   <Text >1000</Text> 
</View>

</ScrollView>




</View>
 */}

        {/* <View style={{paddingHorizontal:15 ,marginTop:15}}>



<Text></Text>

<Text  style={global.commonTextblue}>Payment Type</Text>   


<Text></Text>
</View> */}

        <Text style={[{padding: 11 ,fontSize:14 ,  color: '#5C6677',}]}>PAYMENT TYPE</Text>

        <View  style={{backgroundColor: '#fff' ,borderTopWidth:1 ,borderColor:"#DADADA" ,borderBottomWidth:1}}>
          <FlatList
          contentContainerStyle={{paddingHorizontal:11}}
            data={list}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      </View>

      {loader ? <Customloader /> : null}
    </SafeAreaView>
  );
}
