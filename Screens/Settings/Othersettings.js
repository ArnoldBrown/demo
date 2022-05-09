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



export default function Othersettings({navigation}) {
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

        <Text style={global.headTitle}>Other Setting</Text>

        <View
          style={[global.flexRowsec, {justifyContent: 'space-between'}]}></View>
      </View>
}
      <View
        style={{flex: 1, flexDirection: 'column', backgroundColor: '#F1F6FA' ,paddingBottom:30}}>
        
        <View style={[global.commonWhitebg,{paddingVertical:0}]}>

<View style={[global.commonFlexrow_ct,global.flexLine]}>
    <Text style={global.commonTextblue}>Use USB Scanner</Text>

        <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
</View>

<View style={[global.commonFlexrow_ct,global.flexLine]}>
    <Text style={global.commonTextblue}>Show icon cash drawer</Text>
 
    <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
</View>



        </View>







</View>





    </SafeAreaView>
  );
}
