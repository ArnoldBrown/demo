import React, {useState} from 'react';
import {global} from '../../styles/global';

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Touchable,
  Image,Dimensions
} from 'react-native';

export default function ForgetPassword({navigation}) {
  const [email, onChangeEmail] = React.useState('');
  const windowWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView style={global.commonBg}>
      <View style={global.commonMobileHeader}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Image
            source={require('../../Images/left-arrow.png')}
            style={global.headBackarrow}
          />
        </TouchableOpacity>

        <Text style={global.headTitle}>Forget Password</Text>

        <View></View>
      </View>

      <View
        style={{
          backgroundColor: '#F1F6FA',
          flexGrow: 1,
          paddingHorizontal: 15,
          paddingVertical: 20,justifyContent:"center",alignItems:"center"
        }}>
<View style={{flex:1 ,width:windowWidth > 480 ?  windowWidth/2:"100%"     ,maxWidth:"100%"}}>
          <View style={[global.inputBox,global.topSpacing]}>
            <TextInput
              style={global.input}
              onChangeText={onChangeEmail}
              value={email}
              placeholder="Email"
            />
          </View>

          <TouchableOpacity style={global.topSpacing}>
            <View style={global.commonButton}>
              <Text style={global.btnText1}>Reset</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
