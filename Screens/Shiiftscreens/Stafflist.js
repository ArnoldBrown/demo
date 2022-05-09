import React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {global} from '../../styles/global';
import Staffpingenerate from './Staffpingenerate';
import DeviceType from '../Orientation/DeviceType';

export default function Stafflist({navigation}) {
  const findDevice = DeviceType();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#424647'}}>
      <StatusBar barStyle="light-content" backgroundColor="#424647" />

      <View
        style={findDevice.isTab === 'Tablet' ? {flexDirection: 'row'} : null}>
        <View style={{paddingHorizontal: 15, marginTop: 30  ,width:findDevice.isTab === 'Tablet' ?"50%":"100%"}}>
          <Text
            style={[global.H1, {color: '#fff', fontFamily: 'Helvetica-Bold'}]}>
            17:33 PM
          </Text>

          <Text style={[global.H1, {color: '#fff'},global.verticalSpacing]}>
            Thursday 07 july 2021{' '}
          </Text>
        

          <Text style={[global.commonTextwhiteH1,global.bottomSpacing]}>Staff</Text>

       

          <TouchableOpacity
            onPress={() =>   findDevice.isTab === 'Tablet' ?    null:      navigation.navigate('Staffpingenerate')     }>
            <View style={[global.commonFlexrow_bt, global.flexLine,{alignItems:"center"}]}>
              <View style={[global.flexRowsec]}>
                <View
                  style={[global.draweruserlogo,{marginRight:11}]}>
                  <Image
                    source={require('../../Images/placeholder.png')}
                    style={{wid:"100%" ,height:"100%" ,flex:1}} resizeMode="cover"
                  />
                </View>

                <Text style={global.commonTextwhite}>Admin</Text>
              </View>
              <View>
                <Image
                  source={require('../../Images/angleRight.png')}
                  style={[global.settingIcon, {tintColor: '#fff'}]}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>


{findDevice.isTab === 'Tablet' ? <Staffpingenerate /> : null}





      </View>
    </SafeAreaView>
  );
}
