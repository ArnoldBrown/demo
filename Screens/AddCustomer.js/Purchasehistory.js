/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
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
  FlatList,
} from 'react-native';
import moment from 'moment';


import {global} from '../../styles/global';
import Customloader from '../Customloader';
import {useSelector, useDispatch} from 'react-redux';
import {FlatGrid} from 'react-native-super-grid';

import FlatlistEmpty from '../FlatlistEmpty';


import FlatlistSeprator from '../FlatlistSeprator'

import Purchasedescriptions from '../AddCustomer.js/Purchasedescriptions'


import {purchaselistAction} from '../../action/purchaselistAction'

// import {useSelector ,useDispatch} from 'react-redux'

import  AuthId  from '../AuthId.style'




export default function Purchasehistory({
  navigation,
  onClosepurchasemodel,
  
  route,openPurchasedetail
}) {
  //------- Redux-Hook ----//



 const dispatch =  useDispatch()


  const getLanguageids = useSelector(state => state.languageReducer);
  const {languageId} = getLanguageids;

  const getCurrencycodes = useSelector(state => state.currencyReducer);
  const {currencyCode ,symbol} = getCurrencycodes;
  
  const state = useSelector(state => state.purchaselistReducer)
  const { purchaseHistory ,getName } = state


  const shopName = useSelector(state => state.shopnameReducer);
  
  const {groceryName} = shopName;


  //------ Redux-Hook ------//










  const [loader, setLoader] = useState(false);



  const getpurchaseList = () => {

    dispatch(purchaselistAction( global.Dimensionwidth > 468 ? null  :  route.params.userId, languageId  ,currencyCode  ,groceryName))
    
  };






  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getpurchaseList();

      return () => {
        unsubscribe;
      };
    });
  }, []);

  const renderItem = ({item}) => (
    

    <TouchableOpacity  onPress={()=>
      
      global.Dimensionwidth > 468 ? openPurchasedetail (item.orders_id ,item.order_price ,item.date_purchased ,item.cashier ,item.delivery_name,item.data, item.orders_status  ,item.currency, item.total_tax, item.shipping_cost):
      
      
      navigation.navigate('Purchasedescriptions',{
      orders_id:item.orders_id,
      order_price:item.order_price,
      date_purchased:item.date_purchased,
      cashier:"Admin",
      delivery_name:item.delivery_name,
      viewBill:item.data,
      orders_status:item.orders_status,
      shipping_cost:item.shipping_cost,
      total_tax:item.total_tax,
      currency_type:item.currency

      })
      
      
      
      }  >
     
     
     <View style={{paddingVertical:8}}>
     
     <View style={[global.commonFlexrow_ct,{}]}>
     <View style={global.flexRowsec}>
     
     <View>
     
     <Image source={require('../../Images/wallet.png')} style={item.orders_status ==="Pending"  ?  global.settingIcon : {tintColor:"red" ,  width: 25,
         height:25,}  } />
     
     </View>
     
     
     <View style={{marginHorizontal:8}}>
         <Text style={[item.orders_status ==="Pending"?     global.activeTextmd   :  global.inactiveTextmd ]}>Order ID : {item.orders_id}</Text>
         <View style={{flexDirection:"row" ,alignItems:"center" ,marginTop:10 }}>


<Text style={[ global.commonText,   {color:item.orders_status ==="Pending" ?null :"red" ,marginRight:13}]}>{moment(item.date_purchased).format('h:mm')}</Text>

{item.orders_status ==="Pending"?  null : <Text style={{color:"red"}}>Voided</Text>}

</View>

     
     </View>
     </View>
     <View >
         <Text style={[item.orders_status ==="Pending"?     global.activeTextmd   :  global.inactiveTextmd ]}> {symbol} {(Math.round(item.order_price   * 100) / 100).toFixed(2)}</Text>
        
     {/* <View style={ item.orders_status ==="Pending"  ?{padding:4 ,backgroundColor:"green",borderRadius:4,marginTop:11 } : { backgroundColor:"red" ,padding:4,borderRadius:4 ,marginTop:11}}>
     
     <Text style={{textAlign:"center" ,color:"#fff",fontWeight:"bold"}}>{item.orders_status}</Text>
     
     </View> */}
     
     </View>
     
     
     </View>
     
     
     </View>
     
     </TouchableOpacity>
     
     
  );



  



  return (
    <SafeAreaView style={[global.commonBg, {borderRadius: 11  ,height:"100%"}]}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>
      {global.Dimensionwidth > 468 ? null :
      <View style={global.commonMobileHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Purchase history</Text>

        <View></View>
      </View> }

      <View >


         
   

<View style={{paddingHorizontal:15,height:"100%"}}>

 <View style={[global.commonFlexrow_ct,{padding:16 ,borderWidth:1 ,backgroundColor:"#fff" , borderColor: '#b6b9bd',marginTop:13}]}>
<Text style={global.commonText} >Customer Name</Text>

<Text style={[global.COLOR_BLUE ,{fontSize:16}]}>{getName}</Text>

</View> 

<View style={[global.commonFlexrow_ct ,{marginTop:11}]}> 


<View  style={[global.commonFlexrow_ct,{padding:14 ,borderWidth:1 ,backgroundColor:"#fff" , borderColor: '#b6b9bd'},global.commonTwocol ]}> 
<Text  style={global.commonText}  >Bill Count</Text>

<Text style={[global.COLOR_BLUE ,{fontSize:16}]}>{purchaseHistory.length}</Text>

</View>


<View style={[global.commonFlexrow_ct,{padding:14 ,borderWidth:1 ,backgroundColor:"#fff" , borderColor: '#b6b9bd',},global.commonTwocol]}>
<Text  style={global.commonText} >Total</Text>


<Text style={[global.COLOR_BLUE ,{fontSize:16}]} >{Math.round(
  (purchaseHistory.reduce(
    (a, c) => a + c.order_price ,
    0,
  ) *
    100) /
    100,
).toFixed(2)}
</Text>
</View>
</View> 




 {/* <View style={[{backgroundColor:"#fff",marginTop:12 ,borderWidth:1 ,borderColor:'#b6b9bd' ,height:"100%"} ]}> 


<Text style={[global.commonText,{paddingHorizontal:11 ,paddingTop:10}]}>Recent Purchases</Text> */}

<FlatGrid
          itemDimension={[
            global.Dimensionwidth 
         
          ]}
          ListHeaderComponent={()=>{

return (
  <View style={{marginBottom:8}}>

<Text style={[global.commonText,{paddingHorizontal:11 ,paddingTop:10}]}>Recent Purchases</Text> 
</View>
)



          }}
          contentContainerStyle={{flexGrow:1 ,backgroundColor:"#fff",marginTop:4 ,borderWidth:1 ,borderColor:'#b6b9bd' }}
          
          showsVerticalScrollIndicator={false}
          data={purchaseHistory}
          renderItem={renderItem}
          keyExtractor={item => item.orders_id}
          ListEmptyComponent={FlatlistEmpty}
        ItemSeparatorComponent={FlatlistSeprator}

        /> 



{/* </View>

      */}









</View>


        {/* </View> */}
      </View>

      {loader ? <Customloader /> : null}

{/* 
<Purchasedescriptions navigation={navigation}
route={route.params}/> */}


     
    </SafeAreaView>
  );
}
