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
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
import DeviceInfo from 'react-native-device-info';
import {useSelector, useDispatch} from 'react-redux';
import {cancelBillaction} from '../../action/cancelBillaction';
import Customloader from '../Customloader';
import  AuthId  from '../AuthId.style'


import {API_Links} from '../Api/Api';


export default function Purchasedescriptions({
  navigation,
  route,
  


orderId ,
orderPrice,


 datePurchased,
orderStatus,
viewBills,
deliveryName,
roles

,currencyType,

totalTax,
shippingCost,
  
}) {

  const dispatch =useDispatch()
  //  const getMerchantdetails = useSelector(state => state.merchantloginDetails);
  const getToken = useSelector(state => state.loginReducer);
  const {casherId} = getToken;

  const billReducer = useSelector(state => state.cancelBillreducer);
  const {loader} = billReducer;



  const getCurrencycodes = useSelector(state => state.currencyReducer);
  const {currencyCode, symbol} = getCurrencycodes;


  const [checkDevicetype, setDevicetype] = React.useState(' ');

  useEffect(() => {
    setDevicetype(DeviceInfo.getDeviceType);
  }, []);

  

  const findDevicetype = DeviceType();

//  let Total=  Math.round (route.params.viewBill.reduce((a, c) => a + c.products_price * c.products_quantity, 0)*100/100).toFixed(2) 

   
   
  
   
   





 const oncancelBillmobile = () => {

     dispatch(cancelBillaction(casherId, checkDevicetype==="Tablet"?  orderId : checkDevicetype==="Handset"?   route.params.orders_id :null, navigation));

 };





let Total =global.Dimensionwidth < 468 ? Math.round (route.params.viewBill.reduce((a, c) => a + c.products_price * c.products_quantity, 0)*100/100).toFixed(2) : 
Math.round (viewBills.reduce((a, c) => a + c.products_price * c.products_quantity, 0)*100/100).toFixed(2) 


  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>
      {findDevicetype.isTab==="Tablet" ? null :
        <View style={[global.commonHeader, {padding: 15}]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../Images/left-arrow.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>

          <Text style={global.headTitle}>Descriptions</Text>

          <Text></Text>
        </View>
}

      <View
        style={[
          global.commonBg,
          {
            borderLeftWidth: findDevicetype.isTab === 'Tablet' ? 1 : null,
            borderLeftColor: '#DADADA',
            
          },
        ]}>
        <View style={{flex: 1}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[global.commonWhitebgw, {backgroundColor:"#fff"}]}>
              <View style={{padding:15}}> 

             
              <View style={global.commonFlexroew_bt}>
<View>


<View style={[global.commonFlexrow_bt,global.bottomSpacing]}>

<Text style={[{fontSize:global.Dimensionwidth > 468 ? 29  :22}, global.COLOR_BLUE]}>
                  Order Id :{' '}
                  
                   
{ global.Dimensionwidth > 468 ? orderId  : route.params.orders_id      }
                </Text>


                <Text style={[{fontSize:global.Dimensionwidth > 468 ? 29  :22}, global.COLOR_BLUE]}>
                  
                  {global.Dimensionwidth > 468 ?   currencyType  :route.params.currency_type } {''}
                   
                    {global.Dimensionwidth > 468 ?    Math.round(orderPrice * 100) / 100
                         .toFixed(2)  :
               
                           Math.round(route.params.order_price * 100) / 100
                         .toFixed(2)
                        }
   
   
                   </Text>


</View>


<View >
<Text style={[global.commonText]}>
                 {   global.Dimensionwidth > 468   ?  datePurchased : route.params.date_purchased}
                </Text>

</View>
            
<View style={[global.commonFlexrow_bt,global.topSpacing]}>  

<Text style={[global.commonText]}>
                  Cashier:
{  global.Dimensionwidth > 468  ?  'Admin' :    route.params.cashier}
                </Text>

             


  </View>


</View>

              



              </View>



              <View style={{marginTop: 1}}>
              

              
              
<Text></Text>
                { global.Dimensionwidth > 468 ? null :     route.params.orders_status==="Pending" ? null : <Text style={{color:"red"}}>Voided by : { route.params.cashier}  </Text>}



              </View>
              </View>
{global.Dimensionwidth > 468 ?  <View style={{backgroundColor:"#F2F2F2",padding:11 ,width:"100%" ,marginBottom:11}}></View>: null}


<View style={{paddingHorizontal:20}}>



              <View style={[global.commonFlexrow_ct, {marginTop: 15 }]}>
                <View
                  style={{
                    height: 1,
                    flex: global.Dimensionwidth > 468 ? 0.5 : 0.3,
                    backgroundColor: '#E7E7E7',
                  }}></View>
                <View style={{flex: 0.3}}>
                  <Text style={[global.commonTextblack, {textAlign: 'center'}]}>
                    Description
                  </Text>
                </View>

                <View
                  style={{
                    height: 1,
                    flex: global.Dimensionwidth > 468 ? 0.5 : 0.3,

                    backgroundColor: '#E7E7E7',
                  }}></View>
              </View>


{global.Dimensionwidth > 468 ? 


            viewBills.map(e => {
                return (
                  <View
                    style={[
                      global.commonFlexrow_bt,
                      {
                        paddingVertical: 14,
                        borderBottomWidth: 1,
                        borderBottomColor: '#E7E7E7',
                      },
                    ]}>
                    <View style={{ height: 60 ,width:70  ,borderRadius:5 ,overflow:"hidden"}}>
                     


<Image source={{uri:API_Links.URL+e.image}} style={{width:"100%",height:"100%",}} resizeMode="cover"/>

                       
                    </View>

                    <View
                      style={{
                        paddingHorizontal:11,
                        flex:0.6,
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        numberOfLines={1}
                        style={[global.H1, global.COLOR_BLUE]}
                        ellipsizeMode="tail">
                        {e.products_name}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={[global.H1, global.COLOR_NORMAL]}>
                        Qty: {e.products_quantity}
                      </Text>
                    </View>

                    <View style={{flex:0.4, alignItems: 'flex-end'}}>
                      <Text style={[global.H1, global.COLOR_BLUE]}>
                        {' '}
                        {symbol} {e.products_price * e.products_quantity}
                      </Text>
                    </View>



                  </View>
                );
              })
         : 


         route.params.viewBill.map(e => {
            return (
              <View
                style={[
                  global.commonFlexrow_bt,
                  {
                    paddingVertical: 14,
                    borderBottomWidth: 1,
                    borderBottomColor: '#E7E7E7',
                  },
                ]}>
                <View style={{ height:50 ,width:50 ,borderRadius:5,overflow:"hidden"}}>
                 


<Image source={{uri:API_Links.URL+e.image}} style={{width:"100%",height:"100%",}} resizeMode="cover"/>

                   
                </View>

                <View
                  style={{
                    
                    flex:0.6,
                    justifyContent: 'space-between',paddingHorizontal:7
                  }}>
                  <Text
                    numberOfLines={1}
                    style={[global.H1, global.COLOR_BLUE]}
                    ellipsizeMode="tail">
                    {e.products_name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={[global.H1, global.COLOR_NORMAL]}>
                    Qty: {e.products_quantity}
                  </Text>
                </View>

                <View style={{flex:0.4, alignItems: 'flex-end'}}>
                  <Text style={[global.H1, global.COLOR_BLUE]}>
                    {' '}
                    {symbol} {e.products_price * e.products_quantity}
                  </Text>
                </View>



              </View>
            );
          })

            }

            














<View style={{justifyContent:"flex-end" ,flexDirection:"row" ,marginTop:11}}>
            <View style={{flex:0.3}}>

            </View>

            <View style={{flex:global.Dimensionwidth > 468 ? 0.5: 0.7}}>

                <View style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
               



                  <View style={[global.commonFlexrow_bt ,{flex:1}]}>
                    <Text
                      style={[
                        global.cartFootertext,
                        global.commonTwocol,
                        {textAlign: 'right'},
                      ]}>
                      Sub-Total
                    </Text>
                    <Text style={[global.commonTextblue, global]}> {symbol} {Total}</Text> 
                  </View>
                </View>

                <View style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
               

                <View style={[global.commonFlexrow_bt ,{flex:1}]}>
                    <Text
                      style={[
                        global.cartFootertext,
                        global.commonTwocol,
                        {textAlign: 'right'},
                      ]}>
                      Tax
                    </Text>
                     <Text style={[global.cartFootertext]}>{symbol} { global.Dimensionwidth > 468 ?   totalTax   :  route.params.total_tax     }</Text> 
                  </View>
                </View>




                <View style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
                

                  <View style={[global.commonFlexrow_bt ,{flex:1}]}>
                    <Text
                      style={[
                        global.cartFootertext,
                        global.commonTwocol,
                        {textAlign: 'right'},
                      ]}>
                      Shipping Cost
                    </Text>
                   <Text style={[global.cartFootertext]}>{symbol} {  global.Dimensionwidth > 468 ?      shippingCost  :   route.params.shipping_cost}</Text> 
                  </View>
                </View>
                <View style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
                

                  <View style={[global.commonFlexrow_bt, {flex:1}]}>
                    <Text
                      style={[
                        global.cartFootertext,
                        global.commonTwocol,
                        {textAlign: 'right'},
                      ]}>
                      Total 
                    </Text>
                     <Text style={[global.cartFootertext,]}> {symbol} {Total}</Text> 
                  </View>
                </View>

                {/* <View style={[global.commonFlexrow_ct, {marginTop: 15}]}>
                  <View
                    style={{
                      height: 2,
                      flex: 0.3,
                      backgroundColor: '#E7E7E7',
                    }}></View>
                  <View style={{flex: 0.4}}>
                    <Text
                      style={[global.commonTextblack, {textAlign: 'center'}]}>
                      Payment
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 2,
                      flex: 0.3,
                      backgroundColor: '#E7E7E7',
                    }}></View>
                </View> */}

                <View style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
                  <View></View>

                  {/* <View style={[global.commonFlexrow_bt, {width: '70%'}]}>
                  <Text
                    style={[
                      global.commonTextblue,
                      global.commonTwocol,
                      {textAlign: 'right'},
                    ]}>
                    Delivery{' '}
                  </Text>
                  <Text style={[global.commonTextblue, global]}>8229.00</Text>
                </View> */}
                </View>

                {/* <View style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
                  <View></View>

                  <View style={[global.commonFlexrow_bt, {width: '70%'}]}>
                    <Text
                      style={[
                        global.commonTextblue,
                        global.commonTwocol,
                        {textAlign: 'right'},
                      ]}>
                      Total Payment{' '}
                    </Text>
                    <Text style={[global.commonTextblue, global]}>89.00</Text>
                  </View>
                </View> */}

                {/* <View style={[global.commonFlexrow_bt, {marginVertical: 11}]}>
                  <View></View>

                  <View style={[global.commonFlexrow_bt, {width: '70%'}]}>
                    <Text
                      style={[
                        global.commonTextblue,
                        global.commonTwocol,
                        {textAlign: 'right'},
                      ]}>
                      Change{' '}
                    </Text>
                    <Text style={[global.commonTextblue, global]}>89.00</Text>
                  </View>
                </View> */}
              </View>
              </View>
            </View>
            </View>

          </ScrollView>
        </View>

        <View style={[global.commonWhitebg, {justifyContent: 'flex-end'}]}>
         <View style={global.commonFlexrow_bt}>


             <TouchableOpacity onPress={()=>   oncancelBillmobile()}
              style={[
                global.commonButton,
                global.commonTwocol ,{backgroundColor:"red"}

,orderStatus!=="Pending"  ? {opacity:0.4} :null
              ]    }
              disabled={orderStatus!=="Pending"}>

             <Text style={global.btnText1}> Cancel Bill </Text> 




            </TouchableOpacity> 




            <TouchableOpacity
              style={[global.commonButton, global.commonTwocol]}>
              <Text style={global.btnText1}>Re-Print</Text>
            </TouchableOpacity>
          </View> 


        </View>
      </View>

      {loader ? <Customloader /> : null}
    </SafeAreaView>
  );
}
