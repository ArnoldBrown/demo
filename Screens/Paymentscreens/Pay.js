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
  ScrollViewBase,Alert
} from 'react-native';
import {global} from '../../styles/global';
import DeviceInfo from 'react-native-device-info';
import PaymentType from '../Paymentscreens/PaymentType';

import Coupon from '../Paymentscreens/Coupon';
import Delivery from '../Paymentscreens/Delivery';
import Credit from '../Paymentscreens/Credit';
import Cash from '../Paymentscreens/Cash';
import {API_Links} from '../Api/Api';
import {useSelector, useDispatch} from 'react-redux';

import uuid from 'react-native-uuid';


import Customloader from '.././Customloader'

import {Cartclear} from '../../action/Cartatction';
import { not } from 'react-native-reanimated';


import  {Order} from '../Paymentscreens/Order'







  


export default function Pay({navigation ,route}) {

///---- Redux-Hook ---- //

const getLanguageids = useSelector(state => state.languageReducer);
const {languageId} = getLanguageids;


const getCurrencycodes = useSelector(state => state.currencyReducer);
const {currencyCode} = getCurrencycodes;





  const ass = useSelector(state => state.cartReducer);

  const {cartItems ,singlecustomerData ,couponCode ,couponAmount ,couponId } = ass;



  const getToken = useSelector(state => state.loginReducer);
  const {userId ,casherId} = getToken;


  const shopName = useSelector(state => state.shopnameReducer);
  
  const {groceryName} = shopName;


  const guestDetails = useSelector(state => state.guestReducer);
  
  const {guestData} = guestDetails;


    
///---- Redux-Hook ---- //


  
 //cartItems.map((e , i)=> console.log(i))

  





  












  const [checkDevicetype, setDevicetype] = React.useState(' ');
  const [checkprovider, onCheckprovider] = React.useState(false);
  const [checkCash, onCheckcash] = React.useState(false);

  const [text, onChangeText] = React.useState(' ');

  useEffect(() => {
    setDevicetype(DeviceInfo.getDeviceType);
  }, []);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  const [loader,setLoader]=useState(false)

  const [selectType, setType] = useState(1);

  const [payAmount, onChangepayAmount] = React.useState('');


  let totalAmt = (Math.round(route.params.finalAmount * 100) / 100).toFixed(2)


 let  balanceAmount =  totalAmt  - payAmount 





  const Pay = PaymentType();



  const OnselectType = id => {
    setType(id);
  };



  const onSubmitorder =async () => {

    

    Order(singlecustomerData ,cartItems ,navigation ,API_Links.BASE_URL ,API_Links.ADD_TO_ORDER ,currencyCode ,
        languageId , route.params.finalAmount ,casherId ,balanceAmount , 
       selectType === 5 ?  couponAmount:0 , 
       selectType === 5 ?  couponId :0 ,
       couponCode ,route.params.discount  , groceryName , route.params.checkboxState ,guestData
       

        
       
     )
     

  };




const onPayment = ()=>{

if(selectType ===1){

  if(payAmount < route.params.finalAmount){
    Alert.alert(
      "Payment Failed",
      "Amount not valid",
      [
        
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
 
  }

  else {

    onSubmitorder()
    
  }

}


 if(selectType===5 &&couponAmount === undefined  ){

  Alert.alert(
    "Coupon Not  Applied",
    "",
    [
    
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );

 }



else if(couponAmount  < balanceAmount ){

  Alert.alert(
    "Your coupon Amount is low",
    "Try another coupon",
    [
    
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ]
  );

}



}



  return (
    <SafeAreaView style={[global.commonBg]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>

      <View style={[global.commonMobileHeader]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Payment</Text>

        <Text></Text>
        {/* <TouchableOpacity>
          <Image
            source={require('../../Images/icons8-cash-50.png')}
            style={{width: 25, height: 25}}
          />
        </TouchableOpacity> */}
      </View>
      <View
        style={[
          global.commonFlexrow_bt,
          {backgroundColor: '#fff', padding: 20},
        ]}>
        <View style={{justifyContent:'space-between'}}>
          <Text style={global.commonTextblue}>Net Value</Text>
          <Text style={{color:'#144693',fontSize:20}}>{currencyCode}</Text>
        </View>

        <View style={{justifyContent:'space-between'}}>
          <Text style={{fontSize: 22, textAlign: 'right'}}>
            {' '}
             {totalAmt}
            {}
          </Text>


          <Text style={[{fontSize: 28, textAlign: 'right'}, global.COLOR_RED]}>

            {  balanceAmount }

          {/* {COD > (Math.round(totalAmt * 100) / 100).toFixed(2) ? "0.00" : - (Math.round(totalAmt * 100) / 100).toFixed(2) - COD} */}



          </Text>
        </View>
        
      </View>

      <View
        style={{
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E7E7E7',
        }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
           {Pay.PaymentTypes.map((e, index) => {
            return (
              <TouchableOpacity
                onPress={() => OnselectType(e.payment_methods_id)}
                style={
                  e.payment_methods_id === selectType
                    ? global.mob_payTypeListsactive
                    : global.mob_payTypeLists
                }
                key={index}>
                <Image
                  source={{uri:  groceryName === "" ? API_Links.URL +e.image : API_Links.SHOP_URL+groceryName+"/"+e.image}}
                  style={[
                    global.cashCalcicon,
                    {marginRight: 11, tintColor: '#144692'},
                  ]}
                />

                <Text
                  style={[
                    e.payment_methods_id === selectType
                      ? global.payTabmenuactive
                      : global.payTabmenu,
                  ]}>
                  {e.name}
                </Text>
              </TouchableOpacity>
            );
          })} 
        </ScrollView>
      </View>

      <View
        style={[
          global.innerSecwhitebg,
          {
            backgroundColor: '#F4F8FF',
            paddingVertical: 11,
            paddingHorizontal: 11,
          },
        ]}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          {selectType === 1 ? (

            <Cash  payAmount={payAmount}
            onChangepayAmount={onChangepayAmount} />


          ) : selectType === 2 ? (

            <Credit />

          ) : selectType === 4 ? (

            <Delivery />

          ) : selectType === 5 ? (

            <Coupon />


          ) : null}

          {/* <View style={[global.inputBox, {marginBottom: 8}]}>
            <TextInput style={[global.input, {textAlign: 'right'}]} />
          </View>
          <View style={[global.inputBox]}>
            <TextInput style={[global.input, {textAlign: 'right'}]} />
          </View>
          <View style={global.payCardsec1}>
            <View style={global.commonFlexrow_bt}>
              <View
                style={{
                  width: '48%',
                  marginHorizontal: 4,
                  borderColor: '#E7E7E7',
                  borderWidth: 1,
                  padding: 6,
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../../Images/cash.png')}
                  style={global.commomMediumicon}
                />
                <View style={{marginLeft: 6}}>
                  <Text style={global.commonTextblue}>SBI</Text>
                  <Text style={global.commonText}>WELFARE</Text>
                </View>
              </View>
              <View
                style={{
                  width: '48%',
                  marginHorizontal: 4,
                  borderColor: '#E7E7E7',
                  borderWidth: 1,
                  padding: 6,
                }}>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../../Images/cash.png')}
                    style={global.commomMediumicon}
                  />
                  <View style={{marginLeft: 6}}>
                    <Text style={global.commonTextblue}>SBI</Text>
                    <Text style={global.commonText}>WELFARE</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={[global.inputBox]}>
            <TextInput style={[global.input, {textAlign: 'right'}]} 
            placeholder="Optional"/>
          </View>
         <View style={{backgroundColor:"#fff",padding:11 ,marginTop:11}}>
         <View style={global.checkBoxWrapper}>
              <TouchableOpacity onPress={() => onCheckprovider(!checkprovider)}>
                <View
                  style={
                    checkprovider
                      ? global.customCheckbox
                      : global.customCheckboxdisable
                  }>
                  {checkprovider ? (
                    <Image
                      source={require('../../Images/tick.png')}
                      style={{width: 20, height: 20}}
                      resizeMode="contain"
                    />
                  ) : null}
                </View>
              </TouchableOpacity>
              <Text>Pay with Provider</Text>
            </View>
<View style={[global.commonFlexrow_ct,{marginTop:14}]}>
            <View style={global.checkBoxWrapper}>
              <TouchableOpacity onPress={() => onCheckcash(!checkCash)}>
                <View
                  style={
                    checkCash
                      ? global.customCheckbox
                      : global.customCheckboxdisable
                  }>
                  {checkCash ? (
                    <Image
                      source={require('../../Images/tick.png')}
                      style={{width: 20, height: 20}}
                      resizeMode="contain"
                    />
                  ) : null}
                </View>
              </TouchableOpacity>
              <Text>Pay with Cash</Text>
            </View>
            <View style={[global.inputBox,{width:"50%"}]}>
            <TextInput
              style={[global.input,{textAlign:"right"}]}
              onChangeText={onChangeText}
              value={text}
          
            />
          </View>
            </View>
         </View>
          <View style={global.payCardsec1}>
            <View style={global.commonFlexrow_bt}>
              <View
                style={{
                  width: '48%',
                  marginHorizontal: 4,
                  borderColor: '#E7E7E7',
                  borderWidth: 1,
                  padding: 6,
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../../Images/cash.png')}
                  style={global.commomMediumicon}
                />
                <View style={{marginLeft: 6}}>
                  <Text style={global.commonTextblue}>SBI</Text>
                  <Text style={global.commonText}>WELFARE</Text>
                </View>
              </View>
              <View
                style={{
                  width: '48%',
                  marginHorizontal: 4,
                  borderColor: '#E7E7E7',
                  borderWidth: 1,
                  padding: 6,
                }}>
                <TouchableOpacity style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../../Images/cash.png')}
                    style={global.commomMediumicon}
                  />
                  <View style={{marginLeft: 6}}>
                    <Text style={global.commonTextblue}>SBI</Text>
                    <Text style={global.commonText}>WELFARE</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View> */}

          {/* <View style={[global.inputBox]}>
            <TextInput style={[global.input, {}]}  placeholder="THB"/>
          </View>

          <View style={[global.inputBox, {marginTop: 14}]}>
            <TextInput style={[global.input, {}]} placeholder="Note"/>
          </View>

          <View>
            <TouchableOpacity style={[global.commonButton, {marginTop: 15}]}>
              <Text style={global.btnText1}>Add Coupon</Text>
            </TouchableOpacity>
          </View>
        </View> */}
        </View>

        <View>
          <TouchableOpacity
            style={  global.commonButton   }
            onPress={() => onPayment()}  
            
           >


            <Text style={global.btnText1}>Payment Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>

{loader ? <Customloader/> : null}

    </SafeAreaView>
  );
}
