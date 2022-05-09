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

const windowWidth = Dimensions.get('window').width;

export default function Createaccount({navigation}) {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  return (
    <SafeAreaView style={global.commonBg}>
      <View style={global.commonMobileHeader}>
        <TouchableOpacity  onPress={()=>navigation.goBack()}> 
          <Image
            source={require('../../Images/left-arrow.png')}
            style={global.headBackarrow}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: '#F1F6FA',
          flexGrow: 1,
          paddingHorizontal: 15,
          paddingVertical: 25,  justifyContent:"center",alignItems:"center"
        }}>
<View style={{flex:1 ,width:windowWidth > 480 ?  windowWidth/2:"100%"     ,maxWidth:"100%"}}>


         <View style={[global.commonFlexrow_bt,global.topSpacing]}>
         <View style={[global.inputBox,global.commonTwocol]}>
            <TextInput
              style={global.input}
              onChangeText={onChangeEmail}
              value={email}
              placeholder="Merchant Name"
            />
          </View>

          <View style={[global.inputBox,global.commonTwocol]}>
            <TextInput
              style={global.input}
              onChangeText={onChangeEmail}
              value={email}
              placeholder="Email"
            />
          </View>



         </View>




          <View style={[global.inputBox,global.topSpacing]}>
            <TextInput
              style={global.input}
              onChangeText={onChangeEmail}
              value={email}
              placeholder="Email"
            />
          </View>

          <View style={[global.inputBox,global.topSpacing]}>
            <TextInput
              style={global.input}
              onChangeText={onChangePassword}
              value={password}
              placeholder="Passowrd"
              secureTextEntry={true}
            />
          </View>

          <View style={[global.inputBox,global.topSpacing]}>
            <TextInput
              style={global.input}
              onChangeText={onChangePassword}
              value={password}
              placeholder="Confirm Passowrd"
              secureTextEntry={true}
            />
          </View>





          <TouchableOpacity            style={[global.topSpacing]}>

            <View style={global.commonButton}>
              <Text style={global.btnText1}>Sign Up</Text>
            </View>
          </TouchableOpacity>

          
        </View>
      </View>
    </SafeAreaView>
  );
}
