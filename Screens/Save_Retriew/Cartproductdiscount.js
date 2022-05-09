import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {global} from '../../styles/global';
import DeviceType from '../Orientation/DeviceType';
//import  AuthId  from '../AuthId.style'

export default function Cartproductdiscount({onClosecartmodel, navigation ,oncloseCartproductdiscount ,onOpendicountcalc}) {


  const [text, onChangeText] = React.useState('');

  const findDevice=DeviceType()



  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff',borderRadius:11 ,overflow:"hidden"}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff"></StatusBar>

      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={global.commonMobileHeader}>
          <TouchableOpacity onPress={() => findDevice.isTab !=='Tablet'? onClosecartmodel() :oncloseCartproductdiscount()}>
            <Image
              source={require('../../Images/closeicon.png')}
              style={global.settingIcon}
            />
          </TouchableOpacity>

          <Text style={global.headTitle}>Test</Text>

          <Text></Text>
        </View>

        <View style={{flex: 1}}>
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#eee',
            }}>
            <View style={global.commonFlexrow_ct}>
              <Text>Amount</Text>

              <View style={global.commonFlexrow_ct}>
                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 30}}>-</Text>
                </TouchableOpacity>

                <View
                  style={{
                    width: 100,
                    height: 40,
                    borderWidth: 2,
                    borderColor: '#EDEDED',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 11,
                  }}>
                  <Text>1</Text>
                </View>

                <TouchableOpacity
                  style={{
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: 30}}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={global.topSpacing}>
              <TextInput
                style={{
                  width: '100%',
                  height: 70,
                  backgroundColor: '#EDEDED',
                  borderRadius: 5,
                  paddingHorizontal: 11,
                  borderWidth: 1,
                  borderColor: '#D9D9D9',
                }}
                onChangeText={onChangeText}
                value={text}
                multiline={true}
                placeholder="Remark topping ,low sugar"
                placeholderTextColor="#000"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View
            style={[global.commonFlexrow_ct, global.flexLine, {padding: 11}]}>
            <Text>Discount</Text>

            <TouchableOpacity
              onPress={() =>findDevice.isTab !=="Tablet"  ?    [navigation.navigate('Discountcalc'),onClosecartmodel() ]   : [ onOpendicountcalc()    ]      }>

              <View style={global.flexRowsec}>
                <Text style={global.COLOR_RED}>0.00</Text>
                <Image
                  source={require('../../Images/angleRight.png')}
                  style={[
                    global.settingIcon,
                    {tintColor: 'green', marginLeft: 5},
                  ]}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 0.2, padding: 15, justifyContent: 'flex-end'}}>
          <TouchableOpacity style={global.commonButton}>
            <Text style={global.btnText1}>save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
