import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import Billdescriptions from '../Descriptions/Billdescriptions';
import moment from 'moment';
import {API_Links} from '../Api/Api';
import Customloader from '.././Customloader';
import {FlatGrid} from 'react-native-super-grid';
import {manageAction} from '../../action/manageAction';

import RoleMessage from '.././RoleMessage';

import {useDispatch, useSelector} from 'react-redux';
import  AuthId  from '../AuthId.style'

import uuid from 'react-native-uuid';

const date = new Date();
const DeviceIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1; // default
const DeviceId = uuid.v4();

export default function Unseenorder({navigation}) {
  const getToken = useSelector(state => state.loginReducer);
  const {casherId} = getToken;

  const getAdminroles = useSelector(state => state.manageReducer);
  const {roleList} = getAdminroles;

  const shopName = useSelector(state => state.shopnameReducer);
  
  const {groceryName} = shopName;



  const dispatch = useDispatch();



  const [orderList, setOrderlist] = useState([]);

  const [loader, setLoader] = useState(false);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     dispatch(manageAction(casherId ,groceryName ));
  //   });
  //   return () => {
  //     unsubscribe;
  //   };
  // }, []);

  const getOrderList = () => {
    setLoader(true);

    fetch( groceryName==="" ?  API_Links.BASE_URL + API_Links.POS_UNSEEN_ORDER : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.POS_UNSEEN_ORDER  , {
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
      // body: data,
    })
      .then(response => response.json())

      .then(data => {
        setLoader(false);

        if (data.success === '1') {
          setOrderlist(data.data);
        } else {
          setOrderlist([]);
        }
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getOrderList();

      return () => {
        unsubscribe;
      };
    });
  }, []);

  const onApprove = id => {
    setLoader(true);
    var data = new FormData();
    data.append('orders_id', id);
    fetch(groceryName==="" ?   API_Links.BASE_URL + API_Links.UPDATE_POS_ORDER  :API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.UPDATE_POS_ORDER  , {
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

        getOrderList();

        Alert.alert(data.message, '', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      })
      .catch(e => console.log(e));
  };

  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>

      <View style={[global.commonHeader, {padding: 15}]}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image
            source={require('../../Images/menu.png')}
            style={global.headBackarrow}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}> Orders - ({orderList.length}) </Text>

        <View></View>
      </View>

      {/* <Text>{roleList.orders_view}</Text> */}

      <View style={{flexDirection: 'column', flex: 1}}>
        <View style={[global.commonLightbg]}>
          <FlatGrid
            showsVerticalScrollIndicator={false}
            itemDimension={
              global.Dimensionwidth < 468
                ? global.Dimensionwidth
                : global.Dimensionwidth / 4
            }
            data={orderList}
            style={{flex: 1}}
            spacing={10}
            // ListFooterComponent={()=>{

            //   return (

            //     <TouchableOpacity activeOpacity={0} onPress={()=> checkDevicetype === 'Handset'   ? navigation.navigate('Addproduct') : setModalVisible(true)   }>

            // <View style={[global.productBox,{marginHorizontal:11,maxWidth:checkDevicetype === 'Handset' ? 142 :134 ,justifyContent:"center",alignItems:"center"}]}>

            //   <Image source={require('../../Images/plus.png')}/>

            // </View>
            // </TouchableOpacity>
            // )

            // }}

            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: global.Dimensionheight / 2.5,
                }}>
                <Image
                  source={require('../../Images/sademoji.png')}
                  style={{width: 40, height: 40}}
                />
                <Text
                  style={[
                    global.commonTextblue,
                    {textAlign: 'center', marginTop: 7},
                  ]}>
                  {' '}
                  No Order's Found
                </Text>
              </View>
            )}
            renderItem={({item}) => (
              <View
                style={{
                  borderRadius: 4,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.22,
                  shadowRadius: 2.22,

                  elevation: 3,
                  marginBottom: 8,
                }}>
                <View
                  style={[
                    {
                      backgroundColor: '#144692',
                      borderTopLeftRadius: 6,
                      borderTopRightRadius: 6,
                      paddingHorizontal: 15,
                      paddingVertical: 12,
                    },
                    global.commonFlexrow_ct,
                  ]}>
                  <Text style={global.commonTextwhiteH1}>
                    {' '}
                    <Text>{item.customers_name}</Text>{' '}
                  </Text>

                  <Image
                    source={require('../../Images/order.png')}
                    style={global.settingIcon}
                  />
                </View>

                <View
                  style={{
                    backgroundColor: '#fff',
                    padding: 15,

                    borderBottomRightRadius: 6,
                    borderBottomLeftRadius: 6,
                  }}>
                  <View style={[global.commonFlexrow_ct, {}]}>
                    <View>
                      <Text style={{marginBottom: 7}}>
                        Order Date:{' '}
                        {moment(item.date_purchased).format('YYYY-MM-DD')}
                      </Text>

                      <Text style={[global.commonTextblueH1]}>
                        RM {item.order_price}
                      </Text>

                      <Text style={{marginTop: 7}}>
                        Total Products: {item.total_products}
                      </Text>
                    </View>

                    <View>
                      
                        <TouchableOpacity
                          style={[
                            global.commonButton,
                            {backgroundColor: '#000', height: 30},
                          ]}
                          onPress={() => onApprove(item.orders_id)}>
                          <Text style={global.btnText1}>Approve</Text>
                        </TouchableOpacity>
                    
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        </View>

        {roleList === undefined ? null : roleList.orders_view === 0 ? (
          <View style={global.blockView}>
            <RoleMessage />
          </View>
        ) : null}

      </View>

      {loader ? <Customloader /> : null}
    </SafeAreaView>
  );
}
