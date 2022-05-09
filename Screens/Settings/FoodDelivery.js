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
  ScrollViewBase,Pressable
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType'
import ChatModel from './ChatModel'



export default function FoodDelivery({navigation}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [text, onChangeText] = useState('');

  const findDevicetype =DeviceType()



  return (
    <SafeAreaView style={global.commonBg}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>
      {findDevicetype.isTab ==="Tablet" ? null  :
      <View style={global.commonMobileHeader}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Food Delivery</Text>

        <View
          style={[global.flexRowsec, {justifyContent: 'space-between'}]}></View>
      </View>
}
      <View 
     style={global.commonLightbg}   >
        
       

        <View style={[global.commonWhitebg, {padding: 17 ,borderTopWidth:2 ,borderBottomWidth:2 ,borderBottomColor:"#eee" ,borderTopColor:"#eee" }]}>
          <Pressable style={[global.commonFlexrow_ct]}       >


<Image  source={require('../../Images/chatBox.png')} style={[{width:42 ,height:42},global.iconColor]}/>


<Text style={global.commonTextblue}>Connect</Text>




</Pressable>
        </View>




</View>


{/* <ChatModel/> */}


    </SafeAreaView>
  );
}
