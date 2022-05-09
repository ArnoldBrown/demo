import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {global} from '../../styles/global';
import {API_Links} from '../Api/Api';
import {FlatGrid} from 'react-native-super-grid';
import  AuthId  from '../AuthId.style'

import moment from 'moment';

import DeviceInfo from 'react-native-device-info';
import uuid from 'react-native-uuid';
import Customloader from '../Customloader';
import {applycouponAction} from '../../action/Cartatction'
import {useDispatch ,useSelector} from 'react-redux'





export default function Coupon() {

 const dispatch = useDispatch()

 const ass = useSelector(state => state.cartReducer);

 const {singlecustomerData ,onLoad} = ass;

 const shopName = useSelector(state => state.shopnameReducer);

 const {groceryName} = shopName;





  const [checkDevicetype, setDevicetype] = React.useState(' ');
  const [couponList, setCouponlist] = useState([]);
  const[loader,setLoader]=useState(false)



  useEffect(() => {
    setDevicetype(DeviceInfo.getDeviceType);
  }, []);




  const getCouponlist = () => {
    setLoader(true)


    fetch( groceryName === "" ? API_Links.BASE_URL + API_Links.VIEW_POS_COUPON : API_Links.SHOP_URL+ groceryName +"/"+"api"+"/"+API_Links.VIEW_POS_COUPON, {


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
      //body: data,
    })
      .then(response => response.json())

      .then(data => {
       

        setLoader(false)

        if (data.success === '1') {
          setCouponlist(data.data);
        } else {
          setCouponlist([]);
        }
      })

      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCouponlist();
  }, []);


const checkCoupon =(coupanid , code ,amount   )=>{

  let couponObj = {
    coupanId:coupanid,
    couponCode:code ,
    amount:amount,

 };

dispatch(applycouponAction(couponObj , singlecustomerData.user_id  ,groceryName ))



}




  return (
    <View style={{flex: 1}}>
      {/* //      <View style={[global.inputBox, {marginBottom: 8} ,global.flexRowsec]}>
// <View style={{flex:0.4,}}>
// <Text style={[global.H1,global.commonText]}>Amount</Text>
// </View>
// <View style={{flex:0.6}}>

// <TextInput style={[global.input,{textAlign:"right"}]} maxLength={4}  keyboardType="number-pad"  placeholder="0"   keyboardAppearance="dark"
// placeholderTextColor="#000"/>

// </View>
// </View> */}

      {/* // <View style={[global.inputBox, {marginTop: 14}]}>
          //   <TextInput style={[global.input, {}]} placeholder="Note" placeholderTextColor="#000"/>
          // </View>

          // <View>
          //   <TouchableOpacity style={[global.commonButton, {marginTop: 15}]}>
          //     <Text style={global.btnText1}>Add Coupon</Text>
          //   </TouchableOpacity>
          // </View> */}

      <FlatGrid
        showsVerticalScrollIndicator={false}
        itemDimension={
          checkDevicetype === 'Handset'
            ? global.Dimensionwidth
            : global.Dimensionwidth / 4
        }
        data={couponList}
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
              No Coupon's Found
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
            }}>
            <View
              style={[
                {
                  backgroundColor: '#144692',
                  borderTopLeftRadius: 6,
                  borderTopRightRadius: 6,
                  paddingHorizontal: 15,
                  paddingVertical: 2,
                },
                global.commonFlexrow_ct,
              ]}>
              <Text style={global.commonTextwhiteH1}>
                {' '}
                <Text>CODE:</Text>{' '}
                <Text style={[global.commonBold]}>{item.code}</Text>{' '}
              </Text>

              <Image source={require('../../Images/CouponIcon.png')} />
            </View>

            <View
              style={{
                backgroundColor: '#fff',
                padding: 15,
               
                borderBottomRightRadius: 6,
                borderBottomLeftRadius: 6,
              }}>
              <View style={[global.commonFlexrow_ct ,{}]}>
                <View>
                  <Text style={[global.commonTextblueH1]}>
                    {' '}
                    RM{' '}
                    {(Math.round(item.amount * 100) / 100).toFixed(2)}
                  </Text>

                  <Text style={{marginTop: 7}}>
                    {moment(item.created_at).format('MMM-d-yy')}
                    {} <Text style={global.commonTextblue}>to: </Text>{moment(item.expiry_date).format('MMM-d-yy')}
                    {}
                  </Text>
                </View>

                <View>
                  <TouchableOpacity style={[global.commonButton,{backgroundColor:"#000" ,height:30}]}
                  
                  onPress={()=> checkCoupon( item.coupans_id , item.code ,item.amount )}
                  
                  
                  >
                    <Text style={global.btnText1}>Use Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />

{onLoad ?  <Customloader/> :null}



    </View>
  );
}
