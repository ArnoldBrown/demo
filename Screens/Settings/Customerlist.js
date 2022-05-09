import React, { useState, useEffect, PureComponent } from 'react';
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
  Modal,
  Dimensions,
  FlatList,
  Keyboard,
} from 'react-native';
import { global } from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import Customerdescription from '../AddCustomer.js/Customerdescription';
import Addcustomer from '../AddCustomer.js/Addcustomer';
import Purchasehistory from '../AddCustomer.js/Purchasehistory';
import { listcustomerAction } from '../../action/customerAction';
import { useSelector, useDispatch } from 'react-redux';
import Customloader from '../Customloader';
import { API_Links } from '../Api/Api';
import uuid from 'react-native-uuid';
import RoleMessage from '.././RoleMessage';
import { manageAction } from '../../action/manageAction';
import { customerdeleteAction } from '../../action/customerdeleteAction';
import { purchaselistAction } from '../../action/purchaselistAction';

import Purchasedescriptions from '../AddCustomer.js/Purchasedescriptions';


import AuthId from '../AuthId.style'





export default function Customerlist({ navigation, route }) {
  const getToken = useSelector(state => state.loginReducer);
  const { casherId } = getToken;

  const getAdminroles = useSelector(state => state.manageReducer);
  const { roleList } = getAdminroles;

  const getLanguageids = useSelector(state => state.languageReducer);
  const { languageId } = getLanguageids;

  const getCurrencycodes = useSelector(state => state.currencyReducer);
  const { currencyCode, symbol } = getCurrencycodes;


  const shopName = useSelector(state => state.shopnameReducer);

  const { groceryName } = shopName;



  const dispatch = useDispatch();

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     dispatch(manageAction(casherId ,groceryName));
  //   });
  //   return () => {
  //     unsubscribe;
  //   };
  // }, []);

  const [text, onChangeText] = React.useState('');
  const [type, setType] = React.useState('Description');

  const [purchasehistorymodel, setPurchasehistorymodel] = useState(false);

  const [loader, setLoader] = useState(false);
  const [customerList, secustomerList] = useState([]);

  const [customerdt, setCustomerdt] = useState({});
  const [customerId, setCustomerid] = useState('');

  const [purchaseScreen, setpurchaseScreen] = React.useState(false);
  const [purchaseDetailscreen, setpurchaseDetailscreen] = React.useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderPrice, setOrderprice] = useState('');

  const [datePurchased, setdatePurchased] = useState('');
  const [orderStatus, setorderStatus] = useState('');
  const [viewBills, setviewBills] = useState([]);
  const [deliveryName, setdeliveryName] = useState('');
  const [role, setRole] = useState('');
  const [currencyType, setcurrencyType] = useState('');
  const [totalTax, settotalTax] = useState('');
  const [shippingCost, setshippingCost] = useState('');

  const deviceType = DeviceType();

  const updateSearch = customerList.filter(
    e => e.first_name.toLowerCase().includes(text.toLowerCase()),
    /// e.phone.toLowerCase().includes(text.toLowerCase())
  );

  const listcustomerAction = () => {
    setLoader(true);
    fetch(groceryName === "" ? API_Links.BASE_URL + API_Links.CUSTOMER_LIST : API_Links.SHOP_URL + groceryName + "/" + "api" + "/" + API_Links.CUSTOMER_LIST, {
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
    })
      .then(response => response.json())

      .then(data => {

        setLoader(false);

        if (data.success === '1') {
          secustomerList(data.data);
          setCustomerid(data.data[0].id);
          setCustomerdt(data.data[0]);
        } else {
          secustomerList([]);
        }
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      listcustomerAction();
    });

    return () => {
      unsubscribe;
    };
  }, []);

  const openPurchasehistory = id => {
    dispatch(purchaselistAction(id, languageId, currencyCode, groceryName));

    setpurchaseScreen(true);
  };

  const openPurchasedetail = (
    id,
    price,
    date_purchased,
    cashier,
    delivery_name,
    viewBill,
    orders_status,
    currency_type,
    total_tax,
    shipping_cost,
  ) => {
    setOrderId(id);
    setOrderprice(price);
    setdatePurchased(date_purchased);
    setorderStatus(orders_status);
    setviewBills(viewBill);
    setdeliveryName(delivery_name);
    setRole(cashier);
    setcurrencyType(currency_type);
    settotalTax(total_tax);

    setshippingCost(shipping_cost);

    setpurchaseDetailscreen(true);

    setpurchaseScreen(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        deviceType.isTab === 'Tablet'
          ? [
            getCustomerdata(item),
            ongetcustomerId(item.id),

            dispatch(purchaselistAction(item.id, languageId, currencyCode)),
          ]
          : [
            navigation.navigate('Customerdescription', {
              userId: item.id,
              first_name: item.first_name,
              last_name: item.last_name,
              email: item.email,
              check_password: item.check_password,
              phone: item.phone,
              country_code: item.country_code,
              gender: item.gender,
              dob: item.dob,
              entry_street_address: item.entry_street_address,
              id: item.id,
              address_book_id: item.address_book_id,
              postal_code: item.entry_postcode,
              city: item.entry_city,
              entry_country_id: item.entry_country_id,
              entry_zone_id: item.entry_zone_id,
              countries_name: item.countries_name,
              zone_name: item.zone_name,
              loyalty_points: item.loyalty_points,

              //  entry_city:item.entry_city
            }),
            ongetcustomerId(item.id),
          ]
      }>
      <View
        style={[
          global.flexLine,
          global.flexRowsec,
          global.Dimensionwidth > 468
            ? customerId === item.id
              ? { backgroundColor: '#6a686842' }
              : { backgroundColor: '#fff' }
            : { backgroundColor: '#fff' },
          { padding: 14 },
        ]}>
        <View
          style={[
            {
              width: 50,
              height: 50,
              borderRadius: 100,

              justifyContent: 'center',
              alignItems: 'center',
            },
            global.appBgcolor,
          ]}>
          <Text style={[global.bigOtext_2, { color: '#fff' }]}>
            {item.first_name.charAt(0)}
          </Text>
        </View>
        <View style={{ marginHorizontal: 11 }}>
          <Text style={[global.commonTextblueH1, { marginBottom: 8 }]}>
            {item.first_name}
          </Text>
          <Text style={global.commonText}>
            {item.country_code + item.phone}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const listEmptyComponent = () => {
    return (
      <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={global.commonTextblueH1}>No Customers found</Text>
      </View>
    );
  };

  const getCustomerdata = item => {
    setCustomerdt(item);
  };

  const ongetcustomerId = id => {
    setCustomerid(id);
  };

  const onDeletecustomer = async () => {
    await dispatch(customerdeleteAction(customerId, navigation, groceryName));

    listcustomerAction();
  };

  const renderHeader = () => {
    return (
      <View style={{ paddingHorizontal: 15, paddingVertical: 9 }}>
        <View style={[global.headerSerach]}>
          <Image
            source={require('../../Images/search.png')}
            style={[{ tintColor: '#6E7172' }, { width: 20, height: 20 }]}
            resizeMode="contain"
          />

          <TextInput
            style={[global.input, { paddingHorizontal: 4 }]}
            onChangeText={e => onChangeText(e)}
            value={text}
            placeholder="Search by name"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor={'#6E7172'}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>
      {deviceType.isTab !== 'Tablet' ? (
        <View style={global.commonMobileHeader}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image
              source={require('../../Images/menu.png')}
              style={{ width: 20, height: 20 }}
            />
          </TouchableOpacity>

          <Text style={global.headTitle}>Customers</Text>



          <TouchableOpacity
            onPress={() => navigation.navigate('Addcustomer')}>
            <Text style={global.headSvbtn}>Add customer</Text>
          </TouchableOpacity>

        </View>
      ) : (
        <View style={[global.tabHeader]}>
          <View style={global.tabHeadcol1}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image
                source={require('../../Images/menu.png')}
                style={[global.settingIcon]}
              />
            </TouchableOpacity>

            <Text style={global.headTitle}>Customers</Text>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Addcustomer')}>
                <Text style={[global.headTitle, global.COLOR_BLUE]}>Add</Text>
              </TouchableOpacity>
            </View>

            <View style={global.statusBarline}></View>
          </View>

          <View style={[global.tabHeadcol2, {}]}>
            <View style={global.commonFlexrow_ct}>
              {purchaseScreen ? (
                <TouchableOpacity
                  onPress={() => setpurchaseScreen(false)}
                  style={global.flexRowsec}>
                  <Image
                    source={require('../../Images/angleLeft.png')}
                    style={[global.settingIcon]}
                  />
                  <Text style={[global.commonBold, global.commonTextblueH1]}>
                    Back
                  </Text>
                </TouchableOpacity>
              ) : purchaseDetailscreen ? (
                <TouchableOpacity
                  onPress={() => [
                    setpurchaseDetailscreen(false),
                    setpurchaseScreen(true),
                  ]}
                  style={global.flexRowsec}>
                  <Image
                    source={require('../../Images/angleLeft.png')}
                    style={[global.settingIcon]}
                  />
                  <Text style={[global.commonBold, global.commonTextblueH1]}>
                    Back
                  </Text>
                </TouchableOpacity>
              ) : (
                <View></View>
              )}

              <Text style={global.headTitle}>
                {purchaseScreen
                  ? 'Purchase History'
                  : purchaseDetailscreen
                    ? `Order Id ${orderId}`
                    : type}
              </Text>

              {purchaseScreen === true || purchaseDetailscreen === true ? (
                <View></View>
              ) : (
                <View>
                  {customerList.length === 0 ? null : (
                    <View style={global.flexRowsec}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('Editcustomer', {
                            customerdt: customerdt,
                          })
                        }>
                        <Text style={[global.appColor, { marginHorizontal: 20 }]}>
                          Edit
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => onDeletecustomer()}>
                        <Image
                          source={require('../../Images/trash.png')}
                          style={global.settingIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
        </View>
      )}

      <View
        style={[
          {
            flexDirection: deviceType.isTab === 'Tablet' ? 'row' : 'column',
            flex: 1,
            borderRightColor: '#DADADA',
            borderRightWidth: 1,
            backgroundColor: '#f1f6fa29',
          },
        ]}>
        <View
          style={[
            {
              width: global.Dimensionwidth > 468 ? '30%' : '100%',
              borderRightWidth: 1,
              borderRightColor: '#DADADA',
              backgroundColor: '#f1f6fa29',
              flex: 1,
            },
          ]}>
          <FlatList
            ListHeaderComponent={renderHeader()}
            data={updateSearch}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={listEmptyComponent()}
            contentContainerStyle={{ flexGrow: 1 }}
          />
        </View>

        {deviceType.isTab === 'Tablet' ? (
          <View
            style={{ width: '70%', backgroundColor: '#F1F6FA', marginTop: 33 }}>
            {customerList.length === 0 ? null : (
              <Customerdescription
                openPurchasehistory={openPurchasehistory}
                navigation={navigation}
                route={route}
                customerdt={customerdt}
                purchaseScreen={purchaseScreen}
                purchaseDetailscreen={purchaseDetailscreen}
                openPurchasedetail={openPurchasedetail}
                orderId={orderId}
                orderPrice={orderPrice}
                datePurchased={datePurchased}
                orderStatus={orderStatus}
                viewBills={viewBills}
                deliveryName={deliveryName}
                roles={role}
                currencyType={currencyType}
                totalTax={totalTax}
                shippingCost={shippingCost}
              />
            )}
          </View>
        ) : null}

        {roleList === undefined ? null : roleList.customers_view === 0 ? (
          <RoleMessage />
        ) : null}
      </View>


      {loader ? <Customloader /> : null}



    </SafeAreaView>
  );
}
