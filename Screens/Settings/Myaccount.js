import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Touchable,
} from 'react-native';
import {global} from '../../styles/global';

import DeviceType from '../Orientation/DeviceType'

import {useDispatch ,useSelector} from 'react-redux';
import {Ltout} from '../../action/loginAction';

import {purgeStoredState} from 'redux-persist';
import {shopnameClear} from '../../action/shopnameAction';








export default function Myaccount({navigation}) {

  const dispatch = useDispatch(); /// ======>>>Redux Hook <<<=====//


  const onLogout  =()=>{
  
  
    dispatch(Ltout())
    
    dispatch(shopnameClear())
  
  }
  
  

  const findDevicetype =DeviceType()



  const getToken = useSelector(state => state.loginReducer);
  //  const getMerchantdetails = useSelector(state => state.merchantloginDetails);
  
  const { loginData} = getToken;




  return (
    <SafeAreaView style={global.commonBg}>

{findDevicetype.isTab ==="Tablet" ? null :   
      <View style={global.commonMobileHeader}>

      <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>My account</Text>
<View></View>

      </View>}


<View style={[global.commonLightbg]}>

<View style={[global.commonLightbg]}>

<View style={[global.commonWhitebg,{marginBottom:30 ,justifyContent:"center" ,alignItems:"center"}]}>
        

<View style={{height:90 ,width:300 ,borderWidth:1 ,borderColor:"#eee" ,marginBottom:20 ,justifyContent:"center",alignItems:"center"}}>


<View style={{width:90 ,height:90 ,backgroundColor:"#eee",padding:1 }}>


  <Image source={require('../../Images/_placeholder.jpeg')} style={{width:"100%",height:"100%",resizeMode:"cover"}}/>

  </View>

</View>




<Text style={global.commonTextblueH1}>{loginData.first_name +loginData.last_name }</Text>
<Text></Text>
<Text style={global.commonText}>{loginData.email}</Text>
       
</View>



<Text style={[global.commonTextH1,{paddingHorizontal:15}]}>Contact Details</Text>


<View style={[global.commonWhitebg,{paddingVertical:0,marginTop:11}]}>
 
<View style={[global.commonFlexrow_bt,global.flexLine]}>
<Text style={global.commonTextblue}>Phone Number</Text>
<Text style={global.commonTextH1}>{loginData.phone}</Text>

</View>





</View>



<View style={global.topSpacing}>
<TouchableOpacity style={[global.commonWhitebtn,global.borderLine]}  onPress={()=>onLogout()} >

<View style={global.flexRowsec}> 
<Image source={require('../../Images/logout.png')} style={[global.settingIcon,{marginRight:7,tintColor:"red"}]}/>

<Text style={[global.errorText,{fontWeight:"400",fontSize:18}]}>Logout</Text>

</View>


</TouchableOpacity>



</View>




</View>




  
</View>

    </SafeAreaView>
  );
}
