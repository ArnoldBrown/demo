
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



export default function Backup({navigation}) {
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

        <Text style={global.headTitle}>Backup & Restore</Text>

        <View
          style={[global.flexRowsec, {justifyContent: 'space-between'}]}></View>
      </View>
}




      <View 


     style={[global.commonLightbg,{paddingVertical:15}]}   >
        

<View style={[global.boxlineWrapper,global.commonhrPadding ]}>

<View style={[global.commonFlexrow_ct ,global.flexLine]}>
<Text style={global.commonTextH1}>Local storage usage</Text>
<Text  style={global.commonTextH1}>0.53 NB</Text>
</View>

<Text></Text>


<View style={[global.commonFlexrow_ct]}>

<Text style={global.commonTextH1}>Cloud storage usage</Text>

<Text  style={global.commonTextH1}>0.53 NB</Text>

</View>


<TouchableOpacity style={[global.commonButton,{marginVertical:15 ,height:40}]}>


<Text style={global.btnText1}>Backup</Text>

</TouchableOpacity>



</View>




<View
          style={[
            global.commonlineWrapper,
            {marginVertical: 30 },
          ]}>

            
          <View style={[global.commonFlexrow_ct]}>

            <Text style={global.commonTextH1}>Restore </Text>



            <Image
                            source={require('../../Images/angleRight.png')}
                            style={global.settingIcon}
                          />


         

          </View>
        </View>










</View>


{/* <ChatModel/> */}


    </SafeAreaView>
  );
}
