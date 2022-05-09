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
  Modal,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceInfo from 'react-native-device-info';
import DeviceType from '../Orientation/DeviceType';
import Purchasehistory from '../AddCustomer.js/Purchasehistory';
import {useSelector, useDispatch} from 'react-redux';
import Customloader from '../Customloader';
import {customerdeleteAction} from '../../action/customerdeleteAction';
import Purchasedescriptions from '../AddCustomer.js/Purchasedescriptions';
import  AuthId  from '../AuthId.style'

//import Purchasehistory from '../../Screens/AddCustomer.js/Purchasehistory'

export default function Customerdescription({
  navigation,
  openPurchasehistory,
  route,
  customerdt,
  purchaseScreen,
  purchaseDetailscreen,
  openPurchasedetail,

  datePurchased,
  orderStatus,
  viewBills,
  deliveryName,
  roles,

  orderId,
  orderPrice,

  currencyType,

  totalTax,
  shippingCost,
}) {
  let userId = global.Dimensionwidth > 468 ? customerdt.user_id : '';

  const dispatch = useDispatch();

  const state = useSelector(state => state.deleteCustomerReducer);
  const {loader} = state;

  const [checkDevicetype, setDevicetype] = React.useState(' ');

  useEffect(() => {
    setDevicetype(DeviceInfo.getDeviceType);
  }, []);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  const shopName = useSelector(state => state.shopnameReducer);
  
  const {groceryName} = shopName;



  const findDevicetype = DeviceType();

  const onDeletecustomer = async id => {
    await dispatch(customerdeleteAction(id, navigation ,groceryName));
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

          <Text style={global.headTitle}>Descriptions</Text>

          <View style={global.commonFlexrow_bt}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Editcustomer', {
                  first_name: route.params.first_name,
                  last_name: route.params.last_name,
                  email: route.params.email,
                  check_password: route.params.check_password,
                  phone: route.params.phone,
                  country_code: route.params.country_code,
                  gender: route.params.gender,
                  dob: route.params.dob,
                  entry_street_address: route.params.entry_street_address,
                  id: route.params.id,
                  address_book_id: route.params.address_book_id,
                  postal_code: route.params.postal_code,
                  city: route.params.entry_city,
                  entry_country_id: route.params.entry_country_id,
                  entry_zone_id: route.params.entry_zone_id,
                  countries_name: route.params.countries_name,
                  zone_name: route.params.zone_name,
                  city: route.params.city,
                })
              }>
              <Text style={global.headSvbtn}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onDeletecustomer(route.params.id)}>
              <Image
                source={require('../../Images/trash.png')}
                style={{width: 20, height: 20, marginLeft: 11}}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {purchaseScreen || purchaseDetailscreen ? null : (
        <View style={[global.commonLightbg]}>

          <View style={{backgroundColor: '#fff', paddingHorizontal: 11}}>
<ScrollView>



            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                margin: 20,
              }}>
              <View
                style={[
                  global.appBgcolor,
                  {
                    width: 80,
                    height: 80,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                  },
                ]}>
                <Text style={[global.bigOtext_2, global.COLOR_WHITE]}>
                  {global.Dimensionwidth < 468
                    ? route.params.first_name.charAt(0)
                    : customerdt.first_name === undefined
                    ? null
                    : customerdt.first_name.charAt(0)}
                </Text>
              </View>
              <Text style={{fontSize: 18}}>
                {' '}
                {global.Dimensionwidth < 468
                  ? route.params.loyalty_points
                  : customerdt.loyalty_points}{' '}
                Points
              </Text>
            </View>

            <View style={[global.commonFlexrow_ct, global.customerDetailList]}>
              <View style={global.commonTwocol}>
                <Text style={global.commonTextblackH1}>Name</Text>
              </View>
              <View style={global.commonTwocol}>
                <Text style={global.commonTextblue} numberOfLines={2}>
                  {checkDevicetype === 'Handset'
                    ? route.params.first_name + route.params.last_name
                    : checkDevicetype === 'Tablet'
                    ? customerdt.first_name + customerdt.last_name
                    : null}
                </Text>
              </View>
            </View>

            <View style={[global.commonFlexrow_ct, global.customerDetailList]}>
              <View style={global.commonTwocol}>
                <Text style={global.commonTextblackH1}>Email</Text>
              </View>
              <View style={global.commonTwocol}>
                <Text style={global.commonTextblue}>
                  {checkDevicetype === 'Handset'
                    ? route.params.email
                    : checkDevicetype === 'Tablet'
                    ? customerdt.email
                    : null}
                </Text>
              </View>
            </View>

            <View style={[global.commonFlexrow_ct, global.customerDetailList]}>
              <View style={global.commonTwocol}>
                <Text style={global.commonTextblackH1}>Phone Number</Text>
              </View>
              <View style={global.commonTwocol}>
                <Text style={global.commonTextblue}>
                  {checkDevicetype === 'Handset'
                    ? route.params.country_code + route.params.phone
                    : checkDevicetype === 'Tablet'
                    ? customerdt.country_code + customerdt.phone
                    : null}
                </Text>
              </View>
            </View>

            <View style={[global.commonFlexrow_ct, global.customerDetailList]}>
              <View style={global.commonTwocol}>
                <Text style={global.commonTextblackH1}>Tax ID</Text>
              </View>
              <View style={global.commonTwocol}>
                <Text style={global.commonTextblue} numberOfLines={2}>
                  01055xxxxxxx
                </Text>
              </View>
            </View>

            <View style={[global.commonFlexrow_ct, global.customerDetailList]}>
              <View style={global.commonTwocol}>
                <Text style={global.commonTextblackH1}>Address</Text>
              </View>
              <View style={global.commonTwocol}>
                <Text style={global.commonTextblue}>
                  {checkDevicetype === 'Handset'
                    ? route.params.entry_street_address
                    : checkDevicetype === 'Tablet'
                    ? customerdt.entry_street_address
                    : null}
                </Text>
              </View>
            </View>

            <View style={[global.commonFlexrow_ct, global.customerDetailList]}>
              <View style={global.commonTwocol}>
                <Text style={global.commonTextblackH1}>Gender</Text>
              </View>
              <View style={global.commonTwocol}>
                <Text style={global.commonTextblue}>
                  {checkDevicetype === 'Handset'
                    ? route.params.gender
                    : checkDevicetype === 'Tablet'
                    ? customerdt.gender
                    : null}
                </Text>
              </View>
            </View>

            <View style={[global.commonFlexrow_ct, global.customerDetailList]}>
              <View style={global.commonTwocol}>
                <Text style={global.commonTextblackH1}>Date Of Birth</Text>
              </View>
              <View style={global.commonTwocol}>
                <Text style={global.commonTextblue}>
                  {checkDevicetype === 'Handset'
                    ? route.params.dob
                    : checkDevicetype === 'Tablet'
                    ? customerdt.dob
                    : null}
                </Text>
              </View>
            </View>

            <View style={[global.commonFlexrow_ct, global.customerDetailList]}>
              <View></View>

              {/* :customerdt.id */}

              <TouchableOpacity
                onPress={() =>
                  global.Dimensionwidth < 468
                    ? navigation.navigate('Purchasehistory', {
                        userId: route.params.userId,
                      })
                    : openPurchasehistory(userId)
                }>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Image
                    source={require('../../Images/purchase-order.png')}
                    style={{width: 30, height: 30, marginRight: 5}}
                  />

                  <Text style={global.appColor}>Purchase history</Text>
                </View>
              </TouchableOpacity>

              <View></View>
            </View>
            </ScrollView>

          </View>
          
          {/* <Modal >

<View style={global.commonModalbg}>






</View>






</Modal> */}
        </View>
      )}

      {purchaseScreen ? (
        <Purchasehistory
          navigation={navigation}
          route={route}
          customerdt={customerdt.user_id}
          openPurchasedetail={openPurchasedetail}
        />
      ) : null}

      {purchaseDetailscreen ? (
        <Purchasedescriptions
          navigation={navigation}
          route={route}
          orderId={orderId}
          orderPrice={orderPrice}
          datePurchased={datePurchased}
          orderStatus={orderStatus}
          viewBills={viewBills}
          deliveryName={deliveryName}
          roles={roles}
          currencyType={currencyType}
          totalTax={totalTax}
          shippingCost={shippingCost}
        />
      ) : null}

      {loader ? <Customloader /> : null}
    </SafeAreaView>
  );
}
