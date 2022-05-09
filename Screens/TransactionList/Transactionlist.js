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
  Pressable,
  RefreshControl,
  StyleSheet,

} from 'react-native';

import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import Billdescriptions from '../Descriptions/Billdescriptions';
import moment from 'moment';
import {API_Links} from '../Api/Api';
import {useSelector, useDispatch} from 'react-redux';

import Customloader from '.././Customloader';

import {cancelBillaction} from '../../action/cancelBillaction';
import AuthId from '../AuthId.style';

import uuid from 'react-native-uuid';

import DateTimePicker from '@react-native-community/datetimepicker';

import wait from '../refersh';

//import DateTimePickerModal from "react-native-modal-datetime-picker";

// const wait = (timeout) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, timeout);
//   });
// };

export default function Transactionlist({navigation, route}) {
  const isDevicetype = DeviceType();

  //---- Redux-Hook ----//

  const dispatch = useDispatch();

  const getToken = useSelector(state => state.loginReducer);
  //  const getMerchantdetails = useSelector(state => state.merchantloginDetails);

  const {casherId} = getToken;

  const getLanguageids = useSelector(state => state.languageReducer);
  const {languageId} = getLanguageids;

  const getCurrencycodes = useSelector(state => state.currencyReducer);
  const {currencyCode, symbol} = getCurrencycodes;

  const shopName = useSelector(state => state.shopnameReducer);

  const {groceryName} = shopName;

  //---- Redux-Hook ----//

  const [viewBill, setviewBill] = useState([]);

  const [viewBill1, setviewBill1] = useState([]);

  const [posorderId, setOrderid] = useState('');
  const [posorderDate, setOrderdate] = useState('');
  const [PoscashierName, setcashierName] = useState('');
  const [poscustomerName, setcustomerName] = useState('');
  const [posorderPrice, setorderPrice] = useState('');
  const [posorderStatus, setorderStatus] = useState('');

  const [currencyType, setcurrencyType] = useState('');
  const [totalTax, settotalTax] = useState('');
  const [shippingCost, setshippingCost] = useState('');
  const [discountAmt, setdiscountAmt] = useState(' ');

  const [refreshing, setRefresh] = useState(false);

  const [loader, setLoader] = useState(false);
  const [isDatePickerVisible, setPickervisible] = useState(false);

  const [isdate, setDate] = useState('');

  const getBillList = ddd => {
    setLoader(true);
    var data = new FormData();
    data.append('cashier_id', casherId);
    data.append('language_id', languageId);
    data.append('date', ddd === undefined ? '' : ddd);
    data.append('currency_code', currencyCode);

    fetch(
      groceryName === ''
        ? API_Links.BASE_URL + API_Links.VIEW_BILLS
        : API_Links.SHOP_URL +
            groceryName +
            '/' +
            'api' +
            '/' +
            API_Links.VIEW_BILLS,
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
      .then(response => {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        return response.json();
      })

      .then(data => {
        setLoader(false);

        if (data.success === '1') {
          setviewBill(data.data);

          //console.log("data.data[0].delivery_name",data.data[0])

          setOrderid(data.data[0].orders_id);
          setviewBill1(data.data[0].data);
          setorderPrice(data.data[0].order_price);
          setOrderdate(data.data[0].date_purchased);
          setorderStatus(data.data[0].orders_status);

          setcurrencyType(data.data[0].currency),
            settotalTax(data.data[0].total_tax),
            setshippingCost(data.data[0].shipping_cost),
            setdiscountAmt(data.data[0].discount_amount);
          setcustomerName(data.data[0].delivery_name);

          //setDate('')
        } else {
          setviewBill([]);
        }
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getBillList();

      return () => {
        unsubscribe;
      };
    });
  }, []);

  function onPromisebillcancel() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(getBillList());
      }, 500);
    });
  }

  const onCancelbill = async () => {
    dispatch(cancelBillaction(casherId, posorderId, navigation, groceryName));

    await onPromisebillcancel();
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        isDevicetype.isTab === 'Tablet'
          ? [
              setOrderid(item.orders_id),
              setOrderdate(item.date_purchased),
              setcustomerName(item.delivery_name),
              setviewBill1(item.data),
              setorderPrice(item.order_price),
              setorderStatus(item.orders_status),
              setcurrencyType(item.currency),
              settotalTax(item.total_tax),
              setshippingCost(item.shipping_cost),
              setdiscountAmt(item.discount_amount),
            ]
          : navigation.navigate('Billdescriptions', {
              orders_id: item.orders_id,
              order_price: item.order_price,
              date_purchased: item.date_purchased,
              cashier: 'Admin',
              delivery_name: item.delivery_name,
              viewBill: item.data,
              orders_status: item.orders_status,
              shipping_cost: item.shipping_cost,
              total_tax: item.total_tax,
              currency_type: item.currency,
              discount_amount: item.discount_amount,
            })
      }>
      <View
        style={
          global.Dimensionwidth > 468
            ? posorderId === item.orders_id
              ? {backgroundColor: '#6a686842', padding: 15}
              : global.commonWhitebg
            : global.commonWhitebg
        }>
        <View style={global.commonFlexrow_ct}>
          <View style={global.flexRowsec}>
            <View>
              <Image
                source={require('../../Images/wallet.png')}
                style={
                  item.orders_status === 'Pending'
                    ? global.settingIcon
                    : {tintColor: 'red', width: 25, height: 25}
                }
              />
            </View>

            <View style={{marginHorizontal: 7}}>
              <Text
                style={[
                  item.orders_status === 'Pending'
                    ? global.activeTextmd
                    : global.inactiveTextmd,
                ]}>
                Order ID : {item.orders_id}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                }}>
                <Text
                  style={[
                    global.commonText,
                    {
                      color:
                        item.orders_status === 'Pending' ? '#0652A2' : 'red',
                      marginRight: 13,
                    },
                  ]}>
                  {moment(item.date_purchased).format('h:mm a')}
                </Text>

                {item.orders_status === 'Pending' ? null : (
                  <Text style={{color: 'red'}}>Voided</Text>
                )}
              </View>
            </View>
          </View>
          <View>
            <Text
              style={[
                item.orders_status === 'Pending'
                  ? global.activeTextmd
                  : global.inactiveTextmd,
              ]}>
              {' '}
              {(Math.round(item.order_price * 100) / 100).toFixed(2)}
            </Text>

            {/* <View style={ item.orders_status ==="Pending"  ?{padding:4 ,backgroundColor:"green",borderRadius:4,marginTop:11 } : { backgroundColor:"red" ,padding:4,borderRadius:4 ,marginTop:11}}>

<Text style={{textAlign:"center" ,color:"#fff",fontWeight:"bold"}}>{item.orders_status}</Text>

</View> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginTop:20,
          height: global.Dimensionheight / 2,
        }}>
        <Text>No items</Text>
      </View>
    );
  };

  const itemSeprator = () => {
    return (
      <View
        style={{
          height: 1,
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
        }}></View>
    );
  };

  const handleConfirmpick = (date, selectedDate) => {
    setPickervisible(false);
    setDate(moment(selectedDate).format('MM/DD/YYYY'));
    let efef = moment(selectedDate).format('MM/DD/YYYY');

    getBillList(efef);
  };

  const onRefresh = async () => {
    setRefresh(true);

    await wait(350).then(() => {
      getBillList();
      setRefresh(false);
      setDate('');
    });
  };

  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>
      {isDevicetype.isTab !== 'Tablet' ? (
        <View style={[global.commonHeader, {padding: 15}]}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image
              source={require('../../Images/menu.png')}
              style={global.headBackarrow}
            />
          </TouchableOpacity>

          <Text style={global.headTitle}>Sales Transactions</Text>

          <TouchableOpacity onPress={() => [setPickervisible(true)]}>
            <Image
              source={require('../../Images/calendarIcon.png')}
              style={global.headBackarrow}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={global.tabHeader}>
          <View style={global.tabHeadcol1}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image
                source={require('../../Images/menu.png')}
                style={global.settingIcon}
              />
            </TouchableOpacity>

            <Text style={global.headTitle}>Sales Transactions</Text>

            <TouchableOpacity onPress={() => [setPickervisible(true)]}>
              <Image
                source={require('../../Images/calendarIcon.png')}
                style={global.headBackarrow}
              />
            </TouchableOpacity>

            <View style={global.statusBarline}></View>
          </View>

          <View style={global.tabHeadcol2}>
            <View style={global.commonFlexrow_bt}>
              <View></View>

              <Text style={global.headTitle}>Descriptions</Text>
              <View style={global.flexRowsec}>
                <Text style={[global.appColor, {marginHorizontal: 20}]}></Text>
                <Text style={global.appColor}></Text>
              </View>
            </View>
          </View>
        </View>
      )}

      <View
        style={
          isDevicetype.isTab === 'Tablet'
            ? {flexDirection: 'row', flex: 1}
            : {flexDirection: 'column', flex: 1}
        }>
        <View
          style={[
            global.commonLightbg,
            {width: isDevicetype.isTab === 'Tablet' ? '30%' : '100%'},
          ]}>
          <View
            style={{
              borderColor: '#DADADA',
              borderBottomWidth: 1,
              height: 40,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Pressable
              style={{
                padding: 10,
                borderRightWidth: 1,
                borderColor: '#DADADA',
              }}>
              <Image
                source={require('../../Images/faAngleleft.png')}
                style={[global.settingIcon, global.iconColor]}
              />
            </Pressable> */}

            {/* <View>
              <Text style={global.commonTextblue}>
                {' '}
                {isdate === '' ? 'Today' : isdate}
              </Text>
            </View> */}


          <View style={styles.ivHeaderTwo}>
            <TouchableOpacity>
              <Image
                style={styles.arrowImage}
                source={require('../../Images/left-chevron.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.inventoryDate}>
              <Text style={styles.inventoryText}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                style={styles.arrowImage}
                source={require('../../Images/right-chevron.png')}
              />
            </TouchableOpacity>
          </View>

            {/* <Pressable
              style={{padding: 10, borderLeftWidth: 1, borderColor: '#DADADA'}}>
              <Image
                source={require('../../Images/faAngleright.png')}
                style={[global.settingIcon, global.iconColor]}
              />
            </Pressable> */}
          </View>

          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={{
              flexGrow: 1,
              borderRightWidth: 1,
              borderRightColor: '#DADADA',
            }}
            data={viewBill}
            // ListHeaderComponent={() => {
            //   return (
            //     <View
            //       style={{
            //         borderColor: '#DADADA',
            //         borderBottomWidth: 1,
            //         height: 40,
            //         flexDirection: 'row',
            //         justifyContent: 'space-between',
            //         alignItems: 'center',
            //       }}>
            //       <Pressable
            //         style={{
            //           padding: 10,
            //           borderRightWidth: 1,
            //           borderColor: '#DADADA',
            //         }}>
            //         <Image
            //           source={require('../../Images/faAngleleft.png')}
            //           style={[global.settingIcon, global.iconColor]}
            //         />
            //       </Pressable>

            //       <View>
            //         <Text style={global.commonTextblue}>Today</Text>
            //       </View>

            //       <Pressable
            //         style={{
            //           padding: 10,
            //           borderLeftWidth: 1,
            //           borderColor: '#DADADA',
            //         }}>
            //         <Image
            //           source={require('../../Images/faAngleright.png')}
            //           style={[global.settingIcon, global.iconColor]}
            //         />
            //       </Pressable>
            //     </View>
            //   );
            // }}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={() => renderEmpty()}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => itemSeprator()}
          />
        </View>
        {isDevicetype.isTab === 'Tablet' ? (
          <View style={{width: '70%'}}>
            {viewBill.length === 0 ? null : (
              <Billdescriptions
                navigation={navigation}
                route={route}
                orderId={posorderId}
                posorderDate={posorderDate}
                poscustomerName={poscustomerName}
                posorderPrice={posorderPrice}
                viewBill={viewBill1}
                posorderStatus={posorderStatus}
                onCancelbill={onCancelbill}
                currencyType={currencyType}
                totalTax={totalTax}
                shippingCost={shippingCost}
                discountAmt={discountAmt}
              />
            )}
          </View>
        ) : null}
      </View>

      {loader ? <Customloader /> : null}

      {isDatePickerVisible ? (
        <DateTimePicker
          mode="date"
          onChange={handleConfirmpick}
          onTouchCancel={() => handleCancel()}
          display="default"
          value={new Date()}
        />
      ) : null}
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  ivHeaderTwo: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
    elevation: 0.1,
  },
  arrowImage: {
    width: 20,
    height: 20,
  },
  inventoryDate: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    height: 25,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  inventoryText: {
    fontSize: 16,
    color: '#144693',
    fontFamily: 'Helvetica',
  },
})