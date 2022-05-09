import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React,{useState} from 'react';
import {global} from '../../styles/global';

import DeviceType from '../Orientation/DeviceType';

export default function Customerdisplay({navigation}) {
  const deviceType = DeviceType();

  const [text, onChangeText] = React.useState("");


  return (
   
    <SafeAreaView style={global.commonBg}>
    <StatusBar backgroundColor="#fff" barStyle="dark-content"></StatusBar>
    {deviceType.isTab === 'Tablet' ? null : (
      <View style={global.commonMobileHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Customer Display</Text>

        <View
          style={[
            global.flexRowsec,
            {justifyContent: 'space-between'},
          ]}></View>
      </View>

    )}

<View style={global.commonLightbg}>


<View style={[global.commonWhitebg,global.commonlineWrapper]}>

<View style={[global.flexRowsec,global.bottomSpacing]}>

<View style={{flex:0.6}}>

<Text style={global.commonTextH1}>Connection name</Text>

</View>



<View style={{flex:0.4}}>


<View style={[global.headerSerach,{borderRadius:0}]}>
<TextInput
style={[global.input,{textAlign:"right"}]}
onChangeText={onChangeText}
value={text}
placeholder="Enter POS name"
placeholderTextColor={'#000'}

      />

</View></View>




    </View>






<TouchableOpacity style={global.commonButton}>

<Text style={global.btnText1}>Start Invite</Text>

</TouchableOpacity>



</View>




</View>








 
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
