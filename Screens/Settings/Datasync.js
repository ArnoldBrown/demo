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
  ScrollViewBase,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType'



export default function Datasync({navigation}) {
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

        <Text style={global.headTitle}>Data Synchronization</Text>

        <View
          style={[global.flexRowsec, {justifyContent: 'space-between'}]}></View>
      </View>
}
      <View
        style={{flex: 1, flexDirection: 'column', backgroundColor: '#F1F6FA' ,paddingBottom:30}}>
        

<View style={[global.commonlineWrapper,{justifyContent:"center" ,alignItems:"center" ,paddingVertical:11}]}>
<Text style={{color:"orange",fontWeight:"600"}}>You're used POS on  another device.If you want  to use  on this device.Please press "setup POS"</Text>



<TouchableOpacity style={{width:120 ,height:40 ,borderWidth:1 ,justifyContent:"center",alignItems:"center",marginTop:14 ,borderColor:"red" ,borderRadius:5}}>

  <Text style={global.errorText}>Setup POS</Text>
  
</TouchableOpacity>



</View>


        {/* <View style={global.commonWhitebg}>

<View style={[global.flexRowsec,{justifyContent:"center"}]}>

<Image source={require('../../Images/refresh.png')} style={{width:40 ,height:40}}/>
<Text style={[global.H1,global.COLOR_BLUE,{marginLeft:11}]}>Sync</Text>

</View>
<View style={{marginTop:23}}></View>
<Text style={[global.commonTextblue,{textAlign:"center"}]}>Last update 14 jul 2021 12:33:33</Text>



        </View> */}







</View>





    </SafeAreaView>
  );
}
